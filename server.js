// server.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('frontend'));

// Rewrite clean URLs to .html
const pages = ['engine', 'login', 'signup', 'archive'];
pages.forEach(p => {
  app.get(`/${p}`, (req, res) => res.sendFile(path.join(__dirname, 'frontend', `${p}.html`)));
});
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'index.html')));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
