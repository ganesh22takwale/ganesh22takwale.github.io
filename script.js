// ================= CORE ENGINE =================
const Engine = (()=>{

  let state = {
    risk:0.5,
    trend:0.5,
    confidence:0.5
  };

  function bayesianUpdate(signal){
    state.trend = (state.trend + signal)/2;
    state.confidence = Math.min(1,state.confidence + 0.05);
  }

  function evolve(){
    let signal = Math.random();
    bayesianUpdate(signal);

    state.risk = Math.abs(state.trend - 0.5);
  }

  return {state,evolve};

})();

// ================= STATE UI =================
const stateBox = document.getElementById("state");

setInterval(()=>{
  Engine.evolve();

  stateBox.innerHTML = `
  Risk: ${Engine.state.risk.toFixed(2)} <br>
  Trend: ${Engine.state.trend.toFixed(2)} <br>
  Confidence: ${Engine.state.confidence.toFixed(2)}
  `;
},1000);

// ================= TICKER =================
const chart = document.getElementById("chart");
const ctx = chart.getContext("2d");

chart.width=300;
chart.height=120;

let data = Array.from({length:20},()=>Math.random());

function draw(){
  ctx.clearRect(0,0,300,120);

  ctx.beginPath();
  ctx.moveTo(0,60);

  data.forEach((v,i)=>{
    let x=i*15;
    let y=120-v*100;
    ctx.quadraticCurveTo(x+10,y,x,y);
  });

  ctx.strokeStyle="#00e5ff";
  ctx.stroke();

  requestAnimationFrame(draw);
}
draw();

// ================= INSIGHTS (SEO BOOST) =================
const insights = document.getElementById("insights");

const content = [
"AI automation reduces operational cost by 40%",
"Robotic systems scaling in logistics industry",
"Neural AI outperforming rule-based systems",
"Predictive AI driving next-gen business models"
];

setInterval(()=>{
  insights.innerText = content[Math.floor(Math.random()*content.length)];
},2500);

// ================= TERMINAL =================
const log = document.getElementById("log");

setInterval(()=>{
  let el=document.createElement("div");
  el.textContent="> signal "+Math.random().toFixed(3);
  log.appendChild(el);
},2000);

// ================= CTA =================
function unlock(){
  alert("Future: Paid Deep Intelligence Access");
}
const os = {
    nav(t) {
        document.querySelectorAll('.view').forEach(v => { v.classList.remove('active'); v.style.opacity = 0; });
        const n = document.getElementById(t); n.classList.add('active');
        let s = 0.9, o = 0, v = 0;
        const step = () => {
            v += (1 - s) * 0.15; v *= 0.8; s += v; o += 0.05;
            n.style.transform = `scale(${s})`; n.style.opacity = o;
            if (Math.abs(1 - s) > 0.001 || o < 1) requestAnimationFrame(step);
        };
        step();
        document.querySelectorAll('.i').forEach(i => { i.classList.remove('active'); if(i.outerHTML.includes(t)) i.classList.add('active'); });
        if(t === 'lab') this.runTerm();
    },
    runTerm() {
        const out = document.getElementById('term');
        const lines = ["> INITIALIZING_GRT_OS...", "> SCANNING_NEURAL_GATES...", "> AGENT_STATUS: ONLINE", "> READY_FOR_AUDIT_"];
        out.innerHTML = "";
        lines.forEach((l, i) => setTimeout(() => { out.innerHTML += l + "<br>"; }, i * 500));
    },
    initLattice() {
        const c = document.getElementById('neuralLattice'), ctx = c.getContext('2d');
        let p = [], m = { x: null, y: null };
        const res = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
        window.addEventListener('resize', res); window.addEventListener('mousemove', e => { m.x = e.x; m.y = e.y; });
        res();
        class Node {
            constructor() { this.ox = Math.random()*c.width; this.oy = Math.random()*c.height; this.x = this.ox; this.y = this.oy; this.vx = 0; this.vy = 0; }
            upd() {
                this.vx += (this.ox - this.x)*0.01; this.vy += (this.oy - this.y)*0.01;
                let d = Math.hypot(m.x-this.x, m.y-this.y);
                if(d < 100) { let a = Math.atan2(m.y-this.y, m.x-this.x); this.vx -= Math.cos(a)*2; this.vy -= Math.sin(a)*2; }
                this.vx *= 0.9; this.vy *= 0.9; this.x += this.vx; this.y += this.vy;
            }
            drw() { ctx.fillStyle = 'rgba(0,242,255,0.5)'; ctx.beginPath(); ctx.arc(this.x,this.y,1,0,Math.PI*2); ctx.fill(); }
        }
        for(let i=0; i<150; i++) p.push(new Node());
        const loop = () => {
            ctx.clearRect(0,0,c.width,c.height);
            p.forEach((n, i) => {
                n.upd(); n.drw();
                for(let j=i; j<p.length; j++) {
                    let d = Math.hypot(n.x-p[j].x, n.y-p[j].y);
                    if(d<80) { ctx.strokeStyle=`rgba(191,0,255,${1-d/80})`; ctx.lineWidth=0.5; ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(p[j].x,p[j].y); ctx.stroke(); }
                }
            });
            requestAnimationFrame(loop);
        }; loop();
    }
};
document.addEventListener('DOMContentLoaded', () => { os.initLattice(); os.nav('home'); });
// ===== INTELLIGENCE STREAM =====
const signals = [
  "AI anomaly detected in logistics system",
  "Robotic failure risk ↑ 12%",
  "Neural optimization triggered",
  "Predictive alert: downtime risk",
  "System efficiency improved +8.2%",
  "AI cost leak detected in pipeline"
];

function startFeed(){
  const el = document.getElementById("liveFeed");
  if(!el) return;

  setInterval(()=>{
    const msg = signals[Math.floor(Math.random()*signals.length)];
    const div = document.createElement("div");
    div.className = "feed-item";
    div.innerText = "● " + msg;

    el.prepend(div);

    if(el.children.length > 6){
      el.removeChild(el.lastChild);
    }
  }, 2000);
}

startFeed();
