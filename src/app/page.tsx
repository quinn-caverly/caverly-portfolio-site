"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { FocusState } from "@/types";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import Iridescence from "@/components/Iridescence";
import { FallbackView } from "@/components/FallbackView";
import { ProjectPanel } from "@/components/ProjectPanel";

// Dynamically import MapScene with no SSR to prevent hydration errors
const MapScene = dynamic(
  () => import("@/components/MapScene").then((mod) => mod.MapScene),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function Home() {
  const [focus, setFocus] = useState<FocusState | null>(null);
  const [isDayMode, setIsDayMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [hasThreeJsError, setHasThreeJsError] = useState(false);
  const [simulateError, setSimulateError] = useState(false);

  useEffect(() => {
    // Check URL for ?simulate-error=true to test fallback
    const params = new URLSearchParams(window.location.search);
    if (params.get("simulate-error") === "true") {
      setSimulateError(true);
    }
  }, []);

  const handleHomeClick = () => {
    setSelectedProject(null);
    setFocus({
      pos: [7, 3.3, 0],
      target: [0, 0, 0],
      isDetailView: false,
    });
  };

  const handleProjectClick = (projectName: string) => {
    setSelectedProject(projectName);
  };

  // Show fallback if error or simulating error
  if (hasThreeJsError || simulateError) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
        }}
      >
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
        <Header
          isDayMode={isDayMode}
          setIsDayMode={setIsDayMode}
          selectedProject={null}
          onHomeClick={handleHomeClick}
        />
        <FallbackView
          isDayMode={isDayMode}
          onProjectClick={handleProjectClick}
        />
        <ProjectPanel
          projectName={selectedProject}
          onClose={handleHomeClick}
          isDayMode={isDayMode}
          isFallbackMode={true}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
      }}
    >
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
      <Header
        isDayMode={isDayMode}
        setIsDayMode={setIsDayMode}
        selectedProject={selectedProject}
        onHomeClick={handleHomeClick}
      />
      <MapScene
        focus={focus}
        setFocus={setFocus}
        isDayMode={isDayMode}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        onError={() => setHasThreeJsError(true)}
      />
    </div>
  );
}
