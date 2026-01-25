/* Context text */
const ctx = document.getElementById("contextText");
ctx.textContent = localStorage.getItem("grt_architecture_seen")
  ? "You examined architectural foundations. This diagnostic emphasizes reliability trade-offs."
  : "This diagnostic reveals how speed-first decisions impact trust and stability.";

/* Floating particles */
const canvas = document.getElementById("labParticles");
const c = canvas.getContext("2d");

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const particles = Array.from({length:45},()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  r:Math.random()*2+1,
  dy:Math.random()*0.18+0.05,
  alpha:Math.random()*0.35+0.1
}));

function animateParticles(){
  c.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.y -= p.dy;
    if(p.y < -10) p.y = canvas.height + 10;
    c.fillStyle = `rgba(200,220,255,${p.alpha})`;
    c.beginPath();
    c.arc(p.x,p.y,p.r,0,Math.PI*2);
    c.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===============================
   CORE ACTIVATION
================================ */

const core = document.getElementById("labCore");
const panel = document.getElementById("decisionPanel");

core.addEventListener("click",()=>{
  core.classList.add("activated");
  panel.classList.remove("hidden");
  panel.classList.add("visible");

  // subtle confirmation glow
  core.querySelector("img").style.filter =
    "drop-shadow(0 0 80px rgba(125,211,252,.8))";
});

/* Decision interaction */
document.querySelectorAll(".decision").forEach(btn=>{
  btn.onclick = ()=>{
    btn.style.boxShadow =
      "0 0 60px rgba(125,211,252,.6), 0 0 120px rgba(227,167,255,.45)";
    setTimeout(()=>alert("Decision recorded. System state updated."),150);
  };
});
