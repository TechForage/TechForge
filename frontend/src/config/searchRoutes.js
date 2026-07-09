export const searchRoutes = {
  keyboard: "/keyboard",
  processor: "/processor",
  "graphics card": "/graphics-card",
  laptop: "/laptop",
  motherboard: "/motherboard",
  ram: "/ram",
  ssd: "/ssd",
  monitor: "/monitor",
  "gaming accessories": "/gaming-accessories",
  networking: "/networking",
  "smart devices": "/smart-devices",
  watchlist: "/watchlist",
};


export const resolveSearchRoute = (rawQuery) => {
  if (!rawQuery || typeof rawQuery !== "string") return null;

  const normalizedQuery = rawQuery.trim().toLowerCase();
  if (normalizedQuery.length === 0) return null;

  return searchRoutes[normalizedQuery] || null;
};