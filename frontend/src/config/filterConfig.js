// Config-driven filter fields per category.
// Each field just needs a `key` (matches a product property) and a `label`.
// Price + Rating are handled separately since every category has them.
export const filterFieldsConfig = {
  processor: [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Generation" },
  ],
  graphicscard: [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Memory" },
  ],
  laptop: [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Configuration" },
  ],
  motherboard: [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Socket" },
  ],
  ram: [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Capacity" },
  ],
  ssd: [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Capacity" },
  ],
  monitors: [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Screen Size" },
  ],
  keyboard: [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Color" },
  ],
  "gaming-accessories": [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Type" },
  ],
  networking: [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Type" },
  ],
  "smart-devices": [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Type" },
  ],
  hardware: [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Type" },
  ],
  // Fallback used for any category not explicitly listed above.
  default: [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Type" },
  ],
};

export function getFilterFields(category) {
  return filterFieldsConfig[category] || filterFieldsConfig.default;
}