/* ===== JS for AlanyaEv ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Hamburger menu ---- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      // Add mobile CTA inside nav if not already there
      if (isOpen && !navLinks.querySelector('.nav-cta-mobile')) {
        const ctaContainer = document.createElement('div');
        ctaContainer.className = 'nav-cta-mobile-wrap';
        ctaContainer.style.display = 'flex';
        ctaContainer.style.flexDirection = 'column';
        ctaContainer.style.gap = '8px';
        ctaContainer.style.marginTop = '12px';

        const ctaCall = document.createElement('a');
        ctaCall.href = 'tel:+905343503630';
        ctaCall.className = 'nav-cta-mobile';
        ctaCall.style.background = 'var(--accent)';
        ctaCall.style.color = 'var(--dark)';
        ctaCall.style.fontWeight = '700';
        ctaCall.style.padding = '12px 24px';
        ctaCall.style.borderRadius = '50px';
        ctaCall.style.textAlign = 'center';
        ctaCall.textContent = '📞 Hemen Ara (0534 350 36 30)';

        const ctaWp = document.createElement('a');
        ctaWp.href = 'https://wa.me/905343503630?text=Merhaba,%20bir%20m%C3%BClk%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.';
        ctaWp.target = '_blank';
        ctaWp.className = 'nav-cta-mobile';
        ctaWp.style.background = '#25D366';
        ctaWp.style.color = '#fff';
        ctaWp.style.fontWeight = '700';
        ctaWp.style.padding = '12px 24px';
        ctaWp.style.borderRadius = '50px';
        ctaWp.style.textAlign = 'center';
        ctaWp.textContent = '💬 WhatsApp ile Yazın';

        ctaContainer.appendChild(ctaCall);
        ctaContainer.appendChild(ctaWp);
        navLinks.appendChild(ctaContainer);
      }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Counter animation ---- */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let countersStarted = false;

  const startCounters = () => {
    if (countersStarted) return;
    countersStarted = true;
    statNumbers.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const stepTime = 16;
      const steps = Math.ceil(duration / stepTime);
      let current = 0;
      const increment = target / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target.toLocaleString('tr-TR') + (target >= 100 ? '+' : '');
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current).toLocaleString('tr-TR');
        }
      }, stepTime);
    });
  };

  // Start counters when hero stats are visible
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) startCounters(); });
    }, { threshold: 0.5 });
    observer.observe(heroStats);
  }

  /* ---- Listing filter ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const listingCards = document.querySelectorAll('.listing-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;

      listingCards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
          card.style.display = '';
          card.style.animation = 'fadeUp 0.4s forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ---- Favourite heart toggle ---- */
  const favBtns = document.querySelectorAll('.card-fav');
  favBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isActive = btn.classList.toggle('active');
      btn.textContent = isActive ? '♥' : '♡';
      btn.style.color = isActive ? '#e53e3e' : '';
    });
  });

  /* ---- Contact form ---- */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();

      if (!name || !phone) {
        alert('Lütfen adınızı ve telefon numaranızı girin.');
        return;
      }

      // Simulate send (no backend)
      const submitBtn = document.getElementById('contact-submit-btn');
      submitBtn.textContent = 'Gönderiliyor...';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.style.display = 'none';
        if (formSuccess) {
          formSuccess.style.display = 'block';
        }
      }, 1200);
    });
  }

  /* ---- Smooth scroll for nav links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Hero search button ---- */
  const searchSubmitBtn = document.getElementById('search-submit-btn');
  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener('click', () => {
      const listingSection = document.getElementById('ilanlar');
      if (listingSection) {
        listingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ---- Intersection Observer – scroll-in animations ---- */
  const animateEls = document.querySelectorAll(
    '.listing-card, .testimonial-card, .bolge-card, .why-item, .contact-form, .contact-info'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp 0.6s forwards';
        entry.target.style.opacity = '1';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  animateEls.forEach(el => {
    el.style.opacity = '0';
    revealObserver.observe(el);
  });

  /* ---- Bolge card keyboard support ---- */
  document.querySelectorAll('.bolge-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
