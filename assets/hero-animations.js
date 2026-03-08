const hero = document.querySelector(".hero h1")

let glow = 0

function animateHero(){

glow+=0.02

hero.style.textShadow = `
0 0 ${20+Math.sin(glow)*10}px rgba(125,211,252,.8),
0 0 ${60+Math.sin(glow)*20}px rgba(227,167,255,.6)
`

requestAnimationFrame(animateHero)

}

animateHero()
