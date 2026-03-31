function runRisk() {
    // 1. Get Values
    const scale = Number(document.getElementById("scale").value);
    const downtime = Number(document.getElementById("downtime").value);
    const recovery = Number(document.getElementById("recovery").value);
    const human = Number(document.getElementById("human").value);

    // 2. Calculate Logic
    const exposure = downtime * recovery * scale;
    const humanFactor = human * scale;
    const totalRisk = exposure + humanFactor;

    // 3. UI Interactions
    const resultWrapper = document.getElementById("resultWrapper");
    resultWrapper.classList.remove("hidden");

    // Update Totals
    document.getElementById("riskValue").innerText = `$${totalRisk.toLocaleString()}`;
    document.getElementById("opLoss").innerText = `$${exposure.toLocaleString()}`;
    document.getElementById("laborImpact").innerText = `$${humanFactor.toLocaleString()}`;

    // 4. Maturity Logic & Dynamic Styling
    const badge = document.getElementById("maturityBadge");
    const riskDisplay = document.getElementById("riskValue");
    
    let maturity = "LOW";
    let color = "var(--danger)";

    if (totalRisk < 500000) {
        maturity = "MODERATE";
        color = "var(--warning)";
    }
    if (totalRisk < 250000) {
        maturity = "STRONG";
        color = "var(--success)";
    }

    badge.innerText = `${maturity} MATURITY REQUIRED`;
    badge.style.background = color;
    riskDisplay.style.color = color;
}
