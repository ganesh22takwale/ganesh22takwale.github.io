const beamCanvas = document.createElement("canvas");
beamCanvas.id = "beam-layer";
document.body.appendChild(beamCanvas);

const ctxB = beamCanvas.getContext("2d");

function resizeBeam(){
  beamCanvas.width = window.innerWidth;
  beamCanvas.height = window.innerHeight;
}
resizeBeam();
window.addEventListener("resize", resizeBeam);

function drawBeams(){
  ctxB.clearRect(0,0,beamCanvas.width,beamCanvas.height);

  let cx = window.innerWidth/2;
  let cy = window.innerHeight/2;

  document.querySelectorAll(".btn").forEach(btn=>{
    let r = btn.getBoundingClientRect();

    let x = r.left + r.width/2;
    let y = r.top + r.height/2;

    ctxB.beginPath();
    ctxB.moveTo(x,y);
    ctxB.lineTo(cx,cy);
    ctxB.strokeStyle="rgba(0,255,255,0.2)";
    ctxB.stroke();
  });

  requestAnimationFrame(drawBeams);
}
drawBeams();
