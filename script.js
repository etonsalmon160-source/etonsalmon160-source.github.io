/**
 * Li Zhiyang (eto-1024) Academic Portfolio, Bio-Nav Hub & Bio-Docs Curriculum - Core Scripts
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
  // 2. Three-Page View Switcher (Profile vs Bio-Nav Hub vs Bio-Docs)
  // ==========================================================================
  const tabProfile = document.getElementById('tabProfile');
  const tabHub = document.getElementById('tabHub');
  const tabDocs = document.getElementById('tabDocs');

  const viewProfile = document.getElementById('viewProfile');
  const viewHub = document.getElementById('viewHub');
  const viewDocs = document.getElementById('viewDocs');

  const profileNav = document.getElementById('profileNav');
  const hubNav = document.getElementById('hubNav');
  const docsNav = document.getElementById('docsNav');

  const btnHeroToHub = document.getElementById('btnHeroToHub');
  const brandLink = document.getElementById('brandLink');

  function switchView(target) {
    // Hide all views first
    viewProfile.style.display = 'none';
    viewProfile.classList.remove('active');
    viewHub.style.display = 'none';
    viewHub.classList.remove('active');
    viewDocs.style.display = 'none';
    viewDocs.classList.remove('active');

    // Reset tabs
    tabProfile.classList.remove('active');
    tabHub.classList.remove('active');
    tabDocs.classList.remove('active');

    // Reset top navs
    profileNav.style.display = 'none';
    hubNav.style.display = 'none';
    docsNav.style.display = 'none';

    if (target === 'hub') {
      viewHub.style.display = 'block';
      viewHub.classList.add('active');
      tabHub.classList.add('active');
      hubNav.style.display = 'flex';
      window.history.replaceState(null, '', '#hub');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'docs') {
      viewDocs.style.display = 'block';
      viewDocs.classList.add('active');
      tabDocs.classList.add('active');
      docsNav.style.display = 'flex';
      window.history.replaceState(null, '', '#docs');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      viewProfile.style.display = 'block';
      viewProfile.classList.add('active');
      tabProfile.classList.add('active');
      profileNav.style.display = 'flex';
      window.history.replaceState(null, '', '#');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (tabProfile) tabProfile.addEventListener('click', () => switchView('profile'));
  if (tabHub) tabHub.addEventListener('click', () => switchView('hub'));
  if (tabDocs) tabDocs.addEventListener('click', () => switchView('docs'));

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

  // Check initial URL hash on page load
  const currentHash = window.location.hash;
  if (currentHash === '#hub' || currentHash.startsWith('#hub-')) {
    switchView('hub');
  } else if (currentHash === '#docs' || currentHash.startsWith('#doc-')) {
    switchView('docs');
  }

  // ==========================================================================
  // 3. Bioinformatics Resource Hub Search & Filter Logic
  // ==========================================================================
  const hubCards = document.querySelectorAll('#viewHub .hub-card');
  const hubCategorySections = document.querySelectorAll('#viewHub .hub-category-section');
  const hubSearchInput = document.getElementById('hubSearchInput');
  const hubSearchClear = document.getElementById('hubSearchClear');
  const filterPills = document.querySelectorAll('#hubFilterPills .filter-pill');
  const countAllSpan = document.getElementById('countAll');

  if (countAllSpan) {
    countAllSpan.textContent = hubCards.length;
  }

  let activeHubCategory = 'all';
  let searchHubQuery = '';

  function filterHubResources() {
    hubCategorySections.forEach(section => {
      const secCategory = section.getAttribute('data-category');
      const cardsInSection = section.querySelectorAll('.hub-card');
      let visibleInSection = 0;

      cardsInSection.forEach(card => {
        const tags = (card.getAttribute('data-tags') || '').toLowerCase();
        const title = (card.querySelector('.hub-card-name')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('.hub-card-desc')?.textContent || '').toLowerCase();
        const combinedText = `${title} ${desc} ${tags}`;

        const matchCategory = (activeHubCategory === 'all' || activeHubCategory === secCategory);
        const matchSearch = searchHubQuery === '' || combinedText.includes(searchHubQuery.toLowerCase());

        if (matchCategory && matchSearch) {
          card.style.display = 'flex';
          visibleInSection++;
        } else {
          card.style.display = 'none';
        }
      });

      section.style.display = visibleInSection === 0 ? 'none' : 'block';
    });
  }

  if (hubSearchInput) {
    hubSearchInput.addEventListener('input', (e) => {
      searchHubQuery = e.target.value.trim();
      hubSearchClear.style.display = searchHubQuery.length > 0 ? 'block' : 'none';
      filterHubResources();
    });
  }

  if (hubSearchClear) {
    hubSearchClear.addEventListener('click', () => {
      hubSearchInput.value = '';
      searchHubQuery = '';
      hubSearchClear.style.display = 'none';
      filterHubResources();
      hubSearchInput.focus();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeHubCategory = pill.getAttribute('data-filter') || 'all';
      filterHubResources();
    });
  });

  // ==========================================================================
  // 4. Bioinformatics Technical Docs Search & Filter Logic
  // ==========================================================================
  const docCards = document.querySelectorAll('#viewDocs .doc-card');
  const docCategorySections = document.querySelectorAll('#viewDocs .hub-category-section');
  const docSearchInput = document.getElementById('docSearchInput');
  const docSearchClear = document.getElementById('docSearchClear');
  const docFilterPills = document.querySelectorAll('#docFilterPills .doc-filter-pill');
  const countDocsAllSpan = document.getElementById('countDocsAll');

  if (countDocsAllSpan) {
    countDocsAllSpan.textContent = docCards.length;
  }

  let activeDocCategory = 'all';
  let searchDocQuery = '';

  function filterDocResources() {
    docCategorySections.forEach(section => {
      const secCategory = section.getAttribute('data-category');
      const cardsInSection = section.querySelectorAll('.doc-card');
      let visibleInSection = 0;

      cardsInSection.forEach(card => {
        const tags = (card.getAttribute('data-tags') || '').toLowerCase();
        const title = (card.querySelector('.hub-card-name')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('.hub-card-desc')?.textContent || '').toLowerCase();
        const combinedText = `${title} ${desc} ${tags}`;

        const matchCategory = (activeDocCategory === 'all' || activeDocCategory === secCategory);
        const matchSearch = searchDocQuery === '' || combinedText.includes(searchDocQuery.toLowerCase());

        if (matchCategory && matchSearch) {
          card.style.display = 'flex';
          visibleInSection++;
        } else {
          card.style.display = 'none';
        }
      });

      section.style.display = visibleInSection === 0 ? 'none' : 'block';
    });
  }

  if (docSearchInput) {
    docSearchInput.addEventListener('input', (e) => {
      searchDocQuery = e.target.value.trim();
      docSearchClear.style.display = searchDocQuery.length > 0 ? 'block' : 'none';
      filterDocResources();
    });
  }

  if (docSearchClear) {
    docSearchClear.addEventListener('click', () => {
      docSearchInput.value = '';
      searchDocQuery = '';
      docSearchClear.style.display = 'none';
      filterDocResources();
      docSearchInput.focus();
    });
  }

  docFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      docFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeDocCategory = pill.getAttribute('data-filter') || 'all';
      filterDocResources();
    });
  });

  // ==========================================================================
  // 5. Copy Email Functionality
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
  // 6. Scroll Spy Navigation Highlight
  // ==========================================================================
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 120;
    let activeNav = profileNav;
    let currentSections = document.querySelectorAll('#viewProfile section[id]');

    if (viewHub && viewHub.style.display === 'block') {
      activeNav = hubNav;
      currentSections = document.querySelectorAll('#viewHub .hub-category-section[id]');
    } else if (viewDocs && viewDocs.style.display === 'block') {
      activeNav = docsNav;
      currentSections = document.querySelectorAll('#viewDocs .hub-category-section[id]');
    }

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
  // 7. Mobile Menu Toggle
  // ==========================================================================
  const menuBtnMobile = document.getElementById('menuBtnMobile');

  if (menuBtnMobile) {
    menuBtnMobile.addEventListener('click', () => {
      let currentNav = profileNav;
      if (viewHub && viewHub.style.display === 'block') currentNav = hubNav;
      if (viewDocs && viewDocs.style.display === 'block') currentNav = docsNav;

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
