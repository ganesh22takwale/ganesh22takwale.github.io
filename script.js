document.getElementById("year").textContent = new Date().getFullYear();

// Save scroll intent
window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    localStorage.setItem("focusedOnArchitecture", "true");
  }
});

// Subtle particle background
const c = document.getElementById("bg");
const ctx = c.getContext("2d");
let w, h, particles = [];

function resize(){
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
}
resize();
window.onresize = resize;

particles = Array.from({length:120},()=>({
  x:Math.random()*w,
  y:Math.random()*h,
  r:Math.random()*1.5+0.5,
  vx:(Math.random()-.5)*0.2,
  vy:(Math.random()-.5)*0.2
}));

function animate(){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle="#fff";
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>w) p.vx*=-1;
    if(p.y<0||p.y>h) p.vy*=-1;
    ctx.globalAlpha=0.15;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
