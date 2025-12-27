// Web Observer Analytics Script
// This script should be embedded on websites to track analytics

(function() {
  // Get current script element
  const currentScript = document.currentScript || document.querySelector('script[src*="analytics.js"]');
  
  // Configuration - Extract from script tag attributes
  const TRACK_API = 'https://webobserver.vercel.app/api/track'; // Update with your domain
  const WEBSITE_ID = currentScript?.dataset.websiteId || '';
  const DOMAIN = currentScript?.dataset.domain || window.location.hostname;
  
  console.log('[Web Observer] Initialized with Website ID:', WEBSITE_ID, 'Domain:', DOMAIN);

  // Utility functions
  function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  function getOrCreateSessionId() {
    let sessionId = localStorage.getItem('web_observer_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('web_observer_session_id', sessionId);
    }
    return sessionId;
  }

  function sendTracking(eventData) {
    const payload = {
      websiteId: WEBSITE_ID,
      domain: DOMAIN,
      sessionId: getOrCreateSessionId(),
      timestamp: new Date().toISOString(),
      url: window.location.href,
      title: document.title,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: window.innerWidth + 'x' + window.innerHeight,
      ...eventData,
    };

    // Use beacon for better reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon(TRACK_API, JSON.stringify(payload));
    } else {
      // Fallback to fetch
      fetch(TRACK_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(err => console.error('Analytics tracking failed:', err));
    }
  }

  // Track page view on script load
  function trackPageView() {
    sendTracking({
      event: 'page_view',
      type: 'load',
    });
    console.log('[Web Observer] Analytics script loaded for domain:', DOMAIN);
  }

  // Track page visibility changes
  function trackVisibility() {
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        sendTracking({
          event: 'page_hidden',
          type: 'visibility',
        });
      } else {
        sendTracking({
          event: 'page_visible',
          type: 'visibility',
        });
      }
    });
  }

  // Track before unload
  function trackUnload() {
    window.addEventListener('beforeunload', function() {
      sendTracking({
        event: 'page_unload',
        type: 'unload',
      });
    });
  }

  // Public API for custom tracking
  window.WebObserver = {
    track: function(eventName, eventData = {}) {
      sendTracking({
        event: eventName,
        type: 'custom',
        ...eventData,
      });
    },
    getDomain: function() {
      return DOMAIN;
    },
    getSessionId: function() {
      return getOrCreateSessionId();
    },
  };

  // Initialize tracking
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', trackPageView);
    } else {
      trackPageView();
    }

    trackVisibility();
    trackUnload();
  }

  // Start initialization
  init();
})();
