function update(){

let acc=(0.9+Math.random()*0.05).toFixed(3)
let loss=(Math.random()*0.1).toFixed(3)

document.getElementById("acc").innerText=acc
document.getElementById("loss").innerText=loss

}

setInterval(update,2000)
