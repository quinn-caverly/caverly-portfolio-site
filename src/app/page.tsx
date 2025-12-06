"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { FocusState } from "@/types";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { FallbackView } from "@/components/FallbackView";
import { ProjectPanel } from "@/components/ProjectPanel";
import { WelcomeTooltip } from "@/components/WelcomeTooltip";

// Dynamically import MapScene with no SSR to prevent hydration errors
const MapScene = dynamic(
  () => import("@/components/MapScene").then((mod) => mod.MapScene),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function Home() {
  const searchParams = useSearchParams();
  const [focus, setFocus] = useState<FocusState | null>(null);
  const [isDayMode, setIsDayMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [hasThreeJsError, setHasThreeJsError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for simulate-error parameter using useMemo to avoid hydration issues
  const shouldSimulateError = useMemo(() => {
    return searchParams.get("simulate-error") === "true";
  }, [searchParams]);

  // Detect mobile/small screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.innerHeight < 600);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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

  // Show fallback if error, simulating error, or mobile device
  if (hasThreeJsError || shouldSimulateError || isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
        }}
      >
        <BackgroundLayer isDayMode={isDayMode} />
        <Header
          isDayMode={isDayMode}
          setIsDayMode={setIsDayMode}
          selectedProject={selectedProject}
          onHomeClick={handleHomeClick}
          isFallbackMode={true}
          isMobile={isMobile}
        />
        <FallbackView
          isDayMode={isDayMode}
          onProjectClick={handleProjectClick}
          isMobile={isMobile}
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
      <BackgroundLayer isDayMode={isDayMode} />
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
      <WelcomeTooltip isDayMode={isDayMode} />
    </div>
  );
}
