let state={reliability:80};

document.querySelectorAll(".decision").forEach(b=>{
  b.onclick=()=>{
    state.reliability += b.dataset.action==="speed"?-10:10;
    alert("System reliability now: "+state.reliability+"%");
  };
});
