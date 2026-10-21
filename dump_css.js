const fs = require('fs');
const html = fs.readFileSync('site.html', 'utf8');

const cssLinks = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/gi)].map(m => m[1]);
console.log('CSS links:', cssLinks);

const inlineStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
console.log('Inline styles count:', inlineStyles.length);
console.log('Inline styles snippet:', inlineStyles.map(s => s.slice(0, 100)));
