document.getElementById("year").textContent = new Date().getFullYear();

/* Intent memory */
window.addEventListener("scroll",()=>{
  if(window.scrollY > 600){
    localStorage.setItem("grt_architecture_seen","true");
  }
});

/* Starfield */
const stars=document.getElementById("stars");
const sctx=stars.getContext("2d");
function resize(){
  stars.width=innerWidth;
  stars.height=innerHeight;
}
resize(); addEventListener("resize",resize);

const starPts=[...Array(160)].map(()=>({
  x:Math.random()*stars.width,
  y:Math.random()*stars.height,
  z:Math.random()*1.5+0.5
}));

function drawStars(){
  sctx.clearRect(0,0,stars.width,stars.height);
  starPts.forEach(p=>{
    p.y+=p.z*0.15;
    if(p.y>stars.height) p.y=0;
    sctx.fillStyle="rgba(255,255,255,.25)";
    sctx.fillRect(p.x,p.y,1.2,1.2);
  });
  requestAnimationFrame(drawStars);
}
drawStars();

/* Network layer */
const net=document.getElementById("network");
const nctx=net.getContext("2d");
net.width=stars.width; net.height=stars.height;
const nodes=[...Array(36)].map(()=>({
  x:Math.random()*net.width,
  y:Math.random()*net.height
}));

function drawNetwork(){
  nctx.clearRect(0,0,net.width,net.height);
  nodes.forEach(a=>{
    nodes.forEach(b=>{
      const d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<180){
        nctx.strokeStyle="rgba(125,211,252,.08)";
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
