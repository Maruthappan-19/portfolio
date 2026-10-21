const fs = require('fs');
const html = fs.readFileSync('work.html', 'utf8');

const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, '\n')
  .split('\n')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('{') && !s.startsWith('var ') && !s.startsWith('.fe-') && !s.startsWith('@media'));

console.log([...new Set(text)].join('\n'));
