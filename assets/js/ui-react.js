document.querySelectorAll(".card, .btn").forEach(el => {

  el.addEventListener("mouseenter", () => {
    el.style.boxShadow = "0 0 30px cyan";
    el.style.transform = "scale(1.05)";
  });

  el.addEventListener("mouseleave", () => {
    el.style.boxShadow = "none";
    el.style.transform = "scale(1)";
  });

});

// touch ripple
document.addEventListener("touchstart", e => {
  let ripple = document.createElement("div");
  ripple.className = "touch-ripple";

  ripple.style.left = e.touches[0].clientX + "px";
  ripple.style.top = e.touches[0].clientY + "px";

  document.body.appendChild(ripple);

  setTimeout(()=>ripple.remove(),600);
});
