if (sessionStorage.getItem("grt_used")) {
  document.body.innerHTML =
    "<div style='padding:120px;font-family:Inter'><h2>Session Completed</h2><p>This simulation runs once per visit.</p></div>";
  throw new Error("Session used");
}
sessionStorage.setItem("grt_used","true");

const $=id=>document.getElementById(id);

const budget=$("budget"),memory=$("memory"),alignment=$("alignment"),monitoring=$("monitoring");
const rel=$("reliability"),risk=$("risk"),trust=$("trust"),events=$("events");

function update(){
  bVal.textContent=budget.value;
  mVal.textContent=memory.value;
  aVal.textContent=alignment.value;
  moVal.textContent=monitoring.value;
  events.innerHTML="";

  const b=+budget.value,m=+memory.value,a=+alignment.value,mo=+monitoring.value;

  let reliability=Math.min(100,b*.5+a*5+mo*4);
  let riskScore=100-reliability;

  if(m>7&&mo<4){riskScore+=18;log("Unmonitored memory caused latent failure.");}
  if(a<4){riskScore+=12;log("Weak alignment degraded trust.");}

  let trustScore=Math.max(0,reliability-riskScore*.6);

  rel.style.width=reliability+"%";
  risk.style.width=riskScore+"%";
  trust.style.width=trustScore+"%";

  if(window.gtag){
    gtag("event","simulation_update",{reliability,risk:riskScore,trust:trustScore});
  }
}

function log(t){
  const e=document.createElement("div");
  e.className="event";
  e.textContent="• "+t;
  events.appendChild(e);
}

[budget,memory,alignment,monitoring].forEach(i=>i.oninput=update);
update();
