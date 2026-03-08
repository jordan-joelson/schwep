# Scripts

## blueprint-to-svg.js — JSON → SVG Design Blueprint spec sheet

Converts a Schwep Blueprint JSON file into a printable SVG design specification.

### Usage

```bash
# From file (writes design-blueprint.svg to same directory)
node scripts/dna-to-svg.js scripts/dna.json

# From stdin
cat dna.json | node scripts/dna-to-svg.js > design-blueprint.svg
```

### Blueprint JSON format

```json
{
  "frame": "Bento Grid",
  "shape": "Round Corners",
  "tone": "Bold Tech",
  "finish": "Clean Minimal",
  "radius": 12,
  "archetype": "Structured Signal",
  "palette": [
    { "name": "White", "hex": "#FFFFFF", "role": "Background" },
    { "name": "Ink", "hex": "#0D0D0D", "role": "Primary" },
    { "name": "Flame", "hex": "#FF4D00", "role": "Accent" },
    { "name": "Mist", "hex": "#F5F5F5", "role": "Surface" },
    { "name": "Slate", "hex": "#888888", "role": "Muted" }
  ],
  "blueprintVec": [0.9, 0.75, 0.7, 0.2, 0.65, 0.85]
}
```

### Browser export

The engine's done screen also has an **Export SVG** button that downloads `design-blueprint.svg` directly from your current design system state.
