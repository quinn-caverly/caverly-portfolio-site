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
}

const projectInfo: Record<
  string,
  { emoji: string; description: string; title: string; longDescription: string }
> = {
  BlueCapital: {
    title: "Capital Project",
    emoji: "🏛️",
    description: "Full-stack web app",
    longDescription:
      "A comprehensive full-stack application featuring real-time collaboration and advanced data visualization. Built with modern web technologies.",
  },
  BlueLakeOutpost: {
    title: "Lake Outpost",
    emoji: "🌊",
    description: "IoT monitoring system",
    longDescription:
      "Environmental monitoring system with IoT integration. Tracks water quality and ecosystem health in real-time.",
  },
  BluePlainsOutpost: {
    title: "Plains Outpost",
    emoji: "🌾",
    description: "Agricultural management",
    longDescription:
      "Agricultural management system with crop monitoring and yield prediction capabilities using machine learning.",
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
    title: "Red Capital",
    emoji: "🏰",
    description: "E-commerce platform",
    longDescription:
      "E-commerce platform with AI-powered recommendations and seamless checkout experience for modern retail.",
  },
  RedEdgeOutpost: {
    title: "Edge Outpost",
    emoji: "⚡",
    description: "Edge computing framework",
    longDescription:
      "Edge computing framework for distributed data processing and real-time analytics at the network edge.",
  },
  RedFarmOutpost: {
    title: "Farm Outpost",
    emoji: "🚜",
    description: "Smart farming solution",
    longDescription:
      "Smart farming solution with automated irrigation and pest detection systems using computer vision.",
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
};

export function MarkerOverlays({
  markers,
  onMarkerClick,
  camera,
  canvasSize,
  onHoverZoom,
}: MarkerOverlaysProps) {
  const [screenMarkers, setScreenMarkers] = useState<ScreenMarker[]>([]);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

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

  return (
    <div className="fixed inset-0 pointer-events-none z-[2000]">
      {screenMarkers.map((marker) => {
        if (!marker.isVisible) return null;

        const info = projectInfo[marker.name];
        const isHovered = hoveredMarker === marker.name;
        const shouldHide = hoveredMarker !== null && !isHovered;

        return (
          <div
            key={marker.name}
            onClick={() => onMarkerClick(marker.name)}
            className="absolute pointer-events-auto cursor-pointer transition-all duration-300 origin-bottom"
            style={{
              left: `${marker.screenX}px`,
              top: `${marker.screenY - 40}px`,
              transform: shouldHide
                ? "translate(-50%, -100%) scale(0)"
                : "translate(-50%, -100%) scale(1)",
              opacity: shouldHide ? 0 : isHovered ? 1 : 0.95,
              visibility: shouldHide ? "hidden" : "visible",
            }}
            onMouseEnter={() => handleMouseEnter(marker)}
            onMouseLeave={handleMouseLeave}
          >
            <Card
              hoverable
              className="rounded-lg overflow-hidden transition-all duration-300"
              style={{
                width: isHovered ? 320 : 220,
                boxShadow: isHovered
                  ? "0 8px 24px rgba(0, 0, 0, 0.3)"
                  : "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
              styles={{ body: { padding: 0 } }}
            >
              {isHovered ? (
                // Expanded view on hover
                <div>
                  <div className="w-full h-40 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <div className="text-6xl">{info.emoji}</div>
                  </div>
                  <div className="p-4">
                    <div className="text-base font-normal text-gray-600 leading-relaxed mb-3">
                      {info.longDescription}
                    </div>
                    <div className="text-base text-[#1890ff] font-bold text-center p-2 bg-[#f0f7ff] rounded">
                      Click for More →
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center shrink-0">
                    <div className="text-4xl">{info.emoji}</div>
                  </div>
                  <div className="flex-1 px-3 py-2">
                    <div className="text-base font-normal text-gray-600 leading-snug">
                      {info.description}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Small dot at exact 3D position */}
            <div
              className="absolute left-1/2 w-1.5 h-1.5 rounded-full bg-[#1890ff] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(24,144,255,0.6)]"
              style={{ top: "calc(100% + 40px)" }}
            />
          </div>
        );
      })}
    </div>
  );
}
