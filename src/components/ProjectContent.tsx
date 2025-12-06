import { ReactNode } from "react";
import { PROJECTS } from "@/constants/projects";

interface ProjectContentProps {
  projectName: string;
  isDayMode: boolean;
  onClose: () => void;
  children?: ReactNode;
  layoutMode?: "left" | "right" | "center";
}

export function ProjectContent({
  projectName,
  isDayMode,
  onClose,
  layoutMode = "center",
}: ProjectContentProps) {
  const project = PROJECTS[projectName];

  if (!project) return null;

  const isAboutMe = projectName === "AboutMe";

  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        color: isDayMode ? "#1f2937" : "#e5e7eb",
      }}
    >
      {/* Close Button */}
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
          fontSize: "24px",
          fontWeight: "300",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        ×
      </button>

      {/* Content */}
      <div style={{ padding: "24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>
            {project.emoji}
          </div>
          <h1
            style={{
              margin: "0 0 8px 0",
              fontSize: "28px",
              fontWeight: "bold",
              color: isDayMode ? "#111827" : "#f9fafb",
            }}
          >
            {project.title}
          </h1>
          {project.techStack.length > 0 && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "600",
                    backgroundColor: isDayMode
                      ? "rgba(102, 126, 234, 0.1)"
                      : "rgba(167, 139, 250, 0.2)",
                    color: "#667eea",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "24px",
            color: isDayMode ? "#4b5563" : "#d1d5db",
          }}
        >
          {project.description}
        </p>

        {/* Links */}
        {(project.githubUrl || project.liveUrl) && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  backgroundColor: isDayMode ? "#ffffff" : "#1f2937",
                  border: isDayMode ? "1px solid #e5e7eb" : "1px solid #374151",
                  color: isDayMode ? "#111827" : "#f9fafb",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
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
                  padding: "10px 20px",
                  borderRadius: "8px",
                  backgroundColor: "#667eea",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
              >
                View Live →
              </a>
            )}
          </div>
        )}

        {/* YouTube Videos */}
        {project.youtubeVideos && project.youtubeVideos.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: isDayMode ? "#111827" : "#f9fafb",
              }}
            >
              Featured Videos
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: projectName === "BlueCapital" ? "row" : "column",
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

        {/* Analytics Image */}
        {project.analyticsImage && (
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: isDayMode ? "#111827" : "#f9fafb",
              }}
            >
              Analytics
            </h3>
            <img
              src={project.analyticsImage}
              alt="Analytics"
              style={{
                width: "100%",
                borderRadius: "8px",
                border: isDayMode ? "1px solid #e5e7eb" : "1px solid #374151",
              }}
            />
          </div>
        )}

        {/* Preview/Screenshots */}
        {(project.previewImage ||
          project.screenshotImages ||
          project.flowchartImages) && (
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: isDayMode ? "#111827" : "#f9fafb",
              }}
            >
              Preview
            </h3>
            {project.previewImage && (
              <img
                src={project.previewImage}
                alt="Preview"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  border: isDayMode ? "1px solid #e5e7eb" : "1px solid #374151",
                }}
              />
            )}
            {project.screenshotImages?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Screenshot ${idx + 1}`}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  border: isDayMode ? "1px solid #e5e7eb" : "1px solid #374151",
                }}
              />
            ))}
            {project.flowchartImages?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Diagram ${idx + 1}`}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  border: isDayMode ? "1px solid #e5e7eb" : "1px solid #374151",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
