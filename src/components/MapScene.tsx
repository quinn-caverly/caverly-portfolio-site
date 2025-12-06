import { Canvas, useThree } from "@react-three/fiber";
import { World, useWorldMarkers } from "./World";
import { CameraRig } from "./CameraRig";
import { FocusState } from "../types";
import { Stars } from "@react-three/drei";
import { ShootingStars } from "./ShootingStars";
import { MarkerOverlays } from "./MarkerOverlays";
import { ProjectPanel } from "./ProjectPanel";
import { Suspense, useState, useEffect, memo, useRef } from "react";
import * as THREE from "three";

interface MapSceneProps {
  focus: FocusState | null;
  setFocus: (focus: FocusState | null) => void;
  isDayMode: boolean;
  selectedProject: string | null;
  setSelectedProject: (project: string | null) => void;
  onError?: () => void;
}

const OverlayBridge = memo(function OverlayBridge({
  setMarkerData,
  setCamera,
  setCanvasSize,
}: {
  setMarkerData: React.Dispatch<
    React.SetStateAction<
      Array<{
        name: string;
        position: THREE.Vector3;
        team: "blue" | "red";
      }>
    >
  >;
  setCamera: React.Dispatch<React.SetStateAction<THREE.Camera | null>>;
  setCanvasSize: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
}) {
  const markers = useWorldMarkers();
  const { camera, size } = useThree();

  useEffect(() => {
    const data = markers.map((marker) => ({
      name: marker.name,
      position: marker.position,
      team:
        marker.name === "AboutMe"
          ? ("blue" as const)
          : marker.name.startsWith("Blue")
            ? ("blue" as const)
            : ("red" as const),
    }));
    setMarkerData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers]);

  useEffect(() => {
    setCamera(camera);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera]);

  useEffect(() => {
    setCanvasSize({ width: size.width, height: size.height });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width, size.height]);

  return null;
});

export function MapScene({
  focus,
  setFocus,
  isDayMode,
  selectedProject,
  setSelectedProject,
  onError,
}: MapSceneProps) {
  const [markerData, setMarkerData] = useState<
    Array<{
      name: string;
      position: THREE.Vector3;
      team: "blue" | "red";
    }>
  >([]);
  const [camera, setCamera] = useState<THREE.Camera | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const [isResetting, setIsResetting] = useState(false);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMarkerClick = (name: string) => {
    const marker = markerData.find((m) => m.name === name);
    if (!marker) return;

    const originalPos = { x: 7, y: 5, z: 0 };
    const offset = 2.5;
    const heightAbove = 1.5;

    const directionX = marker.position.x - originalPos.x;
    const directionZ = marker.position.z - originalPos.z;
    const distance = Math.sqrt(
      directionX * directionX + directionZ * directionZ,
    );

    const normalizedX = distance !== 0 ? directionX / distance : 0;
    const normalizedZ = distance !== 0 ? directionZ / distance : 0;

    const cameraPos = {
      x: marker.position.x - normalizedX * offset,
      y: marker.position.y + heightAbove,
      z: marker.position.z - normalizedZ * offset,
    };

    setFocus({
      pos: [cameraPos.x, cameraPos.y, cameraPos.z],
      target: [marker.position.x, marker.position.y + 0.3, marker.position.z],
      isDetailView: false,
    });
  };

  const handleDetailView = (name: string) => {
    const marker = markerData.find((m) => m.name === name);
    if (!marker) return;

    // Get current camera position (default starting position)
    const currentCameraPos = { x: 7, y: 5, z: 0 };

    // Special handling for AboutMe card
    const isAboutMe = name === "AboutMe";

    // Calculate point between camera and building (using algebra/interpolation)
    // t = 0.3 means 30% of the way from camera to building (closer to camera)
    const t = isAboutMe ? 0.5 : 0.7; // AboutMe zooms less close

    // Determine horizontal offset based on team - Blue goes left (panel on left), Red goes right (panel on right)
    const isRedTeam = marker.team === "red";
    const horizontalOffset = isAboutMe ? 0 : isRedTeam ? -1 : 1;

    const cameraPos = {
      x: currentCameraPos.x + (marker.position.x - currentCameraPos.x) * t,
      y:
        currentCameraPos.y + (marker.position.y - currentCameraPos.y) * t + 0.5,
      z: currentCameraPos.z + (marker.position.z - currentCameraPos.z) * t,
    };

    setFocus({
      pos: [cameraPos.x, cameraPos.y, cameraPos.z],
      target: [
        marker.position.x,
        marker.position.y + (isAboutMe ? 1.5 : -0.5),
        marker.position.z + horizontalOffset,
      ],
      isDetailView: true,
    });

    setSelectedProject(name);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
    setIsResetting(true);

    // Clear any existing timeout
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    // Reset camera to original default position
    setFocus({
      pos: [7, 3.3, 0],
      target: [0, 0, 0],
      isDetailView: false,
    });

    // Wait for camera to finish animation before showing cards
    // Show cards when camera is ~50% back (at 0.12 lerp speed)
    resetTimeoutRef.current = setTimeout(() => {
      setIsResetting(false);
    }, 400);
  };

  const handleHoverZoom = () => {
    // Camera hover zoom disabled for now
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Canvas
        camera={{ position: [7, 3.3, 0], fov: 50 }}
        style={{ width: "100vw", height: "100vh" }}
        shadows
        frameloop="always"
        dpr={[1, 2]}
        gl={{ alpha: true }}
        onCreated={(state) => {
          // Catch WebGL context errors
          const gl = state.gl.getContext();
          if (!gl) {
            onError?.();
          }
        }}
        onError={(error) => {
          console.error("Three.js error:", error);
          onError?.();
        }}
      >
        <group visible={!isDayMode}>
          <Stars
            radius={100}
            depth={50}
            count={4000}
            factor={6}
            saturation={0.3}
            fade
            speed={1}
          />
          <Stars
            radius={100}
            depth={50}
            count={1000}
            factor={8}
            saturation={0.8}
            fade
            speed={2}
          />
          <ShootingStars />
        </group>

        {/* Clouds temporarily disabled to prevent WebGL context loss */}

        <ambientLight intensity={isDayMode ? 0.8 : 0.4} />

        <directionalLight
          position={[10, 15, 10]}
          intensity={isDayMode ? 2.5 : 1.8}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          color={isDayMode ? "#fffaf0" : "#ffffff"}
        />

        <directionalLight
          position={[-5, 8, -5]}
          intensity={isDayMode ? 1.2 : 0.6}
        />

        {!isDayMode && (
          <directionalLight
            position={[0, 5, -10]}
            intensity={0.8}
            color="#8888ff"
          />
        )}

        <hemisphereLight
          color={isDayMode ? "#ffffff" : "#ffffff"}
          groundColor={isDayMode ? "#8B7355" : "#444488"}
          intensity={isDayMode ? 1.0 : 0.5}
        />

        <Suspense fallback={null}>
          <World />
          <OverlayBridge
            setMarkerData={setMarkerData}
            setCamera={setCamera}
            setCanvasSize={setCanvasSize}
          />
        </Suspense>

        <CameraRig focus={focus} hoverZoom={null} />
      </Canvas>

      {camera && (
        <MarkerOverlays
          markers={markerData}
          onMarkerClick={handleDetailView}
          camera={camera}
          canvasSize={canvasSize}
          onHoverZoom={handleHoverZoom}
          selectedProject={selectedProject}
          isResetting={isResetting}
          isDayMode={isDayMode}
        />
      )}

      <ProjectPanel
        projectName={selectedProject}
        onClose={handleCloseDetail}
        isDayMode={isDayMode}
      />
    </>
  );
}
