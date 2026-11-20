/**
 * Abhijit More - 3D Interactive WebGL, Holographic Physics & Cyber-Constellation Engine
 * Features:
 * 1. Three.js Real-Time 3D Cyberspace (Dynamic Neural Constellations, Floating Polyhedrons, Cyber Core, Dynamic Lighting, Particle Fluid Repulsion & Click Shockwave)
 * 2. 3D Interactive Cursor Trails & Particle Sparks Burst
 * 3. Smooth Damped 3D Card Gyroscope Tilt & Specular Holographic Glare
 * 4. Hero Avatar 3D Gyroscope Tracker
 * 5. 3D Magnetic Button & Chip Physics
 * 6. Sticky Header & Active Nav Spy
 * 7. Scroll Parallax & Reveal Animations
 * 8. Copy Email & Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  // Safety DOM cleanup for any stale cached elements
  ['terminal-toggle-btn', 'terminal-modal', 'cosmos-hud'].forEach(id => {
    const el = document.getElementById(id);
    if (el && el.parentNode) el.parentNode.removeChild(el);
  });

  // ===================================================================
  // 1. Three.js Interactive 3D Cyber Constellation & WebGL Engine
  // ===================================================================
  const canvas = document.getElementById('webgl-canvas');
  let speedMultiplier = 1;

  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Real-Time Dynamic 3D Lights
    const mouseLight = new THREE.PointLight(0x6ee7b7, 3.4, 75);
    mouseLight.position.set(0, 0, 16);
    scene.add(mouseLight);

    const secondaryLight = new THREE.PointLight(0xa855f7, 2.8, 65);
    secondaryLight.position.set(-25, -15, 12);
    scene.add(secondaryLight);

    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.4);
    scene.add(ambientLight);

    // ===============================================================
    // Floating 3D Geometric Meshes Group
    // ===============================================================
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);

    // Mesh 1: Central/Hero 3D Cyber Core (Floating Icosahedron with Wireframe & Ring)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(18, 3, -6);

    const coreGeo = new THREE.IcosahedronGeometry(7, 1);
    const coreSolidMat = new THREE.MeshStandardMaterial({
      color: 0x0a192f,
      roughness: 0.15,
      metalness: 0.9,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreSolidMat);
    coreGroup.add(coreMesh);

    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x6ee7b7,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    const coreWireMesh = new THREE.Mesh(coreGeo, coreWireMat);
    coreGroup.add(coreWireMesh);

    const coreRingGeo = new THREE.TorusGeometry(9.2, 0.1, 16, 80);
    const coreRingMat = new THREE.MeshBasicMaterial({
      color: 0x60adf6,
      transparent: true,
      opacity: 0.45
    });
    const coreRing = new THREE.Mesh(coreRingGeo, coreRingMat);
    coreRing.rotation.x = Math.PI / 3;
    coreGroup.add(coreRing);

    meshGroup.add(coreGroup);

    // Mesh 2: Floating 3D Torus Knot (Cyber Dimension)
    const knotGroup = new THREE.Group();
    knotGroup.position.set(-22, -8, -10);

    const knotGeo = new THREE.TorusKnotGeometry(4.8, 1.1, 90, 16);
    const knotSolidMat = new THREE.MeshStandardMaterial({
      color: 0x1b1136,
      roughness: 0.2,
      metalness: 0.85
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotSolidMat);
    knotGroup.add(knotMesh);

    const knotWireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const knotWire = new THREE.Mesh(knotGeo, knotWireMat);
    knotGroup.add(knotWire);

    meshGroup.add(knotGroup);

    // Mesh 3-6: Floating Geometric Polyhedrons (Crystals)
    const polyData = [
      { geo: new THREE.OctahedronGeometry(2.8), pos: [-14, 15, -8], color: 0x6ee7b7, rotSpeed: [0.015, 0.02] },
      { geo: new THREE.DodecahedronGeometry(2.4), pos: [24, -14, -12], color: 0x60adf6, rotSpeed: [0.012, 0.018] },
      { geo: new THREE.TetrahedronGeometry(2.8), pos: [-10, -18, -14], color: 0xf43f5e, rotSpeed: [0.02, 0.015] },
      { geo: new THREE.OctahedronGeometry(2.2), pos: [14, 18, -10], color: 0xfbbf24, rotSpeed: [0.018, 0.012] }
    ];

    const polyMeshes = [];
    polyData.forEach(item => {
      const pGroup = new THREE.Group();
      pGroup.position.set(item.pos[0], item.pos[1], item.pos[2]);

      const solidMat = new THREE.MeshStandardMaterial({
        color: 0x091426,
        roughness: 0.2,
        metalness: 0.85
      });
      pGroup.add(new THREE.Mesh(item.geo, solidMat));

      const wireMat = new THREE.MeshBasicMaterial({
        color: item.color,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });
      pGroup.add(new THREE.Mesh(item.geo, wireMat));

      meshGroup.add(pGroup);
      polyMeshes.push({ group: pGroup, rot: item.rotSpeed, basePos: [...item.pos] });
    });

    // ===============================================================
    // Particle Constellation Network
    // ===============================================================
    const particleCount = 750;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleHomePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cTeal = new THREE.Color(0x6ee7b7);
    const cBlue = new THREE.Color(0x60adf6);
    const cPurple = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 85;
      const y = (Math.random() - 0.5) * 85;
      const z = (Math.random() - 0.5) * 60;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleHomePositions[i * 3] = x;
      particleHomePositions[i * 3 + 1] = y;
      particleHomePositions[i * 3 + 2] = z;

      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
      particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      const pick = Math.random();
      const col = pick < 0.45 ? cTeal : (pick < 0.75 ? cBlue : cPurple);
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Circular disc texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 24;
    pCanvas.height = 24;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(12, 12, 0, 12, 12, 12);
    pGrad.addColorStop(0, 'rgba(255,255,255,1)');
    pGrad.addColorStop(0.35, 'rgba(110,231,183,0.9)');
    pGrad.addColorStop(0.7, 'rgba(96,173,246,0.3)');
    pGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 24, 24);
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.95,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Dynamic 3D Neural Constellation Lines
    const maxLineConnections = 500;
    const linePositions = new Float32Array(maxLineConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6ee7b7,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // ===============================================================
    // Interactive Mouse Coordinates & Parallax Physics
    // ===============================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let targetCameraZ = 32;

    // 3D Shockwave Impulse State
    let shockwaveActive = false;
    let shockwaveOrigin = { x: 0, y: 0, z: 0 };
    let shockwaveRadius = 0;
    let shockwaveStrength = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Shockwave trigger on click
    window.addEventListener('click', () => {
      shockwaveOrigin.x = mouseX * 25;
      shockwaveOrigin.y = -mouseY * 25;
      shockwaveOrigin.z = 0;
      shockwaveRadius = 0;
      shockwaveStrength = 3.5;
      shockwaveActive = true;
    });

    // Toggle 3D Speed on badge click
    const toggle3DBtn = document.getElementById('toggle-3d-speed');
    const badgeText = toggle3DBtn ? toggle3DBtn.querySelector('.badge-3d-text') : null;

    if (toggle3DBtn) {
      toggle3DBtn.addEventListener('click', () => {
        if (speedMultiplier === 1) {
          speedMultiplier = 2.5;
          if (badgeText) badgeText.textContent = 'WARP 3D';
          showToast('⚡ Warp Speed 3D Activated!');
        } else if (speedMultiplier === 2.5) {
          speedMultiplier = 5;
          if (badgeText) badgeText.textContent = 'HYPER 3D';
          showToast('🚀 Hyperdrive 3D Engaged!');
        } else {
          speedMultiplier = 1;
          if (badgeText) badgeText.textContent = '3D LIVE';
          showToast('✨ Normal 3D Orbit Restored');
        }
      });
    }

    // Scroll Travel Parallax
    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollFraction = window.scrollY / maxScroll;
      targetCameraZ = 32 + scrollFraction * 18;
    });

    // ===============================================================
    // Animation Render Loop
    // ===============================================================
    let clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime() * speedMultiplier;

      // 1. Camera interpolation (lerp)
      targetCameraX += (mouseX * 6 - targetCameraX) * 0.05;
      targetCameraY += (-mouseY * 6 - targetCameraY) * 0.05;
      camera.position.x = targetCameraX;
      camera.position.y = targetCameraY;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.05;
      camera.lookAt(scene.position);

      // 2. Mouse Light tracking in 3D
      mouseLight.position.x = mouseX * 26;
      mouseLight.position.y = -mouseY * 26;

      secondaryLight.position.x = -Math.cos(elapsedTime * 0.4) * 25;
      secondaryLight.position.y = Math.sin(elapsedTime * 0.4) * 20;

      // 3. Rotate 3D Cyber Core
      coreMesh.rotation.x = elapsedTime * 0.18;
      coreMesh.rotation.y = elapsedTime * 0.22;
      coreWireMesh.rotation.x = elapsedTime * 0.18;
      coreWireMesh.rotation.y = elapsedTime * 0.22;
      coreRing.rotation.z = -elapsedTime * 0.25;

      // 4. Rotate Torus Knot
      knotMesh.rotation.x = elapsedTime * 0.12;
      knotMesh.rotation.y = elapsedTime * 0.15;
      knotWire.rotation.x = elapsedTime * 0.12;
      knotWire.rotation.y = elapsedTime * 0.15;

      // 5. Tumble floating polyhedrons
      polyMeshes.forEach((item, idx) => {
        item.group.rotation.x += item.rot[0] * speedMultiplier;
        item.group.rotation.y += item.rot[1] * speedMultiplier;
        item.group.position.y = item.basePos[1] + Math.sin(elapsedTime * 0.8 + idx) * 1.5;
      });

      // 6. Particle Physics (Gentle drift + Mouse Repulsion + Shockwave)
      const mouseWorldX = mouseX * 26;
      const mouseWorldY = -mouseY * 26;
      const posAttr = particleGeometry.attributes.position;
      const posArr = posAttr.array;

      if (shockwaveActive) {
        shockwaveRadius += delta * 45 * speedMultiplier;
        shockwaveStrength *= 0.95;
        if (shockwaveRadius > 55 || shockwaveStrength < 0.05) {
          shockwaveActive = false;
        }
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        let px = posArr[i3];
        let py = posArr[i3 + 1];
        let pz = posArr[i3 + 2];

        const hx = particleHomePositions[i3];
        const hy = particleHomePositions[i3 + 1];
        const hz = particleHomePositions[i3 + 2];

        // Drift
        px += particleVelocities[i3] * speedMultiplier;
        py += particleVelocities[i3 + 1] * speedMultiplier;

        // Mouse Repulsion Field
        const dx = px - mouseWorldX;
        const dy = py - mouseWorldY;
        const distSq = dx * dx + dy * dy;

        if (distSq < 70) {
          const dist = Math.sqrt(distSq) || 0.1;
          const force = (1 - dist / 8.4) * 0.8;
          px += (dx / dist) * force;
          py += (dy / dist) * force;
        }

        // Shockwave displacement
        if (shockwaveActive) {
          const swDx = px - shockwaveOrigin.x;
          const swDy = py - shockwaveOrigin.y;
          const swDist = Math.sqrt(swDx * swDx + swDy * swDy) || 0.1;
          const diff = Math.abs(swDist - shockwaveRadius);
          if (diff < 5) {
            const waveForce = Math.sin((diff / 5) * Math.PI) * shockwaveStrength;
            px += (swDx / swDist) * waveForce * 0.4;
            py += (swDy / swDist) * waveForce * 0.4;
            pz += waveForce * 1.2;
          }
        }

        // Spring back to home position
        px += (hx - px) * 0.035;
        py += (hy - py) * 0.035;
        pz += (hz - pz) * 0.035;

        posArr[i3] = px;
        posArr[i3 + 1] = py;
        posArr[i3 + 2] = pz;
      }
      posAttr.needsUpdate = true;

      // 7. Update Dynamic Constellation Lines
      let lineVertexIndex = 0;
      const linePosArr = lineGeometry.attributes.position.array;
      const checkLimit = Math.min(particleCount, 250); // fast subset check for 60fps

      for (let i = 0; i < checkLimit && lineVertexIndex < maxLineConnections * 6; i++) {
        const i3 = i * 3;
        const x1 = posArr[i3];
        const y1 = posArr[i3 + 1];
        const z1 = posArr[i3 + 2];

        for (let j = i + 1; j < checkLimit && lineVertexIndex < maxLineConnections * 6; j++) {
          const j3 = j * 3;
          const x2 = posArr[j3];
          const y2 = posArr[j3 + 1];
          const z2 = posArr[j3 + 2];

          const ddx = x1 - x2;
          const ddy = y1 - y2;
          const ddz = z1 - z2;
          const distSq = ddx * ddx + ddy * ddy + ddz * ddz;

          if (distSq < 42) {
            linePosArr[lineVertexIndex++] = x1;
            linePosArr[lineVertexIndex++] = y1;
            linePosArr[lineVertexIndex++] = z1;
            linePosArr[lineVertexIndex++] = x2;
            linePosArr[lineVertexIndex++] = y2;
            linePosArr[lineVertexIndex++] = z2;
          }
        }
      }

      // Zero out unused line segments
      for (let k = lineVertexIndex; k < maxLineConnections * 6; k++) {
        linePosArr[k] = 0;
      }
      lineGeometry.setDrawRange(0, lineVertexIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;

      // Render Scene
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ===================================================================
  // 2. Custom Glowing Neon Cursor & 3D Interactive Particle Sparks
  // ===================================================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorGlow = document.getElementById('cursor-glow');

  if (cursorDot && cursorGlow) {
    let mouseCurX = -100;
    let mouseCurY = -100;
    let glowX = -100;
    let glowY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseCurX = e.clientX;
      mouseCurY = e.clientY;
      cursorDot.style.left = `${mouseCurX}px`;
      cursorDot.style.top = `${mouseCurY}px`;
    });

    const updateGlow = () => {
      glowX += (mouseCurX - glowX) * 0.2;
      glowY += (mouseCurY - glowY) * 0.2;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      requestAnimationFrame(updateGlow);
    };
    updateGlow();

    // Hover scale effect on links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .card, .tech-chip, .badge-3d-mode, .skill-chip-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.65)';
        cursorGlow.style.borderColor = 'var(--accent)';
      });
      el.addEventListener('mouseleave', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.borderColor = 'rgba(110, 231, 183, 0.45)';
      });
    });

    // 3D Interactive Particle Spark Burst on Click
    const colors = ['#6ee7b7', '#60adf6', '#a855f7', '#38bdf8', '#fbbf24'];

    window.addEventListener('click', (e) => {
      const sparkCount = 14;
      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'cursor-spark';
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 5 + 3;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 65 + 30;

        spark.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${color};
          box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out;
        `;

        document.body.appendChild(spark);

        requestAnimationFrame(() => {
          const destX = Math.cos(angle) * velocity;
          const destY = Math.sin(angle) * velocity;
          spark.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`;
          spark.style.opacity = '0';
        });

        setTimeout(() => {
          if (spark.parentNode) spark.parentNode.removeChild(spark);
        }, 650);
      }
    });
  }

  // ===================================================================
  // 3. Smooth Damped 3D Card Gyroscope Tilt & Specular Glare Physics
  // ===================================================================
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    let currentRotX = 0;
    let currentRotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isHovered = false;
    let animFrame = null;

    const renderTilt = () => {
      if (!isHovered && Math.abs(currentRotX) < 0.1 && Math.abs(currentRotY) < 0.1) {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        card.style.setProperty('--spotlight-x', '-500px');
        card.style.setProperty('--spotlight-y', '-500px');
        card.style.setProperty('--glare-opacity', '0');
        return;
      }

      currentRotX += (targetRotX - currentRotX) * 0.12;
      currentRotY += (targetRotY - currentRotY) * 0.12;

      const translateZ = isHovered ? 16 : 0;
      card.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateZ(${translateZ}px)`;

      if (isHovered || Math.abs(currentRotX) > 0.1 || Math.abs(currentRotY) > 0.1) {
        animFrame = requestAnimationFrame(renderTilt);
      }
    };

    card.addEventListener('mouseenter', () => {
      isHovered = true;
      card.style.setProperty('--glare-opacity', '0.45');
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(renderTilt);
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Responsive tilt angles
      targetRotX = ((y - centerY) / centerY) * -12;
      targetRotY = ((x - centerX) / centerX) * 12;

      // Spotlight coordinates
      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);

      // Dynamic Holographic Glare Angle
      const glareAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) - 90;
      card.style.setProperty('--glare-angle', `${glareAngle}deg`);
    });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      targetRotX = 0;
      targetRotY = 0;
    });
  });

  // ===================================================================
  // 4. Hero Avatar 3D Gyroscope Tracker
  // ===================================================================
  const heroStage = document.getElementById('hologram-stage');
  const avatarCard = document.getElementById('hero-avatar-card');

  if (heroStage && avatarCard) {
    let curAvatarRotX = 0;
    let curAvatarRotY = 0;
    let targetAvatarRotX = 0;
    let targetAvatarRotY = 0;

    const renderAvatarGyro = () => {
      curAvatarRotX += (targetAvatarRotX - curAvatarRotX) * 0.08;
      curAvatarRotY += (targetAvatarRotY - curAvatarRotY) * 0.08;
      avatarCard.style.transform = `rotateX(${curAvatarRotX.toFixed(2)}deg) rotateY(${curAvatarRotY.toFixed(2)}deg) translateZ(28px)`;
      requestAnimationFrame(renderAvatarGyro);
    };
    renderAvatarGyro();

    window.addEventListener('mousemove', (e) => {
      const stageRect = heroStage.getBoundingClientRect();
      const centerX = stageRect.left + stageRect.width / 2;
      const centerY = stageRect.top + stageRect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      targetAvatarRotX = -deltaY * 20;
      targetAvatarRotY = deltaX * 20;
    });

    window.addEventListener('mouseleave', () => {
      targetAvatarRotX = 0;
      targetAvatarRotY = 0;
    });
  }

  // ===================================================================
  // 5. 3D Magnetic Button & Interactive Elements Physics
  // ===================================================================
  const magneticElements = document.querySelectorAll('.btn-3d, .magnetic-btn, .badge-3d-mode');

  magneticElements.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull in 3D
      btn.style.transform = `translate3d(${x * 0.28}px, ${y * 0.28}px, 14px) rotateX(${-y * 0.15}deg) rotateY(${x * 0.15}deg)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // Micro 3D Tilt on Skill Chips
  const skillChips = document.querySelectorAll('.skill-chip-item');
  skillChips.forEach(chip => {
    chip.addEventListener('mousemove', (e) => {
      const rect = chip.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      chip.style.transform = `translateY(-4px) translateZ(16px) rotateX(${-y * 0.12}deg) rotateY(${x * 0.12}deg) scale(1.06)`;
    });
    chip.addEventListener('mouseleave', () => {
      chip.style.transform = '';
    });
  });

  // ===================================================================
  // 6. Sticky Header & Active Nav Spy
  // ===================================================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navItems = document.querySelectorAll('.nav-item');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // IntersectionObserver for Active Section Nav Spy
  const sections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.2
  });

  sections.forEach(sec => navObserver.observe(sec));

  // ===================================================================
  // 7. Scroll Reveal Animations
  // ===================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===================================================================
  // 8. Copy Email Button
  // ===================================================================
  const copyBtn = document.getElementById('copy-email-btn');
  const copyStatus = document.getElementById('copy-status');
  const userEmail = 'abhijtmore909@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(userEmail);
        showToast('Email address copied to clipboard!');
        if (copyStatus) {
          copyStatus.textContent = '✓ Copied!';
          setTimeout(() => { copyStatus.textContent = ''; }, 3000);
        }
      } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = userEmail;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Email address copied to clipboard!');
      }
    });
  }

  // ===================================================================
  // 9. Contact Form AJAX Submission (Graceful Fallback)
  // ===================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Transmitting...</span>';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          showToast('Message transmitted successfully! Thank you.');
          contactForm.reset();
        } else {
          showToast('Failed to transmit message. Please email directly.');
        }
      } catch (error) {
        showToast('Error transmitting message. Please email directly.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // ===================================================================
  // 10. Toast Notification System
  // ===================================================================
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ===================================================================
  // 11. Back to Top Button
  // ===================================================================
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===================================================================
  // 13. Interactive Click Dodge & Elastic Return Physics
  // "click kel ekhadya object vr tr thod bajula zal pahije nantr tyat jagi yeil"
  // ===================================================================
  const dodgeableSelectors = [
    '.card',
    '.tilt-card',
    '.service-card',
    '.project-card',
    '.education-card',
    '.floating-chip',
    '.tech-chip',
    '.skill-chip-item',
    '.avatar-frame',
    '.stat-item',
    '.hero-badge',
    '.btn',
    '.logo-avatar-wrap'
  ];

  const dodgeableElements = document.querySelectorAll(dodgeableSelectors.join(', '));

  dodgeableElements.forEach(el => {
    el.addEventListener('click', (e) => {
      // Don't interfere with standard links navigation or form inputs
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;

      // Create visual shockwave ripple at click coordinate
      createShockwave(e.clientX, e.clientY);

      // Play synthesized subtle feedback sound
      playAudioFx('dodge');

      // Calculate dodge recoil direction
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const clickAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      // Dodge away from click point
      const dodgeDistance = 20 + Math.random() * 8;
      const dodgeX = -Math.cos(clickAngle) * dodgeDistance;
      const dodgeY = -Math.sin(clickAngle) * dodgeDistance;
      const dodgeRot = (Math.random() - 0.5) * 8;

      // Save previous transform and animation state
      const origTransform = el.style.transform;
      const origAnimation = el.style.animation;

      // Step 1: Rapid Dodge Displacement
      el.style.transition = 'transform 0.12s cubic-bezier(0.1, 0.9, 0.2, 1)';
      el.style.transform = `translate3d(${dodgeX.toFixed(1)}px, ${dodgeY.toFixed(1)}px, 20px) rotate(${dodgeRot.toFixed(1)}deg) scale(0.97)`;
      el.style.animationPlayState = 'paused';

      // Step 2: Smooth Elastic Spring Return
      setTimeout(() => {
        el.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.transform = origTransform || '';

        // Step 3: Cleanup and resume animations
        setTimeout(() => {
          el.style.transition = '';
          el.style.transform = origTransform;
          el.style.animation = origAnimation;
          el.style.animationPlayState = 'running';
        }, 650);
      }, 140);
    });
  });

  // Shockwave Ripple Creator
  function createShockwave(x, y) {
    const shockwave = document.createElement('div');
    shockwave.className = 'click-shockwave';
    shockwave.style.left = `${x}px`;
    shockwave.style.top = `${y}px`;
    document.body.appendChild(shockwave);

    setTimeout(() => {
      if (shockwave.parentNode) {
        shockwave.parentNode.removeChild(shockwave);
      }
    }, 600);
  }

  // ===================================================================
  // 14. Glowing Top Scroll Progress Bar
  // ===================================================================
  const progressBar = document.getElementById('scroll-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolledPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, scrolledPercent))}%`;
    }, { passive: true });
  }

  // ===================================================================
  // 15. Dynamic High-Tech Typewriter in Hero
  // ===================================================================
  const typewriterEl = document.getElementById('hero-typewriter');
  if (typewriterEl) {
    const roles = [
      'Senior Software Engineer (4.5+ Yrs Exp)',
      'Cloud Microservices Architect (.NET 8 & Azure)',
      'Mobile App Developer (Android & iOS)',
      'GenAI & Autonomous Agent Systems (RAG & LangGraph)',
      'Blockchain & Web3 Smart Contract Engineer',
      'Enterprise Automation & Event-Driven Systems',
      'Full-Stack Software Engineer'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 60;

    const typeRole = () => {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeDelay = 30;
      } else {
        typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeDelay = 65;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typeDelay = 2200; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeDelay = 400; // Pause before typing next word
      }

      setTimeout(typeRole, typeDelay);
    };

    setTimeout(typeRole, 600);
  }

  // ===================================================================
  // 16. Cyber Hacker Text Scramble / Decryption Effect
  // ===================================================================
  const scrambleElements = document.querySelectorAll('.scramble-text');
  const cyberChars = '!<>-_\\/[]{}—=+*^?#________0101';

  class TextScrambler {
    constructor(el) {
      this.el = el;
      this.targetText = el.getAttribute('data-scramble') || el.innerText;
      this.chars = cyberChars;
      this.isScrambling = false;
    }

    scramble() {
      if (this.isScrambling) return;
      this.isScrambling = true;

      let frame = 0;
      const totalFrames = 28;
      const original = this.targetText;

      const queue = [];
      for (let i = 0; i < original.length; i++) {
        const from = this.el.innerText[i] || '';
        const to = original[i];
        const start = Math.floor(Math.random() * 15);
        const end = start + Math.floor(Math.random() * 15);
        queue.push({ from, to, start, end, char: '' });
      }

      const update = () => {
        let output = '';
        let complete = 0;

        for (let i = 0; i < queue.length; i++) {
          let { from, to, start, end, char } = queue[i];
          if (frame >= end) {
            complete++;
            output += to;
          } else if (frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.chars[Math.floor(Math.random() * this.chars.length)];
              queue[i].char = char;
            }
            output += `<span style="color: #6ee7b7;">${char}</span>`;
          } else {
            output += from;
          }
        }

        this.el.innerHTML = output;

        if (complete === queue.length) {
          this.isScrambling = false;
          this.el.innerText = original;
        } else {
          frame++;
          requestAnimationFrame(update);
        }
      };

      update();
    }
  }

  scrambleElements.forEach(el => {
    const scrambler = new TextScrambler(el);
    el.addEventListener('mouseenter', () => {
      scrambler.scramble();
      playAudioFx('hover');
    });

    // Auto-trigger on initial scroll into view
    const scramObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrambler.scramble();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    scramObserver.observe(el);
  });

  // ===================================================================
  // 17. Stats Animated Number Count-Up
  // ===================================================================
  const counterElements = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute('data-target') || 0);
        const isDecimal = target % 1 !== 0;
        const duration = 1800;
        const startTime = performance.now();

        const animateCounter = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          // Easing: easeOutExpo
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = target * eased;

          if (isDecimal) {
            counter.textContent = currentVal.toFixed(1);
          } else {
            counter.textContent = Math.floor(currentVal);
          }

          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            counter.textContent = isDecimal ? target.toFixed(1) : target;
          }
        };

        requestAnimationFrame(animateCounter);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.25 });

  counterElements.forEach(el => counterObserver.observe(el));

  // ===================================================================
  // 18. Special Voice & High-Tech Sound FX Engine on Click
  // "special voice dalo click pe"
  // ===================================================================
  let audioCtx = null;
  let soundEnabled = true; // Always active by default
  let welcomeSpoken = false;

  // Initialize and resume AudioContext upon first user gesture
  const initAudio = () => {
    if (!audioCtx) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      } catch (e) {
        console.warn('Web Audio not supported');
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  // Dedicated Male Voice Selector (User requested: "male cha avaj ala pahije")
  function getMaleVoice(voices) {
    if (!voices || !voices.length) return null;

    const femaleKeywords = [
      'zira', 'jenny', 'samantha', 'heera', 'neerja', 'victoria', 'susan', 
      'kavya', 'aria', 'female', 'woman', 'girl', 'catherine', 'hazel', 'linda', 'anna'
    ];
    const maleKeywords = [
      'david', 'mark', 'prabhat', 'ravi', 'guy', 'christopher', 'eric', 
      'ryan', 'andrew', 'brian', 'george', 'male', 'man', 'boy', 'steffan', 'james', 'richard'
    ];

    // Priority 1: Indian English Male voice (e.g. Prabhat, Ravi)
    const indianMale = voices.find(v => 
      (v.lang.startsWith('en-IN') || v.lang.startsWith('hi')) &&
      maleKeywords.some(k => v.name.toLowerCase().includes(k)) &&
      !femaleKeywords.some(k => v.name.toLowerCase().includes(k))
    );
    if (indianMale) return indianMale;

    // Priority 2: Natural / Online Male voice
    const naturalMale = voices.find(v => 
      v.lang.startsWith('en') &&
      (v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('google')) &&
      maleKeywords.some(k => v.name.toLowerCase().includes(k)) &&
      !femaleKeywords.some(k => v.name.toLowerCase().includes(k))
    );
    if (naturalMale) return naturalMale;

    // Priority 3: Standard Windows / OS Desktop Male voice (e.g. Microsoft David, Microsoft Mark)
    const desktopMale = voices.find(v => 
      v.lang.startsWith('en') &&
      maleKeywords.some(k => v.name.toLowerCase().includes(k)) &&
      !femaleKeywords.some(k => v.name.toLowerCase().includes(k))
    );
    if (desktopMale) return desktopMale;

    // Priority 4: Any English voice that is explicitly not female
    const nonFemale = voices.find(v => 
      v.lang.startsWith('en') &&
      !femaleKeywords.some(k => v.name.toLowerCase().includes(k))
    );
    if (nonFemale) return nonFemale;

    return voices[0];
  }

  // Intro Speech Toggle State
  let isIntroSpeaking = false;

  function stopIntroSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isIntroSpeaking = false;
    const nameBtn = document.getElementById('play-name-audio');
    if (nameBtn) {
      nameBtn.classList.remove('playing');
      nameBtn.setAttribute('title', "Click to listen to Abhijit's intro (Click again to stop)");
      nameBtn.setAttribute('aria-label', "Listen to Abhijit More introduction");
    }
  }

  function toggleIntroSpeech(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    initAudio();

    // If already speaking, STOP the intro! (User request: "tyavr prt click kel tr intro stop kr")
    if (isIntroSpeaking || (window.speechSynthesis && window.speechSynthesis.speaking && isIntroSpeaking)) {
      stopIntroSpeech();
      playAudioFx('laserTick');
      return;
    }

    // If FX was muted, enable it so intro speech is heard
    if (!soundEnabled) {
      updateFxUi(true, false);
    }

    playAudioFx('powerChime');
    isIntroSpeaking = true;

    const nameBtn = document.getElementById('play-name-audio');
    if (nameBtn) {
      nameBtn.classList.add('playing');
      nameBtn.setAttribute('title', "Speaking intro... Click again to stop");
      nameBtn.setAttribute('aria-label', "Stop Abhijit More introduction");
    }

    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();

      // Intro text matching user's exact specification:
      // "mazya inro sang- name , fullstack software engineer with 4.5 professional and 7 years personal experiance in Digital Solutions providing to customers . please check below projects and my contribution in it."
      const introRaw = "Hello, I am Abhijit More. Full Stack Software Engineer with 4.5 years of professional and 7 years of personal experience in providing digital solutions to customers. Please check below projects and my contribution in it.";

      const spokenText = introRaw
        .replace(/\bAbhijit More's\b/gi, "Abhijit Moh-ray's")
        .replace(/\bAbhijit More\b/gi, 'Abhijit Moh-ray')
        .replace(/\bMore's\b/gi, "Moh-ray's")
        .replace(/\bMore\b/g, 'Moh-ray');

      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = 0.94; // Clear, confident pacing
      utterance.pitch = 0.92; // Deep, masculine voice
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const maleVoice = getMaleVoice(voices);
      if (maleVoice) {
        utterance.voice = maleVoice;
      }

      utterance.onend = () => {
        isIntroSpeaking = false;
        if (nameBtn) {
          nameBtn.classList.remove('playing');
          nameBtn.setAttribute('title', "Click to listen to Abhijit's intro (Click again to stop)");
          nameBtn.setAttribute('aria-label', "Listen to Abhijit More introduction");
        }
      };

      utterance.onerror = () => {
        isIntroSpeaking = false;
        if (nameBtn) {
          nameBtn.classList.remove('playing');
          nameBtn.setAttribute('title', "Click to listen to Abhijit's intro (Click again to stop)");
          nameBtn.setAttribute('aria-label', "Listen to Abhijit More introduction");
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      isIntroSpeaking = false;
      if (nameBtn) nameBtn.classList.remove('playing');
    }
  }

  // Special AI Voice Synthesizer (SpeechSynthesis)
  function speakSpecialVoice(text) {
    if (!soundEnabled) return; // Honor sound toggle!
    if (isIntroSpeaking) return; // Do not interrupt full intro speech with incidental sounds!
    if (!('speechSynthesis' in window) || !text) return;
    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      // Accurate phonetic pronunciation mapping for Marathi surname 'More' (मोरे)
      // English TTS engines natively read "More" as "Moor" (/mɔːr/).
      // Substituting with "Moh-ray" produces the exact, authentic Marathi "मोरे" sound.
      const spokenText = text
        .replace(/\bAbhijit More's\b/gi, 'Abhijit Moh-ray\'s')
        .replace(/\bAbhijit More\b/gi, 'Abhijit Moh-ray')
        .replace(/\bMore's\b/gi, 'Moh-ray\'s')
        .replace(/\bMore\b/g, 'Moh-ray');

      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = 0.98; // Natural, confident pacing
      utterance.pitch = 0.92; // Deep, confident masculine pitch (Male voice)
      utterance.volume = 1.0;

      // Select Male Voice
      const voices = window.speechSynthesis.getVoices();
      const maleVoice = getMaleVoice(voices);
      if (maleVoice) {
        utterance.voice = maleVoice;
      }

      const nameBtn = document.getElementById('play-name-audio');
      if (nameBtn && (text.includes('Abhijit') || text.includes('More'))) {
        nameBtn.classList.add('playing');
        utterance.onend = () => nameBtn.classList.remove('playing');
        utterance.onerror = () => nameBtn.classList.remove('playing');
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      // SpeechSynthesis gracefully caught
    }
  }

  // Pre-load voices if needed
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  // Synthesized Cyber Audio Effects (Zero External Files, Ultra Low-Latency)
  function playAudioFx(type) {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      if (type === 'cyberClick' || type === 'click' || type === 'dodge') {
        // High-tech futuristic tactile chirp (Dual Harmonic Sweep)
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.Q.setValueAtTime(3, now);

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(650, now);
        osc1.frequency.exponentialRampToValueAtTime(1150, now + 0.04);
        osc1.frequency.exponentialRampToValueAtTime(300, now + 0.09);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1300, now);
        osc2.frequency.exponentialRampToValueAtTime(600, now + 0.09);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.09);
        osc2.stop(now + 0.09);

      } else if (type === 'powerChime') {
        // Major Triad Ascension Chime (D5 -> F#5 -> A5) for Primary Buttons
        const chord = [587.33, 739.99, 880.00];
        chord.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);

          gain.gain.setValueAtTime(0.07, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.22);
        });

      } else if (type === 'laserTick') {
        // High-frequency holographic laser blip for tech chips
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.04);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.04);

      } else if (type === 'hover') {
        // Soft ambient feedback
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(680, now + 0.035);

        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.035);
      }
    } catch (err) {
      // Audio playback silently caught
    }
  }

  // Global Click Event for Special Voice & Cyber Sound FX
  document.addEventListener('click', (e) => {
    initAudio();

    // Welcome voice on very first user interaction
    if (!welcomeSpoken) {
      welcomeSpoken = true;
      setTimeout(() => {
        speakSpecialVoice("Hello! Welcome to Abhijit More's 3D Portfolio");
      }, 350);
    }

    const target = e.target.closest('a, button, .btn, .card, .tech-chip, .skill-chip-item, .badge-3d-mode, .floating-chip, .stat-item, .name-audio-btn');

    if (target) {
      // Check for Confidential Project Button (User requested: "Cross-Platform Mobile Apps- when clicked on this say confidential.")
      if (target.id === 'confidential-mobile-btn' || target.closest('#confidential-mobile-btn')) {
        playAudioFx('dodge');
        showToast('🔒 Confidential: Enterprise Mobile App (Protected under NDA)');
        speakSpecialVoice('Confidential. This project is enterprise client protected under non-disclosure agreement.');
        return;
      }

      // Check for name pronunciation/intro button
      if (target.id === 'play-name-audio' || target.closest('#play-name-audio') || target.classList.contains('name-audio-btn')) {
        toggleIntroSpeech(e);
        return;
      }

      // Check for primary CTAs
      if (target.classList.contains('btn-primary') || target.getAttribute('href') === '#contact') {
        playAudioFx('powerChime');
        speakSpecialVoice('Connecting with Abhijit More');
      } else if (target.getAttribute('href')?.includes('wa.me')) {
        playAudioFx('powerChime');
        speakSpecialVoice('Opening WhatsApp chat with Abhijit More');
      } else if (target.id === 'copy-email-btn') {
        playAudioFx('powerChime');
        speakSpecialVoice('Email copied to clipboard');
      } else if (target.id === 'toggle-3d-speed') {
        playAudioFx('powerChime');
        // Let the speed toggle handler announce the exact mode
      } else if (target.getAttribute('href')?.includes('linkedin') || target.getAttribute('href')?.includes('github')) {
        playAudioFx('powerChime');
        speakSpecialVoice('Opening profile');
      } else if (target.id === 'back-to-top') {
        playAudioFx('powerChime');
        speakSpecialVoice('Returning to top');
      } else if (target.classList.contains('skill-chip-item') || target.classList.contains('tech-chip')) {
        playAudioFx('laserTick');
      } else {
        playAudioFx('cyberClick');
      }
    } else {
      playAudioFx('cyberClick');
    }
  });

  // Dedicated Name Audio Pronunciation & Full Intro Handler (Click to Play, Click again to Stop)
  const playNameBtn = document.getElementById('play-name-audio');
  if (playNameBtn) {
    playNameBtn.addEventListener('click', (e) => {
      toggleIntroSpeech(e);
    });
  }

  // Dedicated Confidential Mobile Button Handler
  const confBtn = document.getElementById('confidential-mobile-btn');
  if (confBtn) {
    confBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      initAudio();
      playAudioFx('dodge');
      showToast('🔒 Confidential: Enterprise Mobile App (Protected under NDA)');
      speakSpecialVoice('Confidential. This project is enterprise client protected under non-disclosure agreement.');
    });
  }

  // Sound Toggle Handler (User requested: "sound icon de fakt chalu ase tr sound on disel nahi tr band disel ass kr")
  const fxToggle = document.getElementById('sound-fx-toggle');
  const soundIcon = document.getElementById('sound-icon');

  function updateFxUi(enabled, notify = false) {
    soundEnabled = enabled;
    if (fxToggle) {
      if (enabled) {
        fxToggle.classList.add('active');
        fxToggle.classList.remove('muted');
        if (soundIcon) soundIcon.textContent = '🔊';
        fxToggle.setAttribute('title', 'Sound: ON (Click to mute)');
        fxToggle.setAttribute('aria-label', 'Sound: ON (Click to mute)');
        if (notify) {
          playAudioFx('powerChime');
          showToast('🔊 Sound: ON');
        }
      } else {
        fxToggle.classList.remove('active');
        fxToggle.classList.add('muted');
        if (soundIcon) soundIcon.textContent = '🔇';
        fxToggle.setAttribute('title', 'Sound: OFF (Click to unmute)');
        fxToggle.setAttribute('aria-label', 'Sound: OFF (Click to unmute)');
        stopIntroSpeech();
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        if (notify) {
          showToast('🔇 Sound: OFF');
        }
      }
    }
  }

  // Initialize FX button from localStorage or default true
  const savedFx = localStorage.getItem('portfolio-fx');
  updateFxUi(savedFx !== 'false', false);

  if (fxToggle) {
    fxToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      const nextState = !soundEnabled;
      localStorage.setItem('portfolio-fx', nextState);
      updateFxUi(nextState, true);
    });
  }

  // Day / Night Theme Toggle Handler (User requested: "day/night theme add kr.")
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function applyTheme(theme, notify = false) {
    const isLight = theme === 'light';
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = isLight ? '☀️' : '🌙';
    }
    if (themeToggle) {
      themeToggle.setAttribute('title', isLight ? 'Switch to Dark Cyber Mode' : 'Switch to Day Light Mode');
    }
    if (notify) {
      playAudioFx('cyberClick');
      showToast(isLight ? '☀️ Day Light Theme Activated' : '🌙 Cyber Dark Theme Activated');
    }
  }

  // Check saved theme (default dark)
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme, false);

  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('portfolio-theme', newTheme);
      applyTheme(newTheme, true);
    });
  }

  // Wire Speed Toggle to Special Voice
  const speedToggle = document.getElementById('toggle-3d-speed');
  if (speedToggle) {
    speedToggle.addEventListener('click', () => {
      setTimeout(() => {
        if (speedMultiplier === 2.5) {
          speakSpecialVoice('Warp speed 3D activated');
        } else if (speedMultiplier === 5) {
          speakSpecialVoice('Hyperdrive 3D engaged');
        } else {
          speakSpecialVoice('Normal 3D orbit restored');
        }
      }, 100);
    });
  }
});
