/**
 * Image Cache Utility - Preload and cache images for better performance
 */

const imageCache = new Map();
const preloadQueue = [];
let isPreloading = false;

/**
 * Preload an image and cache it
 * @param {string} src - Image source URL
 * @returns {Promise<Image>}
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    // Return cached image if available
    if (imageCache.has(src)) {
      resolve(imageCache.get(src));
      return;
    }

    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;
  });
};

/**
 * Get cached image or preload it
 * @param {string} src - Image source URL
 * @returns {Image|null}
 */
export const getCachedImage = (src) => {
  return imageCache.get(src) || null;
};

/**
 * Batch preload multiple images
 * @param {string[]} sources - Array of image source URLs
 * @returns {Promise<void>}
 */
export const preloadImages = async (sources) => {
  const promises = sources.map(src => preloadImage(src).catch(err => {
    console.warn(`Image preload failed: ${src}`, err);
  }));
  await Promise.all(promises);
};

/**
 * Clear image cache
 */
export const clearImageCache = () => {
  imageCache.clear();
};

/**
 * Get cache size
 * @returns {number}
 */
export const getCacheSize = () => {
  return imageCache.size;
};

export default {
  preloadImage,
  getCachedImage,
  preloadImages,
  clearImageCache,
  getCacheSize,
};
