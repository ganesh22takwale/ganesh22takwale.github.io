/* Cursor */
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

/* Headline Variant */
const h = document.getElementById("hero-headline");
const variants = JSON.parse(h.dataset.variants);
const index = Math.floor(Math.random() * variants.length);
h.innerHTML = variants[index];

/* GSAP Animations */
gsap.from(h, { opacity: 0, y: 40, duration: 1.2 });
gsap.from("#hero-subtext", { opacity: 0, y: 20, delay: .4 });

document.querySelectorAll(".bar").forEach(bar => {
  gsap.to(bar, {
    width: bar.dataset.level + "%",
    duration: 2,
    scrollTrigger: {
      trigger: bar,
      start: "top 80%"
    }
  });
});

/* Lightweight Three.js Background */
if (window.innerWidth > 768) {
  const canvas = document.getElementById("bg-canvas");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
  camera.position.z = 60;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));

  const nodes = [];
  const geo = new THREE.SphereGeometry(.6, 12, 12);
  const mat = new THREE.MeshBasicMaterial({ color: 0x9efcff });

  for (let i = 0; i < 120; i++) {
    const n = new THREE.Mesh(geo, mat);
    n.position.set(
      (Math.random() - .5) * 80,
      (Math.random() - .5) * 80,
      (Math.random() - .5) * 80
    );
    scene.add(n);
    nodes.push(n);
  }

  function animate() {
    requestAnimationFrame(animate);
    nodes.forEach(n => {
      n.rotation.x += .002;
      n.rotation.y += .003;
    });
    renderer.render(scene, camera);
  }
  animate();
}
