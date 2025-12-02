import { useState } from "react";

interface HeaderProps {
  isDayMode: boolean;
  setIsDayMode: (value: boolean) => void;
}

export function Header({ isDayMode, setIsDayMode }: HeaderProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isNameHovered, setIsNameHovered] = useState(false);

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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] transition-colors duration-300"
      style={{
        backgroundColor: isDayMode ? "#ffffff" : "#0f0f0f",
        borderBottom: isDayMode ? "2px solid #e5e7eb" : "2px solid #333333",
        boxShadow: isDayMode
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Grid background overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDayMode
              ? `linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)`
              : `linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-full mx-auto px-8 py-5 flex items-center justify-between relative z-10">
        {/* Left: Name (emoji appears on hover) */}
        <div
          className="flex items-center gap-3 pl-4 cursor-pointer"
          style={{ height: "32px" }}
          onMouseEnter={() => setIsNameHovered(true)}
          onMouseLeave={() => setIsNameHovered(false)}
        >
          <h1
            className="m-0 font-bold tracking-wide whitespace-nowrap transition-all duration-300"
            style={{
              color: isDayMode ? "#111827" : "#f9fafb",
              fontSize: isNameHovered ? "1.75rem" : "1.5rem",
            }}
          >
            Quinn Caverly
          </h1>
          <span
            className="text-2xl transition-all duration-300"
            style={{
              opacity: isNameHovered ? 1 : 0,
              maxWidth: isNameHovered ? "40px" : "0px",
              overflow: "hidden",
            }}
          >
            😎
          </span>
        </div>

        {/* Center: Social Icons */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "800px", height: "30px" }}
        >
          {socialLinks.map((link, index) => {
            const isHovered = hoveredLink === link.id;
            const spacing = [0, 240, 500, 700]; // Fixed positions for each icon with text space
            return (
              <div
                key={link.id}
                className="absolute"
                style={{
                  left: `${spacing[index]}px`,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 hover:scale-110 hover:opacity-100 flex items-center gap-2 whitespace-nowrap"
                  style={{
                    color: isDayMode ? "#6b7280" : "#9ca3af",
                    opacity: 0.85,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isDayMode
                      ? "#111827"
                      : "#f9fafb";
                    e.currentTarget.style.opacity = "1";
                    setHoveredLink(link.id);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDayMode
                      ? "#6b7280"
                      : "#9ca3af";
                    e.currentTarget.style.opacity = "0.85";
                    setHoveredLink(null);
                  }}
                  aria-label={link.label}
                  title={link.label}
                >
                  <span className="shrink-0">{link.icon}</span>
                  <span
                    className="text-sm font-medium transition-all duration-200"
                    style={{
                      opacity: isHovered ? 1 : 0,
                    }}
                  >
                    {link.text}
                  </span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Right: Toggle Checkbox */}
        <div className="flex items-center gap-3 pr-4">
          <span
            className="text-sm font-medium transition-colors duration-300"
            style={{ color: isDayMode ? "#6b7280" : "#9ca3af" }}
          >
            {isDayMode ? "Light" : "Dark"}
          </span>
          <label className="relative inline-block w-12 h-7 cursor-pointer">
            <input
              type="checkbox"
              checked={isDayMode}
              onChange={(e) => setIsDayMode(e.target.checked)}
              className="sr-only peer"
            />
            <div
              className="w-full h-full rounded-full transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-amber-400 peer-checked:to-orange-500"
              style={{
                background: isDayMode
                  ? undefined
                  : "linear-gradient(135deg, #667eea, #764ba2)",
                boxShadow: isDayMode
                  ? "0 2px 8px rgba(251, 146, 60, 0.4)"
                  : "0 2px 8px rgba(102, 126, 234, 0.4)",
              }}
            />
            <div
              className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-md"
              style={{
                transform: isDayMode ? "translateX(20px)" : "translateX(0)",
              }}
            />
          </label>
        </div>
      </div>
    </header>
  );
}
