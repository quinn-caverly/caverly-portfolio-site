import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, memo } from "react";
import * as THREE from "three";

interface MarkerPosition {
  name: string;
  position: THREE.Vector3;
}

export const World = memo(function World() {
  const { scene } = useGLTF("/models/test.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;

        // Optimize materials to prevent context loss
        if (mesh.material) {
          const material = mesh.material as THREE.Material;

          // Reduce texture size if available
          const materialWithMap = material as
            | THREE.MeshStandardMaterial
            | THREE.MeshBasicMaterial;
          if (materialWithMap.map) {
            const map = materialWithMap.map as THREE.Texture;
            map.minFilter = THREE.LinearFilter;
            map.magFilter = THREE.LinearFilter;
            map.generateMipmaps = false;
          }

          // Optimize material settings
          material.needsUpdate = false;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} dispose={null} />;
});

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
        // "BlueNorthOutpost",
        // "BlueMountainOutpost",
        "RedCapital",
        "RedEdgeOutpost",
        "RedFarmOutpost",
        // "RedNorthOutpost",
        // "RedMountainOutpost",
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

    // Add About Me marker at midpoint between RedMountainOutpost and BlueNorthOutpost
    const redMountainPos = new THREE.Vector3();
    const blueNorthPos = new THREE.Vector3();
    let foundRedMountain = false;
    let foundBlueNorth = false;

    scene.traverse((child) => {
      if (child.name === "RedMountainOutpost") {
        (child as THREE.Object3D).getWorldPosition(redMountainPos);
        foundRedMountain = true;
      }
      if (child.name === "BlueNorthOutpost") {
        (child as THREE.Object3D).getWorldPosition(blueNorthPos);
        foundBlueNorth = true;
      }
    });

    if (foundRedMountain && foundBlueNorth) {
      const midpoint = new THREE.Vector3(
        (redMountainPos.x + blueNorthPos.x) / 2,
        (redMountainPos.y + blueNorthPos.y) / 2 - 1,
        (redMountainPos.z + blueNorthPos.z) / 2,
      );
      foundMarkers.push({
        name: "AboutMe",
        position: midpoint,
      });
    }

    return foundMarkers;
  }, [scene]);

  return markers;
}
