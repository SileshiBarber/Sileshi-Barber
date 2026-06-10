const API_URL = "/api/track";

function send(event: string): void {
  try {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(
        API_URL,
        new Blob([JSON.stringify({ event })], { type: "application/json" }),
      );
    } else {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event }),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Never throw — tracking must be invisible to the user
  }
}

// Map data-testid values to readable event names
const TESTID_EVENT_MAP: Record<string, string> = {
  "button-check-wait-times": "call_now",
  "link-nav-phone":          "call_now_navbar",
  "link-nav-phone-mobile":   "call_now_mobile",
  "button-services-cta":     "call_now_services",
  "button-get-directions":   "get_directions",
  "button-leave-review":     "leave_review",
  "link-location-phone":     "call_location",
  "link-nav-services":       "nav_services",
  "link-nav-gallery":        "nav_gallery",
  "link-nav-reviews":        "nav_reviews",
  "link-nav-location":       "nav_location",
  "link-footer-gallery":     "footer_gallery",
  "link-footer-services":    "footer_services",
  "link-footer-reviews":     "footer_reviews",
  "link-footer-location":    "footer_location",
  "button-view-services":    "hero_view_services",
};

export function initTracker(): void {
  // Page view
  send("page_view");

  // Global click delegation — captures any element with a tracked data-testid
  document.addEventListener(
    "click",
    (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-testid]");
      if (!target) return;
      const testId = (target as HTMLElement).dataset.testid ?? "";
      const eventName = TESTID_EVENT_MAP[testId];
      if (eventName) send(eventName);
    },
    { passive: true, capture: true },
  );
}
