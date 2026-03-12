const netCanvas = document.getElementById("network");
const netCtx = netCanvas.getContext("2d");

function resizeNet() {
  netCanvas.width = window.innerWidth;
  netCanvas.height = window.innerHeight;
}

resizeNet();
window.addEventListener("resize", resizeNet);

let nodes = [];
let mouse = {x:0,y:0};

window.addEventListener("mousemove", e=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

for (let i = 0; i < 80; i++) {
  nodes.push({
    x: Math.random()*netCanvas.width,
    y: Math.random()*netCanvas.height,
    vx:(Math.random()-0.5)*0.7,
    vy:(Math.random()-0.5)*0.7
  });
}

function drawNetwork(){

netCtx.clearRect(0,0,netCanvas.width,netCanvas.height);

nodes.forEach(n=>{

n.x+=n.vx;
n.y+=n.vy;

if(n.x<0||n.x>netCanvas.width)n.vx*=-1;
if(n.y<0||n.y>netCanvas.height)n.vy*=-1;

let dx=n.x-mouse.x;
let dy=n.y-mouse.y;

let dist=Math.sqrt(dx*dx+dy*dy);

let glow=dist<140;

netCtx.beginPath();
netCtx.arc(n.x,n.y,glow?3:1.5,0,Math.PI*2);
netCtx.fillStyle=glow?"#7dd3fc":"#ffffff";
netCtx.fill();

nodes.forEach(n2=>{

let dx=n.x-n2.x;
let dy=n.y-n2.y;

let d=Math.sqrt(dx*dx+dy*dy);

if(d<120){

netCtx.beginPath();
netCtx.moveTo(n.x,n.y);
netCtx.lineTo(n2.x,n2.y);

netCtx.strokeStyle="rgba(125,211,252,0.15)";
netCtx.stroke();

}

});

});

requestAnimationFrame(drawNetwork);

}

drawNetwork();
