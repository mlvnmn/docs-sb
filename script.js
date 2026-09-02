// ===================================================================
// DEPARTMENT OF COMPUTER SCIENCE - SB COLLEGE
// Interactive Script
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Header Shadow on Scroll ---
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)';
      header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
      header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.03)';
      header.style.background = 'rgba(255, 255, 255, 0.85)';
    }
  });

  // --- Video Modal ---
  const watchVideoBtn = document.getElementById('watchVideoBtn');
  const videoModal = document.getElementById('videoModal');
  const closeVideoModal = document.getElementById('closeVideoModal');

  if (watchVideoBtn && videoModal) {
    watchVideoBtn.addEventListener('click', () => {
      videoModal.classList.add('active');
    });

    closeVideoModal.addEventListener('click', () => {
      videoModal.classList.remove('active');
    });

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('active');
      }
    });
  }

  // --- Search Modal ---
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const closeSearchModal = document.getElementById('closeSearchModal');
  const searchInput = document.getElementById('searchInput');
  const quickTags = document.querySelectorAll('.quick-tag');

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 150);
      }
    });

    closeSearchModal.addEventListener('click', () => {
      searchModal.classList.remove('active');
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('active');
      }
    });

    quickTags.forEach((tag) => {
      tag.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = tag.innerText;
          searchInput.focus();
        }
      });
    });
  }

  // --- Close Modals on ESC Key ---
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (videoModal && videoModal.classList.contains('active')) {
        videoModal.classList.remove('active');
      }
      if (searchModal && searchModal.classList.contains('active')) {
        searchModal.classList.remove('active');
      }
    }
  });

  // --- Gazette Navigation Active Item ---
  const gazetteLinks = document.querySelectorAll('.gazette-nav .g-link');
  gazetteLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      gazetteLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // --- Mobile Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // ── Fan Carousel ──────────────────────────────────────────────────────
  const IMAGES = [
    { src: 'assets/images/cs lab 1.jpg', label: 'High Performance Computing Lab' },
    { src: 'assets/images/cs lab 2.jpg', label: 'Advanced Programming Lab' },
    { src: 'assets/images/cs lab 3.jpg', label: 'AI & Research Lab' },
    { src: 'assets/images/cs lab 4.jpg', label: 'Computer Networks Lab' },
    { src: 'assets/images/cs lab 5.jpg', label: 'Software Engineering Lab' },
  ];

  // Layout config for positions -2, -1, 0, +1, +2
  const SLOTS = {
  //  offset :  [translateX%,  scale,  rotate,  opacity,  zIndex,  brightness, border]
     '-2': ['-130%', 0.70, '-10deg', 0,    1,  0.4, '3px solid rgba(255,255,255,0.3)'],
     '-1': ['-62%',  0.84,  '-6deg', 0.75, 5,  0.7, '4px solid rgba(255,255,255,0.7)'],
      '0': [  '0%',  1.00,   '0deg', 1.00, 10, 1.0, '5px solid rgba(255,255,255,0.95)'],
      '1': [ '62%',  0.84,   '6deg', 0.75, 5,  0.7, '4px solid rgba(255,255,255,0.7)'],
      '2': ['130%',  0.70,  '10deg', 0,    1,  0.4, '3px solid rgba(255,255,255,0.3)'],
  };

  const cards  = Array.from(document.querySelectorAll('.fan-card'));
  const label  = document.getElementById('fanLabel');
  const total  = IMAGES.length;
  let   center = 0;
  let   timer  = null;

  function mod(n) { return ((n % total) + total) % total; }

  function applyCard(card, imgIdx, offset) {
    const img = card.querySelector('.fan-img');
    img.src = IMAGES[imgIdx].src;

    const cfg = SLOTS[String(offset)];
    if (!cfg) {
      // hidden (offset > 2 or < -2)
      card.style.cssText = `
        top:50%; left:50%;
        width:40%; height:260px;
        transform: translate(-50%,-50%) translateX(${offset < 0 ? '-150%' : '150%'}) scale(0.65) rotate(${offset < 0 ? '-14' : '14'}deg);
        opacity:0; z-index:0; pointer-events:none;
        box-shadow:none; border:none; filter:brightness(0.3);
      `;
      return;
    }

    const [tx, sc, rot, op, zi, br, border] = cfg;
    const isCenter = offset === 0;
    const w = isCenter ? '66%' : '38%';
    const h = isCenter ? 320   : 255;

    card.style.cssText = `
      top:50%; left:50%;
      width:${w}; height:${h}px;
      transform: translate(-50%,-50%) translateX(${tx}) scale(${sc}) rotate(${rot});
      opacity:${op};
      z-index:${zi};
      pointer-events:${op > 0 ? 'auto' : 'none'};
      box-shadow: ${isCenter ? '0 28px 65px rgba(0,0,0,0.5)' : '0 10px 28px rgba(0,0,0,0.28)'};
      border:${border};
      filter:brightness(${br});
      border-radius:18px;
    `;
  }

  function render() {
    // Show 5 positions: -2, -1, 0, +1, +2
    // cards array maps directly to image slots 0..N-1, we rotate the view
    cards.forEach((card, i) => {
      const imgIdx = mod(center + i - 2);   // which image does this DOM card show?
      const offset = i - 2;                  // its visual position: -2,-1,0,+1,+2
      applyCard(card, imgIdx, offset);
    });

    if (label) label.textContent = IMAGES[center].label;
  }

  function go(dir) {
    center = mod(center + dir);

    // Fade label
    if (label) {
      label.style.opacity = '0';
      setTimeout(() => {
        label.textContent = IMAGES[center].label;
        label.style.opacity = '1';
      }, 180);
    }

    render();
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => go(1), 2800);
  }

  if (cards.length > 0) {
    render();

    // Clicking left card goes back, right card goes forward
    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        const offset = i - 2;
        if (offset === 0) return;          // center card — no action
        clearInterval(timer);
        go(offset < 0 ? -1 : 1);
        startTimer();
      });
    });

    const carousel = document.getElementById('fanCarousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => clearInterval(timer));
      carousel.addEventListener('mouseleave', startTimer);
    }

    startTimer();
  }

  // --- Contact Form Submission ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.contact-submit-btn');
      if (!submitBtn) return;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<span>Sent Successfully!</span> <i class="fa-solid fa-check"></i>';
        submitBtn.style.background = '#16a34a';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 700);
    });
  }

});

