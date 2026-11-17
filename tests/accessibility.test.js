/**
 * Automated Accessibility Check — axe-core + jsdom
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5
 *
 * @vitest-environment jsdom
 *
 * Loads the static index.html and runs axe-core at WCAG AA level.
 * Dynamic content injected by render.js (projects, skills) is not present —
 * this test validates the static HTML structure.
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import axe from 'axe-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load index.html from the project root
const htmlPath = resolve(__dirname, '..', 'index.html');
const htmlContent = readFileSync(htmlPath, 'utf-8');

describe('Accessibility — WCAG AA (axe-core)', () => {
  let axeResults;

  beforeAll(async () => {
    // Write the full HTML into the jsdom document
    document.open();
    document.write(htmlContent);
    document.close();

    // Run axe against the whole document with WCAG 2.0/2.1 AA tags
    axeResults = await axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
    });
  }, 30000);

  it('should have zero WCAG AA violations', () => {
    if (axeResults.violations.length > 0) {
      const report = axeResults.violations
        .map((v) => {
          const nodes = v.nodes.map((n) => `    • ${n.html}`).join('\n');
          return `[${v.impact.toUpperCase()}] ${v.id}: ${v.description}\n${nodes}`;
        })
        .join('\n\n');

      throw new Error(
        `Found ${axeResults.violations.length} accessibility violation(s):\n\n${report}`
      );
    }

    expect(axeResults.violations).toHaveLength(0);
  });

  it('should detect at least one ARIA/landmark rule as applicable (sanity check)', () => {
    // Verify axe actually evaluated rules — total evaluated rules should be non-zero
    const totalRulesRan =
      axeResults.passes.length +
      axeResults.violations.length +
      axeResults.incomplete.length;
    expect(totalRulesRan).toBeGreaterThan(0);
  });
});
