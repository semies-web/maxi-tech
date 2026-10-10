/* =========================================================
   MAXITECHNIKS — Main JavaScript
   ========================================================= */

const WHATSAPP_NUMBER = '2348138890904';

const projectGalleries = {
  acInstallation: {
    title: 'AC Installation',
    location: 'Lagos',
    images: [
      'images/projects/ac-installation/ac-installation 1.jpg',
      'images/projects/ac-installation/ac-installation 2.jpg'
    ]
  },
  electricalInstallation: {
    title: 'Electrical Installation',
    location: 'Lagos',
    images: [
      'images/projects/electrical-installation/electrical-installation 1.jpg',
      'images/projects/electrical-installation/electrical-installation 2.jpg'
    ]
  },
  projectSupervision: {
    title: 'Project Supervision',
    location: 'Lagos',
    images: [
      'images/projects/project-supervision/project-supervision 1.jpg',
      'images/projects/project-supervision/project-supervision 2.jpg'
    ]
  },
  technicalSupport: {
    title: 'Technical Support',
    location: 'Lagos',
    images: [
      'images/projects/technical-support/technical-support 1.jpg',
      'images/projects/technical-support/technical-support 2.jpg'
    ]
  },
  consultation: {
    title: 'Consultation',
    location: 'Lagos',
    images: [
      'images/projects/consultation/consultation-1.jpg',
      'images/projects/consultation/consultation-2.jpg'
    ]
  },
  completedInstallation: {
    title: 'Completed Installation',
    location: 'Lagos',
    images: [
      'images/projects/completed-installation/completed-installation 1.jpg',
      'images/projects/completed-installation/completed-installation 2.jpg'
    ]
  }
};

const services = [
  {
    id: 'air-conditioning-installation',
    title: 'Air-Conditioning Installation',
    intro: 'Professional AC installation planned around the space, its cooling needs, and the selected system.',
    description: 'MaxiTechNix supports air-conditioning projects from system sizing and supply through mounting, piping, electrical connection, testing, and commissioning. We work with homes, offices, and commercial spaces, and discuss the requirements of each installation before work begins.',
    features: ['Load calculation & sizing', 'Professional supply and mounting', 'Piping and electrical connection', 'Testing and system commissioning', 'Energy-efficient setup and warranty support']
  },
  {
    id: 'electrical-installation',
    title: 'Electrical Installation',
    intro: 'Electrical installation for residential, commercial, and industrial projects.',
    description: 'MaxiTechNix provides electrical installation work including wiring, distribution boards, lighting, earthing, and fault protection. Work is planned for the project requirements and tested against applicable electrical standards before handover.',
    features: ['Wiring, boards & lighting', 'Earthing & fault protection', 'Installation for residential, commercial & industrial projects', 'Testing to electrical codes']
  },
  {
    id: 'technical-support',
    title: 'Technical Support',
    intro: 'Practical troubleshooting and maintenance support for engineering and electrical systems.',
    description: 'MaxiTechNix helps investigate system issues, identify faults, and carry out repairs or preventive maintenance. Support can be arranged on-site or remotely depending on the issue, with emergency callouts available for urgent AC and electrical faults.',
    features: ['Troubleshooting & diagnostics', 'Repairs and emergency callouts', 'Preventive maintenance', 'On-site and remote support']
  },
  {
    id: 'consultation',
    title: 'Consultation',
    intro: 'Engineering advice to help you make informed decisions about your project.',
    description: 'MaxiTechNix provides consultation on system design, load analysis, energy efficiency, compliance, budgeting, and project planning. We discuss your requirements and help you assess practical options before committing to a project scope.',
    features: ['System design & analysis', 'Load analysis and energy efficiency', 'Compliance considerations', 'Budgeting and project planning']
  },
  {
    id: 'project-supervision',
    title: 'Project Supervision',
    intro: 'Professional oversight to help engineering projects progress with clear coordination and quality checks.',
    description: 'MaxiTechNix provides project supervision and contractor coordination, with attention to agreed timelines, budgets, safety, compliance, inspection, and quality assurance. The service supports a clear handover at the end of the work.',
    features: ['Contractor coordination', 'Timeline & budget control', 'Safety and compliance oversight', 'Inspection & quality assurance', 'Handover support']
  },
  {
    id: 'solar-energy-installation',
    title: 'Solar Energy Installation',
    intro: 'Solar energy solutions planned around your power needs and installation requirements.',
    description: 'MaxiTechNix supports solar projects from system sizing and design through panel installation, inverter and battery setup, wiring, testing, and system commissioning. We discuss the intended energy use and project requirements to help shape an appropriate power solution.',
    features: ['Solar system sizing & design', 'Panel installation', 'Inverter & battery setup', 'Wiring, testing & commissioning', 'Energy-efficient power solutions']
  }
];

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Project gallery ---------- */
  const projectCards = document.querySelectorAll('.project-card');
  const projectModal = document.getElementById('projectGalleryModal');
  const projectModalTitle = document.getElementById('projectGalleryTitle');
  const projectModalMeta = document.getElementById('projectGalleryMeta');
  const projectModalCounter = document.getElementById('projectGalleryCounter');
  const projectModalImage = document.getElementById('projectGalleryImage');
  const projectModalEmpty = document.getElementById('projectGalleryEmpty');
  const projectModalThumbs = document.getElementById('projectGalleryThumbs');
  const projectModalPrev = document.getElementById('projectGalleryPrev');
  const projectModalNext = document.getElementById('projectGalleryNext');

  let activeProjectKey = null;
  let activeImageIndex = 0;
  let touchStartX = null;

  const imageExists = src => new Promise(resolve => {
    if (!src) return resolve(false);
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });

  const setEmptyGalleryState = () => {
    if (projectModalImage) {
      projectModalImage.hidden = true;
      projectModalImage.removeAttribute('src');
      projectModalImage.alt = '';
    }
    if (projectModalEmpty) projectModalEmpty.hidden = false;
    if (projectModalCounter) projectModalCounter.textContent = '0 / 0';
    if (projectModalPrev) projectModalPrev.disabled = true;
    if (projectModalNext) projectModalNext.disabled = true;
    if (projectModalThumbs) projectModalThumbs.innerHTML = '';
  };

  const getProjectImages = async (projectKey) => {
    const project = projectKey && projectGalleries[projectKey];
    if (!project || !Array.isArray(project.images)) return [];
    const allImages = project.images.filter(Boolean);
    const validImages = [];
    for (const src of allImages) {
      if (await imageExists(src)) validImages.push(src);
    }
    return validImages;
  };

  const renderProjectGallery = async (projectKey) => {
    const project = projectKey && projectGalleries[projectKey];
    if (!project) return setEmptyGalleryState();

    const validImages = await getProjectImages(projectKey);
    projectModalTitle.textContent = project.title;
    projectModalMeta.textContent = project.location;

    if (!validImages.length) {
      setEmptyGalleryState();
      return;
    }

    if (projectModalImage) projectModalImage.hidden = false;
    if (projectModalEmpty) projectModalEmpty.hidden = true;
    if (projectModalPrev) projectModalPrev.disabled = false;
    if (projectModalNext) projectModalNext.disabled = false;

    projectModalThumbs.innerHTML = '';
    validImages.forEach((src, index) => {
      const thumbButton = document.createElement('button');
      thumbButton.type = 'button';
      thumbButton.className = 'project-gallery-thumb';
      thumbButton.setAttribute('aria-label', `View image ${index + 1} of ${validImages.length}`);
      thumbButton.innerHTML = `<img src="${src}" alt="${project.title} thumbnail ${index + 1}" loading="lazy" />`;
      thumbButton.addEventListener('click', () => {
        activeImageIndex = index;
        updateProjectGalleryImage(validImages);
      });
      projectModalThumbs.appendChild(thumbButton);
    });

    updateProjectGalleryImage(validImages);
  };

  const updateProjectGalleryImage = (images) => {
    if (!images || !images.length) return setEmptyGalleryState();

    const currentIndex = (activeImageIndex + images.length) % images.length;
    activeImageIndex = currentIndex;
    const src = images[currentIndex];
    const imageAlt = `${projectGalleries[activeProjectKey]?.title || 'Project'} photo ${currentIndex + 1} of ${images.length}`;

    if (projectModalImage) {
      projectModalImage.src = src;
      projectModalImage.alt = imageAlt;
      projectModalImage.hidden = false;
    }
    if (projectModalEmpty) projectModalEmpty.hidden = true;
    if (projectModalCounter) projectModalCounter.textContent = `${currentIndex + 1} / ${images.length}`;

    if (projectModalThumbs) {
      const thumbButtons = Array.from(projectModalThumbs.children);
      thumbButtons.forEach((button, index) => {
        const isActive = index === currentIndex;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }
  };

  const openProjectGallery = async (projectKey) => {
    if (!projectKey || !projectGalleries[projectKey]) return;
    activeProjectKey = projectKey;
    activeImageIndex = 0;
    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    await renderProjectGallery(projectKey);
  };

  const closeProjectGallery = () => {
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeProjectKey = null;
    activeImageIndex = 0;
    setEmptyGalleryState();
  };

  projectCards.forEach(card => {
    const projectKey = card.dataset.project;
    card.addEventListener('click', () => openProjectGallery(projectKey));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectGallery(projectKey);
      }
    });
  });

  if (projectModalPrev) {
    projectModalPrev.addEventListener('click', async () => {
      if (!activeProjectKey) return;
      const validImages = await getProjectImages(activeProjectKey);
      if (!validImages.length) return setEmptyGalleryState();
      activeImageIndex = (activeImageIndex - 1 + validImages.length) % validImages.length;
      updateProjectGalleryImage(validImages);
    });
  }

  if (projectModalNext) {
    projectModalNext.addEventListener('click', async () => {
      if (!activeProjectKey) return;
      const validImages = await getProjectImages(activeProjectKey);
      if (!validImages.length) return setEmptyGalleryState();
      activeImageIndex = (activeImageIndex + 1) % validImages.length;
      updateProjectGalleryImage(validImages);
    });
  }

  if (projectModal) {
    projectModal.addEventListener('click', event => {
      if (event.target instanceof HTMLElement && event.target.matches('[data-close-gallery]')) {
        closeProjectGallery();
      }
    });
  }

  document.addEventListener('keydown', async event => {
    if (!projectModal || !projectModal.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      closeProjectGallery();
      return;
    }
    if (!activeProjectKey) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const validImages = await getProjectImages(activeProjectKey);
      if (!validImages.length) return setEmptyGalleryState();
      activeImageIndex = (activeImageIndex + 1) % validImages.length;
      updateProjectGalleryImage(validImages);
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const validImages = await getProjectImages(activeProjectKey);
      if (!validImages.length) return setEmptyGalleryState();
      activeImageIndex = (activeImageIndex - 1 + validImages.length) % validImages.length;
      updateProjectGalleryImage(validImages);
    }
  });

  projectModal?.addEventListener('touchstart', event => {
    if (event.changedTouches && event.changedTouches[0]) {
      touchStartX = event.changedTouches[0].clientX;
    }
  }, { passive: true });

  projectModal?.addEventListener('touchend', async event => {
    if (touchStartX === null || !event.changedTouches || !event.changedTouches[0]) return;
    const endX = event.changedTouches[0].clientX;
    const delta = endX - touchStartX;
    touchStartX = null;

    if (Math.abs(delta) <= 48 || !activeProjectKey) return;

    const validImages = await getProjectImages(activeProjectKey);
    if (!validImages.length) return setEmptyGalleryState();

    if (delta < 0) {
      activeImageIndex = (activeImageIndex + 1) % validImages.length;
    } else {
      activeImageIndex = (activeImageIndex - 1 + validImages.length) % validImages.length;
    }
    updateProjectGalleryImage(validImages);
  }, { passive: true });

  /* ---------- Service details view ---------- */
  const serviceDetails = document.getElementById('serviceDetails');
  const serviceCards = document.querySelectorAll('[data-service]');
  const mainSections = Array.from(document.querySelectorAll('body > section:not(#serviceDetails)'));
  const backToServices = document.getElementById('backToServices');
  const serviceBooking = document.getElementById('serviceBooking');

  const showService = (serviceId, updateHistory = false) => {
    const service = services.find(item => item.id === serviceId);
    if (!service || !serviceDetails) return false;
    document.getElementById('serviceDetailTitle').textContent = service.title;
    document.getElementById('serviceDetailIntro').textContent = service.intro;
    document.getElementById('serviceDetailDescription').textContent = service.description;
    const features = document.getElementById('serviceDetailFeatures');
    features.replaceChildren(...service.features.map(feature => {
      const item = document.createElement('li');
      item.textContent = feature;
      return item;
    }));
    const message = `Hello MaxiTechNix, I am interested in your ${service.title} service. I would like to make an enquiry/book a service. Please provide more information.`;
    serviceBooking.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    mainSections.forEach(section => { section.hidden = true; });
    serviceDetails.hidden = false;
    document.title = `${service.title} | MAXITECHNIKS`;
    if (updateHistory) history.pushState({ serviceId }, '', `?service=${service.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  };

  const showMainSite = (updateHistory = false) => {
    mainSections.forEach(section => { section.hidden = false; });
    if (serviceDetails) serviceDetails.hidden = true;
    document.title = 'MAXITECHNIKS Integrated Engineering Services | AC, Electrical & Project Supervision — Lagos';
    if (updateHistory) history.replaceState({}, '', window.location.pathname);
  };

  serviceCards.forEach(card => card.addEventListener('click', event => {
    event.preventDefault();
    showService(card.dataset.service, true);
  }));
  if (backToServices) backToServices.addEventListener('click', () => {
    showMainSite(true);
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  });
  window.addEventListener('popstate', () => {
    const serviceId = new URLSearchParams(window.location.search).get('service');
    if (serviceId) showService(serviceId);
    else showMainSite();
  });
  const initialService = new URLSearchParams(window.location.search).get('service');
  if (initialService && !showService(initialService)) history.replaceState({}, '', window.location.pathname);

  /* ---------- Privacy and terms consent ---------- */
  const legalDialog = document.getElementById('legalDialog');
  const consentKey = 'maxitechniks-legal-consent';
  let hasConsent = false;
  try {
    hasConsent = localStorage.getItem(consentKey) === 'accepted';
  } catch (error) {
    hasConsent = false;
  }
  const acceptLegal = document.getElementById('acceptLegal');
  const consentCheckbox = document.getElementById('legalConsent');
  const closeLegalDialog = document.getElementById('closeLegalDialog');
  const setLegalTab = tab => {
    document.querySelectorAll('[data-legal-tab]').forEach(button => {
      const active = button.dataset.legalTab === tab;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    document.getElementById('privacyContent').hidden = tab !== 'privacy';
    document.getElementById('termsContent').hidden = tab !== 'terms';
  };

  const legalTabs = Array.from(document.querySelectorAll('[data-legal-tab]'));
  legalTabs.forEach(button => {
    button.addEventListener('click', () => setLegalTab(button.dataset.legalTab));
    button.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const currentIndex = legalTabs.indexOf(button);
      const nextIndex = (currentIndex + (event.key === 'ArrowRight' ? 1 : legalTabs.length - 1)) % legalTabs.length;
      legalTabs[nextIndex].focus();
      setLegalTab(legalTabs[nextIndex].dataset.legalTab);
    });
  });
  document.querySelectorAll('[data-legal]').forEach(link => link.addEventListener('click', () => {
    legalDialog.classList.remove('consent-required');
    setLegalTab(link.dataset.legal);
    if (!legalDialog.open) legalDialog.showModal();
  }));
  if (!hasConsent) {
    legalDialog.classList.add('consent-required');
    setLegalTab('privacy');
    legalDialog.showModal();
  }
  consentCheckbox.addEventListener('change', () => { acceptLegal.disabled = !consentCheckbox.checked; });
  acceptLegal.addEventListener('click', () => {
    if (!consentCheckbox.checked) return;
    try {
      localStorage.setItem(consentKey, 'accepted');
    } catch (error) {
      // The current visit can proceed even when browser storage is unavailable.
    }
    legalDialog.classList.remove('consent-required');
    legalDialog.close();
  });
  closeLegalDialog.addEventListener('click', () => legalDialog.close());
  legalDialog.addEventListener('cancel', event => {
    if (legalDialog.classList.contains('consent-required')) event.preventDefault();
  });

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') &&
          !navMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.querySelector('.back-to-top');

  const onScroll = () => {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 20);
    if (backToTop) backToTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  const setActiveLink = () => {
    let current = '';
    sections.forEach(sec => {
      if (!sec.hidden && window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Hero contact card deck ---------- */
  const heroDeck = document.querySelector('.hero-cta');
  if (heroDeck) {
    const deckCards = Array.from(heroDeck.querySelectorAll('.hero-cta-card'));
    let lastDeckChange = 0;
    let touchStartY = null;
    let suppressDeckClickUntil = 0;

    const advanceDeck = () => {
      deckCards.push(deckCards.shift());
      deckCards.forEach((card, index) => {
        card.classList.toggle('is-front', index === 0);
        card.classList.toggle('is-second', index === 1);
        card.classList.toggle('is-third', index === 2);
      });
    };

    const advanceOnce = () => {
      const now = Date.now();
      if (now - lastDeckChange < 420) return;
      lastDeckChange = now;
      advanceDeck();
    };

    const cycleButton = heroDeck.querySelector('.hero-cta-cycle');
    if (cycleButton) cycleButton.addEventListener('click', advanceOnce);

    heroDeck.addEventListener('wheel', (event) => {
      if (event.deltaY > 0) advanceOnce();
    }, { passive: true });

    heroDeck.addEventListener('touchstart', (event) => {
      touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });

    heroDeck.addEventListener('touchend', (event) => {
      if (touchStartY === null) return;
      const swipeDistance = touchStartY - event.changedTouches[0].clientY;
      if (swipeDistance > 30) {
        suppressDeckClickUntil = Date.now() + 450;
        advanceOnce();
      }
      touchStartY = null;
    }, { passive: true });

    heroDeck.addEventListener('click', (event) => {
      if (Date.now() < suppressDeckClickUntil && event.target.closest('.hero-cta-card')) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Contact form validation (Netlify handles submission) ---------- */
  const form = document.getElementById('contact-form');
  const formNote = document.getElementById('formNote');

  if (form) {
    const serviceSelect = form.querySelector('#service');
    const customServiceGroup = form.querySelector('#customServiceGroup');
    const customServiceInput = form.querySelector('#customService');
    const updateCustomServiceField = () => {
      const isOther = serviceSelect.value === 'Other';
      customServiceGroup.hidden = !isOther;
      customServiceInput.required = isOther;
      if (!isOther) customServiceInput.value = '';
    };

    serviceSelect.addEventListener('change', updateCustomServiceField);
    updateCustomServiceField();

    form.addEventListener('submit', (e) => {
      const name = form.querySelector('#name').value.trim();
      const phone = form.querySelector('#phone').value.trim();
      const email = form.querySelector('#email').value.trim();
      const service = serviceSelect.value;
      const customService = customServiceInput.value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !phone || !email || !service || !message) {
        e.preventDefault();
        if (formNote) formNote.textContent = 'Please fill in all fields.';
        return;
      }

      if (service === 'Other' && !customService) {
        e.preventDefault();
        if (formNote) formNote.textContent = 'Please describe the service you need.';
        customServiceInput.focus();
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        e.preventDefault();
        if (formNote) formNote.textContent = 'Please enter a valid email address.';
        return;
      }

      if (formNote) formNote.textContent = 'Sending your message...';
      // Netlify will handle the POST and redirect to its default success page.
    });
  }

  /* ---------- Smooth scroll offset for fixed navbar ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      if (target.hidden) showMainSite(true);
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});