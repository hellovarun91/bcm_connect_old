// TUIO Object Recognition Configuration
// Hardware: InteractiveScape Scape X (Touch & Object Assistant v6.1.5)

export const TUIO_CONFIG = {
  // Tag that triggers /place-device → /consent navigation
  // InteractiveScape Scape X hardware tag ID
  TRIGGER_TAG_ID: 22,

  // Tag for SmartMobilityDetail rotation control
  // InteractiveScape Scape X hardware tag ID
  SMART_MOBILITY_TAG_ID: 23,

  // All recognized hardware tag IDs
  TAG_MAP: {
    22: 'trigger',
    23: 'gallery',
    24: 'calculator',
  },

  // UDP port for TUIO messages (server-side only, for reference)
  UDP_PORT: 3333,
};
