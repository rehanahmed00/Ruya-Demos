/**
 * HMRC Industry Pvt Ltd — Interactive Front-End Script
 * Design Demo Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initContactForm();
});

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('mobile-close');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !drawer) return;

  const toggle = () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    drawer.classList.toggle('active');
    drawer.setAttribute('aria-hidden', isExpanded);
  };

  const close = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
  };

  toggleBtn.addEventListener('click', toggle);
  if (closeBtn) closeBtn.addEventListener('click', close);

  const links = drawer.querySelectorAll('a');
  links.forEach(l => l.addEventListener('click', close));

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) close();
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const service = document.getElementById('service-interest').value;
    
    status.style.color = '#34d399';
    status.textContent = `✓ Thank you ${name}! Your consultation request for ${service} is received.`;
    
    setTimeout(() => {
      form.reset();
      status.textContent = '';
    }, 4000);
  });
}
