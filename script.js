/**
 * Li Zhiyang Academic Portfolio - Dynamic Scripts & Particle Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Interactive Scientific Bio-Network Particle Canvas Engine
  // ==========================================================================
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.color = Math.random() > 0.6 ? 'rgba(16, 185, 129, ' : (Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(99, 102, 241, ');
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.alpha})`;
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * 1.5;
            const directionY = forceDirectionY * force * 1.5;

            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.floor((width * height) / 16000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            const opacity = (1 - distance / 110) * 0.18;
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animate);
    }

    initParticles();
    animate();
  }

  // ==========================================================================
  // 2. Typewriter Effect
  // ==========================================================================
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    'Undergraduate Researcher in Bioinformatics',
    'Systems Biology & Computational Oncology',
    'Single-Cell & Spatial Transcriptomics',
    'AI for Science & Pipeline Automation',
    'Bilibili Creator @生物小小疯子'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause when full text is shown
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  if (typewriterElement) {
    typeLoop();
  }

  // ==========================================================================
  // 3. Interactive Terminal Tabs & Spatial Niche Simulator
  // ==========================================================================
  const terminalTabs = document.querySelectorAll('.t-tab');
  const terminalContents = document.querySelectorAll('.terminal-content');

  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      terminalContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetTab = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(`tab-${targetTab}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }

      if (targetTab === 'spatial') {
        renderSpatialSpots();
      }
    });
  });

  // Simulated Visium Spatial Spots Generator
  function renderSpatialSpots() {
    const spatialCanvas = document.getElementById('spatialCanvas');
    if (!spatialCanvas || spatialCanvas.children.length > 0) return;

    spatialCanvas.innerHTML = '';
    const spotTypes = ['dot-tumor', 'dot-invasive', 'dot-immune', 'dot-stroma'];
    const count = 120;

    for (let i = 0; i < count; i++) {
      const spot = document.createElement('div');
      spot.className = 'spatial-spot';
      
      // Determine spatial coordinates and cluster pattern
      const posX = Math.random() * 92 + 4;
      const posY = Math.random() * 88 + 6;
      
      let typeIndex = 0;
      if (posX < 45 && posY < 55) {
        typeIndex = 0; // Tumor core
      } else if (posX >= 40 && posX <= 65) {
        typeIndex = 1; // Invasive front
      } else if (posX > 60 && posY > 40) {
        typeIndex = 2; // Immune infiltration
      } else {
        typeIndex = 3; // Stroma
      }

      spot.style.position = 'absolute';
      spot.style.left = `${posX}%`;
      spot.style.top = `${posY}%`;
      spot.style.width = '10px';
      spot.style.height = '10px';
      spot.style.borderRadius = '50%';
      spot.style.opacity = '0.85';
      spot.style.transition = 'transform 0.2s ease, opacity 0.2s ease';

      if (typeIndex === 0) {
        spot.style.backgroundColor = '#ef4444';
        spot.style.boxShadow = '0 0 6px #ef4444';
      } else if (typeIndex === 1) {
        spot.style.backgroundColor = '#f59e0b';
        spot.style.boxShadow = '0 0 7px #f59e0b';
      } else if (typeIndex === 2) {
        spot.style.backgroundColor = '#10b981';
        spot.style.boxShadow = '0 0 6px #10b981';
      } else {
        spot.style.backgroundColor = '#6366f1';
        spot.style.boxShadow = '0 0 6px #6366f1';
      }

      spot.addEventListener('mouseenter', () => {
        spot.style.transform = 'scale(2.2)';
        spot.style.opacity = '1';
      });
      spot.addEventListener('mouseleave', () => {
        spot.style.transform = 'scale(1)';
        spot.style.opacity = '0.85';
      });

      spatialCanvas.appendChild(spot);
    }
  }

  // Initial render of spatial spots if already visible
  renderSpatialSpots();

  // ==========================================================================
  // 4. Theme Toggle (Dark / Light Mode)
  // ==========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (document.body.classList.contains('light-theme')) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // ==========================================================================
  // 5. Mobile Menu Toggle
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      });
    });
  }

  // ==========================================================================
  // 6. Copy Email & Toast Notification
  // ==========================================================================
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  const emailDisplay = document.getElementById('emailDisplay');
  const toastMessage = document.getElementById('toastMessage');

  if (btnCopyEmail && emailDisplay && toastMessage) {
    btnCopyEmail.addEventListener('click', () => {
      const email = emailDisplay.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        toastMessage.classList.add('show');
        setTimeout(() => {
          toastMessage.classList.remove('show');
        }, 2500);
      }).catch(err => {
        console.error('Clipboard copy failed: ', err);
      });
    });
  }

  // ==========================================================================
  // 7. Scroll-Spy Navigation Active State
  // ==========================================================================
  const trackedSections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 140;

    trackedSections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const navItem = document.querySelector(`.nav-menu a[href="#${id}"]`);

      if (navItem) {
        if (scrollPos >= top && scrollPos < top + height) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
});
