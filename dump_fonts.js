const fs = require('fs');
const html = fs.readFileSync('site.html', 'utf8');

const matches = html.match(/"font-family":"([^"]+)"/g);
console.log('font-family JSON matches:', matches);

const fontFamilies = [...html.matchAll(/font-family:\s*([^;!}]+)/gi)].map(m => m[1].trim());
console.log('fontFamilies CSS:', [...new Set(fontFamilies)].slice(0, 15));
