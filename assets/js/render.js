// render.js — DOM rendering functions for projects and skills

import { projects, skills } from './data.js';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns a skeleton-wrapped lazy-loaded image element.
 * The `.skeleton` class is removed once the image finishes loading.
 * On error the wrapper is replaced with an error placeholder.
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
  // Intrinsic dimensions matching the CSS 16:9 aspect-ratio rule on .img-skeleton.
  // These let the browser reserve the correct space before the image loads,
  // preventing layout shift (CLS). The CSS object-fit handles the visual fit.
  img.width = 400;
  img.height = 225;

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
 * Returns a `<span class="badge">` element for a single text label.
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
 * Enforces data constraints at render time:
 *   - title      > 60 chars → truncated + console.warn
 *   - description > 150 chars → truncated + console.warn
 *   - tags.length > 8        → truncated + console.warn
 *
 * @param {import('./data.js').Project} project
 * @returns {HTMLElement}
 */
function createProjectCard(project) {
  // --- constraint enforcement ---
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

  // --- card element ---
  const card = document.createElement('article');
  card.className = 'project-card';

  // Image with skeleton loader
  const imgWrapper = createImageWithSkeleton(
    project.image,
    title
  );
  card.appendChild(imgWrapper);

  // Title
  const titleEl = document.createElement('h3');
  titleEl.className = 'project-card__title';
  titleEl.textContent = title;
  card.appendChild(titleEl);

  // Description
  const descEl = document.createElement('p');
  descEl.className = 'project-card__description';
  descEl.textContent = description;
  card.appendChild(descEl);

  // Tags
  if (tags.length > 0) {
    const tagsEl = document.createElement('div');
    tagsEl.className = 'project-card__tags';
    tags.forEach(tag => tagsEl.appendChild(createBadge(tag)));
    card.appendChild(tagsEl);
  }

  // Links
  const linksEl = document.createElement('div');
  linksEl.className = 'project-card__links';

  if (project.repoUrl !== null || project.demoUrl !== null) {
    if (project.repoUrl !== null) {
      const repoLink = document.createElement('a');
      repoLink.href = project.repoUrl;
      repoLink.target = '_blank';
      repoLink.rel = 'noopener noreferrer';
      repoLink.className = 'project-card__link project-card__link--repo';
      repoLink.textContent = 'GitHub ↗';
      linksEl.appendChild(repoLink);
    }

    if (project.demoUrl !== null) {
      const demoLink = document.createElement('a');
      demoLink.href = project.demoUrl;
      demoLink.target = '_blank';
      demoLink.rel = 'noopener noreferrer';
      demoLink.className = 'project-card__link project-card__link--demo';
      demoLink.textContent = 'Demo ↗';
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
// Projects section renderer
// ---------------------------------------------------------------------------

/**
 * Iterates the `projects` array, creates a card for each project,
 * and appends them to `#projects-grid`.
 */
export function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) {
    console.warn('[render] #projects-grid element not found — skipping renderProjects().');
    return;
  }

  projects.forEach(project => {
    const card = createProjectCard(project);
    grid.appendChild(card);
  });
}

// ---------------------------------------------------------------------------
// Skill group
// ---------------------------------------------------------------------------

/**
 * Builds and returns a `<div class="skill-group">` containing
 * an `<h3>` category heading and a badge `<span>` for each skill item.
 *
 * @param {import('./data.js').SkillCategory} group
 * @returns {HTMLDivElement}
 */
function createSkillGroup(group) {
  const wrapper = document.createElement('div');
  wrapper.className = 'skill-group';

  const heading = document.createElement('h3');
  heading.className = 'skill-group__title';
  heading.textContent = group.category;
  wrapper.appendChild(heading);

  const badgesEl = document.createElement('div');
  badgesEl.className = 'skill-group__badges';
  group.items.forEach(item => badgesEl.appendChild(createBadge(item)));
  wrapper.appendChild(badgesEl);

  return wrapper;
}

// ---------------------------------------------------------------------------
// Skills section renderer
// ---------------------------------------------------------------------------

/**
 * Iterates the `skills` array, creates a skill group for each category,
 * and appends them to `#skills-container`.
 */
export function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) {
    console.warn('[render] #skills-container element not found — skipping renderSkills().');
    return;
  }

  skills.forEach(group => {
    const groupEl = createSkillGroup(group);
    container.appendChild(groupEl);
  });
}
