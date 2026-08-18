/**
 * Li Zhiyang (eto-1024) Academic Portfolio, Bio-Nav Hub, Bio-Docs & Tools Download Hub - Core Scripts
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
  // 2. Four-Page View Switcher (Profile vs Hub vs Docs vs Tools)
  // ==========================================================================
  const tabProfile = document.getElementById('tabProfile');
  const tabHub = document.getElementById('tabHub');
  const tabDocs = document.getElementById('tabDocs');
  const tabTools = document.getElementById('tabTools');

  const viewProfile = document.getElementById('viewProfile');
  const viewHub = document.getElementById('viewHub');
  const viewDocs = document.getElementById('viewDocs');
  const viewTools = document.getElementById('viewTools');

  const profileNav = document.getElementById('profileNav');
  const hubNav = document.getElementById('hubNav');
  const docsNav = document.getElementById('docsNav');
  const toolsNav = document.getElementById('toolsNav');

  const btnHeroToHub = document.getElementById('btnHeroToHub');
  const brandLink = document.getElementById('brandLink');

  function switchView(target) {
    // Hide all views first
    if (viewProfile) { viewProfile.style.display = 'none'; viewProfile.classList.remove('active'); }
    if (viewHub) { viewHub.style.display = 'none'; viewHub.classList.remove('active'); }
    if (viewDocs) { viewDocs.style.display = 'none'; viewDocs.classList.remove('active'); }
    if (viewTools) { viewTools.style.display = 'none'; viewTools.classList.remove('active'); }

    // Reset tabs
    if (tabProfile) tabProfile.classList.remove('active');
    if (tabHub) tabHub.classList.remove('active');
    if (tabDocs) tabDocs.classList.remove('active');
    if (tabTools) tabTools.classList.remove('active');

    // Reset top navs
    if (profileNav) profileNav.style.display = 'none';
    if (hubNav) hubNav.style.display = 'none';
    if (docsNav) docsNav.style.display = 'none';
    if (toolsNav) toolsNav.style.display = 'none';

    if (target === 'hub') {
      if (viewHub) { viewHub.style.display = 'block'; viewHub.classList.add('active'); }
      if (tabHub) tabHub.classList.add('active');
      if (hubNav) hubNav.style.display = 'flex';
      window.history.replaceState(null, '', '#hub');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'docs') {
      if (viewDocs) { viewDocs.style.display = 'block'; viewDocs.classList.add('active'); }
      if (tabDocs) tabDocs.classList.add('active');
      if (docsNav) docsNav.style.display = 'flex';
      window.history.replaceState(null, '', '#docs');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'tools') {
      if (viewTools) { viewTools.style.display = 'block'; viewTools.classList.add('active'); }
      if (tabTools) tabTools.classList.add('active');
      if (toolsNav) toolsNav.style.display = 'flex';
      window.history.replaceState(null, '', '#tools');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (viewProfile) { viewProfile.style.display = 'block'; viewProfile.classList.add('active'); }
      if (tabProfile) tabProfile.classList.add('active');
      if (profileNav) profileNav.style.display = 'flex';
      window.history.replaceState(null, '', '#');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Expose globally for inline onclick handlers
  window.switchView = switchView;

  if (tabProfile) tabProfile.addEventListener('click', () => switchView('profile'));
  if (tabHub) tabHub.addEventListener('click', () => switchView('hub'));
  if (tabDocs) tabDocs.addEventListener('click', () => switchView('docs'));
  if (tabTools) tabTools.addEventListener('click', () => switchView('tools'));

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
  } else if (currentHash === '#tools' || currentHash.startsWith('#tool-')) {
    switchView('tools');
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
  // 5. Tools & Agent Download Search & Filter Logic
  // ==========================================================================
  const toolCards = document.querySelectorAll('#viewTools .tool-download-card');
  const toolCategorySections = document.querySelectorAll('#viewTools .hub-category-section');
  const toolSearchInput = document.getElementById('toolSearchInput');
  const toolSearchClear = document.getElementById('toolSearchClear');
  const toolFilterPills = document.querySelectorAll('#toolFilterPills .tool-filter-pill');
  const countToolsAllSpan = document.getElementById('countToolsAll');

  if (countToolsAllSpan) {
    countToolsAllSpan.textContent = toolCards.length + 3; // Including scripts
  }

  let activeToolCategory = 'all';
  let searchToolQuery = '';

  function filterToolResources() {
    toolCategorySections.forEach(section => {
      const secCategory = section.getAttribute('data-category');
      const cardsInSection = section.querySelectorAll('.tool-download-card');
      const scriptBlocks = section.querySelectorAll('.script-block');
      let visibleCount = 0;

      cardsInSection.forEach(card => {
        const tags = (card.getAttribute('data-tags') || '').toLowerCase();
        const title = (card.querySelector('.hub-card-name')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('.hub-card-desc')?.textContent || '').toLowerCase();
        const combinedText = `${title} ${desc} ${tags}`;

        const matchCategory = (activeToolCategory === 'all' || activeToolCategory === secCategory);
        const matchSearch = searchToolQuery === '' || combinedText.includes(searchToolQuery.toLowerCase());

        if (matchCategory && matchSearch) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      scriptBlocks.forEach(block => {
        const text = (block.textContent || '').toLowerCase();
        const matchCategory = (activeToolCategory === 'all' || activeToolCategory === secCategory || activeToolCategory === 'oneclick');
        const matchSearch = searchToolQuery === '' || text.includes(searchToolQuery.toLowerCase());

        if (matchCategory && matchSearch) {
          block.style.display = 'block';
          visibleCount++;
        } else {
          block.style.display = 'none';
        }
      });

      section.style.display = visibleCount === 0 ? 'none' : 'block';
    });
  }

  if (toolSearchInput) {
    toolSearchInput.addEventListener('input', (e) => {
      searchToolQuery = e.target.value.trim();
      toolSearchClear.style.display = searchToolQuery.length > 0 ? 'block' : 'none';
      filterToolResources();
    });
  }

  if (toolSearchClear) {
    toolSearchClear.addEventListener('click', () => {
      toolSearchInput.value = '';
      searchToolQuery = '';
      toolSearchClear.style.display = 'none';
      filterToolResources();
      toolSearchInput.focus();
    });
  }

  toolFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      toolFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeToolCategory = pill.getAttribute('data-filter') || 'all';
      filterToolResources();
    });
  });

  // ==========================================================================
  // 6. One-Click Code Snippet Copy Functionality
  // ==========================================================================
  window.copyCodeSnippet = function(codeId, btnElement) {
    const codeElement = document.getElementById(codeId);
    if (!codeElement) return;

    const textToCopy = codeElement.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalHtml = btnElement.innerHTML;
      btnElement.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i> <span style="color: #10b981;">已成功复制！</span>';

      const toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = '代码脚本已成功复制到剪贴板！';
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2200);
      }

      setTimeout(() => {
        btnElement.innerHTML = originalHtml;
      }, 2000);
    }).catch(err => {
      console.error('Copy script failed:', err);
    });
  };

  // ==========================================================================
  // 7. Copy Email Functionality
  // ==========================================================================
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  const toast = document.getElementById('toast');
  const emailAddress = 'etonsalmon160@gmail.com';

  if (btnCopyEmail && toast) {
    btnCopyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText(emailAddress).then(() => {
        toast.textContent = '已成功复制邮箱地址到剪贴板！';
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
  // 8. Scroll Spy Navigation Highlight
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
    } else if (viewTools && viewTools.style.display === 'block') {
      activeNav = toolsNav;
      currentSections = document.querySelectorAll('#viewTools .hub-category-section[id]');
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
  // 9. Mobile Menu Toggle
  // ==========================================================================
  const menuBtnMobile = document.getElementById('menuBtnMobile');

  if (menuBtnMobile) {
    menuBtnMobile.addEventListener('click', () => {
      let currentNav = profileNav;
      if (viewHub && viewHub.style.display === 'block') currentNav = hubNav;
      if (viewDocs && viewDocs.style.display === 'block') currentNav = docsNav;
      if (viewTools && viewTools.style.display === 'block') currentNav = toolsNav;

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
