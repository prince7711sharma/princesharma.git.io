(function () {
  "use strict";

  /**
   * Mobile navbar toggle (your custom hamburger)
   */
  const menuToggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.getElementById('menu');

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggleBtn.contains(e.target)) {
        navMenu.classList.remove('show');
      }
    });

    // Close menu on nav link click (mobile)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll-to-top button
   */
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * AOS Animation
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Typed.js (text animation)
   */
  const typedEl = document.querySelector('.typed');
  if (typedEl) {
    let strings = typedEl.getAttribute('data-typed-items');
    strings = strings.split(',');
    new Typed('.typed', {
      strings: strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * PureCounter (animated counters)
   */
  new PureCounter();

  /**
   * Animate skills progress bars on scroll (Waypoints)
   */
  const skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function () {
        const bars = item.querySelectorAll('.progress .progress-bar');
        bars.forEach((bar) => {
          bar.style.width = bar.getAttribute('aria-valuenow') + '%';
        });
      },
    });
  });

  /**
   * GLightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
  });

  /**
   * Isotope (filters and layout)
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort,
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filterBtn) {
      filterBtn.addEventListener('click', function () {
        isotopeItem.querySelector('.filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter'),
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      });
    });
  });

  /**
   * Swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.init-swiper').forEach(function (el) {
      const config = JSON.parse(el.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(el, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Scroll to anchor on load if hash exists
   */
  window.addEventListener('load', function () {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          const scrollMarginTop = getComputedStyle(target).scrollMarginTop;
          window.scrollTo({
            top: target.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  });

  /**
   * Active nav link on scroll (scrollspy)
   */
  const navLinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    const scrollPosition = window.scrollY + 200;
    navLinks.forEach((link) => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      if (
        scrollPosition >= section.offsetTop &&
        scrollPosition <= section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
})();
