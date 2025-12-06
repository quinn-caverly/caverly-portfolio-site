"use client";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import Iridescence from "@/components/Iridescence";

interface BackgroundLayerProps {
  isDayMode: boolean;
}

export function BackgroundLayer({ isDayMode }: BackgroundLayerProps) {
  return (
    <>
      {/* Day Mode Background (Iridescence) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: isDayMode ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
          pointerEvents: isDayMode ? "auto" : "none",
        }}
      >
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
      </div>

      {/* Night Mode Background (Animated Stars) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: isDayMode ? 0 : 1,
          transition: "opacity 0.6s ease-in-out",
          pointerEvents: isDayMode ? "none" : "auto",
        }}
      >
        <AnimatedBackground
          isDayMode={isDayMode}
          density={1.2}
          glowIntensity={0.4}
          saturation={0.3}
          hueShift={260}
          mouseRepulsion={true}
          mouseInteraction={true}
          twinkleIntensity={0.4}
          rotationSpeed={0.02}
        />
      </div>
    </>
  );
}
