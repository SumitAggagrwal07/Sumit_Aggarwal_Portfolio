export const selectedWork = [
  {
    id: "ratelimiter",
    title: "RateLimiter — Distributed API Rate-Limiting Engine",
    category: "Backend Systems & High-Throughput Infrastructure",
    bullets: [
      "Engineered an enterprise-grade API rate-limiting middleware capable of mitigating volumetric traffic spikes and abusive consumers.",
      "Implemented sliding-window counter and token-bucket algorithms with granular client fingerprinting (IP, API keys, and authenticated JWT claims).",
      "Emits RFC-compliant 429 headers (X-RateLimit-Limit, Remaining, Reset).",
      "Integrates cleanly as plug-and-play Express middleware to protect upstream microservices from cascading failures."
    ],
    tags: ["React", "Node.js", "Express.js", "REST APIs", "Tailwind CSS"],
    githubUrl: "https://github.com/SumitAggagrwal07/RateLimiter",
    liveUrl: "TODO",
    featured: true
  },
  {
    id: "roomiematch",
    title: "RoomieMatch — Compatibility-Based Roommate Finder",
    category: "Full-Stack Realtime Platform",
    bullets: [
      "Engineered a full-stack roommate-matching platform that scores compatibility across 9 lifestyle factors (cleanliness, sleep schedule, budget, habits) using a custom weighted vector-similarity algorithm.",
      "Designed a Tinder-style swipe interface with instant mutual-match detection and real-time chat via Socket.io, including live presence and typing indicators.",
      "Secured the platform with JWT-based authentication (access + refresh tokens), OTP email verification, and bcrypt password hashing.",
      "Designed MongoDB schemas for user profiles, preferences, and match history to support efficient querying as the user base scales."
    ],
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT"],
    githubUrl: "https://github.com/SumitAggagrwal07/RoomieMatch",
    liveUrl: "TODO",
    featured: true
  }
];
