// Video preloader service to eliminate black screens during transitions
class VideoPreloader {
  constructor() {
    this.preloadedVideos = new Map();
    this.loadingPromises = new Map();
  }

  // Preload a single video
  preloadVideo(videoSrc) {
    if (this.preloadedVideos.has(videoSrc)) {
      return Promise.resolve(this.preloadedVideos.get(videoSrc));
    }

    if (this.loadingPromises.has(videoSrc)) {
      return this.loadingPromises.get(videoSrc);
    }

    const promise = new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      
      const onCanPlayThrough = () => {
        video.removeEventListener('canplaythrough', onCanPlayThrough);
        video.removeEventListener('error', onError);
        this.preloadedVideos.set(videoSrc, video);
        this.loadingPromises.delete(videoSrc);
        resolve(video);
      };

      const onError = (error) => {
        video.removeEventListener('canplaythrough', onCanPlayThrough);
        video.removeEventListener('error', onError);
        this.loadingPromises.delete(videoSrc);
        reject(error);
      };

      video.addEventListener('canplaythrough', onCanPlayThrough);
      video.addEventListener('error', onError);
      video.src = videoSrc;
    });

    this.loadingPromises.set(videoSrc, promise);
    return promise;
  }

  // Preload multiple videos
  preloadVideos(videoSources) {
    return Promise.all(videoSources.map(src => this.preloadVideo(src)));
  }

  // Get preloaded video element
  getPreloadedVideo(videoSrc) {
    return this.preloadedVideos.get(videoSrc);
  }

  // Check if video is preloaded
  isVideoPreloaded(videoSrc) {
    return this.preloadedVideos.has(videoSrc);
  }

  // Clear preloaded videos to free memory
  clearPreloadedVideos() {
    this.preloadedVideos.clear();
    this.loadingPromises.clear();
  }

  // Preload next page video based on current route
  preloadNextVideo(currentRoute) {
    // Import video files dynamically
    const videoMap = {
      '/healthcare': () => import('../Videos/map-6.mp4'), // Healthcare -> Summary
    };

    const videoImporter = videoMap[currentRoute];
    if (videoImporter) {
      videoImporter().then(module => {
        this.preloadVideo(module.default).catch(console.warn);
      }).catch(console.warn);
    }
  }
}

// Create singleton instance
export const videoPreloader = new VideoPreloader();

// Preload all videos on app start - background task
export const preloadAllVideos = async () => {
  try {
    // Import all video files
    const [fullMapVideo, mapVideo6] = await Promise.all([
      import('../Videos/FULL -3D map.mp4'),
      import('../Videos/map-6.mp4')
    ]);

    const allVideos = [
      fullMapVideo.default,
      mapVideo6.default
    ];
    
    // Preload all videos in background
    console.log('🎬 Starting background video preloading...');
    await videoPreloader.preloadVideos(allVideos);
    console.log('✅ All videos preloaded successfully!');
    
    return true;
  } catch (error) {
    console.warn('⚠️ Some videos failed to preload:', error);
    return false;
  }
};
