/**
 * Li Zhiyang (eto-1024) Academic Portfolio & Bio-Nav Hub - Core Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Theme Switcher (Dark / Light Mode)
  // ==========================================================================
  const themeBtn = document.getElementById('themeBtn');
  const savedTheme = localStorage.getItem('site_theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      if (document.body.classList.contains('light-theme')) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('site_theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('site_theme', 'light');
      }
    });
  }

  // ==========================================================================
  // 2. Two-Page View Switcher (Profile vs Bio-Nav Hub)
  // ==========================================================================
  const tabProfile = document.getElementById('tabProfile');
  const tabHub = document.getElementById('tabHub');
  const viewProfile = document.getElementById('viewProfile');
  const viewHub = document.getElementById('viewHub');
  const profileNav = document.getElementById('profileNav');
  const hubNav = document.getElementById('hubNav');
  const btnHeroToHub = document.getElementById('btnHeroToHub');
  const brandLink = document.getElementById('brandLink');

  function switchView(target) {
    if (target === 'hub') {
      // Show Hub
      viewProfile.style.display = 'none';
      viewProfile.classList.remove('active');

      viewHub.style.display = 'block';
      viewHub.classList.add('active');

      tabProfile.classList.remove('active');
      tabHub.classList.add('active');

      profileNav.style.display = 'none';
      hubNav.style.display = 'flex';

      window.history.replaceState(null, '', '#hub');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Show Profile
      viewHub.style.display = 'none';
      viewHub.classList.remove('active');

      viewProfile.style.display = 'block';
      viewProfile.classList.add('active');

      tabHub.classList.remove('active');
      tabProfile.classList.add('active');

      hubNav.style.display = 'none';
      profileNav.style.display = 'flex';

      window.history.replaceState(null, '', '#');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (tabProfile && tabHub) {
    tabProfile.addEventListener('click', () => switchView('profile'));
    tabHub.addEventListener('click', () => switchView('hub'));
  }

  if (btnHeroToHub) {
    btnHeroToHub.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('hub');
    });
  }

  if (brandLink) {
    brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Check initial URL hash
  if (window.location.hash === '#hub' || window.location.hash.startsWith('#hub-')) {
    switchView('hub');
  }

  // ==========================================================================
  // 3. Bioinformatics Hub Search & Filter Logic
  // ==========================================================================
  const hubCards = document.querySelectorAll('.hub-card');
  const hubCategorySections = document.querySelectorAll('.hub-category-section');
  const hubSearchInput = document.getElementById('hubSearchInput');
  const hubSearchClear = document.getElementById('hubSearchClear');
  const filterPills = document.querySelectorAll('.filter-pill');
  const countAllSpan = document.getElementById('countAll');

  if (countAllSpan) {
    countAllSpan.textContent = hubCards.length;
  }

  let activeCategory = 'all';
  let searchQuery = '';

  function filterHubResources() {
    let visibleTotal = 0;

    hubCategorySections.forEach(section => {
      const secCategory = section.getAttribute('data-category');
      const cardsInSection = section.querySelectorAll('.hub-card');
      let visibleInSection = 0;

      cardsInSection.forEach(card => {
        const tags = (card.getAttribute('data-tags') || '').toLowerCase();
        const title = (card.querySelector('.hub-card-name')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('.hub-card-desc')?.textContent || '').toLowerCase();
        const combinedText = `${title} ${desc} ${tags}`;

        const matchCategory = (activeCategory === 'all' || activeCategory === secCategory);
        const matchSearch = searchQuery === '' || combinedText.includes(searchQuery.toLowerCase());

        if (matchCategory && matchSearch) {
          card.style.display = 'flex';
          visibleInSection++;
          visibleTotal++;
        } else {
          card.style.display = 'none';
        }
      });

      // Hide whole section if no cards match
      if (visibleInSection === 0) {
        section.style.display = 'none';
      } else {
        section.style.display = 'block';
      }
    });
  }

  if (hubSearchInput) {
    hubSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      if (searchQuery.length > 0) {
        hubSearchClear.style.display = 'block';
      } else {
        hubSearchClear.style.display = 'none';
      }
      filterHubResources();
    });
  }

  if (hubSearchClear) {
    hubSearchClear.addEventListener('click', () => {
      hubSearchInput.value = '';
      searchQuery = '';
      hubSearchClear.style.display = 'none';
      filterHubResources();
      hubSearchInput.focus();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-filter') || 'all';
      filterHubResources();
    });
  });

  // ==========================================================================
  // 4. Copy Email Functionality
  // ==========================================================================
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  const toast = document.getElementById('toast');
  const emailAddress = 'etonsalmon160@gmail.com';

  if (btnCopyEmail && toast) {
    btnCopyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText(emailAddress).then(() => {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2200);
      }).catch(err => {
        console.error('Clipboard copy failed:', err);
      });
    });
  }

  // ==========================================================================
  // 5. Scroll Spy Navigation Highlight
  // ==========================================================================
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 120;
    const isHub = viewHub && viewHub.style.display === 'block';
    const activeNav = isHub ? hubNav : profileNav;
    const currentSections = isHub ? document.querySelectorAll('.hub-category-section[id]') : document.querySelectorAll('#viewProfile section[id]');

    currentSections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const navLink = activeNav?.querySelector(`a[href="#${id}"]`);

      if (navLink) {
        if (scrollPosition >= top && scrollPosition < top + height) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // ==========================================================================
  // 6. Mobile Menu Toggle
  // ==========================================================================
  const menuBtnMobile = document.getElementById('menuBtnMobile');

  if (menuBtnMobile) {
    menuBtnMobile.addEventListener('click', () => {
      const isHub = viewHub && viewHub.style.display === 'block';
      const currentNav = isHub ? hubNav : profileNav;

      if (currentNav.style.display === 'flex') {
        currentNav.style.display = 'none';
      } else {
        currentNav.style.display = 'flex';
        currentNav.style.flexDirection = 'column';
        currentNav.style.position = 'absolute';
        currentNav.style.top = '100%';
        currentNav.style.left = '0';
        currentNav.style.right = '0';
        currentNav.style.background = document.body.classList.contains('light-theme') ? '#ffffff' : '#121216';
        currentNav.style.padding = '1.5rem';
        currentNav.style.borderBottom = '1px solid var(--border-subtle)';
        currentNav.style.gap = '1rem';
      }
    });
  }
});
