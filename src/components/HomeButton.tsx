"use client";

import { useState, useEffect } from "react";
import * as THREE from "three";

interface HomeButtonProps {
  camera: THREE.Camera | null;
  canvasSize: { width: number; height: number };
  onHomeClick: () => void;
  isDayMode: boolean;
  selectedProject: string | null;
}

const HOME_POSITION = new THREE.Vector3(7, 3.3, 0);
const DISTANCE_THRESHOLD = 2; // Show button if camera is more than 2 units away

export function HomeButton({
  camera,
  canvasSize,
  onHomeClick,
  isDayMode,
  selectedProject,
}: HomeButtonProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!camera) {
      return;
    }

    let animationFrameId: number;

    const checkDistance = () => {
      if (selectedProject) {
        setShowButton(false);
      } else {
        const currentPos = camera.position;
        const distance = currentPos.distanceTo(HOME_POSITION);
        setShowButton(distance > DISTANCE_THRESHOLD);
      }
      animationFrameId = requestAnimationFrame(checkDistance);
    };

    animationFrameId = requestAnimationFrame(checkDistance);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [camera, selectedProject]);

  if (!showButton || canvasSize.width === 0) {
    return null;
  }

  return (
    <button
      onClick={onHomeClick}
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: isDayMode
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(15, 15, 26, 0.95)",
        border: isDayMode
          ? "1px solid rgba(255, 255, 255, 0.5)"
          : "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isDayMode
          ? "0 8px 24px rgba(0, 0, 0, 0.15)"
          : "0 8px 24px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1001,
        transition: "all 0.3s ease",
        animation: "fadeIn 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = isDayMode
          ? "0 12px 32px rgba(0, 0, 0, 0.2)"
          : "0 12px 32px rgba(0, 0, 0, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = isDayMode
          ? "0 8px 24px rgba(0, 0, 0, 0.15)"
          : "0 8px 24px rgba(0, 0, 0, 0.3)";
      }}
      aria-label="Return to home view"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={isDayMode ? "#111827" : "#f9fafb"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    </button>
  );
}
