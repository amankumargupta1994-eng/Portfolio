/**
 * Modern Portfolio JavaScript
 * Handles Theme Toggle, Typing Animation, Project Filtering,
 * Modal View, Mobile Nav, ScrollSpy, and Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Current Year in Footer
     ========================================================================== */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. Theme Toggle (Dark / Light Mode) with LocalStorage
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }

  /* ==========================================================================
     3. Mobile Navigation Menu Toggle
     ========================================================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('open')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  }

  /* ==========================================================================
     4. Sticky Navbar & Back to Top Button
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky navbar shadow
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     5. Dynamic Typing Effect in Hero
     ========================================================================== */
  const typedTextSpan = document.getElementById('typed-text');
  if (typedTextSpan) {
    const roles = [
      'Full Stack Developer.',
      'Frontend Specialist.',
      'UI/UX Enthusiast.',
      'Problem Solver.',
      'MERN Stack Enthusiast.'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end of word
        typingSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  /* ==========================================================================
     6. ScrollSpy: Highlight Active Nav Link
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function scrollSpy() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', scrollSpy);

  /* ==========================================================================
     7. Animated Counters for Stats in About Section
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  function countUpStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const isPercentage = stat.textContent.includes('%');
      let count = 0;
      const increment = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        stat.textContent = count + (isPercentage ? '%' : '+');
      }, 35);
    });
  }

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          countUpStats();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(aboutSection);
  }

  /* ==========================================================================
     8. Project Category Filters
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ==========================================================================
     9. Project Modal Details
     ========================================================================== */
  const projectModal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');

  const projectData = {
    1: {
      title: 'Apex Commerce Hub',
      category: 'Full Stack Web App',
      description: 'Apex Commerce Hub is an enterprise-grade digital marketplace engineered for frictionless online shopping. Built with component-based modular architecture, dynamic cart management, and seamless mock checkout.',
      features: [
        'Real-time product filtering & instant search by keyword or category',
        'Stateful cart management stored in browser local state',
        'Optimized responsive layouts with instant loading speed',
        'Interactive checkout simulation with form validation'
      ],
      stack: ['HTML5', 'CSS3 (Flexbox/Grid)', 'JavaScript (ES6+)', 'REST APIs'],
      demoLink: 'https://example.com',
      githubLink: 'https://github.com'
    },
    2: {
      title: 'SaaS Analytics Dashboard',
      category: 'Frontend Performance Tool',
      description: 'A data-dense analytics platform delivering financial metrics, user retention stats, and real-time revenue breakdowns. Features interactive visual charts with smooth animation transitions.',
      features: [
        'Dynamic time-range filtering (7 Days, 30 Days, 1 Year)',
        'Dark and Light theme adaptive charts and color palettes',
        'Interactive tooltips, export to CSV, and quick summary cards',
        'Pixel-perfect responsive desktop and mobile dashboards'
      ],
      stack: ['HTML5', 'Modern CSS', 'Vanilla JavaScript', 'Chart.js'],
      demoLink: 'https://example.com',
      githubLink: 'https://github.com'
    },
    3: {
      title: 'TaskFlow Agile Board',
      category: 'Productivity Tool',
      description: 'An agile task management application inspired by Trello and Jira. Designed for developers and project managers to streamline workflows, prioritize tickets, and track velocity.',
      features: [
        'Native HTML5 drag-and-drop mechanics across multiple task columns',
        'Custom task tagging, color-coded priorities, and due date alerts',
        'Persistent offline storage using Web Storage APIs',
        'Keyboard shortcuts for swift creation and column transitions'
      ],
      stack: ['HTML5', 'CSS Grid', 'Drag & Drop API', 'Web Storage'],
      demoLink: 'https://example.com',
      githubLink: 'https://github.com'
    },
    4: {
      title: 'SkyCast Weather Pulse',
      category: 'Meteorological Web App',
      description: 'SkyCast delivers hyper-accurate hourly and 7-day weather intelligence with atmospheric pressure, humidity, UV index, and wind vectors, styled with modern glassmorphism aesthetics.',
      features: [
        'Automated geolocation detection with fallback search by city name',
        'Interactive animated weather condition indicators and charts',
        'Dynamic background tinting matching current local time and weather',
        'Lightweight footprint with sub-second API retrieval'
      ],
      stack: ['HTML5', 'Glassmorphism CSS', 'Fetch API', 'OpenWeather API'],
      demoLink: 'https://example.com',
      githubLink: 'https://github.com'
    },
    5: {
      title: 'Studio Aura Creative Agency',
      category: 'UI/UX Brand Showcase',
      description: 'An artistic portfolio concept built for an award-winning digital creative studio. Highlights editorial typography, subtle magnetic cursor interactions, and curated case study galleries.',
      features: [
        'Fluid scroll animations and layered depth effects',
        'Interactive case study showcases with modal deep-dives',
        'Optimized typography and high-contrast accessibility standards',
        'Minimalist aesthetic that emphasizes high-end creative work'
      ],
      stack: ['HTML5', 'CSS Keyframes', 'Figma Prototyping', 'Vanilla JS'],
      demoLink: 'https://example.com',
      githubLink: 'https://github.com'
    },
    6: {
      title: 'CyberVault Gaming Portal',
      category: 'Interactive Entertainment Platform',
      description: 'A community tournament hub designed for esports gamers. Highlights live bracket fixtures, squad rosters, Twitch stream embeds, and neon cyberpunk visual motifs.',
      features: [
        'Interactive tournament tree schedule with live winner highlights',
        'Custom audio sound effects on interactive hover states',
        'Glow effects, neon gradients, and dark high-contrast design',
        'Mobile responsive tournament tracker'
      ],
      stack: ['HTML5', 'CSS Variables', 'Audio API', 'Interactive UI'],
      demoLink: 'https://example.com',
      githubLink: 'https://github.com'
    }
  };

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const projectId = trigger.getAttribute('data-project');
      const data = projectData[projectId];

      if (data && modalContent && projectModal) {
        modalContent.innerHTML = `
          <span class="section-tag" style="margin-bottom: 0.8rem;">${data.category}</span>
          <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 1rem;">${data.title}</h2>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">${data.description}</p>
          
          <h4 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.6rem;">Key Highlights:</h4>
          <ul style="list-style: disc; margin-left: 1.25rem; margin-bottom: 1.5rem; color: var(--text-secondary); line-height: 1.6;">
            ${data.features.map(f => `<li>${f}</li>`).join('')}
          </ul>

          <h4 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.6rem;">Technologies Used:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
            ${data.stack.map(s => `<span style="font-size: 0.8rem; background: var(--bg-surface-elevated); padding: 0.3rem 0.8rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">${s}</span>`).join('')}
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="${data.demoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Preview
            </a>
            <a href="${data.githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
              <i class="fa-brands fa-github"></i> Source Code
            </a>
          </div>
        `;

        projectModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     10. Contact Form Validation & Submission
     ========================================================================== */
  const contactForm = document.getElementById('portfolio-contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');
  const formFeedback = document.getElementById('form-feedback');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setFieldError(field, hasError) {
    const group = field.closest('.form-group');
    if (group) {
      if (hasError) {
        group.classList.add('has-error');
      } else {
        group.classList.remove('has-error');
      }
    }
  }

  // Clear errors on input
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        setFieldError(input, false);
        if (formFeedback) {
          formFeedback.className = 'form-feedback';
          formFeedback.style.display = 'none';
        }
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Name validation
      if (!nameInput.value.trim()) {
        setFieldError(nameInput, true);
        isValid = false;
      } else {
        setFieldError(nameInput, false);
      }

      // Email validation
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        setFieldError(emailInput, true);
        isValid = false;
      } else {
        setFieldError(emailInput, false);
      }

      // Subject validation
      if (!subjectInput.value.trim()) {
        setFieldError(subjectInput, true);
        isValid = false;
      } else {
        setFieldError(subjectInput, false);
      }

      // Message validation
      if (!messageInput.value.trim()) {
        setFieldError(messageInput, true);
        isValid = false;
      } else {
        setFieldError(messageInput, false);
      }

      if (!isValid) return;

      // Simulate sending with loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Reset form
        contactForm.reset();

        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I will get back to you shortly.`;
          formFeedback.style.display = 'block';
        }

        showToast('Message sent successfully! 🚀', 'success');
      }, 1200);
    });
  }

  /* ==========================================================================
     11. Download CV Trigger
     ========================================================================== */
  const downloadCvBtn = document.getElementById('download-cv-btn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Resume download started! (Demo simulation)', 'info');
    });
  }

  /* ==========================================================================
     12. Toast Notification Utility
     ========================================================================== */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-circle-check';

    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

});
