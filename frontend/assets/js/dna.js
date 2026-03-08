let st = {
  results: {
    Frame: 'Bento Grid',
    Shape: 'Round Corners',
    Tone: 'Bold Tech',
    Finish: 'Clean Minimal',
    Radius: 12,
  },
};

let dnaVec = [0.9, 0.75, 0.7, 0.2, 0.65, 0.85];

const DNA = {
  // FRAME
  'Bento Grid': [0.9, 0.75, 0.7, 0.2, 0.65, 0.85],
  'Split Layout': [0.7, 0.55, 0.75, 0.35, 0.6, 0.65],
  'Swiss Grid': [0.95, 0.8, 0.6, 0.15, 0.45, 0.75],
  Editorial: [0.5, 0.3, 0.55, 0.6, 0.4, 0.3],
  'Masonry Gallery': [0.75, 0.5, 0.65, 0.6, 0.8, 0.5],
  'Hero Canvas': [0.85, 0.4, 0.8, 0.7, 0.9, 0.5],
  // SHAPE
  'Sharp Corners': [0.9, 0.95, 0.8, 0.1, 0.7, 0.8],
  'Soft Corners': [0.55, 0.35, 0.45, 0.65, 0.4, 0.45],
  'Round Corners': [0.45, 0.25, 0.4, 0.7, 0.45, 0.4],
  'Pill Shape': [0.3, 0.1, 0.35, 0.8, 0.55, 0.35],
  'Cut Corners': [0.8, 0.85, 0.7, 0.2, 0.85, 0.75],
  Organic: [0.2, 0.1, 0.3, 0.9, 0.7, 0.2],
  // TONE
  'Bold Tech': [0.85, 0.85, 0.9, 0.1, 0.85, 0.9],
  'Editorial Modern': [0.6, 0.4, 0.55, 0.55, 0.35, 0.3],
  'Raw Mono': [0.75, 0.7, 0.65, 0.15, 0.75, 0.95],
  Handwritten: [0.2, 0.1, 0.35, 0.9, 0.5, 0.1],
  'Neo-Brutalist': [0.9, 0.9, 0.95, 0.3, 0.95, 0.6],
  'Retro Serif': [0.4, 0.3, 0.6, 0.85, 0.7, 0.2],
  // FINISH
  'Grain Texture': [0.35, 0.3, 0.4, 0.8, 0.45, 0.2],
  'Clean Minimal': [0.8, 0.6, 0.5, 0.25, 0.4, 0.65],
  'Gritty Edge': [0.65, 0.8, 0.75, 0.2, 0.8, 0.7],
  'Neon Glow': [0.7, 0.65, 0.7, 0.1, 0.95, 0.95],
  Glassmorphism: [0.6, 0.4, 0.4, 0.6, 0.7, 0.9],
  Holographic: [0.5, 0.3, 0.4, 0.5, 0.85, 0.95],
};

document.addEventListener('DOMContentLoaded', () => {
  loadResults();
  computeDnaVec();
  document.getElementById('ds-output').innerHTML = buildDesignSystem();
  setupButtons();
});

function loadResults() {
  const savedResults = localStorage.getItem('schwep-results');
  if (savedResults) {
    try {
      const parsed = JSON.parse(savedResults);
      st.results.Frame = parsed.frame || st.results.Frame;
      st.results.Shape = parsed.shape || st.results.Shape;
      st.results.Tone = parsed.tone || st.results.Tone;
      st.results.Finish = parsed.finish || st.results.Finish;
      st.results.Radius = parsed.radius || st.results.Radius;
    } catch (e) {
      console.error('Error parsing results:', e);
    }
  } else {
    const params = new URLSearchParams(window.location.search);
    if (params.get('frame')) st.results.Frame = params.get('frame');
    if (params.get('shape')) st.results.Shape = params.get('shape');
    if (params.get('tone')) st.results.Tone = params.get('tone');
    if (params.get('finish')) st.results.Finish = params.get('finish');
    if (params.get('radius')) st.results.Radius = parseInt(params.get('radius'));
  }
}

function computeDnaVec() {
  const choices = [st.results.Frame, st.results.Shape, st.results.Tone, st.results.Finish];
  let vec = [0, 0, 0, 0, 0, 0];
  let count = 0;
  choices.forEach((ch) => {
    if (DNA[ch]) {
      for (let i = 0; i < 6; i++) vec[i] += DNA[ch][i];
      count++;
    }
  });
  if (count > 0) {
    for (let i = 0; i < 6; i++) vec[i] /= count;
    dnaVec = vec;
  }
}

// ── Palette definitions keyed by Finish + Tone ────────────────────────────────
const PALETTES = {
  'Neon Glow': {
    swatches: [
      { name: 'Void', hex: '#040414', role: 'Background' },
      { name: 'Plasma', hex: '#3DFFD0', role: 'Primary' },
      { name: 'Pulse', hex: '#FF4DFF', role: 'Accent' },
      { name: 'Static', hex: '#1A1A2E', role: 'Surface' },
      { name: 'Signal', hex: '#FFFFFF', role: 'Text' },
    ],
  },
  'Gritty Edge': {
    swatches: [
      { name: 'Tar', hex: '#111111', role: 'Background' },
      { name: 'Ember', hex: '#FF4D00', role: 'Primary' },
      { name: 'Ash', hex: '#3A3A3A', role: 'Surface' },
      { name: 'Concrete', hex: '#888888', role: 'Muted' },
      { name: 'Bone', hex: '#F0EDE7', role: 'Text' },
    ],
  },
  'Grain Texture': {
    swatches: [
      { name: 'Parchment', hex: '#EDE5D8', role: 'Background' },
      { name: 'Ink', hex: '#2C1F0F', role: 'Primary' },
      { name: 'Sienna', hex: '#8B6A45', role: 'Accent' },
      { name: 'Linen', hex: '#F5EFE6', role: 'Surface' },
      { name: 'Dusk', hex: '#6B5B4E', role: 'Muted' },
    ],
  },
  'Clean Minimal': {
    swatches: [
      { name: 'White', hex: '#FFFFFF', role: 'Background' },
      { name: 'Ink', hex: '#0D0D0D', role: 'Primary' },
      { name: 'Flame', hex: '#FF4D00', role: 'Accent' },
      { name: 'Mist', hex: '#F5F5F5', role: 'Surface' },
      { name: 'Slate', hex: '#888888', role: 'Muted' },
    ],
  },
  Glassmorphism: {
    swatches: [
      { name: 'Vapor', hex: '#F0F0FC', role: 'Background' },
      { name: 'Cobalt', hex: '#2A31FF', role: 'Primary' },
      { name: 'Magenta', hex: '#FF00A0', role: 'Accent' },
      { name: 'Frost', hex: '#FFFFFF', role: 'Surface' },
      { name: 'Steel', hex: '#7C84A6', role: 'Muted' },
    ],
  },
  Holographic: {
    swatches: [
      { name: 'Pearl', hex: '#FAFAFF', role: 'Background' },
      { name: 'Abyss', hex: '#0F0524', role: 'Primary' },
      { name: 'Prism', hex: '#00FFE0', role: 'Accent' },
      { name: 'Cloud', hex: '#FFFFFF', role: 'Surface' },
      { name: 'Amethyst', hex: '#9B51E0', role: 'Muted' },
    ],
  },
};

// ── Typography definitions keyed by Tone ─────────────────────────────────────
const TYPEFACES = {
  'Bold Tech': {
    display: { name: 'Syne', weight: '800', size: '72px', style: 'normal', sample: 'SYSTEM' },
    body: {
      name: 'DM Mono',
      weight: '400',
      size: '14px',
      style: 'normal',
      sample: 'Interface copy — monospaced and direct.',
    },
    meta: 'Syne 800 / DM Mono 400 — high contrast, structured hierarchy',
  },
  'Editorial Modern': {
    display: { name: 'Georgia', weight: '700', size: '64px', style: 'italic', sample: 'Refined' },
    body: {
      name: 'Georgia',
      weight: '400',
      size: '15px',
      style: 'normal',
      sample: 'Editorial body — warm, considered, readable.',
    },
    meta: 'Georgia 700i / Georgia 400 — classical rhythm, editorial warmth',
  },
  'Raw Mono': {
    display: { name: 'DM Mono', weight: '500', size: '56px', style: 'normal', sample: 'RAW_OUT' },
    body: {
      name: 'DM Mono',
      weight: '300',
      size: '13px',
      style: 'normal',
      sample: 'Fixed-width. Every character deliberate.',
    },
    meta: 'DM Mono 500 / DM Mono 300 — raw, undecorated, precise',
  },
  Handwritten: {
    display: { name: 'Georgia', weight: '400', size: '60px', style: 'italic', sample: 'personal' },
    body: {
      name: 'Georgia',
      weight: '400',
      size: '15px',
      style: 'italic',
      sample: 'Warm, organic, like a letter to a friend.',
    },
    meta: 'Georgia italic / Georgia 400i — intimate, handcrafted feel',
  },
  'Neo-Brutalist': {
    display: { name: 'Syne', weight: '800', size: '72px', style: 'normal', sample: 'BRUTAL' },
    body: {
      name: 'DM Mono',
      weight: '700',
      size: '15px',
      style: 'normal',
      sample: 'LOUD AND UNAPOLOGETIC INTERFACE COPY.',
    },
    meta: 'Syne 800 / DM Mono 700 — aggressive, high-energy impact',
  },
  'Retro Serif': {
    display: { name: 'Georgia', weight: '700', size: '68px', style: 'italic', sample: 'Groove' },
    body: {
      name: 'Georgia',
      weight: '400',
      size: '16px',
      style: 'normal',
      sample: 'Expressive curves and vintage warmth.',
    },
    meta: 'Georgia 700i / Georgia 400 — classic 70s editorial feel',
  },
};

// ── Archetype names from Frame + Tone combos ─────────────────────────────────
const ARCHETYPES = {
  'Bento Grid+Bold Tech': 'Structured Signal',
  'Bento Grid+Raw Mono': 'Grid System',
  'Bento Grid+Editorial Modern': 'Data Editorial',
  'Bento Grid+Handwritten': 'Warm Dashboard',
  'Swiss Grid+Bold Tech': 'Pure Function',
  'Swiss Grid+Raw Mono': 'Brutalist Grid',
  'Swiss Grid+Editorial Modern': 'Swiss Editorial',
  'Swiss Grid+Handwritten': 'Rational Warmth',
  'Split Layout+Bold Tech': 'Power Split',
  'Split Layout+Raw Mono': 'Terminal Split',
  'Split Layout+Editorial Modern': 'Editorial Feature',
  'Split Layout+Handwritten': 'Story-Driven',
  'Editorial+Bold Tech': 'Loud Editorial',
  'Editorial+Raw Mono': 'Dispatch',
  'Editorial+Editorial Modern': 'Classic Press',
  'Editorial+Handwritten': 'Personal Essay',
  'Editorial+Neo-Brutalist': 'Anti-Design',
  'Editorial+Retro Serif': 'Vintage Mag',
  'Masonry Gallery+Bold Tech': 'Digital Portfolio',
  'Masonry Gallery+Raw Mono': 'Archive Index',
  'Masonry Gallery+Editorial Modern': 'Art Gallery',
  'Masonry Gallery+Handwritten': 'Scrapbook',
  'Masonry Gallery+Neo-Brutalist': 'Chaos Grid',
  'Masonry Gallery+Retro Serif': 'Retro Showcase',
  'Hero Canvas+Bold Tech': 'Impact Landing',
  'Hero Canvas+Raw Mono': 'Code Splash',
  'Hero Canvas+Editorial Modern': 'Cover Story',
  'Hero Canvas+Handwritten': 'Personal Intro',
  'Hero Canvas+Neo-Brutalist': 'Loud Canvas',
  'Hero Canvas+Retro Serif': 'Nostalgia Feature',
};

// ── Spacing / radius tokens from Shape choice + editor state ─────────────────
function getRadiusTokens(shape, radiusBase) {
  const base = radiusBase || 12;
  return [
    { name: 'None', val: '0px', shape: '0' },
    {
      name: 'SM',
      val: Math.max(0, Math.round(base * 0.3)) + 'px',
      shape: Math.max(0, Math.round(base * 0.3)),
    },
    { name: 'MD', val: base + 'px', shape: base },
    { name: 'LG', val: Math.round(base * 1.8) + 'px', shape: Math.round(base * 1.8) },
  ];
}

// ── Swatch text color (light or dark based on bg) ────────────────────────────
function swatchTextColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 128 ? '#0D0D0D' : '#FFFFFF';
}

function buildDesignSystem() {
  const frame = st.results['Frame'] || 'Bento Grid';
  const shape = st.results['Shape'] || 'Soft Corners';
  const tone = st.results['Tone'] || 'Bold Tech';
  const finish = st.results['Finish'] || 'Clean Minimal';

  const palette = PALETTES[finish] || PALETTES['Clean Minimal'];
  const typeface = TYPEFACES[tone] || TYPEFACES['Bold Tech'];
  const archetype = ARCHETYPES[`${frame}+${tone}`] || 'Design System';
  const radius = st.results['Radius'] || 12;
  const tokens = getRadiusTokens(shape, radius);
  const vec = dnaVec || [0.9, 0.75, 0.7, 0.2, 0.65, 0.85];
  const bg = palette.swatches[0].hex;
  const primary = palette.swatches[1].hex;
  const accent = palette.swatches[2].hex;
  const surface = palette.swatches[3].hex;
  const textCol = swatchTextColor(bg);

  // Palette HTML
  const paletteHTML = `
<div class="ds-panel">
  <div class="ds-panel-head">
    <span class="ds-panel-tag">Colour Palette</span>
    <span class="ds-panel-val">${finish}</span>
  </div>
  <div class="ds-panel-body">
    <div class="palette-row">
      ${palette.swatches
        .map((s) => {
          const tc = swatchTextColor(s.hex);
          return `<div class="swatch" style="background:${s.hex};color:${tc};">
          <div class="swatch-name">${s.name}</div>
          <div class="swatch-hex">${s.hex}</div>
          <div class="swatch-role">${s.role}</div>
        </div>`;
        })
        .join('')}
    </div>
  </div>
</div>`;

  // Typography HTML
  const typeHTML = `
<div class="ds-panel">
  <div class="ds-panel-head">
    <span class="ds-panel-tag">Typography</span>
    <span class="ds-panel-val">${tone}</span>
  </div>
  <div class="ds-panel-body">
    <div class="type-specimen">
      <div class="type-row">
        <div class="type-label">Display</div>
        <div class="type-display" style="font-family:'${typeface.display.name}',serif,sans-serif;font-weight:${typeface.display.weight};font-size:clamp(28px,5vw,${typeface.display.size});font-style:${typeface.display.style};">${typeface.display.sample}</div>
        <div class="type-meta">${typeface.display.name} · ${typeface.display.weight} · ${typeface.display.size}</div>
      </div>
      <div class="type-row">
        <div class="type-label">Body</div>
        <div class="type-display" style="font-family:'${typeface.body.name}',serif,sans-serif;font-weight:${typeface.body.weight};font-size:${typeface.body.size};font-style:${typeface.body.style};line-height:1.6;">${typeface.body.sample}</div>
        <div class="type-meta">${typeface.body.name} · ${typeface.body.weight} · ${typeface.body.size}</div>
      </div>
      <div class="type-row">
        <div class="type-label">System</div>
        <div class="type-meta" style="font-size:12px;">${typeface.meta}</div>
      </div>
    </div>
  </div>
</div>`;

  // Radius tokens HTML
  const tokensHTML = `
<div class="ds-panel">
  <div class="ds-panel-head">
    <span class="ds-panel-tag">Radius Tokens</span>
    <span class="ds-panel-val">${shape} · ${radius}px base</span>
  </div>
  <div class="ds-panel-body">
    <div class="token-grid">
      ${tokens
        .map(
          (t) => `
      <div class="token-item">
        <div class="token-shape" style="border-radius:${t.shape}px;"></div>
        <div class="token-name">${t.name}</div>
        <div class="token-val">${t.val}</div>
      </div>`
        )
        .join('')}
    </div>
  </div>
</div>`;

  // DNA fingerprint HTML
  const axes = ['Structure', 'Edge', 'Weight', 'Warmth', 'Energy', 'Digital'];
  const fpHTML = `
<div class="ds-panel">
  <div class="ds-panel-head">
    <span class="ds-panel-tag">DNA Fingerprint</span>
    <span class="ds-panel-val" style="font-style:italic;color:var(--orange);">${archetype}</span>
  </div>
  <div class="ds-panel-body">
    <div class="dna-fp">
      ${axes
        .map((ax, i) => {
          const pct = Math.round(vec[i] * 100);
          const fillColor =
            pct >= 70 ? 'var(--orange)' : pct >= 45 ? 'rgba(13,13,13,.35)' : 'rgba(13,13,13,.15)';
          return `<div class="dna-fp-row">
          <div class="dna-fp-label">${ax}</div>
          <div class="dna-fp-bar-bg"><div class="dna-fp-bar-fill" style="width:${pct}%;background:${fillColor};"></div></div>
          <div class="dna-fp-num">${pct}</div>
        </div>`;
        })
        .join('')}
    </div>
  </div>
</div>`;

  // Choices summary row
  const choicesHTML = `
<div class="ds-panel ds-full">
  <div class="ds-panel-body" style="padding:14px 18px;">
    <div class="choices-row">
      ${[
        ['Frame', frame],
        ['Shape', shape],
        ['Tone', tone],
        ['Finish', finish],
      ]
        .map(
          ([k, v]) => `
      <div class="choice-chip">
        <div class="choice-chip-k">${k}</div>
        <div class="choice-chip-v">${v}</div>
      </div>`
        )
        .join('')}
    </div>
  </div>
</div>`;

  return `
<div class="ds-hero">
  <div class="ds-eyebrow">Design System · Complete</div>
  <div>
    <div class="ds-headline">Your</div>
    <div class="ds-archetype">${archetype}</div>
  </div>
  <div class="ds-tagline">DNA vector locked · ${
    axes
      .filter((_, i) => vec[i] > 0.7)
      .map((a) => a.toLowerCase())
      .join(' · ') || 'balanced profile'
  }</div>
</div>
${choicesHTML}
<div class="ds-grid-wide">
  ${paletteHTML}
  ${typeHTML}
</div>
<div class="ds-grid-wide">
  ${tokensHTML}
  ${fpHTML}
</div>
<div class="ds-full">
  ${buildLiveMockupPanel(frame, tone, finish, bg, primary, accent, surface, textCol, radius, shape)}
</div>`;
}

// ── Live mockup panel ─────────────────────────────────────────────────────────
function buildLiveMockupPanel(
  frame,
  tone,
  finish,
  bg,
  primary,
  accent,
  surface,
  textCol,
  radius,
  shape
) {
  const r = radius + 'px';
  const r2 = Math.round(radius * 0.6) + 'px';
  const isDark = swatchTextColor(bg) === '#FFFFFF';
  const mutedText = isDark ? 'rgba(255,255,255,.4)' : 'rgba(13,13,13,.4)';
  const borderCol = isDark ? 'rgba(255,255,255,.1)' : 'rgba(13,13,13,.1)';

  return `<div class="ds-panel">
  <div class="ds-panel-head">
    <span class="ds-panel-tag">Live Component</span>
    <span class="ds-panel-val">${frame} · ${shape}</span>
  </div>
  <div class="ds-panel-body" style="padding:0;background:${bg};">
    <div style="padding:20px;display:flex;flex-direction:column;gap:12px;min-height:280px;justify-content:space-between;">
      <!-- Nav -->
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:13px;color:${primary};letter-spacing:.06em;">STUDIO</div>
        <div style="display:flex;gap:16px;">
          ${['Work', 'About', 'Contact'].map((t) => `<span style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:${mutedText};">${t}</span>`).join('')}
        </div>
      </div>
      <!-- Hero text -->
      <div>
        <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(22px,4vw,32px);line-height:1;letter-spacing:-.03em;color:${textCol};margin-bottom:8px;">${ARCHETYPES[frame + '+' + tone] || 'Design System'}</div>
        <div style="font-size:10px;color:${mutedText};line-height:1.6;max-width:280px;">${TYPEFACES[tone]?.body?.sample || 'Design that thinks.'}</div>
      </div>
      <!-- CTA row -->
      <div style="display:flex;gap:8px;">
        <div style="background:${accent};color:${swatchTextColor(accent)};padding:10px 18px;border-radius:${r};font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-family:'DM Mono',monospace;display:inline-flex;align-items:center;gap:6px;">
          Get started
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div style="border:1.5px solid ${borderCol};color:${mutedText};padding:10px 18px;border-radius:${r};font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-family:'DM Mono',monospace;">
          Learn more
        </div>
      </div>
      <!-- Tag chips -->
      <div style="display:flex;gap:5px;flex-wrap:wrap;">
        ${[frame, tone, finish].map((t) => `<div style="padding:4px 10px;border-radius:${r2};border:1px solid ${borderCol};font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:${mutedText};">${t}</div>`).join('')}
      </div>
    </div>
  </div>
</div>`;
}

function setupButtons() {
  const btnCopy = document.getElementById('btn-copy');
  const btnAgain = document.getElementById('btn-again');

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const dnaCode = JSON.stringify(
        {
          frame: st.results.Frame,
          shape: st.results.Shape,
          tone: st.results.Tone,
          finish: st.results.Finish,
          radius: st.results.Radius,
          timestamp: new Date().toISOString(),
        },
        null,
        2
      );

      navigator.clipboard
        .writeText(dnaCode)
        .then(() => {
          btnCopy.textContent = 'Copied!';
          setTimeout(() => {
            btnCopy.textContent = 'Copy DNA';
          }, 2000);
        })
        .catch(() => {
          btnCopy.textContent = 'Error!';
          setTimeout(() => {
            btnCopy.textContent = 'Copy DNA';
          }, 2000);
        });
    });
  }

  if (btnAgain) {
    btnAgain.addEventListener('click', () => {
      window.location.href = 'engine.html';
    });
  }
}
