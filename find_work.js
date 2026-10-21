const fs = require('fs');
const html = fs.readFileSync('site.html', 'utf8');

const regex = /recent work/i;
const match = regex.exec(html);
if (match) {
  console.log(html.substring(match.index - 200, match.index + 2000));
} else {
  console.log('Not found');
}
