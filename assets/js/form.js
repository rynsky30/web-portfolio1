// form.js — Contact form validation and submission

const FORMSPREE_URL = 'https://formspree.io/f/PLACEHOLDER';

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
 * Rules: non-empty, must contain '@' followed by at least one char, '.', and at least one char.
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
  const domain = value.slice(atIndex + 1); // everything after '@'
  const dotIndex = domain.indexOf('.');
  if (dotIndex === -1 || dotIndex === 0 || dotIndex === domain.length - 1) {
    // no dot, or dot is first char of domain, or dot is last char of domain
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

/**
 * Show an inline error message below the given field.
 * @param {HTMLElement} field - The input or textarea element
 * @param {string} message
 */
function showFieldError(field, message) {
  const errorEl = document.getElementById(`${field.id}-error`);
  if (errorEl) {
    errorEl.textContent = message;
  }
  field.setAttribute('aria-invalid', 'true');
}

/**
 * Clear the inline error message below the given field.
 * @param {HTMLElement} field - The input or textarea element
 */
function clearFieldError(field) {
  const errorEl = document.getElementById(`${field.id}-error`);
  if (errorEl) {
    errorEl.textContent = '';
  }
  field.removeAttribute('aria-invalid');
}

/**
 * Display a form-level status message.
 * @param {'success' | 'error'} type
 * @param {string} message
 */
function showFormStatus(type, message) {
  const statusEl = document.getElementById('form-status');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = `form-status form-status--${type}`;
}

// ─── Submission ───────────────────────────────────────────────────────────────

/**
 * POST form data to Formspree.
 * On success: shows success status and resets the form.
 * On failure: shows error status, re-enables the submit button, preserves field values.
 * @param {{ name: string, email: string, message: string }} data
 * @param {HTMLFormElement} form
 * @param {HTMLButtonElement} submitBtn
 */
async function submitToFormspree(data, form, submitBtn) {
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
      showFormStatus('success', 'Pesan berhasil dikirim! Terima kasih telah menghubungi saya.');
      form.reset();
    } else {
      showFormStatus('error', 'Pengiriman pesan gagal. Silakan coba lagi atau hubungi saya melalui email.');
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
 * Also run the CV availability check on DOMContentLoaded.
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

    // Clear previous errors and status
    clearFieldError(nameField);
    clearFieldError(emailField);
    clearFieldError(messageField);
    const statusEl = document.getElementById('form-status');
    if (statusEl) statusEl.textContent = '';

    const nameResult    = validateName(nameField.value);
    const emailResult   = validateEmail(emailField.value);
    const messageResult = validateMessage(messageField.value);

    let isValid = true;

    if (!nameResult.valid) {
      showFieldError(nameField, nameResult.error);
      isValid = false;
    }
    if (!emailResult.valid) {
      showFieldError(emailField, emailResult.error);
      isValid = false;
    }
    if (!messageResult.valid) {
      showFieldError(messageField, messageResult.error);
      isValid = false;
    }

    if (!isValid) return;

    // All fields valid — disable button and submit
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

// ─── CV Download Check ────────────────────────────────────────────────────────

/**
 * On DOMContentLoaded, HEAD-check the CV PDF.
 * If unavailable (non-2xx or network error), disable the button and show the error message.
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
