(function () {
  'use strict';

  /* ============================================
     Navigation
     ============================================ */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', toggleMenu);

  navLinkEls.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  /* ============================================
     Sticky Nav & Active Section Highlighting
     ============================================ */
  const sections = document.querySelectorAll('section[id]');

  function updateNav() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 150;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinkEls.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav, { passive: true });
  updateNav();

  /* ============================================
     Smooth Scrolling for Nav Links
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ============================================
     Back to Top
     ============================================ */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     Build Experience Timeline from Data
     ============================================ */
  var timelineEl = document.querySelector('.timeline');
  if (timelineEl && typeof portfolioData !== 'undefined') {
    portfolioData.experience.forEach(function (exp, index) {
      var item = document.createElement('div');
      item.className = 'timeline-item' + (exp.current ? ' current' : '');
      if (index === 0) item.classList.add('expanded');

      item.innerHTML =
        '<div class="timeline-dot"></div>' +
        '<div class="timeline-card" tabindex="0" role="button" aria-expanded="' + (index === 0 ? 'true' : 'false') + '">' +
          '<div class="timeline-card-header">' +
            '<div class="timeline-card-top">' +
              '<span class="timeline-company">' + escapeHtml(exp.company) + '</span>' +
              '<div style="display:flex;align-items:center;gap:8px">' +
                (exp.current ? '<span class="timeline-current-badge">Current</span>' : '') +
                '<svg class="timeline-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
              '</div>' +
            '</div>' +
            '<span class="timeline-role">' + escapeHtml(exp.role) + '</span>' +
            '<div class="timeline-meta">' +
              '<span class="timeline-meta-item">' + escapeHtml(exp.duration) + '</span>' +
              '<span class="timeline-meta-item">' + escapeHtml(exp.location) + '</span>' +
              (exp.type ? '<span class="timeline-meta-item">' + escapeHtml(exp.type) + '</span>' : '') +
            '</div>' +
          '</div>' +
          '<div class="timeline-card-body">' +
            '<ul class="timeline-responsibilities">' +
              exp.responsibilities.map(function (r) {
                return '<li class="timeline-responsibility">' + escapeHtml(r) + '</li>';
              }).join('') +
            '</ul>' +
          '</div>' +
        '</div>';

      timelineEl.appendChild(item);
    });

    /* --- Timeline expand/collapse --- */
    var timelineCards = timelineEl.querySelectorAll('.timeline-card');
    var timelineItems = timelineEl.querySelectorAll('.timeline-item');

    timelineCards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        var parent = card.closest('.timeline-item');
        if (!parent) return;

        var isExpanded = parent.classList.contains('expanded');

        timelineItems.forEach(function (item) {
          item.classList.remove('expanded');
          var c = item.querySelector('.timeline-card');
          if (c) c.setAttribute('aria-expanded', 'false');
        });

        if (!isExpanded) {
          parent.classList.add('expanded');
          card.setAttribute('aria-expanded', 'true');
        }
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  /* ============================================
     Build Skills from Data
     ============================================ */
  function populateSkills(id, items) {
    var container = document.getElementById(id);
    if (!container) return;
    items.forEach(function (skill) {
      var chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = skill;
      container.appendChild(chip);
    });
  }

  if (typeof portfolioData !== 'undefined') {
    populateSkills('skills-design', portfolioData.skills.design);
    populateSkills('skills-prototyping', portfolioData.skills.prototyping);
    populateSkills('skills-research', portfolioData.skills.research);
    populateSkills('skills-visualization', portfolioData.skills.visualization);
  }

  /* ============================================
     Build Tools from Data
     ============================================ */
  var toolsGrid = document.getElementById('tools-grid');
  if (toolsGrid && typeof portfolioData !== 'undefined') {
    portfolioData.tools.forEach(function (tool) {
      var card = document.createElement('div');
      card.className = 'tool-card';
      var initial = tool.name.charAt(0).toUpperCase();
      card.innerHTML =
        '<span class="tool-card-icon">' + initial + '</span>' +
        '<span>' + escapeHtml(tool.name) + '</span>';
      toolsGrid.appendChild(card);
    });
  }

  /* ============================================
     Reveal Animations (Intersection Observer)
     ============================================ */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ============================================
     Utility: Escape HTML
     ============================================ */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

})();
