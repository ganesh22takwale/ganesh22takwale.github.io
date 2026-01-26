const fab = document.getElementById("fab");
const risk = document.getElementById("risk");

const riskOut = document.getElementById("riskOut");
const saveOut = document.getElementById("saveOut");

function update() {
  const r = Number(risk.value);
  const f = Number(fab.value) / 100;
  riskOut.textContent = r;
  saveOut.textContent = Math.round(r * ROI_FACTOR * f);
}

fab.oninput = update;
risk.oninput = update;
update();
