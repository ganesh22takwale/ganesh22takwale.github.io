function updateTelemetry(){

const rel=(96+Math.random()*3).toFixed(2)
const conf=(0.90+Math.random()*0.08).toFixed(2)
const risk=Math.floor(Math.random()*5)+1

document.getElementById("relIndex").innerText=rel+"%"
document.getElementById("decConf").innerText=conf
document.getElementById("riskSurf").innerText=risk

}

setInterval(updateTelemetry,2000)
