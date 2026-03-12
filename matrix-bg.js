const matrixCanvas = document.createElement("canvas");
document.body.appendChild(matrixCanvas);

const mtx = matrixCanvas.getContext("2d");

matrixCanvas.style.position="fixed";
matrixCanvas.style.zIndex="-5";
matrixCanvas.style.top="0";

matrixCanvas.width=window.innerWidth;
matrixCanvas.height=window.innerHeight;

const letters="AIARCHITECTURE101010";

const fontSize=14;
const columns=matrixCanvas.width/fontSize;

let drops=[];

for(let i=0;i<columns;i++){
drops[i]=1;
}

function matrix(){

mtx.fillStyle="rgba(0,0,0,0.05)";
mtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);

mtx.fillStyle="#00eaff";
mtx.font=fontSize+"px monospace";

for(let i=0;i<drops.length;i++){

let text=letters[Math.floor(Math.random()*letters.length)];

mtx.fillText(text,i*fontSize,drops[i]*fontSize);

if(drops[i]*fontSize>matrixCanvas.height && Math.random()>0.975){
drops[i]=0;
}

drops[i]++;

}

}

setInterval(matrix,35);
