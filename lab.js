/* ===============================
   RELIABILITY TYCOON CORE LOGIC
================================ */

let state = {
  reliability: 80,
  trust: 70,
  velocity: 60,
  cost: 40,
  time: 45 * 60
};

const els = {
  reliability: document.getElementById("reliability"),
  trust: document.getElementById("trust"),
  velocity: document.getElementById("velocity"),
  cost: document.getElementById("cost"),
  timer: document.getElementById("timer")
};

/* --------- TIMER --------- */
setInterval(() => {
  if (state.time <= 0) return;
  state.time--;
  render();
}, 1000);

/* --------- DECISIONS --------- */
document.querySelectorAll(".decision").forEach(btn => {
  btn.addEventListener("click", () => applyDecision(btn.dataset.action));
});

function applyDecision(type) {
  switch (type) {
    case "observability":
      state.reliability += 6;
      state.trust += 5;
      state.velocity -= 4;
      break;

    case "ship_fast":
      state.velocity += 8;
      state.reliability -= 6;
      state.trust -= 4;
      break;

    case "fallbacks":
      state.reliability += 8;
      state.cost += 6;
      break;
  }

  clampState();
  render();
}

/* --------- HELPERS --------- */
function clampState() {
  Object.keys(state).forEach(k => {
    if (k !== "time") {
      state[k] = Math.max(0, Math.min(100, state[k]));
    }
  });
}

function render() {
  els.reliability.textContent = state.reliability;
  els.trust.textContent = state.trust;
  els.velocity.textContent = state.velocity;
  els.cost.textContent = state.cost;

  const m = Math.floor(state.time / 60);
  const s = state.time % 60;
  els.timer.textContent = `${m}:${String(s).padStart(2, "0")}`;
}

/* --------- RESTART --------- */
document.getElementById("restart").onclick = () => {
  state = { reliability: 80, trust: 70, velocity: 60, cost: 40, time: 45 * 60 };
  render();
};

render();
