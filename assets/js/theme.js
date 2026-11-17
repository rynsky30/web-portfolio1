// theme.js — Dark/light mode detection, persistence, and toggling

const STORAGE_KEY = 'portfolio-theme';

/**
 * Read localStorage safely — returns null if unavailable (e.g. private browsing).
 * @returns {string|null}
 */
function safeGetStorage() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Write to localStorage safely — silently does nothing if unavailable.
 * @param {string} theme
 */
function safeSetStorage(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable — carry on without persisting
  }
}

/**
 * Determine the preferred theme using the priority order:
 *   1. Value stored in localStorage (if present and valid)
 *   2. OS-level prefers-color-scheme: dark
 *   3. Fall back to "light"
 *
 * @returns {'light' | 'dark'}
 */
export function detectPreference() {
  const stored = safeGetStorage();
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }

  return 'light';
}

/**
 * Apply the given theme to the document and persist it.
 *
 * @param {'light' | 'dark'} theme
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  safeSetStorage(theme);
}

/**
 * Flip the current theme and apply it.
 * Current theme is read from the data-theme attribute so it always
 * reflects the live DOM state rather than a stale module-level variable.
 */
export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

/**
 * Initialise the theme system.
 *
 * - Detects and applies the preferred theme.
 * - Wires the #theme-toggle button to toggleTheme().
 *
 * Call this once after the DOM is ready.
 */
export function initTheme() {
  const theme = detectPreference();
  applyTheme(theme);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }
}
