/* ======================================
GLOBAL UI ENGINE
====================================== */

const revealElements = document.querySelectorAll(
".system-card, .card, .roi-mini-card, .pill-row span"
)

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.style.opacity = 1
entry.target.style.transform = "translateY(0)"

}

})

},{threshold:.15})

revealElements.forEach(el=>{

el.style.opacity = 0
el.style.transform = "translateY(40px)"
el.style.transition = "all .8s cubic-bezier(.22,1,.36,1)"

observer.observe(el)

})

/* ======================================
HERO LIGHT PULSE
====================================== */

const hero = document.querySelector(".hero h1")

let glow = 0

function heroPulse(){

glow += .02

if(hero){

hero.style.textShadow = `
0 0 ${20+Math.sin(glow)*10}px rgba(125,211,252,.6),
0 0 ${60+Math.sin(glow)*20}px rgba(227,167,255,.35)
`

}

requestAnimationFrame(heroPulse)

}

heroPulse()
