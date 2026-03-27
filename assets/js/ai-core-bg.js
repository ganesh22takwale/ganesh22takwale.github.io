const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = "-2";

const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = [];

for(let i=0;i<100;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    vx: (Math.random()-0.5)*1,
    vy: (Math.random()-0.5)*1
  });
}

let mouse = {x:0,y:0};

window.addEventListener("mousemove",e=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("touchmove",e=>{
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;

    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;

    let dx = p.x - mouse.x;
    let dy = p.y - mouse.y;
    let dist = Math.sqrt(dx*dx+dy*dy);

    if(dist < 120){
      p.x += dx*0.02;
      p.y += dy*0.02;
    }

    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fillStyle = "#00d4ff";
    ctx.fill();
  });

  // connections
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx*dx+dy*dy);

      if(dist < 100){
        ctx.strokeStyle = "rgba(124,92,255,0.1)";
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();
