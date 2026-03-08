const canvas = document.getElementById("network")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const nodes = []
const count = 70

for(let i=0;i<count;i++){

nodes.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-.5)*.4,
vy:(Math.random()-.5)*.4
})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

nodes.forEach(n=>{

n.x+=n.vx
n.y+=n.vy

if(n.x<0||n.x>canvas.width)n.vx*=-1
if(n.y<0||n.y>canvas.height)n.vy*=-1

ctx.beginPath()
ctx.arc(n.x,n.y,2,0,Math.PI*2)
ctx.fillStyle="#7dd3fc"
ctx.fill()

})

for(let i=0;i<nodes.length;i++){

for(let j=i+1;j<nodes.length;j++){

const dx=nodes[i].x-nodes[j].x
const dy=nodes[i].y-nodes[j].y
const dist=Math.sqrt(dx*dx+dy*dy)

if(dist<140){

ctx.beginPath()
ctx.moveTo(nodes[i].x,nodes[i].y)
ctx.lineTo(nodes[j].x,nodes[j].y)
ctx.strokeStyle="rgba(125,211,252,.15)"
ctx.stroke()

}

}

}

requestAnimationFrame(draw)

}

draw()
