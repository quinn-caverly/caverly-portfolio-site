"use client";

import { Card } from "antd";
import { useState } from "react";

interface FallbackViewProps {
  isDayMode: boolean;
  onProjectClick: (projectName: string) => void;
}

const projects = [
  {
    name: "BlueCapital",
    title: "Mods for YouTube",
    description: "Custom Minecraft mods in Java for YouTube videos",
    techStack: "Java",
    emoji: "🎮",
    image: "/images/knavishmantis/knavishmantis-icon.png",
    team: "blue",
  },
  {
    name: "RedCapital",
    title: "iOS App",
    description: "Native iOS application built with Swift",
    techStack: "Swift",
    emoji: "📱",
    image: "/images/swiftquiz/swiftquiz-icon.png",
    team: "red",
  },
  {
    name: "BluePlainsOutpost",
    title: "Learn Rust Site",
    description: "Interactive learning platform for Rust programming",
    techStack: "React",
    emoji: "🦀",
    team: "blue",
  },
  {
    name: "BlueLakeOutpost",
    title: "F1 Telemetry Viz",
    description: "Formula 1 telemetry visualization pipeline",
    techStack: "Python",
    emoji: "🏎️",
    image: "/images/f1dataviz/f1dataviz-icon.png",
    team: "blue",
  },
  {
    name: "RedFarmOutpost",
    title: "Scheduler Backend",
    description: "High-performance task scheduler in C",
    techStack: "C",
    emoji: "⚙️",
    image: "/images/scheduler/scheduler-logo.png",
    team: "red",
  },
  {
    name: "RedEdgeOutpost",
    title: "This Portfolio Site",
    description: "Interactive 3D portfolio with React & Three.js",
    techStack: "React",
    emoji: "🌐",
    image: "/images/portfolio/portfolio-preview.png",
    team: "red",
  },
  {
    name: "AboutMe",
    title: "About Me",
    description: "Learn more about Quinn Caverly",
    techStack: "",
    emoji: "😎",
    team: "blue",
  },
];

export function FallbackView({ isDayMode, onProjectClick }: FallbackViewProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflowY: "auto",
        paddingTop: "120px",
        paddingBottom: "40px",
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Warning Message */}
        <div
          style={{
            marginBottom: "32px",
            padding: "24px",
            borderRadius: "16px",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            backgroundColor: isDayMode
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(15, 15, 26, 0.95)",
            border: isDayMode
              ? "1px solid rgba(255, 255, 255, 0.5)"
              : "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: isDayMode
              ? "0 10px 30px -5px rgba(0, 0, 0, 0.1)"
              : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2
            style={{
              margin: "0 0 16px 0",
              fontSize: "24px",
              fontWeight: "bold",
              color: isDayMode ? "#111827" : "#f9fafb",
            }}
          >
            🚧 Oops! Content Blocked by Firewall
          </h2>
          <p
            style={{
              margin: "0 0 16px 0",
              fontSize: "16px",
              lineHeight: "1.6",
              color: isDayMode ? "#4b5563" : "#d1d5db",
            }}
          >
            It looks like your network is blocking the 3D interactive scene.
            This is what it normally looks like:
          </p>

          {/* Screenshot */}
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "16px",
              border: isDayMode
                ? "1px solid rgba(0, 0, 0, 0.1)"
                : "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <img
              src="/images/what-normally-looks-like.png"
              alt="Normal 3D portfolio view"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: "1.6",
              color: isDayMode ? "#4b5563" : "#d1d5db",
            }}
          >
            But don't worry! You can still view all my projects below:
          </p>
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {projects.map((project) => (
            <Card
              key={project.name}
              hoverable
              onClick={() => onProjectClick(project.name)}
              onMouseEnter={() => setHoveredCard(project.name)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                borderRadius: "16px",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                backgroundColor: isDayMode
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(15, 15, 26, 0.95)",
                border: isDayMode
                  ? "1px solid rgba(255, 255, 255, 0.5)"
                  : "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow:
                  hoveredCard === project.name
                    ? isDayMode
                      ? "0 20px 40px -10px rgba(0, 0, 0, 0.2)"
                      : "0 20px 40px -10px rgba(0, 0, 0, 0.5)"
                    : isDayMode
                      ? "0 10px 30px -5px rgba(0, 0, 0, 0.1)"
                      : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s ease",
                transform:
                  hoveredCard === project.name ? "translateY(-4px)" : "none",
              }}
              styles={{ body: { padding: "24px" } }}
            >
              {/* Image or Emoji */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "16px",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      maxWidth: "80px",
                      maxHeight: "80px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div style={{ fontSize: "48px" }}>{project.emoji}</div>
                )}
              </div>

              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: isDayMode ? "#111827" : "#f9fafb",
                  textAlign: "center",
                }}
              >
                {project.title}
              </h3>
              {project.techStack && (
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#667eea",
                  }}
                >
                  {project.techStack}
                </div>
              )}
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: isDayMode ? "#4b5563" : "#d1d5db",
                  textAlign: "center",
                }}
              >
                {project.description}
              </p>
              <div
                style={{
                  marginTop: "16px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1890ff",
                }}
              >
                Click to view details →
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
