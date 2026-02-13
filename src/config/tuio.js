// TUIO Object Recognition Configuration
// Supports both InteractiveScape hardware (tag IDs 22+) and TUIO Simulator (tag IDs 1-5)

// Auto-detect mode: set to 'simulator' for TUIO Simulator (IDs 1-5),
// or 'hardware' for InteractiveScape Scape X (IDs 22+)
const TUIO_MODE = process.env.REACT_APP_TUIO_MODE || 'simulator';

const SIMULATOR_CONFIG = {
  TRIGGER_TAG_ID: 1,          // Tag 1 → PlaceDevicePage auto-navigate
  SMART_MOBILITY_TAG_ID: 2,   // Tag 2 → SmartMobility rotation control
  TAG_MAP: {
    1: 'trigger',
    2: 'smart-mobility',
    3: 'petrol',
    4: 'coffee',
    5: 'shopping',
  },
};

const HARDWARE_CONFIG = {
  TRIGGER_TAG_ID: 22,         // InteractiveScape tag 22
  SMART_MOBILITY_TAG_ID: 23,  // InteractiveScape tag 23
  TAG_MAP: {
    22: 'trigger',
    23: 'smart-mobility',
    24: 'petrol',
  },
};

const activeConfig = TUIO_MODE === 'hardware' ? HARDWARE_CONFIG : SIMULATOR_CONFIG;

export const TUIO_CONFIG = {
  ...activeConfig,
  MODE: TUIO_MODE,
  // UDP port for TUIO messages (server-side only, for reference)
  UDP_PORT: 3333,
};
