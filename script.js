// ===================================================================
// DEPARTMENT OF COMPUTER SCIENCE - SB COLLEGE
// Interactive Script
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Header Shadow on Scroll ---
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.06)';
    } else {
      header.style.boxShadow = 'none';
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
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#ffffff';
        navMenu.style.padding = '1.5rem';
        navMenu.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
        navMenu.style.borderTop = '1px solid #e2e8f0';
      }
    });
  }
});
