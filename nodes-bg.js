const n = document.getElementById("nodes");
const nx = n.getContext("2d");
let W,H,p=[];

function rs(){
  W=n.width=innerWidth;
  H=n.height=innerHeight;
  p=[...Array(40)].map(()=>({x:Math.random()*W,y:Math.random()*H}));
}
window.onresize=rs; rs();

(function anim(){
  nx.clearRect(0,0,W,H);
  nx.strokeStyle="rgba(155,220,255,.15)";
  p.forEach(a=>{
    p.forEach(b=>{
      const d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<160){
        nx.beginPath();
        nx.moveTo(a.x,a.y);
        nx.lineTo(b.x,b.y);
        nx.stroke();
      }
    });
  });
  requestAnimationFrame(anim);
})();
