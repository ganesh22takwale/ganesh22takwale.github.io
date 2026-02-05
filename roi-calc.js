/* =========================================
ROI V4 — ENTERPRISE CALCULATION ENGINE
========================================= */

/* DOM ELEMENTS */
const fab = document.getElementById("fab");
const risk = document.getElementById("risk");

const riskOut = document.getElementById("riskOut");
const saveOut = document.getElementById("saveOut");

const preventOut = document.getElementById("preventOut");
const trustOut = document.getElementById("trustOut");
const totalOut = document.getElementById("totalOut");

const roiBar = document.getElementById("roiBar");

/* =========================================
MAIN CALCULATION
========================================= */

function calculateROIv4(){

if(!fab || !risk) return;

const r = Number(risk.value);
const f = Number(fab.value)/100;

/* 1️⃣ Annual Risk Exposure */
const annualRisk = r;

/* 2️⃣ Architecture Prevention Value */
const preventable = annualRisk * (0.35 + (f * 0.4));

/* 3️⃣ Trust / Decision Integrity Value */
const trustValue = preventable * 0.25;

/* 4️⃣ Total Intelligence ROI */
const totalROI = preventable + trustValue;

/* =========================================
OUTPUT RENDER
========================================= */

if(riskOut) riskOut.textContent = annualRisk.toFixed(0);
if(saveOut) saveOut.textContent = preventable.toFixed(0);

if(preventOut) preventOut.textContent = preventable.toFixed(0);
if(trustOut) trustOut.textContent = trustValue.toFixed(0);
if(totalOut) totalOut.textContent = totalROI.toFixed(0);

/* =========================================
ROI VISUAL BAR
========================================= */

if(roiBar){
roiBar.style.width = Math.min(totalROI * 2, 100) + "%";
}

}

/* =========================================
EVENT BINDING
========================================= */

if(fab) fab.addEventListener("input", calculateROIv4);
if(risk) risk.addEventListener("input", calculateROIv4);

/* =========================================
INITIAL RUN
========================================= */

calculateROIv4();
