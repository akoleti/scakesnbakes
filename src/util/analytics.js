import Analytics from "analytics";
import googleAnalyticsPlugin from "@analytics/google-analytics";
import Router from "next/router";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Only initialize analytics when GA measurement ID is set
// Documentation: https://getanalytics.io
const analytics = gaId
  ? Analytics({
      debug: process.env.NODE_ENV !== "production",
      plugins: [
        googleAnalyticsPlugin({
          measurementIds: [gaId],
        }),
      ],
    })
  : null;

if (analytics && typeof window !== "undefined") {
  analytics.page();
}

if (analytics) {
  Router.events.on("routeChangeComplete", () => {
    analytics.page();
  });
}

export default analytics;
