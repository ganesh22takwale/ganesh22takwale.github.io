const $=id=>document.getElementById(id);
const budget=$("budget"),memory=$("memory"),alignment=$("alignment"),monitoring=$("monitoring");
const rel=$("reliability"),risk=$("risk"),trust=$("trust");

function update(){
  bVal.textContent=budget.value;
  mVal.textContent=memory.value;
  aVal.textContent=alignment.value;
  moVal.textContent=monitoring.value;

  let r=Math.min(100,budget.value*.5+alignment.value*5+monitoring.value*4);
  let k=100-r+(memory.value>7&&monitoring.value<4?15:0);
  let t=Math.max(0,r-k*.6);

  rel.style.width=r+"%";
  risk.style.width=k+"%";
  trust.style.width=t+"%";
}

[budget,memory,alignment,monitoring].forEach(i=>i.oninput=update);
update();
