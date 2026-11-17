// render.js — DOM rendering functions for projects and skills

import { projects, skills } from './data.js';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Skeleton-wrapped lazy-loaded image.
 *
 * @param {string} src
 * @param {string} alt
 * @returns {HTMLDivElement}
 */
function createImageWithSkeleton(src, alt) {
  const wrapper = document.createElement('div');
  wrapper.className = 'img-skeleton skeleton';

  const img = document.createElement('img');
  img.loading = 'lazy';
  img.src = src;
  img.alt = alt;
  img.width = 800;
  img.height = 450;

  img.addEventListener('load', () => {
    wrapper.classList.remove('skeleton');
  });

  img.addEventListener('error', () => {
    wrapper.classList.remove('skeleton');
    wrapper.classList.add('img-error');
    img.style.display = 'none';

    const placeholder = document.createElement('span');
    placeholder.className = 'img-error__label';
    placeholder.textContent = alt || 'Gambar tidak tersedia';
    wrapper.appendChild(placeholder);
  });

  wrapper.appendChild(img);
  return wrapper;
}

/**
 * Returns a `<span class="badge">` for a single text label.
 *
 * @param {string} text
 * @returns {HTMLSpanElement}
 */
function createBadge(text) {
  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = text;
  return badge;
}

// ---------------------------------------------------------------------------
// Project card
// ---------------------------------------------------------------------------

/**
 * Builds and returns an `<article>` card element for a single project.
 *
 * @param {import('./data.js').Project} project
 * @returns {HTMLElement}
 */
function createProjectCard(project) {
  let { title, description, tags } = project;

  if (title.length > 60) {
    console.warn(`[render] Project "${project.id}": title exceeds 60 chars, truncating.`);
    title = title.slice(0, 57) + '…';
  }

  if (description.length > 150) {
    console.warn(`[render] Project "${project.id}": description exceeds 150 chars, truncating.`);
    description = description.slice(0, 147) + '…';
  }

  if (tags.length > 8) {
    console.warn(`[render] Project "${project.id}": tags array exceeds 8 items, truncating.`);
    tags = tags.slice(0, 8);
  }

  const card = document.createElement('article');
  card.className = 'project-card reveal';

  // Image with skeleton
  card.appendChild(createImageWithSkeleton(project.image, title));

  // Card body
  const body = document.createElement('div');
  body.className = 'project-card__content';

  // Title
  const titleEl = document.createElement('h3');
  titleEl.className = 'project-card__title';
  titleEl.textContent = title;
  body.appendChild(titleEl);

  // Description
  const descEl = document.createElement('p');
  descEl.className = 'project-card__description';
  descEl.textContent = description;
  body.appendChild(descEl);

  // Tags
  if (tags.length > 0) {
    const tagsEl = document.createElement('div');
    tagsEl.className = 'project-card__tags';
    tags.forEach(tag => tagsEl.appendChild(createBadge(tag)));
    body.appendChild(tagsEl);
  }

  card.appendChild(body);

  // Links footer
  const linksEl = document.createElement('div');
  linksEl.className = 'project-card__links';

  if (project.repoUrl !== null || project.demoUrl !== null) {
    if (project.repoUrl !== null) {
      const repoLink = document.createElement('a');
      repoLink.href = project.repoUrl;
      repoLink.target = '_blank';
      repoLink.rel = 'noopener noreferrer';
      repoLink.className = 'project-card__link project-card__link--repo';
      repoLink.setAttribute('aria-label', `Repositori GitHub ${title} (terbuka di tab baru)`);
      repoLink.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M9 19c-4.5 1.5-5-2-7-2"/><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1 0-3.2 1.6a11 11 0 0 0-5.8 0C7.5 1.6 6.4 1.6 6.4 1.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 5 8c0 3.5 3 5.5 6 5.5a4.8 4.8 0 0 0-1 3.5v4"/></svg>GitHub`;
      linksEl.appendChild(repoLink);
    }

    if (project.demoUrl !== null) {
      const demoLink = document.createElement('a');
      demoLink.href = project.demoUrl;
      demoLink.target = '_blank';
      demoLink.rel = 'noopener noreferrer';
      demoLink.className = 'project-card__link project-card__link--demo';
      demoLink.setAttribute('aria-label', `Demo ${title} (terbuka di tab baru)`);
      demoLink.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Live Demo`;
      linksEl.appendChild(demoLink);
    }
  } else {
    const noLink = document.createElement('span');
    noLink.className = 'no-link';
    noLink.textContent = 'Belum tersedia';
    linksEl.appendChild(noLink);
  }

  card.appendChild(linksEl);
  return card;
}

// ---------------------------------------------------------------------------
// Projects renderer
// ---------------------------------------------------------------------------

export function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) {
    console.warn('[render] #projects-grid not found — skipping renderProjects().');
    return;
  }

  projects.forEach(project => {
    grid.appendChild(createProjectCard(project));
  });
}

// ---------------------------------------------------------------------------
// Skill group
// ---------------------------------------------------------------------------

/** Category icons using simple SVG paths mapped by keyword */
const CATEGORY_ICONS = {
  'bahasa': `<path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>`,
  'framework': `<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>`,
  'database': `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>`,
  'tools': `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`,
  'soft': `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>`,
};

function getIcon(categoryName) {
  const key = categoryName.toLowerCase();
  for (const [keyword, paths] of Object.entries(CATEGORY_ICONS)) {
    if (key.includes(keyword)) {
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
    }
  }
  // Fallback icon
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
}

/**
 * Builds a `<div class="skill-group">` for a single category.
 *
 * @param {import('./data.js').SkillCategory} group
 * @returns {HTMLDivElement}
 */
function createSkillGroup(group) {
  const wrapper = document.createElement('div');
  wrapper.className = 'skill-group reveal';

  // Header (icon + title)
  const header = document.createElement('div');
  header.className = 'skill-group__header';

  const iconWrap = document.createElement('span');
  iconWrap.className = 'skill-group__icon';
  iconWrap.innerHTML = getIcon(group.category);
  header.appendChild(iconWrap);

  const heading = document.createElement('h3');
  heading.className = 'skill-group__title';
  heading.textContent = group.category;
  header.appendChild(heading);

  wrapper.appendChild(header);

  // Badges
  const badgesEl = document.createElement('div');
  badgesEl.className = 'skill-group__badges';
  group.items.forEach(item => badgesEl.appendChild(createBadge(item)));
  wrapper.appendChild(badgesEl);

  return wrapper;
}

// ---------------------------------------------------------------------------
// Skills renderer
// ---------------------------------------------------------------------------

export function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) {
    console.warn('[render] #skills-container not found — skipping renderSkills().');
    return;
  }

  skills.forEach(group => {
    container.appendChild(createSkillGroup(group));
  });
}
