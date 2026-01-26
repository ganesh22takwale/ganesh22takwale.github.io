/* ===============================
   DEVICE + NETWORK LOD CONTROLLER
================================ */
const conn = navigator.connection || {};
const net = conn.effectiveType || "4g";
const save = conn.saveData;
const mem = navigator.deviceMemory || 4;

let LOD = 0;
if (save || net.includes("2g") || mem <= 2) LOD = 2;
else if (net.includes("3g") || mem <= 4) LOD = 1;

/* ===============================
   CUSTOM CURSOR
================================ */
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", e=>{
  cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
});

/* ===============================
   HEADLINE VARIANT ROTATION
================================ */
const h=document.getElementById("hero-headline");
const variants=JSON.parse(h.dataset.variants);
let v=sessionStorage.getItem("variant");
if(v===null){v=Math.floor(Math.random()*variants.length);sessionStorage.setItem("variant",v);}
h.innerHTML=variants[v];
trackEvent("variant_"+v);

/* ===============================
   GSAP ANIMATIONS
================================ */
gsap.from("#hero-headline",{opacity:0,y:40,duration:1.2});
gsap.from("#hero-subtext",{opacity:0,y:20,delay:.5});

document.querySelectorAll(".bar").forEach(bar=>{
  gsap.to(bar,{
    width:bar.dataset.level+"%",
    duration:2,
    scrollTrigger:{trigger:bar,start:"top 80%"}
  });
});

/* ===============================
   CTA
================================ */
document.getElementById("cta").onclick=()=>trackEvent("cta_click");

/* ===============================
   THREE.JS NEURAL NET (LOD)
================================ */
if(LOD<2){
  const canvas=document.getElementById("bg-canvas");
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,0.1,1000);
  camera.position.z=60;

  const renderer=new THREE.WebGLRenderer({canvas,alpha:true});
  renderer.setSize(innerWidth,innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio,LOD===0?2:1));

  const nodes=[];
  const geo=new THREE.SphereGeometry(0.6,12,12);
  const mat=new THREE.MeshBasicMaterial({color:0x9efcff});

  const count=LOD===0?160:80;
  for(let i=0;i<count;i++){
    const m=new THREE.Mesh(geo,mat);
    m.position.set((Math.random()-.5)*80,(Math.random()-.5)*80,(Math.random()-.5)*80);
    scene.add(m);nodes.push(m);
  }

  function animate(){
    requestAnimationFrame(animate);
    nodes.forEach(n=>{n.rotation.x+=0.002;n.rotation.y+=0.003});
    renderer.render(scene,camera);
  }
  animate();
}
