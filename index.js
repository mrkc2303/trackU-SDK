const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

class TrackingSDK {
  constructor(apiKey, projectId) {
    if (!apiKey) {
      throw new Error(
        "projectId or ApiKey are required to initialize the SDK."
      );
    }
    this.apiKey = apiKey;
    this.projectId = projectId;
    this.userId = null;
    this.userDetails = null;
    this.endpoint = "http://localhost:5050/submitEvent";
    this.sessionId = null;
    this.sessionStartTime = null;
    this.clicks = [];
    this.scrolls = [];
  }
  // setting user id
  async setUser(userId, userDetails = {}) {
    if (!userId) {
      throw new Error("User ID is required for initialisation.");
    }
    this.userId = userId;
    this.userDetails = userDetails;
    this.sessionId = uuidv4();
    this.sessionStartTime = new Date().toISOString();
    console.log("userId", userId);
    console.log("userDetails", userDetails);
    // api to store user initialisation
  }

  // generic track event function
  async _track(eventName, eventData = {}) {
    if (!eventName) {
      throw new Error("Event name is required.");
    }
    try {
      // const response = await axios.post(
      //   this.endpoint,
      //   {
      //     userId: this.userId,
      //     event: eventName,
      //     data: eventData,
      //     date: new Date().toISOString(),
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${this.apiKey}`,
      //     },
      //   }
      // );
      // console.log("Event tracked successfully:", response.data);
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          userId: this.userId,
          event: eventName,
          data: eventData,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Event tracked successfully:", responseData);
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  }

  // managing sessions of users
  endSession() {
    const sessionEndTime = new Date().toISOString();
    const sessionDuration =
      new Date(sessionEndTime) - new Date(this.sessionStartTime);

    this._track("session_end", {
      duration: sessionDuration,
      sessionId: this.sessionId,
    });
  }

  // tracking page views and history
  _trackPageView() {
    this._track("page_view", {
      url: window.location.href,
      title: document.title,
    });
  }

  setupPageViewTracking() {
    window.addEventListener("load", () => this._trackPageView());
    window.addEventListener("popstate", () => this._trackPageView());
    window.addEventListener("hashchange", () => this._trackPageView());
  }

  // tracking user interactions
  _trackClick(event) {
    const clickData = {
      sessionId: this.sessionId,
      x: event.clientX,
      y: event.clientY,
      timestamp: new Date().toISOString(),
    };
    this.clicks.push(clickData);
  }

  _trackScroll(event) {
    const scrollData = {
      sessionId: this.sessionId,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      timestamp: new Date().toISOString(),
    };
    this.scrolls.push(scrollData);
  }

  _sendHeatmapData() {
    this._track("heat_map", { clicks: this.clicks, scrolls: this.scrolls });
  }

  setupInteractionTracking() {
    window.addEventListener("click", (event) => this._trackClick(event));
    window.addEventListener("scroll", (event) => this._trackScroll(event));
    window.addEventListener("beforeunload", () => this._sendHeatmapData());
  }

  // tracking custom events
  setUpCustomEvent(eventName, properties = {}) {
    this._track(eventName, properties);
  }

  // tracking errors and performance
  async setUpErrorAndPerformanceEvent() {
    window.addEventListener("error", (event) => this._trackError(event));
    window.addEventListener("load", () => this._trackPerformance());
  }

  _trackError(event) {
    const errorData = {
      sessionId: this.sessionId,
      message: event.message,
      source: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error ? event.error.toString() : null,
      timestamp: new Date().toISOString(),
    };

    this._track("error_track", { errors: errorData });
  }

  _trackPerformance() {
    if (performance.getEntriesByType) {
      const [navigationEntry] = performance.getEntriesByType("navigation");
      const paintEntries = performance.getEntriesByType("paint");

      const performanceData = {
        sessionId: this.sessionId,
        loadTime: navigationEntry
          ? navigationEntry.loadEventEnd - navigationEntry.startTime
          : 0,
        firstPaint:
          paintEntries.find((entry) => entry.name === "first-paint")
            ?.startTime || 0,
        firstContentfulPaint:
          paintEntries.find((entry) => entry.name === "first-contentful-paint")
            ?.startTime || 0,
        width: window.innerWidth,
        timestamp: new Date().toISOString(),
      };

      this._track("performance_track", { performance: performanceData });
    }
  }
}

module.exports = TrackingSDK;
