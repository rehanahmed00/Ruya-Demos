/**
 * MD-Shine Cleaning Service LLC — Client Quote & Interaction Script
 * Ruya Web Agency Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initServiceLinks();
  initQuoteForm();
});

/**
 * Mobile Drawer Menu
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !drawer) return;

  const toggleMenu = () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    drawer.classList.toggle('active');
    drawer.setAttribute('aria-hidden', isExpanded);
  };

  const closeMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
  };

  toggleBtn.addEventListener('click', toggleMenu);
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  const mobileLinks = drawer.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      closeMenu();
    }
  });
}

/**
 * Service card "Ask for a quote" links
 * Pre-selects the corresponding service in the quote form
 */
function initServiceLinks() {
  const serviceLinks = document.querySelectorAll('[data-service-select]');
  const serviceSelect = document.getElementById('cleaning-service');

  serviceLinks.forEach(link => {
    link.addEventListener('click', () => {
      const selected = link.getAttribute('data-service-select');
      if (selected && serviceSelect) {
        serviceSelect.value = selected;
      }
    });
  });
}

/**
 * Quote Request Form Handler
 * Prepares direct SMS or Email message with client details
 */
function initQuoteForm() {
  const form = document.getElementById('quote-request-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const area = document.getElementById('client-area').value.trim();
    const service = document.getElementById('cleaning-service').value;
    const beds = document.getElementById('home-bedrooms').value;
    const baths = document.getElementById('home-bathrooms').value;
    const date = document.getElementById('preferred-date').value.trim();
    const notes = document.getElementById('client-notes').value.trim();

    // Construct inquiry text
    let messageBody = `Hello MD-Shine, my name is ${name}. I would like to request a free quote for ${service} (${beds}, ${baths}).`;
    if (area) messageBody += ` Location: ${area}.`;
    if (date) messageBody += ` Preferred date: ${date}.`;
    if (phone) messageBody += ` My phone: ${phone}.`;
    if (notes) messageBody += ` Details: ${notes}.`;
    messageBody += ` (30% off first cleaning offer)`;

    const encodedBody = encodeURIComponent(messageBody);
    const encodedSubject = encodeURIComponent(`Free Quote Request: ${service} - ${name}`);

    // Detect if on mobile or desktop
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const targetUrl = isMobile 
      ? `sms:+12403085977?&body=${encodedBody}`
      : `mailto:mdshineclean@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

    feedback.className = 'form-feedback success';
    feedback.innerHTML = `✓ Preparing your quote inquiry... If your messaging app doesn't open automatically, <a href="${targetUrl}" style="text-decoration:underline; font-weight:700;">click here to send</a>.`;

    // Trigger draft
    window.location.href = targetUrl;
  });
}
