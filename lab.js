let state={reliability:80,velocity:60,trust:70};

const r=document.getElementById("reliability");
const v=document.getElementById("velocity");
const t=document.getElementById("trust");

document.querySelectorAll(".decision").forEach(btn=>{
  btn.onclick=()=>{
    if(btn.dataset.action==="observe"){
      state.reliability+=5; state.velocity-=3;
    }
    if(btn.dataset.action==="ship"){
      state.velocity+=6; state.trust-=4;
    }
    if(btn.dataset.action==="fallback"){
      state.reliability+=6;
    }
    render();
  }
});

function render(){
  r.textContent=state.reliability+"%";
  v.textContent=state.velocity;
  t.textContent=state.trust+"%";
}
render();
