document.querySelectorAll(".tier").forEach(t => {
  t.addEventListener("touchstart", () => {
    t.style.transform = "scale(1.05)";
    if (navigator.vibrate) navigator.vibrate(10);
  });
  t.addEventListener("touchend", () => {
    t.style.transform = "scale(1)";
  });
});
