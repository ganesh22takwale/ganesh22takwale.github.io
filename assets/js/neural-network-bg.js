const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const PARTICLE_COUNT = 90;
const MAX_DISTANCE = 150;

let mouse = {
x: canvas.width/2,
y: canvas.height/2
};

window.addEventListener("mousemove", e => {
mouse.x = e.clientX;
mouse.y = e.clientY;
});

window.addEventListener("touchmove", e => {
mouse.x = e.touches[0].clientX;
mouse.y = e.touches[0].clientY;
});

for(let i=0;i<PARTICLE_COUNT;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.4,
vy:(Math.random()-0.5)*0.4
});

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p => {

p.x += p.vx;
p.y += p.vy;

if(p.x<0 || p.x>canvas.width) p.vx*=-1;
if(p.y<0 || p.y>canvas.height) p.vy*=-1;

let dx = p.x - mouse.x;
let dy = p.y - mouse.y;
let dist = Math.sqrt(dx*dx + dy*dy);

let glow = Math.max(0,1 - dist/180);

ctx.beginPath();
ctx.arc(p.x,p.y,2+glow*2,0,Math.PI*2);

ctx.fillStyle = `rgba(125,211,252,${0.6+glow})`;
ctx.fill();

});

for(let i=0;i<particles.length;i++){

for(let j=i+1;j<particles.length;j++){

let dx = particles[i].x - particles[j].x;
let dy = particles[i].y - particles[j].y;
let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < MAX_DISTANCE){

let opacity = 1 - dist/MAX_DISTANCE;

ctx.beginPath();
ctx.moveTo(particles[i].x,particles[i].y);
ctx.lineTo(particles[j].x,particles[j].y);

ctx.strokeStyle = `rgba(125,211,252,${opacity*.5})`;
ctx.lineWidth = 1;
ctx.stroke();

}

}

}

requestAnimationFrame(draw);

}

draw();

window.addEventListener("resize", ()=>{

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

});
