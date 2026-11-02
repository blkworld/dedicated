// Scans ./images and writes images.json for the gallery.
// Used by dev.js (local) and by the Vercel build (production).
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'images');
const OUT = path.join(__dirname, 'images.json');
const IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i;

function altFrom(file) {
  const name = file
    .replace(IMAGE, '')
    .replace(/^\d+[-_ ]*/, '')   // drop a leading "01-" ordering prefix
    .replace(/[-_]+/g, ' ')
    .trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function build() {
  fs.mkdirSync(DIR, { recursive: true });
  const files = fs.readdirSync(DIR)
    .filter((f) => IMAGE.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const json = JSON.stringify(
    files.map((f) => ({ src: 'images/' + encodeURIComponent(f), alt: altFrom(f) })),
    null, 2
  ) + '\n';

  // Only write when something changed, so live-reload doesn't loop.
  const old = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (json !== old) {
    fs.writeFileSync(OUT, json);
    console.log('[gallery] images.json updated: ' + files.length + ' photos');
  }
}

function watch() {
  fs.mkdirSync(DIR, { recursive: true });
  let timer;
  fs.watch(DIR, () => { clearTimeout(timer); timer = setTimeout(build, 300); });
  console.log('[gallery] watching ./images');
}

module.exports = { build, watch };

if (require.main === module) {
  build();
  if (process.argv.includes('--watch')) watch();
}
