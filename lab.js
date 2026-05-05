// ===== CONTEXT ENGINE =====
const ctx = document.getElementById("contextText");

if (localStorage.getItem("grt_architecture_seen")) {
  ctx.textContent =
    "You explored architecture. Now test system resilience.";
} else {
  ctx.textContent =
    "Every decision impacts system reliability. Choose wisely.";
}

// ===== CURSOR AI =====
const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// ===== NEURAL BACKGROUND =====
const canvas = document.getElementById("network");
const ctx2 = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = Array.from({ length: 60 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: Math.random() - 0.5,
  vy: Math.random() - 0.5
}));

function animate() {
  ctx2.clearRect(0, 0, canvas.width, canvas.height);

  nodes.forEach(n => {
    n.x += n.vx;
    n.y += n.vy;

    nodes.forEach(o => {
      let d = Math.hypot(n.x - o.x, n.y - o.y);
      if (d < 100) {
        ctx2.strokeStyle = "rgba(0,255,255," + (1 - d / 100) + ")";
        ctx2.beginPath();
        ctx2.moveTo(n.x, n.y);
        ctx2.lineTo(o.x, o.y);
        ctx2.stroke();
      }
    });
  });

  requestAnimationFrame(animate);
}
animate();

// ===== SYSTEM ENGINE =====
let score = 72;

const scoreEl = document.getElementById("scoreValue");
const state = document.getElementById("stateText");
const energy = document.getElementById("energyText");
const impact = document.getElementById("impactText");

function updateSystem() {
  scoreEl.innerText = Math.floor(score);

  if (score > 85) {
    state.innerText = "Optimal";
    energy.innerText = "High";
  } else if (score > 60) {
    state.innerText = "Stable";
    energy.innerText = "Medium";
  } else {
    state.innerText = "Critical";
    energy.innerText = "Low";
  }

  window.NEURAL_SPEED = score / 100;
  window.NEURAL_DENSITY = score;
}

// ===== DECISION ENGINE =====
document.querySelectorAll(".decision").forEach(btn => {
  btn.onclick = () => {
    let impactVal = parseInt(btn.dataset.impact);

    score += impactVal;
    score = Math.max(0, Math.min(100, score));

    impact.innerText = impactVal > 0 ? "Positive" : "Negative";

    btn.style.transform = "scale(1.2)";
    setTimeout(() => (btn.style.transform = "scale(1)"), 200);

    updateSystem();
  };
});

// ===== AUTO LIFE =====
setInterval(() => {
  score += (Math.random() - 0.5) * 2;
  score = Math.max(0, Math.min(100, score));
  updateSystem();
}, 2000);

updateSystem();
