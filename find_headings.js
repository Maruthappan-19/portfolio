const fs = require('fs');
const html = fs.readFileSync('site.html', 'utf8');

const headings = [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)]
  .map(m => ({ tag: m[1], text: m[2].replace(/<[^>]+>/g, '').trim(), raw: m[0] }));

console.log(JSON.stringify(headings, null, 2));
