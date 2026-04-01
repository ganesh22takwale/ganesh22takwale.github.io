// =========================
// 🚀 LEVEL 3 NEURAL SYSTEM (GRT)
// =========================

const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

let w, h;
let particles = [];
let mouse = { x: null, y: null };

// resize
function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// mouse tracking
window.addEventListener("mousemove", e=>{
  mouse.x = e.x;
  mouse.y = e.y;
});

// =========================
// PARTICLE CLASS
// =========================

class Particle{
  constructor(layer){
    this.layer = layer;

    this.x = Math.random() * w;
    this.y = Math.random() * h;

    this.vx = (Math.random() - 0.5) * (0.3 + layer);
    this.vy = (Math.random() - 0.5) * (0.3 + layer);

    this.size = Math.random() * 2 + layer;
    this.alpha = Math.random() * 0.8 + 0.2;
  }

  move(){
    this.x += this.vx;
    this.y += this.vy;

    // bounce edges
    if(this.x < 0 || this.x > w) this.vx *= -1;
    if(this.y < 0 || this.y > h) this.vy *= -1;

    // mouse attraction
    if(mouse.x){
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let dist = Math.sqrt(dx*dx + dy*dy);

      if(dist < 120){
        this.x -= dx * 0.01;
        this.y -= dy * 0.01;
      }
    }
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = `rgba(0,229,255,${this.alpha})`;
    ctx.fill();
  }
}

// =========================
// INIT PARTICLES (MULTI LAYER)
// =========================

for(let i=0;i<150;i++){
  let layer = Math.random() * 1.5;
  particles.push(new Particle(layer));
}

// =========================
// CONNECTION LINES
// =========================

function connect(){
  for(let i=0;i<particles.length;i++){
    for(let j=i;j<particles.length;j++){

      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = dx*dx + dy*dy;

      if(dist < 10000){

        let opacity = 1 - dist / 10000;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(124,92,255,${opacity * 0.4})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

// =========================
// ENERGY FIELD (CENTER PULSE)
// =========================

let pulse = 0;

function energyField(){
  pulse += 0.02;

  let gradient = ctx.createRadialGradient(
    w/2, h/2, 0,
    w/2, h/2, w/1.3
  );

  gradient.addColorStop(0, `rgba(0,229,255,${0.06 + Math.sin(pulse)*0.03})`);
  gradient.addColorStop(1, "transparent");

  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,w,h);
}

// =========================
// TRAIL EFFECT (SMOOTH MOTION)
// =========================

function fadeCanvas(){
  ctx.fillStyle = "rgba(2,4,10,0.15)";
  ctx.fillRect(0,0,w,h);
}

// =========================
// ANIMATION LOOP
// =========================

function animate(){

  fadeCanvas(); // 🔥 creates trail effect

  energyField();

  particles.forEach(p=>{
    p.move();
    p.draw();
  });

  connect();

  requestAnimationFrame(animate);
}

animate();
