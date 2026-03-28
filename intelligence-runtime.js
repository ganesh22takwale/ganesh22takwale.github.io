// ===============================
// INTELLIGENCE RUNTIME ENGINE
// ===============================

// Utility: safe element getter
function el(id) {
  return document.getElementById(id);
}

// ===============================
// ANIMATION FUNCTION
// ===============================
function animateValue(id, start, end, duration, suffix = "") {
  let range = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = timestamp - startTime;
    let percent = Math.min(progress / duration, 1);

    let value = start + range * percent;

    if (id === "relIndex") {
      el(id).innerText = value.toFixed(1) + "%";
    } else if (id === "decConf") {
      el(id).innerText = value.toFixed(2);
    } else {
      el(id).innerText = Math.floor(value);
    }

    if (percent < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// ===============================
// METRICS GENERATOR (TEMP LOGIC)
// Replace this with real backend later
// ===============================
function generateMetrics() {
  return {
    reliability: 95 + Math.random() * 5,      // 95–100%
    confidence: 0.85 + Math.random() * 0.1,   // 0.85–0.95
    risk: Math.floor(Math.random() * 10)      // 0–9
  };
}

// ===============================
// UPDATE UI
// ===============================
function updateMetrics() {
  const data = generateMetrics();

  animateValue("relIndex", 90, data.reliability, 800);
  animateValue("decConf", 0.8, data.confidence, 800);
  animateValue("riskSurf", 0, data.risk, 800);

  console.log("Updated Metrics:", data);
}

// ===============================
// INIT
// ===============================
function initIntelligenceRuntime() {
  if (!el("relIndex") || !el("decConf") || !el("riskSurf")) {
    console.warn("Metric elements not found in DOM");
    return;
  }

  // First load
  updateMetrics();

  // Live updates every 3 seconds
  setInterval(updateMetrics, 3000);
}

// ===============================
// START WHEN PAGE READY
// ===============================
document.addEventListener("DOMContentLoaded", initIntelligenceRuntime);
