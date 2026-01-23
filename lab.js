/* Lightweight visuals + simulation logic for GRT */

// Particle constellation for hero
(function constellation() {
  const canvas = document.getElementById('constellation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, points;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    points = Array.from({ length: Math.max(60, Math.floor(w / 12)) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6
    }));
  }
  window.addEventListener('resize', resize);
  resize();

  function step() {
    ctx.clearRect(0, 0, w, h);
    for (const p of points) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2); ctx.fill();
    }
    // connect near points
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 90) {
          ctx.strokeStyle = `rgba(255,255,255,${(90 - d) / 180})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }
  step();
})();

// Simulation game
(function reliabilityTycoon() {
  const clarity = document.getElementById('clarity');
  const reliability = document.getElementById('reliability');
  const speed = document.getElementById('speed');
  const totalEl = document.getElementById('total');
  const balanceBtn = document.getElementById('balanceBtn');
  const runBtn = document.getElementById('runBtn');
  const satEl = document.getElementById('sat');
  const uptimeEl = document.getElementById('uptime');
  const convEl = document.getElementById('conv');
  const revEl = document.getElementById('rev');
  const chart = document.getElementById('outcomeChart');
  const ctx = chart ? chart.getContext('2d') : null;
  const scenarioText = document.getElementById('scenarioText');
  const newScenario = document.getElementById('newScenario');

  if (!clarity) return; // only on lab.html

  function clampAlloc() {
    // Keep total at 100 by scaling
    const c = +clarity.value, r = +reliability.value, s = +speed.value;
    const sum = c + r + s || 1;
    const scale = 100 / sum;
    clarity.value = Math.round(c * scale);
    reliability.value = Math.round(r * scale);
    speed.value = Math.round(s * scale);
    totalEl.textContent = (+clarity.value + +reliability.value + +speed.value);
  }

  function balance() {
    const avg = Math.round(100 / 3);
    clarity.value = avg;
    reliability.value = avg;
    speed.value = 100 - avg * 2;
    totalEl.textContent = 100;
  }

  function readSiteContext() {
    // Pull hints from index page if available (when loaded together via cache)
    const hints = [
      'Client values uptime and clean design.',
      'Focus on measurable impact and transparent workflows.',
      'Clarity reduces churn; reliability protects uptime; speed boosts conversions.'
    ];
    scenarioText.textContent = hints[Math.floor(Math.random() * hints.length)];
  }

  function simulate() {
    const c = +clarity.value, r = +reliability.value, s = +speed.value;

    // Core model: weighted outcomes with diminishing returns
    const clarityEffect = Math.min(1, c / 70);
    const reliabilityEffect = Math.min(1, r / 65);
    const speedEffect = Math.min(1, s / 60);

    // Interactions: imbalance penalties
    const imbalance = Math.abs(c - r) + Math.abs(r - s) + Math.abs(s - c);
    const penalty = Math.min(0.25, imbalance / 300);

    const satisfaction = Math.max(0, 0.35 + 0.4 * clarityEffect + 0.2 * reliabilityEffect - penalty);
    const uptime = Math.max(0, 0.90 * reliabilityEffect - 0.05 * penalty + 0.05);
    const conversion = Math.max(0, 0.25 + 0.5 * speedEffect + 0.2 * clarityEffect - 0.1 * penalty);

    // Revenue proxy (normalized)
    const revenue = (satisfaction * 0.4 + uptime * 0.3 + conversion * 0.3);

    satEl.textContent = (satisfaction * 100).toFixed(0) + '%';
    uptimeEl.textContent = (uptime * 100).toFixed(0) + '%';
    convEl.textContent = (conversion * 100).toFixed(0) + '%';
    revEl.textContent = '↑ ' + (revenue * 100).toFixed(0) + ' index';

    // Draw simple chart
    if (ctx) {
      ctx.clearRect(0, 0, chart.width, chart.height);
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
        ctx.fillStyle = b.color;
        ctx.fillRect(x, base - h, bw, h);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Inter';
        ctx.fillText(b.label, x, base + 14);
      });
    }
  }

  // Events
  [clarity, reliability, speed].forEach(el => el.addEventListener('input', clampAlloc));
  balanceBtn.addEventListener('click', balance);
  runBtn.addEventListener('click', () => { clampAlloc(); simulate(); });
  newScenario.addEventListener('click', readSiteContext);

  // Init
  clampAlloc();
  readSiteContext();
  simulate();
})();
