const fs = require('fs');
const html = fs.readFileSync('project.html', 'utf8');

const pTags = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
console.log('Paragraphs count:', pTags.length);
console.log('Sample paragraphs:', pTags.slice(0, 10));

const imgs = [...html.matchAll(/<img[^>]+(?:src|data-src)="([^"]+)"[^>]*>/gi)].map(m => m[1]);
console.log('Images count:', imgs.length);
console.log('Sample images:', imgs.slice(0, 6));

const links = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }));
console.log('Links in project:', links.slice(0, 10));
