import { useEffect, useState } from "react";
import { Card } from "antd";
import * as THREE from "three";

interface MarkerData {
  name: string;
  position: THREE.Vector3;
  team: "blue" | "red";
}

interface ScreenMarker extends MarkerData {
  screenX: number;
  screenY: number;
  isVisible: boolean;
}

interface MarkerOverlaysProps {
  markers: MarkerData[];
  onMarkerClick: (name: string) => void;
  camera: THREE.Camera;
  canvasSize: { width: number; height: number };
  onHoverZoom?: (position: THREE.Vector3 | null) => void;
  selectedProject?: string | null;
  isResetting?: boolean;
  isDayMode: boolean;
}

const projectInfo: Record<
  string,
  {
    emoji: string;
    description: string;
    title: string;
    longDescription: string;
    image?: string;
  }
> = {
  BlueCapital: {
    title: "Mods for YouTube",
    emoji: "🎮",
    description: "Mods for YouTube (Java)",
    longDescription:
      "Created custom Minecraft mods in Java for YouTube videos averaging 20,000+ views. Features custom entities, gameplay mechanics, and data systems.",
    image: "/images/knavishmantis/minecraft-mods.png",
  },
  BlueLakeOutpost: {
    title: "Formula Viz",
    emoji: "🏎️",
    description: "F1 Telemetry Viz (Python)",
    longDescription:
      "End-to-end automated F1 visualization pipeline. Takes driver names, track name, and year as input, fetches telemetry data from FastF1 API, constructs 3D track layouts, renders cinematically animated qualifying sessions in Blender, and automatically publishes the final videos to YouTube via GitHub Actions.",
    image: "/images/formula-viz/preview.png",
  },
  BluePlainsOutpost: {
    title: "Learn Rust Web App",
    emoji: "🦀",
    description: "Learn Rust Site (React)",
    longDescription:
      "Built a React-based educational web application for teaching Rust programming concepts. Deployed using automated GitHub Actions workflows. Selected as an exemplary reference project for future students in the course.",
    image: "/images/learn-rust-web-app/rust-icon.png",
  },
  BlueMountainOutpost: {
    title: "Mountain Outpost",
    emoji: "⛰️",
    description: "Weather prediction ML",
    longDescription:
      "Weather prediction and analysis platform using machine learning to forecast mountain conditions and climate patterns.",
  },
  BlueNorthOutpost: {
    title: "North Outpost",
    emoji: "🧊",
    description: "Climate data visualization",
    longDescription:
      "Arctic research data aggregation and visualization tool for climate scientists studying environmental changes.",
  },
  RedCapital: {
    title: "Software Job Insights",
    emoji: "📱",
    description: "iOS App (Swift)",
    longDescription:
      "iOS app written using Swift that shows software job insights using a map of the United States, comparing salaries by company, salary adjusted to cost of living, and more.",
    image: "/images/software-jobs-ios/screenshot-1.png",
  },
  RedEdgeOutpost: {
    title: "This Portfolio Site",
    emoji: "🗺️",
    description: "This Portfolio Site (React)",
    longDescription:
      "Built this interactive 3D portfolio world by constructing it block-by-block in Minecraft, exporting the geometry via Blender, and rendering it in the browser using Three.js and React. Features real-time 3D navigation, dynamic lighting, and interactive markers.",
    image: "/images/this-site/build-screenshot.png",
  },
  RedFarmOutpost: {
    title: "Scheduler Backend",
    emoji: "⚙️",
    description: "Scheduler Backend (C)",
    longDescription:
      "Developed a high-performance scheduling backend in C using linear programming techniques. Implemented memory-efficient data structures and added CI pipelines via GitHub Actions to automate builds, compilation checks, and testing.",
    image: "/images/c-scheduler/C-programming-language.png",
  },
  RedMountainOutpost: {
    title: "Red Mountain",
    emoji: "🗻",
    description: "Geological survey tool",
    longDescription:
      "Geological survey and mineral exploration tool with 3D terrain visualization and data analysis capabilities.",
  },
  RedNorthOutpost: {
    title: "Red North",
    emoji: "❄️",
    description: "Cold chain logistics",
    longDescription:
      "Cold chain logistics platform ensuring temperature control throughout supply chain with real-time monitoring.",
  },
  AboutMe: {
    title: "About Me",
    emoji: "😎",
    description: "Software Engineer / DevOps Engineer",
    longDescription:
      "Software Engineer / DevOps Engineer specializing in cloud-native infrastructure, CI/CD automation, and full-stack development. Building scalable platforms at Allegis Group.",
  },
};

export function MarkerOverlays({
  markers,
  onMarkerClick,
  camera,
  canvasSize,
  onHoverZoom,
  selectedProject,
  isResetting,
  isDayMode,
}: MarkerOverlaysProps) {
  const [screenMarkers, setScreenMarkers] = useState<ScreenMarker[]>([]);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const [showCards, setShowCards] = useState(true);

  // Clear hover state when selectedProject changes
  useEffect(() => {
    setHoveredMarker(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

  // Handle card visibility during reset
  useEffect(() => {
    if (isResetting) {
      setShowCards(false);
    } else if (!selectedProject) {
      // Show cards immediately when reset completes
      setShowCards(true);
    }
  }, [isResetting, selectedProject]);

  useEffect(() => {
    if (markers.length === 0 || !camera || canvasSize.width === 0) {
      return;
    }

    let animationFrameId: number;

    const updatePositions = () => {
      const updated = markers.map((marker) => {
        const pos = marker.position.clone();
        pos.project(camera);

        const screenX = ((pos.x + 1) / 2) * canvasSize.width;
        const screenY = (-(pos.y - 1) / 2) * canvasSize.height;

        const isVisible = pos.z < 1 && pos.z > -1;

        return {
          ...marker,
          screenX,
          screenY,
          isVisible,
        };
      });

      setScreenMarkers(updated);
      animationFrameId = requestAnimationFrame(updatePositions);
    };

    updatePositions();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [markers, camera, canvasSize]);

  const handleMouseEnter = (marker: MarkerData) => {
    setHoveredMarker(marker.name);
    if (onHoverZoom) {
      onHoverZoom(marker.position);
    }
  };

  const handleMouseLeave = () => {
    setHoveredMarker(null);
    if (onHoverZoom) {
      onHoverZoom(null);
    }
  };

  // Reset hover state if a project is selected
  const effectiveHoveredMarker = selectedProject ? null : hoveredMarker;

  return (
    <div className="fixed inset-0 pointer-events-none z-[2000]">
      {selectedProject || !showCards
        ? null
        : screenMarkers.map((marker) => {
            if (!marker.isVisible) return null;

            const info = projectInfo[marker.name];
            const isHovered = effectiveHoveredMarker === marker.name;
            const shouldHide = effectiveHoveredMarker !== null && !isHovered;

            const isRedTeam = marker.team === "red";

            return (
              <div
                key={marker.name}
                onClick={() => onMarkerClick(marker.name)}
                className="absolute pointer-events-auto cursor-pointer origin-bottom"
                style={{
                  left: `${marker.screenX}px`,
                  top: `${marker.screenY - 20}px`,
                  transform: shouldHide
                    ? "translate(-50%, -100%) scale(0)"
                    : "translate(-50%, -100%) scale(1)",
                  opacity: shouldHide ? 0 : isHovered ? 1 : 0.95,
                  visibility: shouldHide ? "hidden" : "visible",
                  animation: showCards ? "scaleUp 0.2s ease-out" : "none",
                }}
                onMouseEnter={() => handleMouseEnter(marker)}
                onMouseLeave={handleMouseLeave}
              >
                <Card
                  hoverable
                  className="rounded-lg overflow-hidden"
                  style={{
                    width: isHovered ? 320 : 200,
                    height: isHovered ? "auto" : "75px",
                    transition:
                      "width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                    boxShadow: isHovered
                      ? isDayMode
                        ? "0 8px 24px rgba(0, 0, 0, 0.15)"
                        : "0 8px 24px rgba(0, 0, 0, 0.3)"
                      : isDayMode
                        ? "0 4px 12px rgba(0, 0, 0, 0.08)"
                        : "0 4px 12px rgba(0, 0, 0, 0.15)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    backgroundColor: isDayMode
                      ? "rgba(255, 255, 255, 0.95)"
                      : "rgba(15, 15, 26, 0.95)",
                    border: isDayMode
                      ? "1px solid rgba(255, 255, 255, 0.5)"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    transform: isHovered ? "translateY(-4px)" : "none",
                  }}
                  styles={{ body: { padding: 0 } }}
                >
                  {isHovered ? (
                    // Expanded view on hover
                    <div
                      style={{
                        animation: "fadeIn 0.3s ease",
                      }}
                    >
                      {marker.name !== "AboutMe" && (
                        <div
                          className="w-full h-40 flex items-center justify-center relative overflow-hidden"
                          style={{
                            background: info.image
                              ? marker.name === "RedFarmOutpost"
                                ? "#d6e9f8"
                                : "#000000"
                              : isDayMode
                                ? "linear-gradient(to bottom right, #dbeafe, #c7d2fe)"
                                : "linear-gradient(to bottom right, #1e3a8a, #3730a3)",
                          }}
                        >
                          {info.image ? (
                            <img
                              src={info.image}
                              alt={info.title}
                              style={{
                                width:
                                  marker.name === "RedFarmOutpost"
                                    ? "70%"
                                    : "100%",
                                height:
                                  marker.name === "RedFarmOutpost"
                                    ? "70%"
                                    : "100%",
                                objectFit:
                                  marker.name === "RedFarmOutpost"
                                    ? "contain"
                                    : "cover",
                                transform:
                                  marker.name === "RedCapital"
                                    ? "scale(1.2)"
                                    : "none",
                              }}
                            />
                          ) : (
                            <div className="text-6xl">{info.emoji}</div>
                          )}
                        </div>
                      )}
                      <div className="p-4">
                        <div
                          className="text-base font-normal leading-relaxed mb-3"
                          style={{ color: isDayMode ? "#4b5563" : "#d1d5db" }}
                        >
                          {info.longDescription}
                        </div>
                        <div
                          className="text-base font-bold text-center p-2 rounded"
                          style={{
                            color: "#1890ff",
                            backgroundColor: isDayMode ? "#f0f7ff" : "#1e293b",
                          }}
                        >
                          Click for More →
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        height: "75px",
                        animation: "fadeIn 0.3s ease",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "4px 8px",
                        gap: "10px",
                      }}
                    >
                      {/* Image or Emoji on Left */}
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: info.image
                            ? "transparent"
                            : isDayMode
                              ? "linear-gradient(to bottom right, #dbeafe, #c7d2fe)"
                              : "linear-gradient(to bottom right, #1e3a8a, #3730a3)",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        {info.image ? (
                          <img
                            src={info.image}
                            alt={info.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div style={{ fontSize: "28px" }}>
                            {marker.name === "AboutMe" ? "😎" : info.emoji}
                          </div>
                        )}
                      </div>

                      {/* Text Content - Vertical Centered */}
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          gap: "4px",
                          minWidth: 0,
                        }}
                      >
                        {/* Title */}
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: isDayMode ? "#111827" : "#f9fafb",
                            lineHeight: "1.3",
                            textAlign: "left",
                          }}
                        >
                          {marker.name === "AboutMe"
                            ? "About Me"
                            : marker.name === "BlueCapital"
                              ? "Mods for YouTube"
                              : marker.name === "RedCapital"
                                ? "iOS App"
                                : marker.name === "BluePlainsOutpost"
                                  ? "Learn Rust Site"
                                  : marker.name === "BlueLakeOutpost"
                                    ? "F1 Telemetry Viz"
                                    : marker.name === "RedFarmOutpost"
                                      ? "Scheduler Backend"
                                      : marker.name === "RedEdgeOutpost"
                                        ? "This Portfolio"
                                        : info.title}
                        </div>

                        {/* Tech Stack Badge */}
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: isRedTeam ? "#e24a4a" : "#667eea",
                            textAlign: "left",
                          }}
                        >
                          {marker.name === "BlueCapital"
                            ? "Java"
                            : marker.name === "RedCapital"
                              ? "Swift"
                              : marker.name === "BluePlainsOutpost"
                                ? "React"
                                : marker.name === "BlueLakeOutpost"
                                  ? "Python"
                                  : marker.name === "RedFarmOutpost"
                                    ? "C"
                                    : marker.name === "RedEdgeOutpost"
                                      ? "React"
                                      : ""}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
    </div>
  );
}

// Add keyframe animations
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes scaleUp {
      from {
        transform: translate(-50%, -100%) scale(0);
        opacity: 0;
      }
      to {
        transform: translate(-50%, -100%) scale(1);
        opacity: 1;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}
