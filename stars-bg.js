const c = document.getElementById("stars");
const ctx = c.getContext("2d");
let w,h,stars=[];

function resize(){
  w=c.width=innerWidth;
  h=c.height=innerHeight;
  stars=[...Array(120)].map(()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.5}));
}
window.onresize=resize; resize();

(function draw(){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle="#9bdcff";
  stars.forEach(s=>{
    ctx.globalAlpha=Math.random();
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
})();
