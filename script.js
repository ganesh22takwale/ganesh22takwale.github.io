document.getElementById("year").textContent = new Date().getFullYear();

/* Intent memory */
window.addEventListener("scroll",()=>{
  if(window.scrollY > 700){
    localStorage.setItem("grt_architecture_focus","true");
  }
});

/* Starfield */
const stars = document.getElementById("stars");
const sctx = stars.getContext("2d");
let sw,sh;
function resize(){
  sw = stars.width = innerWidth;
  sh = stars.height = innerHeight;
}
resize(); window.onresize=resize;

const starPts = Array.from({length:160},()=>({
  x:Math.random()*sw,
  y:Math.random()*sh,
  z:Math.random()*2+0.5
}));

function drawStars(){
  sctx.clearRect(0,0,sw,sh);
  starPts.forEach(p=>{
    p.y += p.z*0.15;
    if(p.y>sh) p.y=0;
    sctx.fillStyle="rgba(255,255,255,.25)";
    sctx.fillRect(p.x,p.y,1.2,1.2);
  });
  requestAnimationFrame(drawStars);
}
drawStars();

/* Network nodes */
const nodes = document.getElementById("nodes");
const nctx = nodes.getContext("2d");
nodes.width=sw; nodes.height=sh;
const pts = Array.from({length:40},()=>({
  x:Math.random()*sw,y:Math.random()*sh
}));
function drawNodes(){
  nctx.clearRect(0,0,sw,sh);
  pts.forEach((p,i)=>{
    pts.forEach((q,j)=>{
      const d=Math.hypot(p.x-q.x,p.y-q.y);
      if(d<180){
        nctx.strokeStyle="rgba(125,211,252,.08)";
        nctx.beginPath();
        nctx.moveTo(p.x,p.y);
        nctx.lineTo(q.x,q.y);
        nctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawNodes);
}
drawNodes();
