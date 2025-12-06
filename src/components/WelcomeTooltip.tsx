"use client";

import { useState, useEffect } from "react";

interface WelcomeTooltipProps {
  isDayMode: boolean;
}

export function WelcomeTooltip({ isDayMode }: WelcomeTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show tooltip after a short delay when component mounts
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Auto-hide after 6 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: `translate(-50%, ${isVisible ? "0" : "100px"})`,
        opacity: isVisible ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        zIndex: 2000,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: isDayMode
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(15, 15, 26, 0.95)",
          border: isDayMode
            ? "1px solid rgba(255, 255, 255, 0.5)"
            : "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          padding: "16px 24px",
          boxShadow: isDayMode
            ? "0 12px 32px rgba(0, 0, 0, 0.15)"
            : "0 12px 32px rgba(0, 0, 0, 0.4)",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          maxWidth: "400px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            fontSize: "24px",
            flexShrink: 0,
          }}
        >
          🗺️
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: "600",
              color: isDayMode ? "#111827" : "#f9fafb",
              lineHeight: "1.5",
            }}
          >
            Pan, rotate, and zoom to explore the 3D world!
          </p>
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: "13px",
              color: isDayMode ? "#6b7280" : "#9ca3af",
              lineHeight: "1.4",
            }}
          >
            Click on project markers for details
          </p>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          style={{
            background: "transparent",
            border: "none",
            color: isDayMode ? "#6b7280" : "#9ca3af",
            cursor: "pointer",
            fontSize: "20px",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            transition: "all 0.2s ease",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDayMode
              ? "rgba(0, 0, 0, 0.05)"
              : "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
