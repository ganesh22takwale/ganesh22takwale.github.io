// Context-aware text (top of file)
const ctx = document.getElementById("contextText");

if (localStorage.getItem("grt_architecture_seen")) {
  ctx.textContent =
    "You examined architectural foundations. This diagnostic emphasizes reliability trade-offs.";
} else {
  ctx.textContent =
    "This diagnostic highlights how speed-first decisions impact trust and system stability.";
}

// Decision buttons logic (BOTTOM of file)
document.querySelectorAll(".decision").forEach(btn => {
  btn.onclick = () => {
    btn.classList.add("active");

    setTimeout(() => {
      btn.classList.remove("active");
      alert("Decision recorded. System state updated.");
    }, 300);
  };
});
