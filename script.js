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
