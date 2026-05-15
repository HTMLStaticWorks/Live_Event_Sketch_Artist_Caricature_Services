document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const htmlEl = document.documentElement;
  
  const currentTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  if (currentTheme === 'dark') {
    htmlEl.setAttribute('data-theme', 'dark');
  } else {
    htmlEl.removeAttribute('data-theme');
  }

  const updateIcons = () => {
    const isDark = htmlEl.hasAttribute('data-theme');
    themeToggles.forEach(toggle => {
      toggle.innerHTML = isDark ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';
    });
  };
  updateIcons();

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (htmlEl.hasAttribute('data-theme')) {
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        htmlEl.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      updateIcons();
    });
  });

  // RTL Toggle
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  
  const currentDir = localStorage.getItem('dir') || 'ltr';
  htmlEl.setAttribute('dir', currentDir);

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (htmlEl.getAttribute('dir') === 'rtl') {
        htmlEl.setAttribute('dir', 'ltr');
        localStorage.setItem('dir', 'ltr');
      } else {
        htmlEl.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
      }
    });
  });

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const closeDrawer = document.querySelector('.close-drawer');

  const openMenu = () => {
    drawer.classList.add('active');
    drawerOverlay.classList.add('active');
  };

  const closeMenu = () => {
    drawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
  };

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', closeMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMenu);

  // Gallery Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('.gallery-img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
      });
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }
});
