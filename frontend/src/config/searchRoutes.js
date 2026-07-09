export const searchRoutes = {
  keyboard: "/keyboard",
  processor: "/processor",
  "graphics card": "/graphicscard",
  "graphics cards": "/graphicscard",
  graphicscard: "/graphicscard",
  laptop: "/laptop",
  laptops: "/laptop",
  motherboard: "/motherboard",
  motherboards: "/motherboard",
  ram: "/ram",
  "ram memory": "/ram",
  ssd: "/ssd",
  "ssd storage": "/ssd",
  monitor: "/monitors",
  monitors: "/monitors",
  hardware: "/hardware",
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