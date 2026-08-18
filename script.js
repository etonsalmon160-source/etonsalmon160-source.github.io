/**
 * Li Zhiyang Academic Portfolio - Core Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher (Dark / Light Mode)
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

  // 2. Copy Email Functionality
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

  // 3. Scroll Spy Navigation Highlight
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (navLink) {
        if (scrollPosition >= top && scrollPosition < top + height) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // 4. Mobile Menu Toggle
  const menuBtnMobile = document.getElementById('menuBtnMobile');
  const navLinks = document.getElementById('navLinks');

  if (menuBtnMobile && navLinks) {
    menuBtnMobile.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = document.body.classList.contains('light-theme') ? '#ffffff' : '#121216';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid var(--border-subtle)';
        navLinks.style.gap = '1rem';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
        }
      });
    });
  }
});
