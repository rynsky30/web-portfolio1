// nav.js — Navigation: scroll spy, hamburger menu, keyboard handling

/**
 * Initialise all navigation behaviour:
 * scroll-spy, hamburger toggle, keyboard close, and link-click close.
 */
export function initNav() {
  setupScrollSpy();
  setupHamburger();
  setupKeyboardClose();
  closeMenuOnLinkClick();
}

// ─── Scroll Spy ─────────────────────────────────────────────────────────────

/**
 * Observe every <section> in <main>. When a section's intersection ratio
 * crosses 0.5 (i.e. ≥ 50 % of it is in the viewport), mark that section's
 * nav link as active.
 */
function setupScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { threshold: [0, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Remove the active class from every nav link, then add it to the link
 * whose href matches `#${id}`.
 *
 * @param {string} id - The id of the currently visible section.
 */
function setActiveLink(id) {
  const links = document.querySelectorAll('.nav__link');
  links.forEach((link) => link.classList.remove('nav__link--active'));

  const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);
  if (activeLink) {
    activeLink.classList.add('nav__link--active');
  }
}

// ─── Hamburger Menu ──────────────────────────────────────────────────────────

/** The hamburger <button> element (resolved once). */
function getHamburgerBtn() {
  return (
    document.getElementById('hamburger-btn') ||
    document.querySelector('[aria-controls="nav-menu"]')
  );
}

/** The <ul id="nav-menu"> element. */
function getNavMenu() {
  return document.getElementById('nav-menu');
}

/**
 * Attach a click listener to the hamburger button that calls toggleMenu().
 */
function setupHamburger() {
  const btn = getHamburgerBtn();
  if (!btn) return;
  btn.addEventListener('click', toggleMenu);
}

/**
 * Toggle the navigation menu between open and closed states.
 * Open  → aria-expanded="true"  + add .nav__list--open + focus first link.
 * Close → aria-expanded="false" + remove .nav__list--open + focus button.
 */
function toggleMenu() {
  const btn  = getHamburgerBtn();
  const menu = getNavMenu();
  if (!btn || !menu) return;

  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeMenu();
  } else {
    btn.setAttribute('aria-expanded', 'true');
    menu.classList.add('nav__list--open');

    // Move focus to the first nav link
    const firstLink = menu.querySelector('.nav__link');
    if (firstLink) firstLink.focus();
  }
}

/**
 * Close the navigation menu unconditionally.
 * Returns focus to the hamburger button.
 */
function closeMenu() {
  const btn  = getHamburgerBtn();
  const menu = getNavMenu();
  if (!btn || !menu) return;

  btn.setAttribute('aria-expanded', 'false');
  menu.classList.remove('nav__list--open');
  btn.focus();
}

// ─── Keyboard Close ──────────────────────────────────────────────────────────

/**
 * Close the menu when the user presses Escape, as required by
 * Requirement 9.5 (full keyboard navigation support).
 */
function setupKeyboardClose() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const btn = getHamburgerBtn();
      if (btn && btn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      }
    }
  });
}

// ─── Close on Link Click ─────────────────────────────────────────────────────

/**
 * Attach click listeners to every .nav__link inside #nav-menu so that
 * clicking any of them closes the mobile menu (Requirement 1.7).
 */
function closeMenuOnLinkClick() {
  const menu = getNavMenu();
  if (!menu) return;

  const links = menu.querySelectorAll('.nav__link');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      const btn = getHamburgerBtn();
      if (btn && btn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      }
    });
  });
}
