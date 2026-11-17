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
 * Observe every <section> in <main>. A section becomes active when it
 * crosses the vertical middle of the viewport, so the nav link matching
 * the section the user is actually reading gets highlighted.
 */
function setupScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  if (!sections.length) return;

  if (typeof IntersectionObserver === 'undefined') {
    setActiveLink(sections[0].id);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Remove the active class from every nav link, then add it to the link
 * whose href matches `#${id}`.
 *
 * @param {string} id - The id of the currently visible section.
 */
export function setActiveLink(id) {
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
  btn.addEventListener('click', () => toggleMenu());
}

/**
 * Toggle the navigation menu between open and closed states.
 * Open  → aria-expanded="true"  + add .nav__list--open + focus first link.
 * Close → aria-expanded="false" + remove .nav__list--open + restore focus.
 *
 * @param {boolean} [restoreFocus=true] - Whether to return focus to the hamburger button.
 */
export function toggleMenu(restoreFocus = true) {
  const btn  = getHamburgerBtn();
  const menu = getNavMenu();
  if (!btn || !menu) return;

  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeMenu(restoreFocus);
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
 *
 * @param {boolean} [restoreFocus=true] - Whether to return focus to the hamburger button.
 */
export function closeMenu(restoreFocus = true) {
  const btn  = getHamburgerBtn();
  const menu = getNavMenu();
  if (!btn || !menu) return;

  btn.setAttribute('aria-expanded', 'false');
  menu.classList.remove('nav__list--open');

  if (restoreFocus) {
    btn.focus();
  }
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
        closeMenu(true);
      }
    }
  });
}

// ─── Close on Link Click ─────────────────────────────────────────────────────

/**
 * Attach click listeners to every .nav__link inside #nav-menu so that
 * clicking any of them closes the mobile menu without stealing focus.
 */
function closeMenuOnLinkClick() {
  const menu = getNavMenu();
  if (!menu) return;

  const links = menu.querySelectorAll('.nav__link');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      const btn = getHamburgerBtn();
      if (btn && btn.getAttribute('aria-expanded') === 'true') {
        closeMenu(false);
      }
    });
  });
}
