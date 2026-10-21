const fs = require('fs');
const html = fs.readFileSync('site.html', 'utf8');

// Find colors
const hexColors = [...html.matchAll(/#([0-9a-f]{3}|[0-9a-f]{6})\b/gi)].map(m => m[0].toLowerCase());
const colorCounts = {};
hexColors.forEach(c => colorCounts[c] = (colorCounts[c] || 0) + 1);
console.log('Top hex colors:', Object.entries(colorCounts).sort((a,b) => b[1] - a[1]).slice(0, 15));

// Find CSS variables
const cssVars = [...html.matchAll(/(--[a-zA-Z0-9_-]+:\s*[^;]+;)/gi)].map(m => m[1]);
console.log('\nSample CSS variables:', cssVars.slice(0, 20));

// Find Typekit fonts from html
const fontMatch = html.match(/typekit\.net/gi);
console.log('\nHas typekit:', !!fontMatch);
