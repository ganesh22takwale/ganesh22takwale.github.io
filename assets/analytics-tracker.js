window.trackEvent = function(action) {
  if (typeof gtag === "function") {
    gtag("event", action, {
      event_category: "engagement",
      event_label: "GRT Philosophy"
    });
  }
};

document.addEventListener("mouseover", e => {
  if (e.target.closest("#hero-headline")) {
    trackEvent("quote_hover");
  }
});
