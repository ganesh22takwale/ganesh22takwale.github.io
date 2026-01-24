// Year
document.getElementById("year").textContent = new Date().getFullYear();

// System cards
document.querySelectorAll(".system-card").forEach(card=>{
  card.addEventListener("click",()=>{
    document.querySelectorAll(".system-card").forEach(c=>{
      if(c!==card) c.classList.remove("active");
    });
    card.classList.toggle("active");
  });
});

// Blueprint modal
const modal=document.getElementById("bpModal");
const bpTitle=document.getElementById("bpTitle");
const bpImage=document.getElementById("bpImage");

document.querySelectorAll(".bp-tile").forEach(tile=>{
  tile.addEventListener("click",()=>{
    bpTitle.textContent=tile.dataset.title;
    bpImage.src=tile.dataset.src;
    modal.classList.add("open");
    track("blueprint_open",{title:tile.dataset.title});
  });
});

document.getElementById("bpClose").onclick=()=>modal.classList.remove("open");

// Starfield
const canvas=document.getElementById("stars");
const ctx=canvas.getContext("2d");
let w,h,stars=[];
function resize(){
  w=canvas.width=innerWidth;
  h=canvas.height=innerHeight;
}
resize();addEventListener("resize",resize);

stars=[...Array(180)].map(()=>({x:Math.random()*w,y:Math.random()*h,z:Math.random()*w}));

function animate(){
  ctx.fillStyle="#000";
  ctx.fillRect(0,0,w,h);
  stars.forEach((s,i)=>{
    s.z-=2;if(s.z<=0)s.z=w;
    const k=128/s.z;
    const x=(s.x-w/2)*k+w/2;
    const y=(s.y-h/2)*k+h/2;
    ctx.fillStyle=i%2?"rgba(227,167,255,.9)":"rgba(125,211,252,.9)";
    ctx.fillRect(x,y,2,2);
  });
  requestAnimationFrame(animate);
}
animate();

// GA4 events
function track(name,params={}){
  if(typeof gtag==="function"){
    gtag("event",name,{...params,page_location:location.href});
  }
}

document.querySelectorAll('[data-track="open-workflows"]').forEach(el=>{
  el.onclick=()=>track("cta_open_workflows");
});
document.querySelectorAll('[data-track="open-simulation"]').forEach(el=>{
  el.onclick=()=>track("cta_simulation_open");
});
