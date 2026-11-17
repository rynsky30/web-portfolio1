// theme.js — Dark/light mode detection, persistence, and toggling

const STORAGE_KEY = 'portfolio-theme';

/**
 * Read localStorage safely.
 * @returns {string|null}
 */
function safeGetStorage() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Write to localStorage safely. */
function safeSetStorage(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Silently ignore (private browsing / restrictions)
  }
}

/**
 * Determine preferred theme: localStorage → OS prefers-color-scheme → 'light'.
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
 * Apply a theme and persist it. Also update `<meta name="theme-color">` so
 * mobile browser chrome adapts to the active theme.
 *
 * @param {'light' | 'dark'} theme
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  safeSetStorage(theme);

  const meta = document.getElementById('theme-color-meta');
  if (meta) {
    meta.content = theme === 'dark' ? '#0B0F19' : '#FFFFFF';
  }
}

/** Flip theme and re-apply. */
export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

/** Initialize on DOM ready. */
export function initTheme() {
  const theme = detectPreference();
  applyTheme(theme);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => toggleTheme());
  }
}
