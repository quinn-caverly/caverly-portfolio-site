"use client";

import { Card } from "antd";
import { useState } from "react";
import Image from "next/image";
import { PROJECT_LIST, GLASSMORPHISM_STYLES } from "@/constants/projects";

interface FallbackViewProps {
  isDayMode: boolean;
  onProjectClick: (projectName: string) => void;
  isMobile?: boolean;
}

export function FallbackView({
  isDayMode,
  onProjectClick,
  isMobile = false,
}: FallbackViewProps) {
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
            ...(isDayMode
              ? GLASSMORPHISM_STYLES.light
              : GLASSMORPHISM_STYLES.dark),
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
            {isMobile
              ? "📱 Mobile View"
              : "🚧 Oops! Content Blocked by Firewall"}
          </h2>
          <p
            style={{
              margin: "0 0 16px 0",
              fontSize: "16px",
              lineHeight: "1.6",
              color: isDayMode ? "#4b5563" : "#d1d5db",
            }}
          >
            {isMobile
              ? "This website is optimized for desktop viewing. Here's what it looks like on larger screens:"
              : "It looks like your network is blocking the 3D interactive scene. This is what it normally looks like:"}
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
            <Image
              src="/images/what-normally-looks-like.png?v=2"
              alt="Normal 3D portfolio view"
              width={1200}
              height={675}
              priority
              unoptimized
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
            But don&apos;t worry! You can still view all my projects below:
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
          {PROJECT_LIST.map((project) => (
            <Card
              key={project.name}
              hoverable
              onClick={() => onProjectClick(project.name)}
              onMouseEnter={() => setHoveredCard(project.name)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                borderRadius: "16px",
                ...(isDayMode
                  ? GLASSMORPHISM_STYLES.light
                  : GLASSMORPHISM_STYLES.dark),
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
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={80}
                    height={80}
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
              {project.techStack.length > 0 && (
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#667eea",
                  }}
                >
                  {project.techStack.join(", ")}
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
