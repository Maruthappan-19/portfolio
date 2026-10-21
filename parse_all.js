const fs = require('fs');

function analyzeFile(filename) {
  if (!fs.existsSync(filename)) return;
  const html = fs.readFileSync(filename, 'utf8');
  console.log(`\n=================== ${filename} ===================`);
  
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  console.log('Title:', titleMatch ? titleMatch[1] : 'None');

  const headings = [...html.matchAll(/<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map(m => `${m[1].toUpperCase()}: ${m[2].replace(/<[^>]+>/g, '').trim()}`)
    .filter(h => h.length > 3);
  console.log('Headings:\n', headings.join('\n'));

  const textBlocks = [...html.matchAll(/<(?:p|h1|h2|h3|h4|span|div)[^>]*class=\"[^\"]*(?:project|portfolio|summary|content|entry-title|sqs-html-content)[^\"]*\"[^>]*>([\s\S]*?)<\/(?:p|h1|h2|h3|h4|span|div)>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(t => t.length > 20 && !t.includes('{') && !t.includes('var('));
  console.log('Key content snippets:\n', [...new Set(textBlocks)].slice(0, 10).join('\n---\n'));

  // Links / Project anchors
  const projectLinks = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
    .filter(l => l.text.length > 2 && !['Home', 'Work', 'About', 'Contact', 'Cart (0)', '0'].includes(l.text));
  console.log('Interesting Links:\n', JSON.stringify(projectLinks.slice(0, 15), null, 2));
}

analyzeFile('site.html');
analyzeFile('work.html');
analyzeFile('about.html');
analyzeFile('contact.html');
