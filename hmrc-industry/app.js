// HMRC Industry Pvt Ltd — High-End Interactions

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Numbered Services: Interactive List + Adjacent Large Image Switcher
  const serviceRows = document.querySelectorAll('.service-row-item');
  const heroImg = document.getElementById('serviceHeroImg');
  const heroTitle = document.getElementById('serviceHeroTitle');

  function switchServiceVisual(row) {
    serviceRows.forEach(r => r.classList.remove('active'));
    row.classList.add('active');

    const imgSrc = row.getAttribute('data-img');
    const title = row.getAttribute('data-title');

    if (heroImg && imgSrc && heroImg.src !== imgSrc) {
      heroImg.style.opacity = '0.3';
      heroImg.style.transform = 'scale(0.98)';
      setTimeout(() => {
        heroImg.src = imgSrc;
        heroImg.style.opacity = '1';
        heroImg.style.transform = 'scale(1)';
      }, 180);
    }

    if (heroTitle && title) {
      heroTitle.textContent = title;
    }
  }

  serviceRows.forEach(row => {
    // Click interaction (expands row & switches image)
    row.addEventListener('click', () => {
      switchServiceVisual(row);
    });

    // Hover interaction on desktop
    row.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) {
        switchServiceVisual(row);
      }
    });

    // Keyboard accessibility
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchServiceVisual(row);
      }
    });
  });

  // Smooth Scroll offset adjustment for 86px header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 86;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact Form Demo Submission Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Message Received (Demo)';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.75';

      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }, 3500);
    });
  }
});
