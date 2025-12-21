import { useEffect } from "react";
import { PROJECTS } from "@/constants/projects";

interface ProjectPanelProps {
  projectName: string | null;
  onClose: () => void;
  isDayMode: boolean;
  isFallbackMode?: boolean;
}

export function ProjectPanel({
  projectName,
  onClose,
  isDayMode,
  isFallbackMode = false,
}: ProjectPanelProps) {
  const isOpen = projectName !== null;
  const project = projectName ? PROJECTS[projectName] : null;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen || !project) return null;

  const isAboutMe = projectName === "AboutMe";
  const accentColor = project.team === "blue" ? "#4a90e2" : "#e24a4a";
  const gradientStart = project.team === "blue" ? "#1e3a8a" : "#991b1b";
  const gradientEnd = project.team === "blue" ? "#3b82f6" : "#dc2626";

  return (
    <>
      {!isAboutMe && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(1px)",
            zIndex: 999,
            animation: "fadeIn 0.3s ease",
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          ...(isFallbackMode
            ? {
                top: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "calc(100% - 48px)",
                maxWidth: "800px",
                maxHeight: "calc(100vh - 48px)",
              }
            : isAboutMe
              ? {
                  bottom: "24px",
                  left: "24px",
                  right: "24px",
                  height: "calc(40vh - 24px)",
                  maxHeight: "600px",
                }
              : {
                  top: "24px",
                  ...(project.team === "blue"
                    ? { left: "24px" }
                    : { right: "24px" }),
                  bottom: "24px",
                  width: "calc(40% - 48px)",
                }),
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: isDayMode
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(15, 15, 26, 0.95)",
          border: isDayMode
            ? "1px solid rgba(255, 255, 255, 0.5)"
            : "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          boxShadow: isDayMode
            ? "0 10px 40px rgba(0, 0, 0, 0.15)"
            : "0 10px 40px rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          overflowY: "auto",
          animation: isFallbackMode
            ? "fadeIn 0.3s ease"
            : isAboutMe
              ? "slideInBottom 0.3s ease"
              : project.team === "blue"
                ? "slideInLeft 0.3s ease"
                : "slideIn 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: isDayMode ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.6)",
            border: "none",
            color: isDayMode ? "#000000" : "#ffffff",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = accentColor;
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isDayMode
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(0, 0, 0, 0.6)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ×
        </button>

        <div style={{ padding: isAboutMe ? "32px 24px" : "24px", flex: 1 }}>
          <h2
            style={{
              margin: "0 0 16px 0",
              fontSize: "28px",
              fontWeight: "700",
              color: isDayMode ? "#000000" : "#ffffff",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {project.title}
          </h2>

          <p
            style={{
              margin: "0 0 24px 0",
              fontSize: "15px",
              lineHeight: "1.6",
              color: isDayMode ? "#4b5563" : "#cccccc",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {project.description}
          </p>

          {/* YouTube Videos Section */}
          {project.youtubeVideos && project.youtubeVideos.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: isDayMode ? "#6b7280" : "#999999",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {projectName === "RedEdgeOutpost"
                  ? "Build Timelapse"
                  : projectName === "BlueLakeOutpost"
                    ? "Example Renders"
                    : "Featured Videos"}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection:
                    projectName === "BlueCapital" ? "row" : "column",
                  gap: "16px",
                  justifyContent:
                    projectName === "BlueCapital"
                      ? "space-between"
                      : "flex-start",
                }}
              >
                {project.youtubeVideos.map((videoUrl, index) => (
                  <div
                    key={index}
                    style={{
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#000",
                      flex: projectName === "BlueCapital" ? "1" : "none",
                    }}
                  >
                    <iframe
                      width="100%"
                      height={projectName === "BlueCapital" ? "400" : "315"}
                      src={videoUrl}
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{
                        border: "none",
                        display: "block",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YouTube Stats with Analytics Image */}
          {project.youtubeStats && (
            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: isDayMode ? "#6b7280" : "#999999",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Channel Performance
              </h3>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "16px",
                  background: `linear-gradient(135deg, ${gradientStart}40, ${gradientEnd}40)`,
                  borderRadius: "8px",
                  border: `1px solid ${accentColor}40`,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${gradientStart}60, ${gradientEnd}60)`;
                  e.currentTarget.style.borderColor = `${accentColor}60`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${gradientStart}40, ${gradientEnd}40)`;
                  e.currentTarget.style.borderColor = `${accentColor}40`;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: isDayMode ? "#000000" : "#ffffff",
                    marginBottom: "4px",
                  }}
                >
                  {project.youtubeStats}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: isDayMode ? "#6b7280" : "#999999",
                    marginBottom: project.analyticsImage ? "12px" : "0",
                  }}
                >
                  YouTube Analytics • Click to visit channel
                </div>
                {project.analyticsImage && (
                  <img
                    src={project.analyticsImage}
                    alt="YouTube Analytics"
                    style={{
                      width: "100%",
                      borderRadius: "4px",
                      marginTop: "8px",
                    }}
                  />
                )}
              </a>
            </div>
          )}

          {/* Preview Image */}
          {project.previewImage && (
            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: isDayMode ? "#6b7280" : "#999999",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {projectName === "BlueLakeOutpost"
                  ? "Website Preview"
                  : projectName === "BluePlainsOutpost"
                    ? "Live Site Preview"
                    : "Preview"}
              </h3>
              {projectName === "BlueLakeOutpost" && (
                <p
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    color: isDayMode ? "#4b5563" : "#cccccc",
                  }}
                >
                  Visit formula-viz.com to explore the full showcase of F1
                  qualifying visualizations, view the complete video gallery,
                  and learn more about the rendering pipeline.
                </p>
              )}
              {projectName === "BluePlainsOutpost" && (
                <p
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    color: isDayMode ? "#4b5563" : "#cccccc",
                  }}
                >
                  Click the preview below to visit the live site.
                </p>
              )}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  if (img) {
                    (img as HTMLElement).style.transform = "scale(1.02)";
                    (img as HTMLElement).style.boxShadow =
                      `0 8px 24px ${accentColor}60`;
                  }
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  if (img) {
                    (img as HTMLElement).style.transform = "scale(1)";
                    (img as HTMLElement).style.boxShadow = "none";
                  }
                }}
              >
                <img
                  src={project.previewImage}
                  alt={`${project.title} preview`}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.2s ease",
                  }}
                />
              </a>
            </div>
          )}

          {/* Flowchart Images */}
          {project.flowchartImages && project.flowchartImages.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: isDayMode ? "#6b7280" : "#999999",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Architecture Diagrams
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {project.flowchartImages.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`${project.title} flowchart ${index + 1}`}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.2s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Screenshot Gallery (2 columns for phone screenshots) */}
          {project.screenshotImages && project.screenshotImages.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: isDayMode ? "#6b7280" : "#999999",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Screenshots
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                }}
              >
                {project.screenshotImages.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`${project.title} screenshot ${index + 1}`}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.2s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* GitHub Repository Card */}
          {project.githubUrl &&
            !project.repoCount &&
            projectName === "BluePlainsOutpost" && (
              <div style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#999999",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Repository
                </h3>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    padding: "16px",
                    background: isDayMode
                      ? "rgba(0, 0, 0, 0.03)"
                      : "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    border: isDayMode
                      ? "1px solid rgba(0, 0, 0, 0.1)"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    marginBottom: "12px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDayMode
                      ? "rgba(0, 0, 0, 0.05)"
                      : "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.borderColor = isDayMode
                      ? "rgba(0, 0, 0, 0.2)"
                      : "rgba(255, 255, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDayMode
                      ? "rgba(0, 0, 0, 0.03)"
                      : "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.borderColor = isDayMode
                      ? "rgba(0, 0, 0, 0.1)"
                      : "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: isDayMode ? "#000000" : "#ffffff" }}
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: isDayMode ? "#000000" : "#ffffff",
                        }}
                      >
                        quinn-caverly/202c-internet-guide
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: isDayMode ? "#6b7280" : "#999999",
                        }}
                      >
                        View source code on GitHub
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            )}

          {/* GitHub Organization */}
          {project.repoCount && (
            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: isDayMode ? "#6b7280" : "#999999",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                GitHub Organization
              </h3>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "16px",
                  background: isDayMode
                    ? "rgba(0, 0, 0, 0.03)"
                    : "rgba(255, 255, 255, 0.05)",
                  borderRadius: "8px",
                  border: isDayMode
                    ? "1px solid rgba(0, 0, 0, 0.1)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDayMode
                    ? "rgba(0, 0, 0, 0.05)"
                    : "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.borderColor = isDayMode
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isDayMode
                    ? "rgba(0, 0, 0, 0.03)"
                    : "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = isDayMode
                    ? "rgba(0, 0, 0, 0.1)"
                    : "rgba(255, 255, 255, 0.1)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ color: isDayMode ? "#000000" : "#ffffff" }}
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: isDayMode ? "#000000" : "#ffffff",
                      }}
                    >
                      knavishmantis
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: isDayMode ? "#6b7280" : "#999999",
                      }}
                    >
                      {project.repoCount} Public Repositories • Source Code
                    </div>
                  </div>
                </div>
              </a>
            </div>
          )}

          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "14px",
                fontWeight: "600",
                color: isDayMode ? "#6b7280" : "#999999",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Tech Stack
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: `linear-gradient(135deg, ${gradientStart}80, ${gradientEnd}80)`,
                    color: isDayMode ? "#ffffff" : "#ffffff",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: "500",
                    border: `1px solid ${accentColor}40`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {(project.githubUrl || project.liveUrl) &&
            projectName !== "BlueCapital" &&
            projectName !== "BluePlainsOutpost" &&
            projectName !== "AboutMe" &&
            projectName !== "BlueLakeOutpost" && (
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "auto",
                  paddingTop: "24px",
                }}
              >
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      padding: "12px 24px",
                      background: isDayMode
                        ? "rgba(0, 0, 0, 0.05)"
                        : "rgba(255, 255, 255, 0.1)",
                      border: `1px solid ${accentColor}`,
                      borderRadius: "8px",
                      color: isDayMode ? "#000000" : "#ffffff",
                      textDecoration: "none",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = accentColor;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isDayMode
                        ? "rgba(0, 0, 0, 0.05)"
                        : "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    GitHub →
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      padding: "12px 24px",
                      background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                      border: "none",
                      borderRadius: "8px",
                      color: isDayMode ? "#ffffff" : "#ffffff",
                      textDecoration: "none",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = `0 4px 12px ${accentColor}80`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes slideInLeft {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes slideInBottom {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
}
