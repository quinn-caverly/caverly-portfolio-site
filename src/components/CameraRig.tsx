import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { FocusState } from "../types";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface CameraRigProps {
  focus: FocusState | null;
  hoverZoom?: { position: THREE.Vector3; lookAt: THREE.Vector3 } | null;
}

export function CameraRig({ focus, hoverZoom }: CameraRigProps) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useFrame(() => {
    if (hoverZoom) {
      // Hover zoom - move along line to marker and look at it
      const distance = camera.position.distanceTo(hoverZoom.position);
      if (distance > 0.05) {
        camera.position.lerp(hoverZoom.position, 0.12);
        if (controlsRef.current) {
          controlsRef.current.target.lerp(hoverZoom.lookAt, 0.12);
        }
      } else {
        // Snap to final position to prevent bounce
        camera.position.copy(hoverZoom.position);
        if (controlsRef.current) {
          controlsRef.current.target.copy(hoverZoom.lookAt);
        }
      }
    } else if (focus) {
      // Click focus - normal speed
      const targetPos = new THREE.Vector3(...focus.pos);
      const targetLookAt = new THREE.Vector3(...focus.target);
      const distance = camera.position.distanceTo(targetPos);

      if (distance > 0.05) {
        camera.position.lerp(targetPos, 0.06);
        if (controlsRef.current) {
          controlsRef.current.target.lerp(targetLookAt, 0.06);
        }
      } else {
        // Snap to final position to prevent bounce
        camera.position.copy(targetPos);
        if (controlsRef.current) {
          controlsRef.current.target.copy(targetLookAt);
        }
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping={false}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
      minDistance={5}
      maxDistance={30}
      maxPolarAngle={Math.PI / 2.1}
      makeDefault
    />
  );
}
