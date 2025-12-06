import { useState, useEffect } from "react";

interface HeaderProps {
  isDayMode: boolean;
  setIsDayMode: (value: boolean) => void;
  selectedProject?: string | null;
  onHomeClick?: () => void;
  isFallbackMode?: boolean;
  isMobile?: boolean;
}

export function Header({
  isDayMode,
  setIsDayMode,
  selectedProject,
  onHomeClick,
  isFallbackMode = false,
  isMobile = false,
}: HeaderProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    {
      id: "github",
      href: "https://github.com/quinn-caverly",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      label: "GitHub",
      text: "github.com/quinn-caverly",
    },
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/quinn-caverly/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: "LinkedIn",
      text: "linkedin.com/in/quinn-caverly",
    },
    {
      id: "email",
      href: "mailto:quinncaverly@gmail.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      label: "Email",
      text: "quinncaverly@gmail.com",
    },
    {
      id: "phone",
      href: "tel:+14438350810",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
        </svg>
      ),
      label: "Phone",
      text: "(443) 835-0810",
    },
  ];

  // Determine if project is on left (blue team) or right (red team)
  const isProjectOnLeft = selectedProject?.startsWith("Blue");
  const isProjectOnRight = selectedProject?.startsWith("Red");
  const isAboutMe = selectedProject === "AboutMe";

  // Hide header in fallback mode when a project is selected
  if (isFallbackMode && selectedProject) {
    return null;
  }

  return (
    <header
      className="fixed top-6 z-[1000] transition-all duration-500 ease-out"
      style={{
        left: isAboutMe
          ? "50%"
          : selectedProject
            ? isProjectOnLeft
              ? "calc(40% + 24px)"
              : "24px"
            : "50%",
        transform: isAboutMe
          ? `translateX(-50%) ${scrolled ? "translateY(-2px)" : "translateY(0)"}`
          : selectedProject
            ? scrolled
              ? "translateY(-2px)"
              : "translateY(0)"
            : `translateX(-50%) ${scrolled ? "translateY(-2px)" : "translateY(0)"}`,
        width: isAboutMe
          ? "calc(100% - 48px)"
          : selectedProject
            ? "calc(60% - 48px)"
            : "calc(100% - 48px)",
        maxWidth: isAboutMe ? "1400px" : selectedProject ? "none" : "1400px",
      }}
    >
      <div
        className="relative"
        style={{
          borderRadius: "24px",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: isDayMode
            ? "rgba(255, 255, 255, 0.75)"
            : "rgba(15, 15, 26, 0.75)",
          border: isDayMode
            ? "1px solid rgba(255, 255, 255, 0.5)"
            : "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: scrolled
            ? isDayMode
              ? "0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)"
              : "0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)"
            : isDayMode
              ? "0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03)"
              : "0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.03)",
          transition:
            "background-color 0.3s ease, border 0.3s ease, box-shadow 0.5s ease",
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-300"
          style={{
            background: isDayMode
              ? "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)"
              : "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        />

        {/* Noise texture for glass effect */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        />

        <div
          className="relative px-8 py-4 flex items-center justify-between"
          style={{ borderRadius: "24px" }}
        >
          {/* Left: Home icon and Name with gradient effect */}
          <div className="flex items-center gap-4">
            {/* Home icon - hide in fallback mode */}
            {!isFallbackMode && (
              <button
                onClick={onHomeClick}
                className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  backgroundColor: selectedProject
                    ? isDayMode
                      ? "rgba(102, 126, 234, 0.15)"
                      : "rgba(167, 139, 250, 0.2)"
                    : isDayMode
                      ? "rgba(102, 126, 234, 0.08)"
                      : "rgba(255, 255, 255, 0.05)",
                  border: "none",
                  cursor: "pointer",
                  color: selectedProject
                    ? isDayMode
                      ? "#667eea"
                      : "#a78bfa"
                    : isDayMode
                      ? "#667eea"
                      : "#6b7280",
                  opacity: selectedProject ? 1 : 0.6,
                }}
                aria-label="Home"
                title="Back to Home"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </button>
            )}

            <div
              className="flex items-center gap-3 cursor-pointer"
              style={{ height: "40px" }}
              onMouseEnter={() => setIsNameHovered(true)}
              onMouseLeave={() => setIsNameHovered(false)}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                {/* Day mode gradient */}
                <h1
                  className="m-0 font-bold tracking-wide whitespace-nowrap"
                  style={{
                    position: isDayMode ? "relative" : "absolute",
                    fontSize: isMobile
                      ? "1.125rem"
                      : isNameHovered
                        ? "1.75rem"
                        : "1.5rem",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    transition: "font-size 0.3s ease, opacity 0.3s ease",
                    opacity: isDayMode ? 1 : 0,
                    pointerEvents: isDayMode ? "auto" : "none",
                  }}
                >
                  Quinn Caverly
                </h1>
                {/* Night mode gradient */}
                <h1
                  className="m-0 font-bold tracking-wide whitespace-nowrap"
                  style={{
                    position: isDayMode ? "absolute" : "relative",
                    top: 0,
                    left: 0,
                    fontSize: isMobile
                      ? "1.125rem"
                      : isNameHovered
                        ? "1.75rem"
                        : "1.5rem",
                    background:
                      "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    transition: "font-size 0.3s ease, opacity 0.3s ease",
                    opacity: isDayMode ? 0 : 1,
                    pointerEvents: isDayMode ? "none" : "auto",
                  }}
                >
                  Quinn Caverly
                </h1>
              </div>
              <span
                className="text-2xl transition-all duration-300"
                style={{
                  opacity: isNameHovered ? 1 : 0,
                  transform: isNameHovered
                    ? "scale(1) rotate(0deg)"
                    : "scale(0.5) rotate(-20deg)",
                  maxWidth: isNameHovered ? "40px" : "0px",
                  overflow: "hidden",
                }}
              >
                😎
              </span>
            </div>
          </div>

          {/* Center: Social Icons with Dropdown */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              display: "flex",
              gap: isMobile ? "4px" : "8px",
              alignItems: "center",
            }}
          >
            {socialLinks.map((link) => {
              const isHovered = hoveredLink === link.id;
              return (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center transition-all duration-300"
                    style={{
                      width: isMobile ? "36px" : "44px",
                      height: isMobile ? "36px" : "44px",
                      borderRadius: "12px",
                      color: isHovered
                        ? isDayMode
                          ? "#667eea"
                          : "#a78bfa"
                        : isDayMode
                          ? "#374151"
                          : "#d1d5db",
                      backgroundColor: isHovered
                        ? isDayMode
                          ? "rgba(102, 126, 234, 0.1)"
                          : "rgba(167, 139, 250, 0.15)"
                        : "transparent",
                      transform: isHovered
                        ? "translateY(-2px) scale(1.05)"
                        : "translateY(0) scale(1)",
                    }}
                    aria-label={link.label}
                    title={link.label}
                  >
                    <span className="shrink-0">{link.icon}</span>
                  </a>

                  {/* Dropdown menu */}
                  <div
                    className="absolute transition-all duration-300 pointer-events-none"
                    style={{
                      top: "calc(100% + 8px)",
                      left: "50%",
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered
                        ? "translateX(-50%) translateY(0)"
                        : "translateX(-50%) translateY(-10px)",
                      visibility: isHovered ? "visible" : "hidden",
                      zIndex: 10000,
                    }}
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{
                        minWidth: "240px",
                        padding: "16px 20px",
                        borderRadius: "12px",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        backgroundColor: isDayMode
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(15, 15, 26, 0.95)",
                        border: isDayMode
                          ? "1px solid rgba(255, 255, 255, 0.5)"
                          : "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: isDayMode
                          ? "0 10px 30px -5px rgba(0, 0, 0, 0.2)"
                          : "0 10px 30px -5px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {/* Arrow */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-6px",
                          left: "50%",
                          width: "12px",
                          height: "12px",
                          backgroundColor: isDayMode
                            ? "rgba(255, 255, 255, 0.95)"
                            : "rgba(15, 15, 26, 0.95)",
                          borderTop: isDayMode
                            ? "1px solid rgba(255, 255, 255, 0.5)"
                            : "1px solid rgba(255, 255, 255, 0.1)",
                          borderLeft: isDayMode
                            ? "1px solid rgba(255, 255, 255, 0.5)"
                            : "1px solid rgba(255, 255, 255, 0.1)",
                          transform: "translateX(-50%) rotate(45deg)",
                        }}
                      />
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              color: isDayMode ? "#6b7280" : "#9ca3af",
                            }}
                          >
                            {link.icon}
                          </div>
                          <div
                            style={{
                              fontSize: "15px",
                              fontWeight: 600,
                              color: isDayMode ? "#111827" : "#f9fafb",
                            }}
                          >
                            {link.label}
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: isDayMode ? "#374151" : "#d1d5db",
                            wordBreak: "break-word",
                          }}
                        >
                          {link.text}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Enhanced Toggle */}
          <div className="flex items-center gap-3">
            <span
              className="text-sm font-medium"
              style={{
                color: isDayMode ? "#6b7280" : "#9ca3af",
                transition: "color 0.3s ease",
              }}
            >
              {isDayMode ? "Light" : "Dark"}
            </span>
            <label className="relative inline-block w-14 h-8 cursor-pointer group">
              <input
                type="checkbox"
                checked={isDayMode}
                onChange={(e) => setIsDayMode(e.target.checked)}
                className="sr-only peer"
              />
              <div
                className="w-full h-full rounded-full transition-all duration-500 relative overflow-hidden"
                style={{
                  background: isDayMode
                    ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  boxShadow: isDayMode
                    ? "0 4px 12px rgba(251, 191, 36, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)"
                    : "0 4px 12px rgba(102, 126, 234, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
                    transform: "translateX(-100%)",
                    animation: "shimmer 3s infinite",
                  }}
                />
              </div>
              <div
                className="absolute top-1 left-1 w-6 h-6 rounded-full transition-all duration-500 shadow-lg flex items-center justify-center"
                style={{
                  transform: isDayMode ? "translateX(24px)" : "translateX(0)",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <span className="text-xs">{isDayMode ? "☀️" : "🌙"}</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </header>
  );
}
