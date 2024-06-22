const axios = require('axios');
require('dotenv').config()

class TrackingSDK {
  constructor(apiKey) {
    // endPoint is removed from here
    if (!apiKey) {
      throw new Error('UserId or ApiKey are required to initialize the SDK.');
    }
    this.userId = apiKey;
    this.endpoint = "http://localhost:5000/"
  }

  async trackEvent(eventName, eventData = {}) {
    if (!eventName) {
      throw new Error('Event name is required.');
    }
    try {
      const response = await axios.post(this.endpoint, {
        userId: this.apiKey,
        event: eventName,
        data: eventData,
      });
      console.log('Event tracked successfully:', response.data);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }
}

module.exports = TrackingSDK;
