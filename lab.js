// Context-aware text (top of file)
const ctx = document.getElementById("contextText");

if (localStorage.getItem("grt_architecture_seen")) {
  ctx.textContent =
    "You examined architectural foundations. This diagnostic emphasizes reliability trade-offs.";
} else {
  ctx.textContent =
    "This diagnostic highlights how speed-first decisions impact trust and system stability.";
}

// Decision buttons logic (BOTTOM of file)
document.querySelectorAll(".decision").forEach(btn => {
  btn.onclick = () => {
    btn.classList.add("active");

    setTimeout(() => {
      btn.classList.remove("active");
      alert("Decision recorded. System state updated.");
    }, 300);
  };
});

let score = 72;

const scoreEl = document.getElementById("scoreValue");
const fill = document.getElementById("scoreFill");

const state = document.getElementById("stateText");
const energy = document.getElementById("energyText");
const impact = document.getElementById("impactText");

function updateSystem(){

  scoreEl.innerText = score;
  fill.style.width = score + "%";

  if(score > 85){
    state.innerText = "Optimal";
    energy.innerText = "High";
  }
  else if(score > 60){
    state.innerText = "Stable";
    energy.innerText = "Medium";
  }
  else{
    state.innerText = "Critical";
    energy.innerText = "Low";
  }

  // 🔥 THIS IS KEY → send data to neural system
  window.NEURAL_SPEED = score / 100;
  window.NEURAL_DENSITY = score;
}

document.querySelectorAll(".decision").forEach(btn=>{
  btn.onclick = ()=>{
    let impactVal = parseInt(btn.dataset.impact);

    score += impactVal;
    score = Math.max(0, Math.min(100, score));

    impact.innerText = impactVal > 0 ? "Positive" : "Negative";

    updateSystem();
  };
});

updateSystem();
