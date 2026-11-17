// form.js — Contact form validation and submission

// Replace with your actual Formspree endpoint before deploying.
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

// ─── Validation ───────────────────────────────────────────────────────────────

/**
 * Validate the name field.
 * @param {string} value
 * @returns {{ valid: boolean, error: string }}
 */
export function validateName(value) {
  if (!value || value.trim().length === 0) {
    return { valid: false, error: 'Nama tidak boleh kosong.' };
  }
  if (value.length > 100) {
    return { valid: false, error: 'Nama tidak boleh lebih dari 100 karakter.' };
  }
  return { valid: true, error: '' };
}

/**
 * Validate the email field.
 * @param {string} value
 * @returns {{ valid: boolean, error: string }}
 */
export function validateEmail(value) {
  if (!value || value.trim().length === 0) {
    return { valid: false, error: 'Email tidak boleh kosong.' };
  }
  const atIndex = value.indexOf('@');
  if (atIndex === -1) {
    return { valid: false, error: 'Email harus mengandung karakter "@".' };
  }
  const domain = value.slice(atIndex + 1);
  const dotIndex = domain.indexOf('.');
  if (dotIndex === -1 || dotIndex === 0 || dotIndex === domain.length - 1) {
    return { valid: false, error: 'Email harus mengandung domain yang valid (contoh: nama@domain.com).' };
  }
  return { valid: true, error: '' };
}

/**
 * Validate the message field.
 * @param {string} value
 * @returns {{ valid: boolean, error: string }}
 */
export function validateMessage(value) {
  if (!value || value.trim().length === 0) {
    return { valid: false, error: 'Pesan tidak boleh kosong.' };
  }
  if (value.length > 1000) {
    return { valid: false, error: 'Pesan tidak boleh lebih dari 1000 karakter.' };
  }
  return { valid: true, error: '' };
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

/** Show an inline error below the given field. */
function showFieldError(field, message) {
  const errorEl = document.getElementById(`${field.id}-error`);
  if (errorEl) errorEl.textContent = message;
  field.setAttribute('aria-invalid', 'true');
}

/** Clear the inline error for the given field. */
function clearFieldError(field) {
  const errorEl = document.getElementById(`${field.id}-error`);
  if (errorEl) errorEl.textContent = '';
  field.removeAttribute('aria-invalid');
}

/** Show a form-level status banner. */
function showFormStatus(type, message) {
  const statusEl = document.getElementById('form-status');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = `form-status--${type}`;
}

// ─── Submission ───────────────────────────────────────────────────────────────

/**
 * POST the form payload to the Formspree endpoint.
 */
async function submitToFormspree(data, form, submitBtn) {
  // Safety net: if the endpoint is still a placeholder, do not attempt fetch.
  if (FORMSPREE_URL.includes('YOUR_FORM_ID')) {
    showFormStatus('error', 'Form belum terhubung ke layanan email. Hubungi saya langsung lewat email atau LinkedIn di samping.');
    submitBtn.disabled = false;
    return;
  }

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      showFormStatus('success', 'Pesan berhasil dikirim! Terima kasih, saya akan segera membalas.');
      form.reset();
    } else {
      showFormStatus('error', 'Pengiriman gagal. Silakan coba lagi atau hubungi saya lewat email.');
      submitBtn.disabled = false;
    }
  } catch {
    showFormStatus('error', 'Terjadi kesalahan jaringan. Periksa koneksi internet Anda dan coba lagi.');
    submitBtn.disabled = false;
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────

/**
 * Attach submit listener to #contact-form.
 */
export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameField    = document.getElementById('contact-name');
  const emailField   = document.getElementById('contact-email');
  const messageField = document.getElementById('contact-message');
  const submitBtn    = document.getElementById('contact-submit');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    clearFieldError(nameField);
    clearFieldError(emailField);
    clearFieldError(messageField);

    const statusEl = document.getElementById('form-status');
    if (statusEl) statusEl.textContent = '';

    const nameResult    = validateName(nameField.value);
    const emailResult   = validateEmail(emailField.value);
    const messageResult = validateMessage(messageField.value);

    let isValid = true;

    if (!nameResult.valid)    { showFieldError(nameField, nameResult.error);    isValid = false; }
    if (!emailResult.valid)   { showFieldError(emailField, emailResult.error);  isValid = false; }
    if (!messageResult.valid) { showFieldError(messageField, messageResult.error); isValid = false; }

    if (!isValid) return;

    submitBtn.disabled = true;

    await submitToFormspree(
      {
        name:    nameField.value,
        email:   emailField.value,
        message: messageField.value,
      },
      form,
      submitBtn
    );
  });
}

// ─── CV Download Availability Check ───────────────────────────────────────────

/**
 * On DOMContentLoaded, HEAD-check the CV PDF.
 * If unavailable, disable the button and show the error message.
 */
document.addEventListener('DOMContentLoaded', async () => {
  const cvBtn      = document.getElementById('cv-download-btn');
  const cvErrorMsg = document.getElementById('cv-error-msg');
  if (!cvBtn || !cvErrorMsg) return;

  try {
    const response = await fetch('assets/docs/cv-ryan.pdf', { method: 'HEAD' });
    if (!response.ok) {
      cvBtn.disabled = true;
      cvBtn.setAttribute('aria-disabled', 'true');
      cvErrorMsg.hidden = false;
    }
  } catch {
    cvBtn.disabled = true;
    cvBtn.setAttribute('aria-disabled', 'true');
    cvErrorMsg.hidden = false;
  }
});
