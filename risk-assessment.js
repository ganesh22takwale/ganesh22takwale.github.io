function runRisk(){

  const scale = Number(document.getElementById("scale").value);
  const downtime = Number(document.getElementById("downtime").value);
  const recovery = Number(document.getElementById("recovery").value);
  const human = Number(document.getElementById("human").value);

  const exposure = downtime * recovery * scale;
  const humanFactor = human * scale;

  const totalRisk = exposure + humanFactor;

  let maturity = "LOW";

  if(totalRisk < 500000) maturity = "MODERATE";
  if(totalRisk < 250000) maturity = "STRONG";

  document.getElementById("riskOutput").innerHTML = `
    <h2>Risk Exposure: $${totalRisk.toLocaleString()}</h2>
    <p>Architecture Maturity Need: ${maturity}</p>
  `;

}

