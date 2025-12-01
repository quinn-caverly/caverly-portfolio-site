import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface LocationMarkerProps {
  name: string;
  position: THREE.Vector3;
  onClick: () => void;
  team: "blue" | "red";
  isDayMode: boolean;
}

export function LocationMarker({
  position,
  onClick,
  team,
  isDayMode,
}: LocationMarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const markerColor = team === "blue" ? "#4a90e2" : "#e24a4a";
  const torchColor = "#ffcc88";

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.02 + 1;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }

    if (lightRef.current && !isDayMode) {
      const flicker = 0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      lightRef.current.intensity = flicker * 2;
    }
  });

  return (
    <group
      position={[position.x, position.y + 0.3, position.z]}
      onClick={onClick}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          emissive={markerColor}
          emissiveIntensity={2.5}
          color={markerColor}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={markerColor} transparent opacity={0.2} />
      </mesh>

      {!isDayMode && (
        <pointLight
          ref={lightRef}
          color={torchColor}
          intensity={2}
          distance={8}
          decay={2}
        />
      )}
    </group>
  );
}
