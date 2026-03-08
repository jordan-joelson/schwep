// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('frontend'));

// Gemini API proxy — keeps API key server-side
// POST /api/generate-variants
// Body: { roundKey, cardName, cardDesc, likedSoFar, blueprintSummary }
// Returns: { variants: [{ name, desc, preview }] }
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const PREVIEW_TYPES = ['bento', 'split', 'swiss', 'editorial', 'boldtech', 'edmod', 'rawmono', 'hand', 'grain', 'clean', 'gritty', 'neon', 'default'];

app.post('/api/generate-variants', async (req, res) => {
  if (!GEMINI_KEY) {
    return res.status(503).json({ error: 'Gemini API key not configured. Add GEMINI_API_KEY to .env' });
  }
  const { roundKey, cardName, cardDesc, likedSoFar = [], blueprintSummary = '' } = req.body || {};
  if (!roundKey || !cardName) {
    return res.status(400).json({ error: 'roundKey and cardName required' });
  }

  const prompt = `You are a UI/UX design expert. Generate exactly 3 design variant options for a component card.

Context:
- Round category: ${roundKey}
- Base card: "${cardName}" — ${cardDesc || 'design component'}
- User's previous likes: ${likedSoFar.length ? likedSoFar.join(', ') : 'none yet'}
${blueprintSummary ? `- User preference profile: ${blueprintSummary}` : ''}

Return a JSON array of exactly 3 objects. Each object must have:
- "name": short creative name (2-4 words)
- "desc": one-line description (under 60 chars)
- "preview": one of these exact strings: ${PREVIEW_TYPES.join(', ')}

Output ONLY valid JSON, no markdown or extra text. Example:
[{"name":"Bold Condensed","desc":"Tight uppercase, heavy weight","preview":"boldtech"},{"name":"Tech Serif","desc":"Sharp slab with industrial edge","preview":"edmod"},{"name":"Display Mono","desc":"Wide mono, strong presence","preview":"rawmono"}]`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 512 },
        }),
      }
    );
    const data = await resp.json();
    if (!resp.ok) {
      return res.status(resp.status).json({ error: data.error?.message || 'Gemini API error' });
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const variants = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    const valid = variants
      .slice(0, 3)
      .filter((v) => v && v.name && v.desc && v.preview)
      .map((v) => ({
        name: String(v.name).slice(0, 40),
        desc: String(v.desc).slice(0, 80),
        preview: PREVIEW_TYPES.includes(v.preview) ? v.preview : 'default',
      }));
    return res.json({ variants: valid });
  } catch (err) {
    console.error('Gemini variants error:', err);
    return res.status(500).json({ error: err.message || 'Failed to generate variants' });
  }
});

// Rewrite clean URLs to .html
const pages = ['engine', 'login', 'signup', 'archive'];
pages.forEach(p => {
  app.get(`/${p}`, (req, res) => res.sendFile(path.join(__dirname, 'frontend', `${p}.html`)));
});
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'index.html')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
  if (!GEMINI_KEY) {
    console.log('Tip: Add GEMINI_API_KEY to .env for AI-generated card variants (copy env.example to .env)');
  }
});
