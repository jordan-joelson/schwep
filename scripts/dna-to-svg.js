#!/usr/bin/env node
/**
 * JSON → SVG — Schwep Design Blueprint spec sheet
 * Usage: node scripts/blueprint-to-svg.js [blueprint.json]
 *   With no arg: reads from stdin
 *   With arg: reads from file, writes design-blueprint.svg to same dir
 */

const fs = require('fs');
const path = require('path');

function blueprintToSvg(blueprint) {
  const pal = {};
  (blueprint.palette || []).forEach((p) => {
    pal[p.role] = p.hex;
  });

  const BG = pal['Background'] || pal['background'] || '#FFFFFF';
  const INK = pal['Primary'] || pal['primary'] || '#000000';
  const ACCENT = pal['Accent'] || pal['accent'] || '#888888';
  const SURFACE = pal['Surface'] || pal['surface'] || '#F5F5F5';
  const MUTED = pal['Muted'] || pal['muted'] || pal['Text'] || '#999999';
  const R = blueprint.radius ?? 8;

  const W = 1200;
  const H = 800;

  const grain =
    (blueprint.finish || '').toLowerCase().includes('grain')
      ? `
  <filter id="grain" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feBlend in="SourceGraphic" mode="multiply" result="blend"/>
    <feComposite in="blend" in2="SourceGraphic" operator="in"/>
  </filter>`
      : '';

  const vecLabels = ['Frame', 'Palette', 'Tone', 'Finish', 'Archetype', 'Texture'];
  const vec = blueprint.blueprintVec || blueprint.dnaVec || [];
  const barW = 320;
  const barH = 10;
  const barGap = 28;
  const vecX = 660;
  const vecY = 340;

  const vecBars = vecLabels
    .map((label, i) => {
      const v = vec[i] ?? 0;
      const y = vecY + i * barGap;
      const filled = Math.round(v * barW);
      const pct = Math.round(v * 100);
      return `
    <text x="${vecX}" y="${y - 2}" font-family="monospace" font-size="11" fill="${MUTED}" letter-spacing="0.05em">${label.toUpperCase()}</text>
    <rect x="${vecX}" y="${y + 4}" width="${barW}" height="${barH}" rx="5" fill="${SURFACE}" stroke="${MUTED}" stroke-width="0.5" stroke-opacity="0.4"/>
    <rect x="${vecX}" y="${y + 4}" width="${filled}" height="${barH}" rx="5" fill="${ACCENT}"/>
    <text x="${vecX + barW + 10}" y="${y + 13}" font-family="monospace" font-size="11" fill="${MUTED}">${pct}%</text>`;
    })
    .join('');

  const swatchSize = 48;
  const swatchGap = 16;
  const swatchStartX = 60;
  const swatchY = 480;

  const swatches = (blueprint.palette || [])
    .map((p, i) => {
      const x = swatchStartX + i * (swatchSize + swatchGap);
      return `
    <rect x="${x}" y="${swatchY}" width="${swatchSize}" height="${swatchSize}" rx="${R}" fill="${p.hex}" stroke="${INK}" stroke-width="0.5" stroke-opacity="0.15"/>
    <text x="${x + swatchSize / 2}" y="${swatchY + swatchSize + 16}" font-family="monospace" font-size="10" fill="${MUTED}" text-anchor="middle">${p.hex}</text>
    <text x="${x + swatchSize / 2}" y="${swatchY + swatchSize + 28}" font-family="monospace" font-size="9" fill="${MUTED}" text-anchor="middle" opacity="0.6">${p.name || p.role}</text>`;
    })
    .join('');

  function pillWidth(label, value) {
    return (label.length * 7 + 16) + (value.length * 7.5 + 16);
  }

  function pill(x, y, label, value) {
    const lw = label.length * 7 + 16;
    const vw = value.length * 7.5 + 16;
    const total = lw + vw;
    return `
    <rect x="${x}" y="${y}" width="${total}" height="28" rx="14" fill="${SURFACE}" stroke="${MUTED}" stroke-width="0.5" stroke-opacity="0.3"/>
    <rect x="${x}" y="${y}" width="${lw}" height="28" rx="14" fill="${ACCENT}" opacity="0.15"/>
    <text x="${x + lw / 2}" y="${y + 18}" font-family="monospace" font-size="10" fill="${ACCENT}" text-anchor="middle" font-weight="bold" letter-spacing="0.06em">${label}</text>
    <text x="${x + lw + vw / 2}" y="${y + 18}" font-family="monospace" font-size="10" fill="${INK}" text-anchor="middle" opacity="0.75">${value}</text>`;
  }

  const gap = 16;
  let px = 60;
  const pillsRow1 = [
    ['FRAME', blueprint.frame || '—'],
    ['SHAPE', blueprint.shape || '—'],
    ['TONE', blueprint.tone || '—'],
  ];
  const pillsRow2 = [
    ['FINISH', blueprint.finish || '—'],
    ['RADIUS', `${blueprint.radius ?? 8}px`],
  ];

  const pills1 = pillsRow1
    .map(([l, v]) => {
      const p = pill(px, 224, l, v);
      px += pillWidth(l, v) + gap;
      return p;
    })
    .join('');
  px = 60;
  const pills2 = pillsRow2
    .map(([l, v]) => {
      const p = pill(px, 260, l, v);
      px += pillWidth(l, v) + gap;
      return p;
    })
    .join('');

  const today = new Date().toISOString().split('T')[0];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    ${grain}
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${(blueprint.finish || '').toLowerCase().includes('grain') ? `<rect width="${W}" height="${H}" fill="${BG}" filter="url(#grain)" opacity="0.4"/>` : ''}

  <!-- Top rule -->
  <line x1="60" y1="60" x2="${W - 60}" y2="60" stroke="${INK}" stroke-width="1" opacity="0.15"/>

  <!-- Header -->
  <text x="60" y="52" font-family="monospace" font-size="10" fill="${MUTED}" letter-spacing="0.14em" opacity="0.7">SCHWEP DESIGN BLUEPRINT</text>
  <text x="${W - 60}" y="52" font-family="monospace" font-size="10" fill="${MUTED}" text-anchor="end" letter-spacing="0.06em" opacity="0.5">v1.0</text>

  <!-- Archetype -->
  <text x="60" y="160" font-family="Georgia, serif" font-size="72" font-weight="bold" fill="${INK}" letter-spacing="-2">${blueprint.archetype || 'Archetype'}</text>

  <!-- Frame + tone sub -->
  <text x="60" y="196" font-family="monospace" font-size="13" fill="${ACCENT}" letter-spacing="0.08em">${blueprint.frame || '—'}  ·  ${blueprint.tone || '—'}</text>

  <!-- Tag pills -->
  ${pills1}
  ${pills2}

  <!-- Divider -->
  <line x1="620" y1="100" x2="620" y2="${H - 80}" stroke="${INK}" stroke-width="0.5" opacity="0.12"/>

  <!-- Blueprint Vector -->
  <text x="${vecX}" y="310" font-family="monospace" font-size="10" fill="${MUTED}" letter-spacing="0.14em" opacity="0.7">BLUEPRINT VECTOR</text>
  <line x1="${vecX}" y1="320" x2="${vecX + barW + 40}" y2="320" stroke="${INK}" stroke-width="0.5" opacity="0.12"/>
  ${vecBars}

  <!-- Palette -->
  <line x1="60" y1="455" x2="${W - 60}" y2="455" stroke="${INK}" stroke-width="0.5" opacity="0.12"/>
  <text x="60" y="448" font-family="monospace" font-size="10" fill="${MUTED}" letter-spacing="0.14em" opacity="0.7">PALETTE</text>
  ${swatches}

  ${(blueprint.palette || [])
    .map((p, i) => {
      const x = swatchStartX + i * (swatchSize + swatchGap) + swatchSize / 2;
      return `<text x="${x}" y="${swatchY + swatchSize + 42}" font-family="monospace" font-size="8" fill="${ACCENT}" text-anchor="middle" letter-spacing="0.06em" opacity="0.8">${(p.role || '').toUpperCase()}</text>`;
    })
    .join('')}

  <!-- Footer -->
  <line x1="60" y1="${H - 48}" x2="${W - 60}" y2="${H - 48}" stroke="${INK}" stroke-width="1" opacity="0.1"/>
  <text x="60" y="${H - 30}" font-family="monospace" font-size="9" fill="${MUTED}" opacity="0.4" letter-spacing="0.06em">schwep.io · EXTRACTED DESIGN SPECIFICATION</text>
  <text x="${W - 60}" y="${H - 30}" font-family="monospace" font-size="9" fill="${MUTED}" text-anchor="end" opacity="0.4">${today}</text>

</svg>`;
}

// ── CLI ───────────────────────────────────────────────────────────────────
function main() {
  const arg = process.argv[2];
  let raw;

  if (arg) {
    const filePath = path.resolve(arg);
    raw = fs.readFileSync(filePath, 'utf8');
  } else {
    raw = fs.readFileSync(0, 'utf8');
  }

  const blueprint = JSON.parse(raw);
  const svg = blueprintToSvg(blueprint);

  if (arg) {
    const outPath = path.join(path.dirname(path.resolve(arg)), 'design-blueprint.svg');
    fs.writeFileSync(outPath, svg);
    console.log('✓ design-blueprint.svg written to', outPath);
  } else {
    process.stdout.write(svg);
  }
}

if (require.main === module) {
  main();
} else {
  module.exports = { blueprintToSvg };
}
