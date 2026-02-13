// Runtime config loader — fetches public/config.json (editable post-build)
let _config = null;

export async function loadConfig() {
  try {
    const resp = await fetch('/config.json');
    _config = await resp.json();
    console.log('[Config] Loaded runtime config:', _config);
  } catch (err) {
    console.warn('[Config] Failed to load config.json, using defaults:', err.message);
    _config = {};
  }
  return _config;
}

export function getConfig() {
  return _config || {};
}
