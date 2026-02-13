import axios from 'axios';
import { sendLargeScreenRoute } from './largeScreenNav';

/**
 * Service for cross-application navigation using NATS
 */
class NavigationService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_NATS_SERVICE_URL || process.env.REACT_APP_SSE_SERVICE_URL || 'http://localhost:3001';
    this.appId = 'displax';
    this.useNATS = true; // Flag to use NATS endpoints
    
    console.log('🔧 NavigationService initialized:', {
      baseUrl: this.baseUrl,
      appId: this.appId,
      useNATS: this.useNATS,
      env: {
        REACT_APP_NATS_SERVICE_URL: process.env.REACT_APP_NATS_SERVICE_URL,
        REACT_APP_SSE_SERVICE_URL: process.env.REACT_APP_SSE_SERVICE_URL
      }
    });
  }

  /**
   * Send a navigation event via NATS
   * @param {string} action - The action type
   * @param {string} targetAppId - Target application ID
   * @param {string} route - Target route to navigate to
   * @param {Object} data - Additional data to send
   * @returns {Promise} - Promise resolving to the response
   */
  async sendNavigationEvent(action, targetAppId, route, data = {}) {
    console.log('🚀 NavigationService.sendNavigationEvent called:', {
      action,
      targetAppId,
      route,
      baseUrl: this.baseUrl,
      data
    });
    
    try {
      // Use legacy endpoint for backward compatibility
      // Backend will forward to NATS
      const payload = {
        action,
        targetAppId,
        route,
        data: {
          ...data,
          sourceAppId: this.appId,
          timestamp: new Date().toISOString()
        }
      };
      
      console.log('📤 Sending POST to:', `${this.baseUrl}/api/navigation`, payload);
      
      const response = await axios.post(`${this.baseUrl}/api/navigation`, payload);
      
      console.log('✅ Navigation event sent via NATS:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to send navigation event:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  }

  /**
   * Navigate to a route in the operate-experience app
   * @param {string} route - Target route
   * @param {Object} data - Additional data to send
   * @returns {Promise} - Promise resolving to the response
   */
  navigateToOperateExperience(route, data = {}) {
    return this.sendNavigationEvent('NAVIGATE', 'operate-experience', route, data);
  }

  /**
   * Navigate to a route in the large screen app
   * @param {string} route - Target route
   * @param {Object} data - Additional data to send
   * @returns {Promise} - Promise resolving to the response
   */
  navigateToLargeScreen(route, data = {}) {
    // Use the existing largeScreenNav functionality
    sendLargeScreenRoute(route, data);
    
    // Also send via NATS for compatibility
    return this.sendNavigationEvent('NAVIGATE', 'large-screen', route, data);
  }
}

// Create a singleton instance
const navigationService = new NavigationService();

export default navigationService;
