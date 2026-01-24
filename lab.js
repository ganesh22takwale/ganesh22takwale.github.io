const context = document.getElementById("contextText");

if (localStorage.getItem("focusedOnArchitecture")) {
  context.textContent =
    "You explored architectural foundations. This simulation emphasizes reliability.";
} else {
  context.textContent =
    "This simulation reveals how speed-first decisions affect trust.";
}

document.querySelectorAll(".decision").forEach(btn=>{
  btn.onclick=()=>{
    alert("Decision registered. Architectural impact recorded.");
  };
});
