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

  // ── Combined 3D Folder Card Stack Interaction ────────────────
  const stackCards = Array.from(document.querySelectorAll('.folder-stack .stack-card'));
  if (stackCards.length > 0) {
    stackCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (card.classList.contains('card-1')) return;

        const currentTop = document.querySelector('.folder-stack .stack-card.card-1');
        if (!currentTop) return;

        const cardClass = Array.from(card.classList).find(c => /^card-\d+$/.test(c));
        const topClass = Array.from(currentTop.classList).find(c => /^card-\d+$/.test(c));

        if (cardClass && topClass) {
          card.classList.remove(cardClass);
          card.classList.add(topClass);

          currentTop.classList.remove(topClass);
          currentTop.classList.add(cardClass);
        }
      });
    });
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

  // ── Hero Banner Slideshow ───────────────────────────────────────────
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const heroTabs = document.querySelectorAll('.hero-tab-item');
  const heroCounterNum = document.querySelector('#heroCounter .current-num');
  const heroPlayBtn = document.getElementById('heroPlayBtn');
  const heroPlayIcon = document.getElementById('heroPlayIcon');

  if (heroSlides.length > 0) {
    let currentSlide = 0;
    const totalSlides = heroSlides.length;
    const DURATION = 5000;
    let slideTimer = null;
    let isPlaying = true;

    function updateCounter(index) {
      if (heroCounterNum) {
        heroCounterNum.textContent = String(index + 1).padStart(2, '0');
      }
    }

    function resetTimer() {
      clearInterval(slideTimer);
      if (isPlaying) {
        slideTimer = setInterval(nextSlide, DURATION);
      }
    }

    function setSlide(index) {
      currentSlide = index;

      // Update slides
      heroSlides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Update dots
      heroDots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });

      // Update tabs & progress fills
      heroTabs.forEach((tab, i) => {
        tab.classList.remove('active', 'past', 'animating');
        if (i < index) {
          tab.classList.add('past');
        } else if (i === index) {
          tab.classList.add('active');
          if (isPlaying) {
            // Trigger reflow to restart CSS transition
            void tab.offsetWidth;
            tab.classList.add('animating');
          }
        }
      });

      updateCounter(index);
      resetTimer();
    }

    function nextSlide() {
      const nextIndex = (currentSlide + 1) % totalSlides;
      setSlide(nextIndex);
    }

    // Tab clicks
    heroTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        setSlide(i);
      });
    });

    // Dot clicks
    heroDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        setSlide(i);
      });
    });

    // Play/Pause toggle
    if (heroPlayBtn && heroPlayIcon) {
      heroPlayBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
          heroPlayIcon.className = 'fa-solid fa-pause';
          setSlide(currentSlide);
        } else {
          heroPlayIcon.className = 'fa-solid fa-play';
          clearInterval(slideTimer);
          heroTabs.forEach((tab) => tab.classList.remove('animating'));
        }
      });
    }

    // Initialize slide 0
    setSlide(0);
  }

});

