import { Canvas, useThree } from "@react-three/fiber";
import { World, useWorldMarkers } from "./World";
import { CameraRig } from "./CameraRig";
import { FocusState } from "../types";
import { Stars, Cloud } from "@react-three/drei";
import { ShootingStars } from "./ShootingStars";
import { MarkerOverlays } from "./MarkerOverlays";
import { Suspense, useState, useEffect } from "react";
import * as THREE from "three";

interface MapSceneProps {
  focus: FocusState | null;
  setFocus: (focus: FocusState | null) => void;
  isDayMode: boolean;
}

function OverlayBridge({
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
      team: marker.name.startsWith("Blue")
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
}

export function MapScene({ focus, setFocus, isDayMode }: MapSceneProps) {
  const [markerData, setMarkerData] = useState<
    Array<{
      name: string;
      position: THREE.Vector3;
      team: "blue" | "red";
    }>
  >([]);
  const [camera, setCamera] = useState<THREE.Camera | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

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
    });
  };

  const handleHoverZoom = () => {
    // Camera hover zoom disabled for now
  };

  return (
    <>
      <Canvas
        camera={{ position: [7, 5, 0], fov: 50 }}
        style={{ width: "100vw", height: "100vh" }}
        shadows
      >
        <color attach="background" args={[isDayMode ? "#87CEEB" : "#0a0a1a"]} />
        <fogExp2
          attach="fog"
          args={[isDayMode ? "#e0f2ff" : "#a8c5dd", isDayMode ? 0.008 : 0.015]}
        />

        {!isDayMode && (
          <>
            <Stars
              radius={100}
              depth={50}
              count={8000}
              factor={6}
              saturation={0.3}
              fade
              speed={1}
            />
            <Stars
              radius={100}
              depth={50}
              count={2000}
              factor={8}
              saturation={0.8}
              fade
              speed={2}
            />
            <ShootingStars />
          </>
        )}

        {isDayMode && (
          <>
            <Cloud opacity={0.6} speed={0.3} position={[-12, 12, -10]} />
            <Cloud opacity={0.5} speed={0.2} position={[15, 11, 8]} />
            <Cloud opacity={0.4} speed={0.25} position={[0, 13, -15]} />
            <Cloud opacity={0.55} speed={0.18} position={[20, 10, -5]} />
            <Cloud opacity={0.5} speed={0.22} position={[-15, 11, 12]} />
            <Cloud opacity={0.45} speed={0.28} position={[8, 14, -20]} />
            <Cloud opacity={0.5} speed={0.2} position={[-20, 12, -8]} />
            <Cloud opacity={0.55} speed={0.25} position={[18, 9, 15]} />
            <Cloud opacity={0.5} speed={0.3} position={[-10, 13, -18]} />
            <Cloud opacity={0.45} speed={0.15} position={[25, 11, 0]} />
            <Cloud opacity={0.5} speed={0.2} position={[-25, 10, 5]} />
            <Cloud opacity={0.6} speed={0.22} position={[12, 14, -25]} />
            <Cloud opacity={0.5} speed={0.28} position={[-18, 12, 20]} />
            <Cloud opacity={0.55} speed={0.18} position={[5, 11, 25]} />

            <Cloud opacity={0.3} speed={0.15} position={[10, -2, -10]} />
            <Cloud opacity={0.35} speed={0.2} position={[-12, -3, 8]} />
            <Cloud opacity={0.4} speed={0.18} position={[15, -1, 15]} />
            <Cloud opacity={0.3} speed={0.22} position={[-18, -2, -15]} />
            <Cloud opacity={0.35} speed={0.25} position={[20, -3, 5]} />
            <Cloud opacity={0.4} speed={0.15} position={[-15, -1, -20]} />
            <Cloud opacity={0.3} speed={0.2} position={[8, -2, 18]} />
            <Cloud opacity={0.35} speed={0.18} position={[-20, -3, 12]} />
            <Cloud opacity={0.4} speed={0.22} position={[22, -1, -8]} />
            <Cloud opacity={0.3} speed={0.25} position={[-8, -2, -22]} />

            <Cloud opacity={0.5} speed={0.2} position={[30, 10, -15]} />
            <Cloud opacity={0.45} speed={0.25} position={[-30, 11, 10]} />
            <Cloud opacity={0.5} speed={0.18} position={[15, 12, -30]} />
            <Cloud opacity={0.55} speed={0.22} position={[-20, 13, 25]} />
            <Cloud opacity={0.5} speed={0.28} position={[25, 9, 20]} />
          </>
        )}

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
          onMarkerClick={handleMarkerClick}
          camera={camera}
          canvasSize={canvasSize}
          onHoverZoom={handleHoverZoom}
        />
      )}
    </>
  );
}
