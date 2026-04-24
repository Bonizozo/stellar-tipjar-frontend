/**
 * Generates PNG icons from icon.svg using the Canvas API (Node.js + canvas package).
 * Run once: node generate-icons.js
 *
 * Requires: npm install canvas (or use any SVG→PNG tool like Inkscape/ImageMagick)
 *
 * Alternative (no deps): open icon.svg in a browser, screenshot at each size,
 * or use https://svgtopng.com and export at 16, 48, 128px.
 */

const fs = require("fs");
const path = require("path");

const sizes = [16, 48, 128];

async function generate() {
  let createCanvas, loadImage;
  try {
    ({ createCanvas, loadImage } = require("canvas"));
  } catch {
    console.error(
      "Install the canvas package first: npm install canvas\n" +
      "Or manually export icon.svg at 16x16, 48x48, 128x128 as PNG."
    );
    process.exit(1);
  }

  const svgPath = path.join(__dirname, "icon.svg");
  const svgData = fs.readFileSync(svgPath);
  const img = await loadImage(svgData);

  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, size, size);
    const out = path.join(__dirname, `icon-${size}.png`);
    fs.writeFileSync(out, canvas.toBuffer("image/png"));
    console.log(`✓ icon-${size}.png`);
  }
}

generate();
