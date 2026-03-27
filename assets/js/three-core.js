const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  window.GRT_CONFIG.mode === "energy"
    ? window.GRT_CONFIG.coreLogo
    : window.GRT_CONFIG.premiumLogo
);

const material = new THREE.MeshBasicMaterial({
  map: texture,
});
