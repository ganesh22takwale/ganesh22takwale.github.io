const fab = document.getElementById("fab");
const risk = document.getElementById("risk");

const riskOut = document.getElementById("riskOut");
const saveOut = document.getElementById("saveOut");

const preventOut = document.getElementById("preventOut");
const trustOut = document.getElementById("trustOut");
const totalOut = document.getElementById("totalOut");

function calculateROIv4(){

const r = Number(risk.value);
const f = Number(fab.value)/100;

/* Core Risk Exposure */
const annualRisk = r;

/* Architecture Prevention */
const preventable = annualRisk * (0.35 + (f*0.4));

/* Trust / Decision Value */
const trustValue = preventable * 0.25;

/* Total ROI */
const totalROI = preventable + trustValue;

riskOut.textContent = annualRisk.toFixed(0);
saveOut.textContent = preventable.toFixed(0);

if(preventOut) preventOut.textContent = preventable.toFixed(0);
if(trustOut) trustOut.textContent = trustValue.toFixed(0);
if(totalOut) totalOut.textContent = totalROI.toFixed(0);

}

fab.oninput = calculateROIv4;
risk.oninput = calculateROIv4;

calculateROIv4();
