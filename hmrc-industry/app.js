// HMRC Industry Pvt Ltd — Interactions

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

  // Interactive Services List & Dynamic Image Preview
  const serviceRows = document.querySelectorAll('.service-item-row');
  const previewImg = document.getElementById('servicePreviewImg');
  const previewLabel = document.getElementById('servicePreviewLabel');

  function activateService(row) {
    serviceRows.forEach(r => r.classList.remove('active'));
    row.classList.add('active');

    const imgSrc = row.getAttribute('data-img');
    const label = row.getAttribute('data-label');

    if (previewImg && imgSrc) {
      previewImg.style.opacity = '0.4';
      setTimeout(() => {
        previewImg.src = imgSrc;
        previewImg.style.opacity = '1';
      }, 150);
    }

    if (previewLabel && label) {
      previewLabel.textContent = label;
    }
  }

  serviceRows.forEach(row => {
    // Click behavior
    row.addEventListener('click', () => {
      activateService(row);
    });

    // Hover behavior on desktop
    row.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) {
        activateService(row);
      }
    });

    // Keyboard accessibility
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateService(row);
      }
    });
  });

  // Smooth Scroll offset adjustment for 84px header
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
        const headerOffset = 84;
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
