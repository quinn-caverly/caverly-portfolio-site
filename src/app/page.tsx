"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { FocusState } from "@/types";
import Hero from "@/components/Hero";

// Dynamically import MapScene with no SSR to prevent hydration errors
const MapScene = dynamic(
  () => import("@/components/MapScene").then((mod) => mod.MapScene),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function Home() {
  const [focus, setFocus] = useState<FocusState | null>(null);
  const [isDayMode, setIsDayMode] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: isDayMode ? "#87CEEB" : "#0a0a1a",
      }}
    >
      <Header isDayMode={isDayMode} setIsDayMode={setIsDayMode} />
      <MapScene focus={focus} setFocus={setFocus} isDayMode={isDayMode} />
    </div>
  );
}
