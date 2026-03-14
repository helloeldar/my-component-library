/**
 * Generates a static icon registry (src/lib/iconRegistry.js) by scanning
 * all SVG files under src/icons/. This replaces the Webpack-only
 * require.context approach so the library can be built with Rollup.
 *
 * Usage:  node scripts/generateIconRegistry.js
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.resolve(__dirname, '..', 'src', 'icons');
const OUTPUT_FILE = path.resolve(__dirname, '..', 'src', 'lib', 'iconRegistry.js');

function collectSvgFiles(dir, base) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(collectSvgFiles(full, base));
    } else if (entry.isFile() && entry.name.endsWith('.svg')) {
      const rel = path.relative(base, full).replace(/\\/g, '/');
      results.push(rel);
    }
  }
  return results;
}

function toVarName(relPath) {
  // e.g. "general/inspections/foo-bar.svg" → "icon_general_inspections_foo_bar"
  // Also handles @ and other special chars in filenames like cwmAccess@20x20.svg
  return 'icon_' + relPath.replace(/\.svg$/, '').replace(/[^a-zA-Z0-9]/g, '_');
}

function toKey(relPath) {
  // e.g. "general/inspections/foo-bar.svg" → "general/inspections/foo-bar"
  return relPath.replace(/\.svg$/, '');
}

const svgFiles = collectSvgFiles(ICONS_DIR, ICONS_DIR).sort();

console.log(`Found ${svgFiles.length} SVG icons.`);

const lines = [];
lines.push('// Auto-generated static icon registry for library builds (no require.context).');
lines.push('// Do not edit manually — regenerate with: node scripts/generateIconRegistry.js');
lines.push('');

// Import statements
for (const rel of svgFiles) {
  lines.push(`import ${toVarName(rel)} from '../icons/${rel}';`);
}

lines.push('');
lines.push('const iconRegistry = {');

for (const rel of svgFiles) {
  lines.push(`  '${toKey(rel)}': ${toVarName(rel)},`);
}

lines.push('};');
lines.push('');
lines.push('export const iconNames = Object.keys(iconRegistry).sort();');
lines.push('');
lines.push('export const getIcon = (name) => iconRegistry[name];');
lines.push('');
lines.push('export default iconRegistry;');
lines.push('');

fs.writeFileSync(OUTPUT_FILE, lines.join('\n'), 'utf8');
console.log(`Generated ${OUTPUT_FILE}`);
