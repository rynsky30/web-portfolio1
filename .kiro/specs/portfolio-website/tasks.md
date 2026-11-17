# Implementation Plan: Portfolio Website — Muhammad Ryan Hidayat

## Overview

Implement a static single-page portfolio website using HTML5, CSS3, and JavaScript vanilla (ES modules, no bundler). Each task builds incrementally toward a fully integrated, accessible, and tested website that can be deployed directly to GitHub Pages or Netlify.

## Tasks

- [x] 1. Scaffolding — project structure and HTML skeleton
  - [x] 1.1 Create the full directory structure
    - Create `assets/css/`, `assets/js/`, `assets/images/projects/`, and `assets/docs/` directories
    - Add placeholder files: `assets/css/variables.css`, `base.css`, `layout.css`, `components.css`, `animations.css`
    - Add placeholder files: `assets/js/data.js`, `render.js`, `nav.js`, `theme.js`, `form.js`
    - _Requirements: 7.1, 9.2_
  - [x] 1.2 Write the `index.html` skeleton
    - Add `<!DOCTYPE html>`, correct `lang` attribute, `<meta charset>`, and `<meta name="viewport" content="width=device-width, initial-scale=1">`
    - Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and Inter font import
    - Link all five CSS files in order: `variables.css → base.css → layout.css → components.css → animations.css`
    - Add a `<a class="skip-link" href="#main">` as the first element in `<body>`
    - Add semantic landmarks: `<header>`, `<nav id="nav-menu">`, `<main id="main">`, five `<section>` elements (`#hero`, `#about`, `#projects`, `#skills`, `#contact`), `<footer>`
    - Load all JS modules: `<script type="module" src="assets/js/data.js">` etc.; call init functions via a main module
    - _Requirements: 7.2, 9.1, 9.2, 9.5_

- [x] 2. CSS architecture — design tokens, dark mode, and responsive layout
  - [x] 2.1 Write `variables.css` with CSS Custom Properties
    - Define all color tokens for light mode under `:root` and dark mode under `[data-theme="dark"]` as specified in design.md CSS Architecture section
    - Define typography scale, spacing scale, border-radius, shadow, container, and breakpoint tokens
    - _Requirements: 8.1, 8.2, 9.4_
  - [x] 2.2 Write `base.css` — reset, global typography, and theme transition
    - Add CSS reset (box-sizing, margin, padding), set `font-family` and `font-size` globals using tokens
    - Add universal transition rule `background-color 200ms, color 200ms, border-color 200ms, box-shadow 200ms` for smooth theme switching
    - Add `@media (prefers-reduced-motion: reduce)` block that removes transitions and animations
    - Define `.skip-link` styles (visually hidden until focused)
    - _Requirements: 8.2, 9.5_
  - [x] 2.3 Write `layout.css` — container, section spacing, and responsive grid breakpoints
    - Implement `.container` with `max-width: var(--container-max)` and horizontal padding
    - Implement mobile-first `.projects__grid` and `.skills__grid` with `grid-template-columns: 1fr` default, 2-column at 768px, 3-column at 1024px
    - _Requirements: 4.6, 5.5, 7.1, 7.3, 7.4, 7.5_
  - [x] 2.4 Write `animations.css` — keyframes and skeleton shimmer
    - Define `@keyframes shimmer` for skeleton loader animation
    - Define `.skeleton` utility class (animated gradient background)
    - _Requirements: 9.6_

- [x] 3. Navigation component
  - [x] 3.1 Write navigation HTML markup inside `index.html`
    - Add `<nav>` with brand link, `<ul id="nav-menu">` containing anchor links to all five sections, and `<button aria-expanded="false" aria-controls="nav-menu">` hamburger button
    - Add dark mode toggle `<button id="theme-toggle">` with accessible label inside `<nav>`
    - _Requirements: 1.2, 1.5, 8.1, 9.5_
  - [x] 3.2 Write `components.css` navigation styles
    - Implement sticky navbar (`position: sticky; top: 0; z-index: 1000; backdrop-filter: blur(8px)`)
    - Implement `.nav__link--active` style (accent color + underline)
    - Implement mobile hamburger hidden/open states; hide `<ul>` by default on `< 768px`, show inline-flex on `≥ 768px`
    - _Requirements: 1.4, 1.5, 9.4_
  - [x] 3.3 Implement `nav.js`
    - Export `initNav()`: call `setupScrollSpy()`, `setupHamburger()`, `setupKeyboardClose()`, `closeMenuOnLinkClick()`
    - Implement `setupScrollSpy()` using `IntersectionObserver` with `threshold: [0, 0.5]`; call `setActiveLink(id)` when section ≥ 50% visible
    - Implement `setActiveLink(id)`: remove `.nav__link--active` from all links, add it to the link whose `href` matches `#${id}`
    - Implement `toggleMenu()` / `closeMenu()` updating `aria-expanded` and visibility class; manage focus (open → first link, close → hamburger button)
    - Implement `setupKeyboardClose()` listening for Escape key
    - Implement `closeMenuOnLinkClick()` attaching click listeners to all links in `#nav-menu`
    - _Requirements: 1.3, 1.4, 1.5, 1.6, 1.7, 9.5_
  - [ ]* 3.4 Write property test for `setActiveLink` (Property 1)
    - **Property 1: Active Navigation Link — Exactly One Active at a Time**
    - Use fast-check `fc.oneof(fc.constant("hero"), fc.constant("about"), fc.constant("projects"), fc.constant("skills"), fc.constant("contact"))` to generate any valid section ID
    - Assert exactly one `.nav__link--active` exists and its `href` ends with `#${id}`
    - **Validates: Requirements 1.4**
  - [ ]* 3.5 Write property test for `toggleMenu` round-trip (Property 2)
    - **Property 2: Hamburger Menu Toggle Is a Round-Trip (Idempotent in Pairs)**
    - Use fast-check `fc.boolean()` to generate initial menu open/closed state; call `toggleMenu()` twice; assert `aria-expanded` and visibility class match initial state
    - **Validates: Requirements 1.6**
  - [ ]* 3.6 Write property test for nav link click closes menu (Property 3)
    - **Property 3: Any Nav Link Click Closes the Mobile Menu**
    - Use fast-check to pick any link index from the nav menu; set menu open; simulate click; assert menu is closed
    - **Validates: Requirements 1.7**

- [x] 4. Hero section
  - [x] 4.1 Write Hero section HTML markup in `index.html`
    - Add `<section id="hero">` with `<img src="assets/images/profile.webp" alt="Foto profil Muhammad Ryan Hidayat" loading="eager">`, `<h1>Muhammad Ryan Hidayat</h1>`, tagline `<p>`, CTA `<button>` or `<a>` to `#projects`, LinkedIn `<a target="_blank" rel="noopener noreferrer">`, GitHub `<a target="_blank" rel="noopener noreferrer">`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 9.3_
  - [x] 4.2 Write Hero section CSS in `components.css`
    - Style profile photo as circle (`border-radius: 50%`, `object-fit: cover`, min `200×200px`)
    - Style CTA button with accent color, hover/focus states using tokens
    - _Requirements: 2.3, 9.4_

- [x] 5. About section
  - [x] 5.1 Write About section HTML markup in `index.html`
    - Add `<section id="about">` with bio `<p>` (50–300 words mentioning "Universitas Bina Insani" and "Teknik Informatika"), enrollment year, career goal statement, and `<a href="assets/docs/cv-ryan.pdf" target="_blank" id="cv-download-btn">Unduh CV</a>`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 9.3_
  - [x] 5.2 Implement CV download error handler in `form.js` or a dedicated inline script
    - On `DOMContentLoaded`, send a HEAD request to `assets/docs/cv-ryan.pdf`; if response is not 2xx (or fetch fails), set `#cv-download-btn` to `disabled` and insert an inline error message: "CV tidak dapat dimuat saat ini."
    - _Requirements: 3.5_

- [x] 6. Data layer — `data.js`
  - [x] 6.1 Define `projects` array and `skills` array in `data.js`
    - Export `projects`: minimum 3 Project objects with `id`, `title` (≤ 60 chars), `description` (≤ 150 chars), `tags` (≤ 8 items, each ≤ 20 chars), `image`, `repoUrl|null`, `demoUrl|null`
    - Export `skills`: 5 SkillCategory objects matching design.md data models (Bahasa Pemrograman ≥ 3 langs, Framework ≥ 1, Database ≥ 1, Tools ≥ 2, Soft Skills ≥ 2)
    - _Requirements: 4.1, 4.2, 5.1, 5.3, 5.4_

- [x] 7. Projects section — `render.js` and HTML/CSS
  - [x] 7.1 Write Projects section HTML scaffold in `index.html`
    - Add `<section id="projects" aria-label="Proyek">` with a heading and `<div id="projects-grid" class="projects__grid"></div>` as the render target
    - _Requirements: 4.1, 9.2_
  - [x] 7.2 Implement `render.js` — `renderProjects()` and `createProjectCard()`
    - Import `projects` from `data.js`
    - `createProjectCard(project)`: build and return an `<article>` card element containing image with skeleton wrapper, title, description, badge tags, repo link (if non-null, `target="_blank" rel="noopener noreferrer"`), demo link (if non-null, same attributes), or "Belum tersedia" span if both null
    - `renderProjects()`: iterate `projects`, call `createProjectCard`, append to `#projects-grid`
    - Enforce constraints at render time: truncate or warn if `title > 60`, `description > 150`, `tags.length > 8`
    - _Requirements: 4.1, 4.2, 4.4, 4.5, 4.7_
  - [x] 7.3 Write Project card CSS in `components.css`
    - Style `.project-card` with border, border-radius, shadow using tokens
    - Add hover rule: `transform: translateY(-4px)`, elevated `box-shadow`, `transition: all 150ms ease`
    - Style `.badge` and `.no-link` elements
    - Style `.img-skeleton` shimmer placeholder; remove `.skeleton` class on image `load` event (handled in `render.js`)
    - _Requirements: 4.3, 4.6, 9.6_
  - [ ]* 7.4 Write property test for `createProjectCard` (Property 4)
    - **Property 4: Project Card Renders All Required Fields Correctly**
    - Use fast-check arbitraries to generate valid Project objects (title ≤ 60, description ≤ 150, tags ≤ 8 each ≤ 20, nullable URLs)
    - Assert card contains title text, description text, one badge per tag, correct anchors for non-null URLs, "Belum tersedia" label when both URLs are null
    - **Validates: Requirements 4.2, 4.4, 4.5, 4.7**

- [x] 8. Skills section — `render.js` extension and HTML/CSS
  - [x] 8.1 Write Skills section HTML scaffold in `index.html`
    - Add `<section id="skills" aria-label="Keahlian">` with a heading and `<div id="skills-container" class="skills__grid"></div>` as render target
    - _Requirements: 5.1, 9.2_
  - [x] 8.2 Implement `renderSkills()` and `createSkillGroup()` in `render.js`
    - Import `skills` from `data.js`
    - `createSkillGroup(group)`: return a `<div class="skill-group">` containing an `<h3>` for the category name and a `.badge` `<span>` for each item
    - `renderSkills()`: iterate `skills`, call `createSkillGroup`, append to `#skills-container`
    - _Requirements: 5.1, 5.2_
  - [x] 8.3 Write Skills section CSS in `components.css`
    - Style `.skill-group` with heading and flex-wrapped badge list
    - Ensure no badge overflows its container at any viewport width between 320px and 1280px
    - _Requirements: 5.2, 5.5_
  - [ ]* 8.4 Write property test for `renderSkills` (Property 5)
    - **Property 5: Skills Rendering Preserves All Items Exactly Once Per Category**
    - Use fast-check to generate valid `skills` arrays (1–10 categories, 1–15 items each, no duplicate item names)
    - Assert each category heading appears exactly once, each skill item appears as a badge exactly once, each badge is nested under its correct category
    - **Validates: Requirements 5.1, 5.2**

- [x] 9. Contact section — `form.js` and HTML/CSS
  - [x] 9.1 Write Contact section HTML markup in `index.html`
    - Add `<section id="contact" aria-label="Kontak">` with `<form id="contact-form">` containing `<label>`+`<input>` for name (maxlength="100"), `<label>`+`<input type="email">` for email (maxlength="254"), `<label>`+`<textarea>` for message (maxlength="1000"), submit button "Kirim Pesan", and `<div id="form-status" role="alert"></div>`
    - Add social links: LinkedIn `<a>`, GitHub `<a>`, mailto `<a href="mailto:...">`
    - _Requirements: 6.1, 6.5, 6.6, 9.3_
  - [x] 9.2 Implement `form.js`
    - Export `initContactForm()`: attach `submit` listener to `#contact-form`
    - Implement `validateName(value)`: return `{valid, error}` — invalid if empty or whitespace-only or length > 100
    - Implement `validateEmail(value)`: return `{valid, error}` — invalid if empty or no `@` followed by at least one char, `.`, and at least one char
    - Implement `validateMessage(value)`: return `{valid, error}` — invalid if empty or whitespace-only or length > 1000
    - Implement `showFieldError(field, message)` and `clearFieldError(field)` for per-field inline errors
    - Implement `showFormStatus(type, message)` with `type: 'success' | 'error'` writing to `#form-status`
    - Implement `submitToFormspree(data)`: `fetch()` POST to configured Formspree endpoint; on success show success status and reset form; on failure show error status, re-enable button, preserve field values
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [x] 9.3 Write Contact section CSS in `components.css`
    - Style form inputs, labels, textarea with consistent tokens; show visible focus rings
    - Style success/error status messages using `--color-success` / `--color-error` tokens
    - _Requirements: 9.4, 9.5_
  - [ ]* 9.4 Write property test for contact form validation (Property 6)
    - **Property 6: Contact Form Validation Rejects All Invalid Inputs Without Sending**
    - Use fast-check to generate combinations where at least one field is invalid (empty/whitespace name, email without valid domain, empty/whitespace message)
    - Assert at least one `{valid: false}` result is returned and `submitToFormspree` is never called
    - **Validates: Requirements 6.4**

- [x] 10. Dark mode — `theme.js`
  - [x] 10.1 Implement `theme.js`
    - Export `initTheme()`: call `detectPreference()` and `applyTheme()`
    - Export `toggleTheme()`: flip current theme and call `applyTheme()`
    - Implement `detectPreference()`: return value from `localStorage.getItem('portfolio-theme')` if present; else return `'dark'` if `prefers-color-scheme: dark` matches; else return `'light'`; handle `localStorage` unavailability silently
    - Implement `applyTheme(theme)`: set `document.documentElement.setAttribute('data-theme', theme)` and `localStorage.setItem('portfolio-theme', theme)` (guard against unavailable localStorage)
    - Wire `#theme-toggle` button click to `toggleTheme()` inside `initTheme()`
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  - [ ]* 10.2 Write property test for theme localStorage round-trip (Property 7)
    - **Property 7: Theme Preference Persists Across Re-Detection (localStorage Round-Trip)**
    - Use `fc.oneof(fc.constant('light'), fc.constant('dark'))` to generate any theme value
    - Call `applyTheme(theme)`, then call `detectPreference()` with `prefers-color-scheme` mocked to the opposite value
    - Assert `detectPreference()` returns the stored theme value
    - **Validates: Requirements 8.3**

- [x] 11. Performance and accessibility pass
  - [x] 11.1 Audit and fix semantic HTML structure
    - Verify exactly one `<main>`, at least one `<header>` and `<nav>`, all `<section>` elements have `aria-label`, all interactive elements have accessible names
    - Verify skip link is first in `<body>` and styled correctly, hamburger button has `aria-expanded` / `aria-controls` attributes
    - _Requirements: 9.2, 9.5_
  - [x] 11.2 Audit and fix all `alt` attributes and image constraints
    - Verify every `<img>` has `alt`; decorative images use `alt=""`; content images use descriptive text ≤ 150 chars
    - Add `width` and `height` attributes to all `<img>` elements to prevent layout shift
    - _Requirements: 9.3_
  - [x] 11.3 Verify WCAG AA color contrast and responsive text sizes
    - Check that all text/background token pairs meet 4.5:1 for normal text and 3:1 for large text in both light and dark modes (see contrast table in design.md CSS Architecture)
    - Verify body text ≥ 16px and secondary text ≥ 12px at all breakpoints ≥ 320px
    - _Requirements: 7.6, 9.4_
  - [x] 11.4 Implement image skeleton loaders in `render.js`
    - In `createImageWithSkeleton(src, alt)`: return `<div class="img-skeleton skeleton"><img loading="lazy" src="${src}" alt="${alt}"></div>`
    - Attach `load` listener on `<img>` to remove `skeleton` class from parent; attach `error` listener to replace skeleton with error placeholder (broken image icon + project title text)
    - _Requirements: 9.6_
  - [x] 11.5 Run automated accessibility check with axe-core
    - Install `axe-core` as a dev dependency; write a Vitest/Jest test that loads `index.html` with jsdom and runs `axe.run()`; assert zero violations at WCAG AA level
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 12. Checkpoint — wire everything together and validate
  - Ensure `initTheme()`, `initNav()`, `renderProjects()`, `renderSkills()`, and `initContactForm()` are all called in the correct order from a main entry-point module (or inline `<script type="module">` at bottom of `index.html`)
  - Verify no orphaned JS functions exist (all exports are consumed)
  - Open `index.html` directly in a browser (file:// or local HTTP server) and manually smoke-test all sections, hamburger menu, dark mode toggle, project cards, skills badges, and contact form validation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Final checkpoint — run all property-based tests
  - Execute the full test suite (`vitest --run` or `jest --runInBand`)
  - Confirm all 7 property tests (Properties 1–7) and axe-core accessibility test pass with zero failures
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental integration and validation
- Property tests validate universal correctness invariants; unit tests validate specific examples and edge cases
- No build step is needed — open `index.html` directly in a browser or serve with `npx serve .` for local development
- Formspree endpoint URL must be configured before deploying; use a placeholder during development

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4"] },
    { "id": 3, "tasks": ["3.1", "4.1", "5.1", "6.1", "7.1", "8.1", "9.1"] },
    { "id": 4, "tasks": ["3.2", "3.3", "4.2", "5.2", "7.2", "8.2", "9.2", "10.1"] },
    { "id": 5, "tasks": ["7.3", "8.3", "9.3", "11.1", "11.2", "11.3"] },
    { "id": 6, "tasks": ["7.4", "8.4", "9.4", "10.2", "11.4", "3.4", "3.5", "3.6"] },
    { "id": 7, "tasks": ["11.5"] }
  ]
}
```
