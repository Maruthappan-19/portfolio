const fs = require('fs');

const html = fs.readFileSync('site.html', 'utf8');

// Print all text blocks
const textBlocks = [...html.matchAll(/<(?:p|h1|h2|h3|h4|span)[^>]*>([\s\S]*?)<\/(?:p|h1|h2|h3|h4|span)>/gi)]
  .map(m => m[1].replace(/<[^>]+>/g, '').trim())
  .filter(t => t.length > 15 && !t.includes('{') && !t.includes('var(') && !t.includes('function'));

console.log('--- ALL TEXT BLOCKS ---');
console.log([...new Set(textBlocks)].join('\n---\n'));

// Check images / video / media
const imgMatches = [...html.matchAll(/<img[^>]+(?:src|data-src)="([^"]+)"[^>]*>/gi)].map(m => m[1]);
console.log('\n--- IMAGES ---', imgMatches.length);
console.log(imgMatches.slice(0, 15));

// Check custom styles / fonts
const fonts = [...html.matchAll(/font-family:[^;]+;/gi)].map(m => m[0]);
console.log('\n--- FONTS ---', [...new Set(fonts)].slice(0, 10));
