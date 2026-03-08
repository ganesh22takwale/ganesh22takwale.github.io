const scene=new THREE.Scene()

const camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const renderer=new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)

camera.position.z=200

const nodes=[]

for(let i=0;i<6;i++){

const geo=new THREE.SphereGeometry(6)

const mat=new THREE.MeshBasicMaterial({color:0x7dd3fc})

const mesh=new THREE.Mesh(geo,mat)

mesh.position.x=Math.random()*200-100
mesh.position.y=Math.random()*200-100
mesh.position.z=Math.random()*200-100

scene.add(mesh)

nodes.push(mesh)

}

function animate(){

requestAnimationFrame(animate)

scene.rotation.y+=0.002

renderer.render(scene,camera)

}

animate()
