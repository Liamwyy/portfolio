const projectModels = [
  { 
    title: "TrendVogue", 
    file: "assets/models/tv.glb", 
    link: "https://trendvouge-frontend1.vercel.app/",
    description: "An immersive digital storefront module configured for adaptive inventory layouts and rich thematic client interfaces.",
    imagePlaceholder: "TRENDVOGUE SCREENSHOT PLACEHOLDER",
    techStack: ["Next.js", "Three.js", "Tailwind CSS"]
  },
  { 
    title: "Article Analyzer", 
    file: "assets/models/aa.glb", 
    link: "https://github.com/minmyataung54/CPE_393_MLOps",
    description: "Machine learning pipeline implementation running operational natural language processors to classify article data structures.",
    imagePlaceholder: "MLOPS ANALYZER DIAGRAM PLACEHOLDER",
    techStack: ["Python", "FastAPI", "Docker", "Scikit-Learn"]
  },
  { 
    title: "Nexus:KMUTT-AI-Service", 
    file: "assets/models/nexus.glb", 
    link: "#",
    description: "An automated gateway engine aggregating artificial intelligence nodes and services across local institutional sub-nets.",
    imagePlaceholder: "AI SERVICE NETWORK NODE PLACEHOLDER",
    techStack: ["React", "Node.js", "PyTorch", "gRPC"]
  },
  { 
    title: "Fire Spelling Game", 
    file: "assets/models/kkb.glb", 
    link: "https://mango-bush-08ffdc31e.3.azurestaticapps.net/",
    description: "A fast-paced interactive spelling environment featuring custom state-driven gamification layout frameworks.",
    imagePlaceholder: "GAME VIEWPORT SCREENSHOT PLACEHOLDER",
    techStack: ["HTML5 Canvas", "JavaScript", "Azure Apps"]
  }
];

const navButtons = document.querySelectorAll('#sidebar-nav .nav-btn');
const panels = document.querySelectorAll('.view-panel');
const terminalTitle = document.getElementById('terminal-title');
const viewport = document.getElementById('window-viewport');
const ball = document.getElementById('scroll-ball');

const drawerToggleBtn = document.getElementById('drawer-toggle-btn');
const mobileDrawer = document.getElementById('mobile-drawer-sidebar');

if (drawerToggleBtn && mobileDrawer) {
  drawerToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileDrawer.classList.toggle('drawer-open');
    drawerToggleBtn.textContent = mobileDrawer.classList.contains('drawer-open') ? '<' : '>';
  });

  document.addEventListener('click', (e) => {
    if (!mobileDrawer.contains(e.target) && e.target !== drawerToggleBtn) {
      mobileDrawer.classList.remove('drawer-open');
      drawerToggleBtn.textContent = '>';
    }
  });
}

navButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = btn.getAttribute('data-target');

    navButtons.forEach(b => b.classList.remove('state-active'));
    btn.classList.add('state-active');

    panels.forEach(p => p.classList.add('hidden-panel-state'));
    document.getElementById(`panel-${target}`).classList.remove('hidden-panel-state');

    terminalTitle.innerText = `. // ${btn.textContent}`;
    viewport.scrollTop = 0;
    updateScrollbar();
    
    if (mobileDrawer) {
      mobileDrawer.classList.remove('drawer-open');
      if(drawerToggleBtn) drawerToggleBtn.textContent = '>';
    }

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 50);
  });
});

const viewMoreBtn = document.getElementById('view-more-link');
if (viewMoreBtn) {
  viewMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const projBtn = document.querySelector('[data-target="projects"]');
    if (projBtn) projBtn.click();
  });
}

function updateScrollbar() {
  if (viewport && ball) {
    const scrolled = viewport.scrollTop / (viewport.scrollHeight - viewport.clientHeight);
    const moveAmount = (scrolled || 0) * (viewport.clientHeight - 36);
    ball.style.transform = `translate3d(-50%, ${moveAmount}px, 0)`;
  }
}
viewport.addEventListener('scroll', updateScrollbar);

const systemWindow = document.getElementById('main-system-window');
const sysMinimize = document.getElementById('sys-minimize');
const sysMaximize = document.getElementById('sys-maximize');
const sysClose = document.getElementById('sys-close');

const crashPopup = document.getElementById('crash-alert-popup');
const popupClose = document.getElementById('popup-close-trigger');

if (sysClose && crashPopup) {
  sysClose.addEventListener('click', () => {
    crashPopup.style.display = 'flex';
  });
}
if (popupClose) {
  popupClose.addEventListener('click', () => {
    crashPopup.style.display = 'none';
  });
}

if (sysMinimize && systemWindow) {
  sysMinimize.addEventListener('click', () => {
    systemWindow.classList.remove('system-state-maximized');
    systemWindow.classList.toggle('system-state-minimized');
    setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 400);
  });
}

if (sysMaximize && systemWindow) {
  sysMaximize.addEventListener('click', () => {
    systemWindow.classList.remove('system-state-minimized');
    systemWindow.classList.toggle('system-state-maximized');
    setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 400);
  });
}

const detailsOverlay = document.getElementById('details-modal-overlay');
const detailsTitle = document.getElementById('modal-project-title');
const detailsDesc = document.getElementById('modal-project-description');
const detailsLink = document.getElementById('modal-project-link');
const detailsClose = document.getElementById('details-close-trigger');
const modalImageSlot = document.getElementById('modal-image-container');
const modalTechIconsRow = document.getElementById('modal-tech-icons-row');

if (detailsClose && detailsOverlay) {
  detailsClose.addEventListener('click', () => {
    detailsOverlay.style.display = 'none';
  });
}

function displayProjectDetails(index) {
  const data = projectModels[index];
  if (data && detailsOverlay) {
    detailsTitle.innerText = data.title;
    detailsDesc.innerText = data.description;
    
    modalImageSlot.innerHTML = `<span>${data.imagePlaceholder}</span>`;
    
    modalTechIconsRow.innerHTML = '';
    data.techStack.forEach(techName => {
      const badge = document.createElement('div');
      badge.className = 'tech-icon-badge';
      badge.innerHTML = `
        <span class="badge-icon-placeholder" title="${techName} Icon Placeholder"></span>
        <span class="badge-text">${techName}</span>
      `;
      modalTechIconsRow.appendChild(badge);
    });

    detailsLink.href = data.link;
    if (data.link === "#") {
      detailsLink.style.display = 'none';
    } else {
      detailsLink.style.display = 'inline-block';
      detailsLink.innerText = `GitHub Link`;
    }
    detailsOverlay.style.display = 'flex';
  }
}

const activeScenes = [];
const mainGridContainer = document.getElementById('ps2-card-grid');
const homeGridContainer = document.getElementById('home-projects-grid');

function initializeProjectCard(container, modelData, globalIndex) {
  if (!container) return;
  const card = document.createElement('div');
  card.className = "ps2-gltf-card-element";
  card.setAttribute('data-index', globalIndex);
  
  const canvasId = `canvas-slot-${container.id}-${globalIndex}`;
  card.innerHTML = `
    <div id="${canvasId}" class="canvas-3d-viewport-box"></div>
    <div class="project-title-label font-header">${modelData.title}</div>
  `;
  container.appendChild(card);

  card.addEventListener('click', () => {
    displayProjectDetails(globalIndex);
  });

  const containerElement = document.getElementById(canvasId);
  const scene = new THREE.Scene();
  
  const initialWidth = containerElement.clientWidth || 130;
  const camera = new THREE.PerspectiveCamera(45, initialWidth / 90, 0.1, 100);
  camera.position.set(0, 0, 5.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(initialWidth, 90);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  containerElement.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight.position.set(2, 4, 3);
  scene.add(directionalLight);

  const loader = new THREE.GLTFLoader();
  let loadedMesh = null;

  loader.load(modelData.file, (gltf) => {
    loadedMesh = gltf.scene;
    const box = new THREE.Box3().setFromObject(loadedMesh);
    const center = box.getCenter(new THREE.Vector3());
    loadedMesh.position.sub(center);
    scene.add(loadedMesh);
  }, undefined, (error) => {
    const geometry = new THREE.BoxGeometry(0.65, 0.65, 0.65);
    const material = new THREE.MeshStandardMaterial({ color: 0x1a2f4c, wireframe: true });
    loadedMesh = new THREE.Mesh(geometry, material);
    scene.add(loadedMesh);
  });

  activeScenes.push({
    scene, camera, renderer, containerElement,
    animate: (time) => {
      if (loadedMesh) {
        loadedMesh.rotation.y += 0.01;
        loadedMesh.position.y = Math.sin(time * 0.0018) * 0.05;
      }
      renderer.render(scene, camera);
    }
  });
}

if (mainGridContainer) {
  projectModels.forEach((modelData, index) => {
    initializeProjectCard(mainGridContainer, modelData, index);
  });
}

if (homeGridContainer) {
  projectModels.forEach((modelData, index) => {
    if (modelData.title === "Nexus:KMUTT-AI-Service" || modelData.title === "Article Analyzer") {
      initializeProjectCard(homeGridContainer, modelData, index);
    }
  });
}

function globalRenderLoop(time) {
  activeScenes.forEach(item => item.animate(time));
  requestAnimationFrame(globalRenderLoop);
}
requestAnimationFrame(globalRenderLoop);

window.addEventListener('resize', () => {
  activeScenes.forEach(item => {
    const w = item.containerElement.clientWidth;
    if (w > 0) {
      item.camera.aspect = w / 90;
      item.camera.updateProjectionMatrix();
      item.renderer.setSize(w, 90);
    }
  });

});

