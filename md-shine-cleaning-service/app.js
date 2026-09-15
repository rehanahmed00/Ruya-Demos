/**
 * MD-Shine Cleaning Service LLC — Interactive Web App
 * Ruya Web Agency Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initInquiryBuilder();
  initServiceSelectors();
});

/**
 * Mobile Drawer Menu
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !drawer) return;

  const toggleMenu = () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    drawer.classList.toggle('active');
    drawer.setAttribute('aria-hidden', isExpanded);
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close drawer when clicking any mobile nav link
  const mobileLinks = drawer.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
    });
  });

  // Close when clicking outside content
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
    }
  });
}

/**
 * Quote Inquiry Builder
 * Collects inquiry details and formats pre-filled SMS and Email CTAs without calculating price.
 */
function initInquiryBuilder() {
  const serviceInput = document.getElementById('inquiry-service');
  const bedroomsInput = document.getElementById('inquiry-bedrooms');
  const bathroomsInput = document.getElementById('inquiry-bathrooms');
  const locationInput = document.getElementById('inquiry-location');
  const dateInput = document.getElementById('inquiry-date');
  const notesInput = document.getElementById('inquiry-notes');

  const summaryText = document.getElementById('inquiry-summary-text');
  const smsBtn = document.getElementById('btn-send-sms');
  const emailBtn = document.getElementById('btn-send-email');
  const copyBtn = document.getElementById('btn-copy-inquiry');
  const copyStatus = document.getElementById('copy-status-text');

  if (!serviceInput || !summaryText || !smsBtn || !emailBtn) return;

  const updateInquiry = () => {
    const service = serviceInput.value || 'Standard Cleaning';
    const beds = bedroomsInput ? bedroomsInput.value : '3 Bedrooms';
    const baths = bathroomsInput ? bathroomsInput.value : '2 Bathrooms';
    const loc = locationInput ? locationInput.value : 'Rockville';
    const timing = dateInput ? dateInput.value : 'As soon as possible';
    const notes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : '';

    let formattedMsg = `Hi MD-Shine, I would like to request a free quote for ${service} (${beds}, ${baths}) in ${loc}. Preferred timing: ${timing}. (30% off first cleaning offer)`;
    if (notes) {
      formattedMsg += ` Notes: ${notes}`;
    }

    summaryText.textContent = `"${formattedMsg}"`;

    // Encode for SMS and Mailto
    const encodedBody = encodeURIComponent(formattedMsg);
    const encodedSubject = encodeURIComponent(`Free Quote Inquiry - ${service} (${loc})`);

    // Cross-platform SMS URL (?&body= works across iOS and Android)
    smsBtn.href = `sms:+12403085977?&body=${encodedBody}`;
    emailBtn.href = `mailto:mdshineclean@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
  };

  // Attach change/input listeners
  [serviceInput, bedroomsInput, bathroomsInput, locationInput, dateInput].forEach(elem => {
    if (elem) elem.addEventListener('change', updateInquiry);
  });

  if (notesInput) {
    notesInput.addEventListener('input', updateInquiry);
  }

  // Copy to clipboard action
  if (copyBtn && copyStatus) {
    copyBtn.addEventListener('click', async () => {
      const textToCopy = summaryText.textContent.replace(/^"|"$/g, '');
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        copyStatus.textContent = '✅ Copied to clipboard! Paste into SMS or email.';
        setTimeout(() => {
          copyStatus.textContent = '📋 Copy Inquiry Details to Clipboard';
        }, 3500);
      } catch (err) {
        copyStatus.textContent = 'Select and copy the text above.';
      }
    });
  }

  // Initial update
  updateInquiry();
}

/**
 * Service Cards "Inquire for Quote" Buttons
 * Clicking selects that service in the inquiry builder and scrolls down
 */
function initServiceSelectors() {
  const selectBtns = document.querySelectorAll('.select-service-btn');
  const serviceInput = document.getElementById('inquiry-service');

  selectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetService = btn.getAttribute('data-select-service');
      if (targetService && serviceInput) {
        serviceInput.value = targetService;
        serviceInput.dispatchEvent(new Event('change'));
      }
    });
  });
}
