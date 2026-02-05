function runMiniROI(){

const cost = Number(document.getElementById("miniCost").value);
const hours = Number(document.getElementById("miniHours").value);
const events = Number(document.getElementById("miniEvents").value);

const annualRisk = cost * hours * events;
const preventable = annualRisk * 0.42;
const trustValue = preventable * 0.22;
const total = preventable + trustValue;

document.getElementById("miniROIOutput").innerHTML = `
<h3>Annual Risk Exposure: $${annualRisk.toLocaleString()}</h3>
<h3>Preventable Loss: $${preventable.toLocaleString()}</h3>
<h2>Total Intelligence ROI Signal: $${total.toLocaleString()}</h2>
`;

}

