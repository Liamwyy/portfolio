const projectModels = [
  { 
    title: "TrendVogue", 
    file: "assets/models/tv.glb", 
    link: "https://trendvouge-frontend1.vercel.app/",
    description: "An online e-commerce platform that has features like outfit recommendations, outfits that match and similar items. Worked on UI & UX design along with the similar items feature.",
    imagePlaceholder: "assets/images/trendv.png",
    techStack: ["Next.js", "Three.js", "Tailwind CSS"]
  },
  { 
    title: "Article Analyzer", 
    file: "assets/models/aa.glb", 
    link: null,
    github: "https://github.com/minmyataung54/CPE_393_MLOps",
    description: "A machine learning pipeline for analyzing and processing Burmese articles and classifying them as crisis or non-crisis. Worked on creating a simple frontend using HTML+CSS and backend using FlaskAPI. Also trained on sckit-learn and uses current events and articles which are labelled by the team.",
    imagePlaceholder: "assets/images/mlops.png",
    techStack: ["Python", "FlaskAPI", "Docker", "Scikit-Learn"]
  },
  { 
    title: "Nexus:KMUTT-AI-Service", 
    file: "assets/models/nexus.glb", 
    link: "https://nexus.dev.cpe.kmutt.ac.th/",
    github: "https://github.com/aritatgml/open-webui/tree/my-deployment",
    description: "A centralized AI service platform for users to access both local and cloud-based AI models from various providers with a KMUTT account. Deployed on a Linux server with Docker and Caddy using MS AD authentication for user access control. Python was used to create tools and the optimizer which decides what model to use base on prompt.",
    imagePlaceholder: "assets/images/nexus.png",
    techStack: ["OpenWebUI", "Python", "Docker", "Linux Commands"]
  },
  { 
    title: "Fire Spelling Game", 
    file: "assets/models/kkb.glb", 
    link: "https://mango-bush-08ffdc31e.3.azurestaticapps.net/",
    description: "A fast-paced interactive spelling environment featuring English proficiency levels from A1 to C2. Created the sound effects and UI design.",
    imagePlaceholder: "assets/images/fgss.png",
    techStack: ["HTML5 Canvas", "JavaScript", ]
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
const detailsLiveLink = document.getElementById('modal-live-link');
const detailsGithubLink = document.getElementById('modal-github-link');
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
    detailsOverlay.style.display = 'flex';
    detailsTitle.innerText = data.title;
    detailsDesc.innerText = data.description;
    
    if (data.imagePlaceholder.startsWith('/') || data.imagePlaceholder.startsWith('http') || data.imagePlaceholder.startsWith('assets/')) {
      modalImageSlot.innerHTML = `<img src="${data.imagePlaceholder}" alt="${data.title} Screenshot" style="max-width: 100%; height: auto; display: block;" />`;
    } else {
      modalImageSlot.innerHTML = `<span>${data.imagePlaceholder}</span>`;
    }
    
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

    if (data.link) {
  detailsLiveLink.href = data.link;
  detailsLiveLink.style.display = 'inline-block';
  detailsLiveLink.innerText = 'Live Site ↗';
} else {
  detailsLiveLink.style.display = 'none';
}

if (data.github) {
  detailsGithubLink.href = data.github;
  detailsGithubLink.style.display = 'inline-block';
  detailsGithubLink.innerText = 'GitHub ↗';
} else {
  detailsGithubLink.style.display = 'none';
}
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



(function() {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%<>?/\\|{}';
  const TARGET = 'WIRA YE YINT';
  const nameEl = document.getElementById('hud-name-display');
  if (!nameEl) return;

  let revealed = 0;
  let frameCount = 0;
  let phase = 'decode';

  function rand() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  function buildString(revealedCount, fromLeft) {
    let out = '';
    for (let i = 0; i < TARGET.length; i++) {
      if (TARGET[i] === ' ') { out += ' '; continue; }
      if (fromLeft) {
        if (i < revealedCount) {
          out += `<span style="color:#1a1a1a">${TARGET[i]}</span>`;
        } else if (i === revealedCount) {
          out += `<span style="color:#c0392b">${rand()}</span>`;
        } else {
          out += `<span style="color:#888;opacity:0.45">${rand()}</span>`;
        }
      } else {
        const threshold = TARGET.length - revealedCount;
        if (i >= threshold) {
          out += `<span style="color:#888;opacity:0.45">${rand()}</span>`;
        } else if (i === threshold - 1) {
          out += `<span style="color:#c0392b">${rand()}</span>`;
        } else {
          out += `<span style="color:#1a1a1a">${TARGET[i]}</span>`;
        }
      }
    }
    return out;
  }

  const DECODE_SPEED = 9;
  const ENCODE_SPEED = 7;

  function tick() {
    frameCount++;

    if (phase === 'decode') {
      nameEl.innerHTML = buildString(revealed, true);
      if (frameCount % DECODE_SPEED === 0) {
        revealed++;
        while (revealed < TARGET.length && TARGET[revealed] === ' ') revealed++;
      }
      if (revealed >= TARGET.length) {
        nameEl.innerHTML = TARGET;
        phase = 'hold';
        frameCount = 0;
      }

    } else if (phase === 'hold') {
      if (frameCount > 160) {
        phase = 'encode';
        revealed = 0;
        frameCount = 0;
      }

    } else if (phase === 'encode') {
      nameEl.innerHTML = buildString(revealed, false);
      if (frameCount % ENCODE_SPEED === 0) {
        revealed++;
        while (revealed < TARGET.length && TARGET[TARGET.length - 1 - revealed + revealed] === ' ') revealed++;
      }
      if (revealed >= TARGET.length) {
        phase = 'noise';
        frameCount = 0;
      }

    } else if (phase === 'noise') {
      let out = '';
      for (let i = 0; i < TARGET.length; i++) {
        if (TARGET[i] === ' ') { out += ' '; continue; }
        out += `<span style="color:#aaa;opacity:0.35">${rand()}</span>`;
      }
      nameEl.innerHTML = out;
      if (frameCount > 50) {
        phase = 'decode';
        revealed = 0;
        frameCount = 0;
      }
    }

    requestAnimationFrame(tick);
  }

  setTimeout(() => requestAnimationFrame(tick), 500);
})();


(function() {
  const canvas = document.getElementById('hud-petals');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    const r = canvas.parentElement.getBoundingClientRect();
    canvas.width = r.width || 300;
    canvas.height = r.height || 90;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 22;
  const petals = [];

  function newPetal(preScatter) {
    return {
      x: Math.random() * (canvas.width),
      y: preScatter ? Math.random() * canvas.height : -12 - Math.random() * 30,
      vy: 0.28 + Math.random() * 0.38,
      vx: -0.1 + Math.random() * 0.2,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.035,
      size: 3.5 + Math.random() * 4.5,
      alpha: 0.18 + Math.random() * 0.42,
      type: Math.floor(Math.random() * 3),
      pink: Math.random() < 0.65,
      wobble: Math.random() * Math.PI * 2,
      wSpeed: 0.018 + Math.random() * 0.018,
    };
  }

  for (let i = 0; i < COUNT; i++) petals.push(newPetal(true));

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.alpha;
    const s = p.size;

    if (p.type === 0) {
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.75, -s * 0.4, s * 0.75, s * 0.4, 0, s * 0.25);
      ctx.bezierCurveTo(-s * 0.75, s * 0.4, -s * 0.75, -s * 0.4, 0, -s);
      ctx.closePath();
      ctx.fillStyle = p.pink ? '#f2b8c6' : '#d96080';
      ctx.fill();
      ctx.strokeStyle = p.pink ? '#c890a4' : '#b04060';
      ctx.lineWidth = 0.4;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.7);
      ctx.lineTo(0, s * 0.2);
      ctx.strokeStyle = p.pink ? 'rgba(170,80,100,0.35)' : 'rgba(100,10,30,0.35)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

    } else if (p.type === 1) {
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.55, 0);
      ctx.lineTo(0, s * 0.9);
      ctx.lineTo(-s * 0.55, 0);
      ctx.closePath();
      ctx.fillStyle = p.pink ? '#eaaabb' : '#cc3355';
      ctx.fill();
      ctx.strokeStyle = p.pink ? '#c08898' : '#992040';
      ctx.lineWidth = 0.4;
      ctx.stroke();

    } else {
      const h = s * 0.85;
      ctx.fillStyle = p.pink ? '#e0a0b4' : '#c03050';
      ctx.fillRect(-h / 2, -h / 2, h, h);
      ctx.strokeStyle = p.pink ? '#b08090' : '#8a1830';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(-h / 2, -h / 2, h, h);
      ctx.fillStyle = p.pink ? 'rgba(210,130,155,0.55)' : 'rgba(160,20,45,0.55)';
      ctx.fillRect(-0.8, -h / 2, 1.6, h);
      ctx.fillRect(-h / 2, -0.8, h, 1.6);
    }
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of petals) {
      p.wobble += p.wSpeed;
      p.x += p.vx + Math.sin(p.wobble) * 0.25;
      p.y += p.vy;
      p.rot += p.rotV;
      if (p.y > canvas.height + 16) Object.assign(p, newPetal(false));
      drawPetal(p);
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

const experiences = [
  { id: "exp-trigger-1", title: "AI Singapore x VisTec",  images: ["assets/images/internship1.png"] },
  { id: "exp-trigger-2", title: "Google Chaiyo GCP 2026", images: ["assets/images/gglch2.png", "assets/images/gglc.png"] },
];

const expOverlay    = document.getElementById('experience-modal-overlay');
const expModalClose = document.getElementById('experience-modal-close');
const expModalTitle = document.getElementById('experience-modal-title');
const expModalImg   = document.getElementById('experience-modal-img');

experiences.forEach(exp => {
  const trigger = document.getElementById(exp.id);
  if (!trigger) return;
  trigger.addEventListener('click', () => {
    expModalTitle.innerText = exp.title;
    expModalImg.innerHTML = exp.images.map(src =>
      `<img src="${src}" alt="${exp.title}" class="experience-modal-img">`
    ).join('');
    expOverlay.style.display = 'flex';
  });
});

expModalClose.addEventListener('click', () => {
  expOverlay.style.display = 'none';
});

expOverlay.addEventListener('click', (e) => {
  if (e.target === expOverlay) expOverlay.style.display = 'none';
});