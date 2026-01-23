// Year
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- SIMULATION CONTROLS ---------- */
const clarity = document.getElementById('clarity');
const reliability = document.getElementById('reliability');
const scalability = document.getElementById('scalability');
const totalEl = document.getElementById('total');
const balanceBtn = document.getElementById('balanceBtn');
const runBtn = document.getElementById('runBtn');
const satEl = document.getElementById('sat');
const uptimeEl = document.getElementById('uptime');
const convEl = document.getElementById('conv');
const revEl = document.getElementById('rev');
const chart = document.getElementById('outcomeChart');
const cctx = chart.getContext('2d');
const scenarioText = document.getElementById('scenarioText');
const newScenario = document.getElementById('newScenario');

/* ---------- GA4 HELPER ---------- */
function track(eventName, params = {}) {
  if (typeof gtag === "function") {
    gtag("event", eventName, { ...params, page_location: location.href });
  }
}

/* ---------- ALLOCATION LOGIC ---------- */
function clampAlloc() {
  const c = +clarity.value, r = +reliability.value, s = +scalability.value;
  const sum = c + r + s || 1;
  const scale = 100 / sum;
  clarity.value = Math.round(c * scale);
  reliability.value = Math.round(r * scale);
  scalability.value = Math.round(s * scale);
  totalEl.textContent = (+clarity.value + +reliability.value + +scalability.value);
  track('slider_change', { clarity:+clarity.value, reliability:+reliability.value, scalability:+scalability.value });
}

function balance() {
  const avg = Math.round(100 / 3);
  clarity.value = avg;
  reliability.value = avg;
  scalability.value = 100 - avg * 2;
  totalEl.textContent = 100;
  track('balance_click');
}

function readSiteContext() {
  const hints = [
    'Client values uptime and clean design.',
    'Focus on measurable impact and transparent workflows.',
    'Clarity reduces churn; reliability protects uptime; scalability boosts conversions.'
  ];
  scenarioText.textContent = hints[Math.floor(Math.random() * hints.length)];
  track('scenario_new', { text: scenarioText.textContent });
}

/* ---------- SIMULATION ---------- */
function simulate() {
  const c = +clarity.value, r = +reliability.value, s = +scalability.value;

  const clarityEffect = Math.min(1, c / 70);
  const reliabilityEffect = Math.min(1, r / 65);
  const scalabilityEffect = Math.min(1, s / 60);

  const imbalance = Math.abs(c - r) + Math.abs(r - s) + Math.abs(s - c);
  const penalty = Math.min(0.25, imbalance / 300);

  const satisfaction = Math.max(0, 0.35 + 0.4 * clarityEffect + 0.2 * reliabilityEffect - penalty);
  const uptime = Math.max(0, 0.90 * reliabilityEffect - 0.05 * penalty + 0.05);
  const conversion = Math.max(0, 0.25 + 0.5 * scalabilityEffect + 0.2 * clarityEffect - 0.1 * penalty);
  const revenue = (satisfaction * 0.4 + uptime * 0.3 + conversion * 0.3);

  satEl.textContent = (satisfaction * 100).toFixed(0) + '%';
  uptimeEl.textContent = (uptime * 100).toFixed(0) + '%';
  convEl.textContent = (conversion * 100).toFixed(0) + '%';
  revEl.textContent = '↑ ' + (revenue * 100).toFixed(0) + ' index';

  // Bars with glow
  cctx.clearRect(0, 0, chart.width, chart.height);
  const bars = [
    { label: 'Satisfaction', value: satisfaction, color: '#7CFFCB' },
    { label: 'Uptime', value: uptime, color: '#A0E7FF' },
    { label: 'Conversion', value: conversion, color: '#FFD580' },
    { label: 'Revenue', value: revenue, color: '#E3A7FF' }
  ];
  const bw = 90, gap = 30, base = chart.height - 24;
  bars.forEach((b, i) => {
    const x = 24 + i * (bw + gap);
    const h = b.value * (base - 24);
    // glow
    cctx.shadowColor = b.color;
    cctx.shadowBlur = 18;
    cctx.fillStyle = b.color;
    cctx.fillRect(x, base - h, bw, h);
    cctx.shadowBlur = 0;
    cctx.fillStyle = '#fff';
    cctx.font = '12px Inter';
    cctx.fillText(b.label, x, base + 14);
  });

  track('simulation_run', { clarity:+clarity.value, reliability:+reliability.value, scalability:+scalability.value });
}

/* ---------- EVENT BINDINGS ---------- */
[clarity, reliability, scalability].forEach(el => el.addEventListener('input', clampAlloc));
balanceBtn.addEventListener('click', balance);
runBtn.addEventListener('click', () => { clampAlloc(); simulate(); });
newScenario.addEventListener('click', readSiteContext);

clampAlloc();
readSiteContext();
simulate();
