const grid=document.getElementById("grid")

for(let i=0;i<64;i++){

let cell=document.createElement("div")
cell.className="cell"

let value=Math.random()

cell.style.background=`rgba(125,211,252,${value})`

grid.appendChild(cell)

}
