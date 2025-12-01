import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

interface MarkerPosition {
  name: string;
  position: THREE.Vector3;
}

export function World() {
  const { scene } = useGLTF("/models/test.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          (mesh.material as THREE.Material).needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

useGLTF.preload("/models/test.glb");

export function useWorldMarkers() {
  const { scene } = useGLTF("/models/test.glb");

  const markers = useMemo(() => {
    const foundMarkers: MarkerPosition[] = [];

    scene.traverse((child) => {
      const markerNames = [
        "BlueCapital",
        "BlueLakeOutpost",
        "BluePlainsOutpost",
        "BlueNorthOutpost",
        "BlueMountainOutpost",
        "RedCapital",
        "RedEdgeOutpost",
        "RedFarmOutpost",
        "RedNorthOutpost",
        "RedMountainOutpost",
      ];

      if (markerNames.includes(child.name)) {
        const worldPosition = new THREE.Vector3();
        (child as THREE.Object3D).getWorldPosition(worldPosition);
        foundMarkers.push({
          name: child.name,
          position: worldPosition,
        });
      }
    });

    return foundMarkers;
  }, [scene]);

  return markers;
}
