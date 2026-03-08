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

camera.position.z=150

const geometry=new THREE.SphereGeometry(5)

const material=new THREE.MeshBasicMaterial({color:0x00e5ff})

for(let i=0;i<5;i++){

const node=new THREE.Mesh(geometry,material)

node.position.set(i*30-60,0,0)

scene.add(node)

}

function animate(){

requestAnimationFrame(animate)

scene.rotation.y+=0.002

renderer.render(scene,camera)

}

animate()
