// TUIO Object Recognition Configuration
// Supports BOTH InteractiveScape hardware (tag IDs 22-27) AND TUIO Simulator (tag IDs 1-5) simultaneously
// Configuration is loaded at runtime from public/config.json (editable post-build)

import { getConfig } from './loadConfig';

function buildConfig() {
  const cfg = getConfig();

  // Defaults — used if config.json not loaded or missing fields
  const defaults = {
    triggerTagIds: [1, 22],
    smartMobilityTagIds: [2, 23],
    petrolTagIds: [3, 24],
    coffeeTagIds: [4, 25],
    shoppingTagIds: [5, 26],
    healthcareTagIds: [6, 27],
    tagMap: {
      1: 'trigger', 2: 'smart-mobility', 3: 'petrol', 4: 'coffee', 5: 'shopping', 6: 'healthcare',
      22: 'trigger', 23: 'smart-mobility', 24: 'petrol', 25: 'coffee', 26: 'shopping', 27: 'healthcare',
    },
  };

  return {
    TRIGGER_TAG_IDS: cfg.triggerTagIds || defaults.triggerTagIds,
    SMART_MOBILITY_TAG_IDS: cfg.smartMobilityTagIds || defaults.smartMobilityTagIds,
    PETROL_TAG_IDS: cfg.petrolTagIds || defaults.petrolTagIds,
    COFFEE_TAG_IDS: cfg.coffeeTagIds || defaults.coffeeTagIds,
    SHOPPING_TAG_IDS: cfg.shoppingTagIds || defaults.shoppingTagIds,
    HEALTHCARE_TAG_IDS: cfg.healthcareTagIds || defaults.healthcareTagIds,
    TAG_MAP: cfg.tagMap || defaults.tagMap,
    UDP_PORT: cfg.tuioUdpPort || 3333,

    // Legacy single-ID accessors (first ID in each array) for backward compatibility
    TRIGGER_TAG_ID: (cfg.triggerTagIds || defaults.triggerTagIds)[0],
    SMART_MOBILITY_TAG_ID: (cfg.smartMobilityTagIds || defaults.smartMobilityTagIds)[0],
  };
}

// Re-export as a getter so it always reads fresh config
export const TUIO_CONFIG = new Proxy({}, {
  get(_, prop) {
    return buildConfig()[prop];
  }
});
