import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShootingStar {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  color: THREE.Color;
}

export function ShootingStars() {
  const starsRef = useRef<ShootingStar[]>([]);
  const linesRef = useRef<THREE.Line[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (Math.random() < 0.08) {
      const side = Math.random() > 0.5 ? 1 : -1;
      const radius = 80 + Math.random() * 20;
      const height = Math.random() * 60 - 30;
      const zPosition = (Math.random() - 0.5) * 60;

      const colors = [
        new THREE.Color("#ffffff"),
        new THREE.Color("#aaccff"),
        new THREE.Color("#ffccaa"),
        new THREE.Color("#ccaaff"),
        new THREE.Color("#aaffcc"),
        new THREE.Color("#ff6b9d"),
        new THREE.Color("#ff4757"),
        new THREE.Color("#5f27cd"),
        new THREE.Color("#00d2ff"),
        new THREE.Color("#ffa502"),
        new THREE.Color("#ff6348"),
        new THREE.Color("#4834df"),
        new THREE.Color("#f368e0"),
      ];

      const shootingStar: ShootingStar = {
        position: new THREE.Vector3(side * radius, height, zPosition),
        velocity: new THREE.Vector3(
          -side * (40 + Math.random() * 20),
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
        ),
        life: 0,
        maxLife: 1.5 + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      starsRef.current.push(shootingStar);

      const points = [
        shootingStar.position.clone(),
        shootingStar.position.clone(),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: shootingStar.color,
        transparent: true,
        opacity: 0,
        linewidth: 3,
      });
      const line = new THREE.Line(geometry, material);
      groupRef.current.add(line);
      linesRef.current.push(line);
    }

    for (let i = starsRef.current.length - 1; i >= 0; i--) {
      const star = starsRef.current[i];
      const line = linesRef.current[i];

      star.life += delta;
      if (star.life > star.maxLife) {
        starsRef.current.splice(i, 1);
        if (line) {
          groupRef.current?.remove(line);
          line.geometry.dispose();
          (line.material as THREE.Material).dispose();
        }
        linesRef.current.splice(i, 1);
        continue;
      }

      star.position.add(star.velocity.clone().multiplyScalar(delta));

      if (line && line.geometry) {
        const positions = line.geometry.attributes.position;
        const trailLength = 8 + Math.random() * 4;
        const trailPos = star.position
          .clone()
          .sub(star.velocity.clone().normalize().multiplyScalar(trailLength));

        positions.setXYZ(0, star.position.x, star.position.y, star.position.z);
        positions.setXYZ(1, trailPos.x, trailPos.y, trailPos.z);
        positions.needsUpdate = true;

        const progress = star.life / star.maxLife;
        const opacity =
          progress < 0.1
            ? progress * 10
            : progress > 0.7
              ? (1 - progress) / 0.3
              : 1;

        (line.material as THREE.LineBasicMaterial).opacity = opacity * 1.2;
      }
    }
  });

  return <group ref={groupRef} />;
}
