// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================
NAVBAR SCROLL EFFECT
========================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if(window.scrollY > 50){
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* =========================
SCROLL REVEAL
========================= */

const elements = document.querySelectorAll(".panel, .card");

function reveal(){
  elements.forEach(el=>{
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      el.classList.add("visible","fade-in");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();

/* =========================
CURSOR GLOW
========================= */

const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", e=>{
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* =========================
INTENT MEMORY
========================= */

window.addEventListener("scroll",()=>{
  if(window.scrollY > 600){
    localStorage.setItem("grt_architecture_seen","true");
  }
});

/* =========================
STARFIELD (KEEP YOUR LOGIC)
========================= */

const stars=document.getElementById("stars");
const sctx=stars.getContext("2d");

function resize(){
  stars.width=innerWidth;
  stars.height=innerHeight;
}
resize();
addEventListener("resize",resize);

const starPts=[...Array(120)].map(()=>({
  x:Math.random()*stars.width,
  y:Math.random()*stars.height,
  z:Math.random()*1.5+0.5
}));

function drawStars(){
  sctx.clearRect(0,0,stars.width,stars.height);
  starPts.forEach(p=>{
    p.y+=p.z*0.2;
    if(p.y>stars.height) p.y=0;
    sctx.fillStyle="rgba(255,255,255,.3)";
    sctx.fillRect(p.x,p.y,1.2,1.2);
  });
  requestAnimationFrame(drawStars);
}
drawStars();

/* =========================
NETWORK
========================= */

const net=document.getElementById("network");
const nctx=net.getContext("2d");

net.width=innerWidth;
net.height=innerHeight;

const nodes=[...Array(30)].map(()=>({
  x:Math.random()*net.width,
  y:Math.random()*net.height
}));

function drawNetwork(){
  nctx.clearRect(0,0,net.width,net.height);

  nodes.forEach(a=>{
    nodes.forEach(b=>{
      const d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<150){
        nctx.strokeStyle="rgba(0,212,255,.08)";
        nctx.beginPath();
        nctx.moveTo(a.x,a.y);
        nctx.lineTo(b.x,b.y);
        nctx.stroke();
      }
    });
  });

  requestAnimationFrame(drawNetwork);
}

drawNetwork();
