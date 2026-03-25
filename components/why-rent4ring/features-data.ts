export const FEATURES = [
  {
    id: "brakes",
    gradient: "from-amber-950/90 to-primary",
    image: "/endlesspads.jpeg",
  },
  {
    id: "suspension",
    gradient: "from-sky-950/80 to-primary",
    image: "/ohlins.jpeg",
  },
  {
    id: "tires",
    gradient: "from-stone-800 to-primary",
    image: "/yokohama.jpg",
  },
  {
    id: "safety",
    gradient: "from-stone-900 to-primary",
    image: "/alpine_interior.jpeg",
  },
] as const;

export type Feature = (typeof FEATURES)[number];
