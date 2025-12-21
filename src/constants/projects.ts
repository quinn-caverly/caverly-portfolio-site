export interface ProjectData {
  name: string;
  title: string;
  description: string;
  techStack: string[];
  emoji: string;
  image?: string;
  team: "blue" | "red";
  githubUrl?: string;
  liveUrl?: string;
  youtubeVideos?: string[];
  youtubeStats?: string;
  analyticsImage?: string;
  repoCount?: number;
  previewImage?: string;
  flowchartImages?: string[];
  screenshotImages?: string[];
}

export const PROJECTS: Record<string, ProjectData> = {
  BlueCapital: {
    name: "BlueCapital",
    title: "Mods for YouTube",
    description:
      "Created custom Minecraft mods in Java for YouTube videos averaging 30,000+ views. Applied OOP and design patterns to build custom entities, gameplay mechanics, and data systems.",
    techStack: ["Java", "Object-Oriented Design"],
    emoji: "🎮",
    image: "/images/knavishmantis/minecraft-mods.png",
    team: "blue",
    githubUrl: "https://github.com/orgs/knavishmantis/repositories",
    liveUrl: "https://www.youtube.com/@knavishmantis/shorts",
    youtubeVideos: [
      "https://www.youtube.com/embed/jvI3U4HGJtY",
      "https://www.youtube.com/embed/leN2eQIzvkA",
    ],
    youtubeStats: "250K+ Monthly Views",
    analyticsImage: "/images/knavishmantis/knavishmantis-analytics.png",
    repoCount: 10,
  },
  BlueLakeOutpost: {
    name: "BlueLakeOutpost",
    title: "F1 Telemetry Viz",
    description:
      "End-to-end automated F1 visualization pipeline. Takes driver names, track name, and year as input, fetches telemetry data from FastF1 API, constructs 3D track layouts, renders cinematically animated qualifying sessions in Blender, and automatically publishes the final videos to YouTube via GitHub Actions.",
    techStack: ["Python", "Blender", "FastF1 API", "GitHub Actions"],
    emoji: "🏎️",
    image: "/images/formula-viz/preview.png",
    team: "blue",
    githubUrl: "https://github.com/quinn-caverly/f1-telemetry-visualization",
    liveUrl: "https://f1dataviz.com",
    youtubeVideos: [
      "https://www.youtube.com/embed/example1",
      "https://www.youtube.com/embed/example2",
    ],
    previewImage: "/images/formula-viz/fullwebsite-preview.png",
  },
  BluePlainsOutpost: {
    name: "BluePlainsOutpost",
    title: "Learn Rust Site",
    description:
      "Interactive web application for learning Rust programming. Features hands-on coding exercises, real-time feedback, and a progression system to guide learners from basics to advanced concepts.",
    techStack: ["React", "TypeScript", "Rust WASM"],
    emoji: "🦀",
    team: "blue",
    githubUrl: "https://github.com/quinn-caverly/learn-rust",
    liveUrl: "https://learnrust.dev",
    previewImage: "/images/learn-rust-web-app/learn-rust-web-app.png",
  },
  RedCapital: {
    name: "RedCapital",
    title: "iOS App",
    description:
      "Native iOS quiz application built with Swift and SwiftUI. Features include timed challenges, score tracking, category selection, and smooth animations for an engaging user experience.",
    techStack: ["Swift", "SwiftUI", "Core Data"],
    emoji: "📱",
    image: "/images/software-jobs-ios/screenshot-1.png",
    team: "red",
    githubUrl: "https://github.com/quinn-caverly/swiftquiz",
    liveUrl: "https://apps.apple.com/swiftquiz",
    screenshotImages: [
      "/images/software-jobs-ios/screenshot-1.png",
      "/images/software-jobs-ios/screenshot-2.png",
    ],
  },
  RedFarmOutpost: {
    name: "RedFarmOutpost",
    title: "Scheduler Backend",
    description:
      "High-performance task scheduler written in C. Implements priority queues, efficient memory management, and multi-threading for concurrent task execution. Designed for embedded systems and resource-constrained environments.",
    techStack: ["C", "Multi-threading", "Data Structures"],
    emoji: "⚙️",
    image: "/images/c-scheduler/C-programming-language.png",
    team: "red",
    githubUrl: "https://github.com/quinn-caverly/scheduler",
    flowchartImages: ["/images/c-scheduler/C-scheduler-flow-1.png"],
  },
  RedEdgeOutpost: {
    name: "RedEdgeOutpost",
    title: "This Portfolio Site",
    description:
      "This portfolio site you're viewing! Built in Minecraft and converted to a 3D model, design inspired by turn based strategy games. Features an interactive 3D map, glassmorphism UI, animated backgrounds, and responsive design. Includes fallback for corporate firewalls.",
    techStack: ["React", "Three.js", "Next.js", "TypeScript"],
    emoji: "🌐",
    image: "/images/this-site/build-screenshot.png",
    team: "red",
    githubUrl: "https://github.com/quinn-caverly/portfolio",
    liveUrl: "https://quinncaverly.com",
    youtubeVideos: ["https://www.youtube.com/embed/build-timelapse"],
  },
  AboutMe: {
    name: "AboutMe",
    title: "About Me",
    description:
      "Software Engineer / DevOps Engineer specializing in cloud-native infrastructure, CI/CD automation, and full-stack development. Building scalable platforms at Allegis Group.",
    techStack: [
      "Kubernetes",
      "Terraform",
      "Python",
      "GitHub Actions",
      "Docker",
      "GCP",
      "AWS",
      "React",
      "TypeScript",
      "Java",
      "Swift",
      "C",
      "Bash",
    ],
    emoji: "😎",
    team: "blue",
  },
};

export const PROJECT_LIST = Object.values(PROJECTS);

// Camera animation constants
export const CAMERA_CONSTANTS = {
  DEFAULT_POSITION: [7, 3.3, 0] as [number, number, number],
  DEFAULT_TARGET: [0, 0, 0] as [number, number, number],
  DETAIL_VIEW_OFFSET: 2.5,
  DETAIL_VIEW_HEIGHT: 1.5,
  DETAIL_VIEW_INTERPOLATION: 0.7,
  ABOUT_ME_INTERPOLATION: 0.5,
  HOVER_ZOOM_LERP_SPEED: 0.12,
  FOCUS_LERP_SPEED: 0.08,
  DETAIL_LERP_SPEED: 0.04,
  RESET_ANIMATION_DELAY: 400,
} as const;

// Animation constants
export const ANIMATION_CONSTANTS = {
  BACKGROUND_TRANSITION_DURATION: "0.6s",
  CARD_HOVER_TRANSFORM: "translateY(-4px)",
  BUTTON_SCALE_HOVER: "scale(1.1)",
  BUTTON_SCALE_NORMAL: "scale(1)",
} as const;

// Style constants
export const GLASSMORPHISM_STYLES = {
  light: {
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },
  dark: {
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    backgroundColor: "rgba(15, 15, 26, 0.95)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
} as const;
