'use strict';
// Generates public/ecg.png from the ECG SVG path using Jimp (pure JS, no native deps)
// Falls back to writing an SVG file if Jimp is unavailable

const fs = require('fs');
const path = require('path');

// Write the SVG to public/ — Gmail supports <img src="...svg"> from hosted URLs
// when images are displayed, same as PNG
const svgContent = `<svg width="600" height="44" viewBox="0 0 600 44" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="44" fill="#08514F"/>
  <path d="M0,28 L55,28 L67,25 L73,18 L79,25 L95,28 L107,28 L113,32 L119,2 L125,40 L131,28 L141,33 L153,20 L161,28 L255,28 L267,25 L273,18 L279,25 L295,28 L307,28 L313,32 L319,2 L325,40 L331,28 L341,33 L353,20 L361,28 L455,28 L467,25 L473,18 L479,25 L495,28 L507,28 L513,32 L519,2 L525,40 L531,28 L541,33 L553,20 L561,28 L600,28"
    fill="none" stroke="#F5A623" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const outPath = path.join(__dirname, 'public', 'ecg.svg');
fs.writeFileSync(outPath, svgContent, 'utf8');
console.log('Written:', outPath);
