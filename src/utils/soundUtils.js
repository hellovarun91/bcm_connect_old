import buttonSound from '../data/audio/button-sounds.mp3';
import frameSound from '../data/audio/frame-sounds.mp3';

/**
 * Utility for playing button click sounds
 */

// Create single audio instances to be reused
const buttonAudio = new Audio(buttonSound);
const frameAudio = new Audio(frameSound);

// Sound coordination flags
let isButtonSoundPlaying = false;
let isFrameSoundPlaying = false;

// Sound queue for managing multiple sound requests
let soundQueue = [];

/**
 * Process the next sound in the queue if available
 */
const processNextSound = () => {
  if (soundQueue.length > 0 && !isButtonSoundPlaying && !isFrameSoundPlaying) {
    const nextSound = soundQueue.shift();
    if (nextSound.type === 'button') {
      playButtonSoundInternal(nextSound.callback, nextSound.duration, nextSound.delay);
    } else {
      playFrameSoundInternal(nextSound.callback, nextSound.duration, nextSound.delay);
    }
  }
};

/**
 * Internal function to play button sound
 */
const playButtonSoundInternal = (callback = null, duration = 1000, delay = 300) => {
  if (isFrameSoundPlaying) {
    // Queue the sound if frame sound is already playing
    soundQueue.push({ type: 'button', callback, duration, delay });
    return;
  }
  
  isButtonSoundPlaying = true;
  
  // Reset and play the sound
  buttonAudio.currentTime = 0;
  buttonAudio.play().catch(err => console.warn('Error playing button sound:', err));
  
  // Force stop after specified duration
  setTimeout(() => {
    buttonAudio.pause();
    buttonAudio.currentTime = 0;
    isButtonSoundPlaying = false;
    
    // Process next sound in queue
    processNextSound();
  }, duration);
  
  // Execute callback after delay if provided
  if (callback) {
    setTimeout(callback, delay);
  }
};

/**
 * Play button click sound
 * @param {number} duration - Duration in milliseconds to play the sound (defaults to 1000ms)
 * @param {number} delay - Delay in milliseconds before executing callback (defaults to 300ms)
 * @param {Function} callback - Optional callback to execute after sound plays
 */
export const playButtonSound = (callback = null, duration = 1000, delay = 300) => {
  if (isButtonSoundPlaying || isFrameSoundPlaying) {
    // Queue the sound if any sound is already playing
    soundQueue.push({ type: 'button', callback, duration, delay });
  } else {
    playButtonSoundInternal(callback, duration, delay);
  }
};

/**
 * Internal function to play frame sound
 */
const playFrameSoundInternal = (callback = null, duration = 1500, delay = 300) => {
  if (isButtonSoundPlaying) {
    // Queue the sound if button sound is already playing
    soundQueue.push({ type: 'frame', callback, duration, delay });
    return;
  }
  
  isFrameSoundPlaying = true;
  
  // Reset and play the sound
  frameAudio.currentTime = 0;
  frameAudio.play().catch(err => console.warn('Error playing frame sound:', err));
  
  // Force stop after specified duration
  setTimeout(() => {
    frameAudio.pause();
    frameAudio.currentTime = 0;
    isFrameSoundPlaying = false;
    
    // Process next sound in queue
    processNextSound();
  }, duration);
  
  // Execute callback after delay if provided
  if (callback) {
    setTimeout(callback, delay);
  }
};

/**
 * Play frame render sound
 * @param {number} duration - Duration in milliseconds to play the sound (defaults to 1500ms)
 * @param {Function} callback - Optional callback to execute after sound plays
 * @param {number} delay - Delay in milliseconds before executing callback (defaults to 300ms)
 */
export const playFrameSound = (callback = null, duration = 1500, delay = 300) => {
  if (isButtonSoundPlaying || isFrameSoundPlaying) {
    // Queue the sound if any sound is already playing
    soundQueue.push({ type: 'frame', callback, duration, delay });
  } else {
    playFrameSoundInternal(callback, duration, delay);
  }
};

export default playButtonSound;
