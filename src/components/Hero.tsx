"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  // Function to convert HSL to RGB, then to hex
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  // State to track the hue value (0-360 degrees on color wheel)
  const [hue, setHue] = useState(0);

  // Effect to continuously update the hue value
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 360);
    }, 100); // Adjust speed by changing the interval time

    return () => clearInterval(interval);
  }, []);

  // Calculate current color from hue - increased lightness for a lighter palette
  const currentColor = hslToHex(hue, 85, 75); // 85% saturation, 75% lightness (lighter)

  return (
    <div className="relative bg-[var(--f1-dark)] text-white">
      {/* Grid background with axes */}
      <div className="absolute inset-0 bg-[var(--f1-dark)]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
                 linear-gradient(to right, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(200, 200, 200, 0.1) 1px, transparent 1px)
               `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-24 md:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
            <div className="relative w-1/2 mb-8 group">
              {/* Circular solid color background that cycles through lighter rainbow colors */}
              <div
                className="absolute inset-0 rounded-full z-0 scale-110 transition-colors duration-300"
                style={{
                  backgroundColor: currentColor,
                }}
              />
              {/* Transparent logo */}
              <Image
                src="/images/formula-viz-icon-transparent.png"
                alt="Formula Viz Logo"
                width={300}
                height={300}
                className="w-full h-auto relative z-10"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center lg:text-left">
              F1 Qualifying
              <span className="text-[var(--fviz-cyan)]"> Visualizations</span>
            </h1>
          </div>
          <div className="lg:w-3/4 mt-8 lg:mt-0">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/video-snap.png"
                alt="Formula 1 qualifying visualization sample"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
