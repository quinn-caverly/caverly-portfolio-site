import { useEffect } from "react";

interface ProjectPanelProps {
  projectName: string | null;
  onClose: () => void;
}

const projectData: Record<
  string,
  {
    title: string;
    description: string;
    emoji: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    team: "blue" | "red";
  }
> = {
  BlueCapital: {
    title: "Capital Project",
    description:
      "A comprehensive full-stack application featuring real-time collaboration and advanced data visualization. Built with modern web technologies.",
    emoji: "🏛️",
    techStack: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    githubUrl: "https://github.com/yourusername/capital",
    liveUrl: "https://capital-demo.com",
    team: "blue",
  },
  BlueLakeOutpost: {
    title: "Lake Outpost",
    description:
      "Environmental monitoring system with IoT integration. Tracks water quality and ecosystem health in real-time.",
    emoji: "🌊",
    techStack: ["Python", "IoT", "TensorFlow", "Docker"],
    githubUrl: "https://github.com/yourusername/lake",
    team: "blue",
  },
  BlueMountainOutpost: {
    title: "Mountain Outpost",
    description:
      "Weather prediction and analysis platform using machine learning to forecast mountain conditions.",
    emoji: "⛰️",
    techStack: ["Python", "Scikit-learn", "FastAPI", "Redis"],
    team: "blue",
  },
  BlueNorthOutpost: {
    title: "North Outpost",
    description:
      "Arctic research data aggregation and visualization tool for climate scientists.",
    emoji: "🧊",
    techStack: ["Vue.js", "D3.js", "Express", "MongoDB"],
    team: "blue",
  },
  BluePlainsOutpost: {
    title: "Plains Outpost",
    description:
      "Agricultural management system with crop monitoring and yield prediction capabilities.",
    emoji: "🌾",
    techStack: ["React Native", "Firebase", "TensorFlow Lite"],
    team: "blue",
  },
  RedCapital: {
    title: "Red Capital",
    description:
      "E-commerce platform with AI-powered recommendations and seamless checkout experience.",
    emoji: "🏰",
    techStack: ["Next.js", "Stripe", "Prisma", "Vercel"],
    githubUrl: "https://github.com/yourusername/red-capital",
    liveUrl: "https://red-capital-demo.com",
    team: "red",
  },
  RedEdgeOutpost: {
    title: "Edge Outpost",
    description:
      "Edge computing framework for distributed data processing and real-time analytics.",
    emoji: "⚡",
    techStack: ["Rust", "WebAssembly", "Kubernetes"],
    team: "red",
  },
  RedFarmOutpost: {
    title: "Farm Outpost",
    description:
      "Smart farming solution with automated irrigation and pest detection systems.",
    emoji: "🚜",
    techStack: ["Flutter", "TensorFlow", "MQTT", "InfluxDB"],
    team: "red",
  },
  RedMountainOutpost: {
    title: "Red Mountain",
    description:
      "Geological survey and mineral exploration tool with 3D terrain visualization.",
    emoji: "🗻",
    techStack: ["Three.js", "WebGL", "Node.js", "PostgreSQL"],
    team: "red",
  },
  RedNorthOutpost: {
    title: "Red North",
    description:
      "Cold chain logistics platform ensuring temperature control throughout supply chain.",
    emoji: "❄️",
    techStack: ["Angular", "GraphQL", "NestJS", "Redis"],
    team: "red",
  },
};

export function ProjectPanel({ projectName, onClose }: ProjectPanelProps) {
  const isOpen = projectName !== null;
  const project = projectName ? projectData[projectName] : null;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen || !project) return null;

  const accentColor = project.team === "blue" ? "#4a90e2" : "#e24a4a";
  const gradientStart = project.team === "blue" ? "#1e3a8a" : "#991b1b";
  const gradientEnd = project.team === "blue" ? "#3b82f6" : "#dc2626";

  return (
    <>
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

      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(450px, 100vw)",
          background: "#1a1a1a",
          boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          overflowY: "auto",
          animation: "slideIn 0.3s ease",
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
            background: "rgba(0, 0, 0, 0.6)",
            border: "none",
            color: "#ffffff",
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
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ×
        </button>

        <div
          style={{
            width: "100%",
            height: "250px",
            background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: "120px" }}>{project.emoji}</div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100px",
              background: `linear-gradient(to top, #1a1a1a, transparent)`,
            }}
          />
        </div>

        <div style={{ padding: "24px", flex: 1 }}>
          <h2
            style={{
              margin: "0 0 16px 0",
              fontSize: "28px",
              fontWeight: "700",
              color: "#ffffff",
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
              color: "#cccccc",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {project.description}
          </p>

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
                    color: "#ffffff",
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

          {(project.githubUrl || project.liveUrl) && (
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
                    background: "rgba(255, 255, 255, 0.1)",
                    border: `1px solid ${accentColor}`,
                    borderRadius: "8px",
                    color: "#ffffff",
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
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)";
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
                    color: "#ffffff",
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
        `}
      </style>
    </>
  );
}
