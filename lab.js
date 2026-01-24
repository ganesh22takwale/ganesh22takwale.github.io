const ctx = document.getElementById("labContext");

if(localStorage.getItem("grt_architecture_focus")){
  ctx.textContent =
    "Your focus suggests architectural awareness. This diagnostic emphasizes reliability trade-offs.";
}else{
  ctx.textContent =
    "This diagnostic reveals how speed-first decisions impact trust and stability.";
}

document.querySelectorAll(".decision").forEach(btn=>{
  btn.onclick=()=>{
    alert("Decision recorded. System state updated.");
  };
});
