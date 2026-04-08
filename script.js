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
  ripples.forEach(r=>{
r.r += 3;

ctx.beginPath();
ctx.arc(r.x, r.y, r.r, 0, Math.PI*2);
ctx.strokeStyle = "rgba(0,229,255,0.15)";
ctx.stroke();
});
let gradient = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,6);
gradient.addColorStop(0,"#00e5ff");
gradient.addColorStop(1,"transparent");

ctx.beginPath();
ctx.arc(p.x,p.y,3,0,Math.PI*2);
ctx.fillStyle = gradient;
ctx.fill();
ripples = ripples.filter(r => r.r < 200);
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

/* =========================
   🧊 3D TOUCH + GYRO SYSTEM
   ========================= */

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mousemove",e=>{
const rect = card.getBoundingClientRect();

let x = e.clientX - rect.left;
let y = e.clientY - rect.top;

card.style.transform =
`rotateX(${-(y - rect.height/2)/12}deg)
 rotateY(${(x - rect.width/2)/12}deg)
 scale(1.03)`;
});

card.addEventListener("mouseleave",()=>{
card.style.transform = "rotateX(0) rotateY(0) scale(1)";
});

});
/* =========================
   🌊 TOUCH RIPPLE
   ========================= */

let ripples = [];

window.addEventListener("click",e=>{
ripples.push({x:e.clientX, y:e.clientY, r:0});
});
/* 📱 GYRO */
if(window.DeviceOrientationEvent){
window.addEventListener("deviceorientation",e=>{
document.querySelectorAll(".card").forEach(card=>{
card.style.transform =
`rotateX(${e.beta/30}deg)
 rotateY(${e.gamma/30}deg)`;
});
});
}
