// ─────────────────────────────
// ENGINE — Swipe Deck Logic
// ─────────────────────────────

const ROUNDS = [
  {
    label: 'Round 01',
    title: 'The Frame',
    cards: [
      { name: 'Bento Grid', desc: 'A modular grid system with varied card sizes creating visual hierarchy.', preview: 'bento' },
      { name: 'Split Layout', desc: 'Asymmetric two-column layout with dominant and secondary sections.', preview: 'split' },
      { name: 'Swiss Grid', desc: 'Clean, structured grid with precise spacing and alignment.', preview: 'swiss' },
      { name: 'Editorial', desc: 'Magazine-style layout with large typography and white space.', preview: 'editorial' }
    ]
  },
  {
    label: 'Round 02',
    title: 'The Shape',
    cards: [
      { name: 'Sharp Corners', desc: 'Crisp, geometric edges with 0px border radius.', preview: 'sharp' },
      { name: 'Soft Corners', desc: 'Gentle curves with 8px border radius.', preview: 'soft' },
      { name: 'Round Corners', desc: 'Smooth, rounded edges with 12px border radius.', preview: 'round' },
      { name: 'Pill Shape', desc: 'Fully rounded corners with 24px+ border radius.', preview: 'pill' }
    ]
  },
  {
    label: 'Round 03',
    title: 'The Tone',
    cards: [
      { name: 'Bold Tech', desc: 'Strong, confident typography with high contrast.', preview: 'boldtech' },
      { name: 'Editorial Modern', desc: 'Elegant serif typography with refined spacing.', preview: 'edmod' },
      { name: 'Raw Mono', desc: 'Monospace typewriter aesthetic with raw energy.', preview: 'rawmono' },
      { name: 'Handwritten', desc: 'Playful, personal script with organic flow.', preview: 'hand' }
    ]
  },
  {
    label: 'Round 04',
    title: 'The Finish',
    cards: [
      { name: 'Grain Texture', desc: 'Subtle film grain overlay for vintage warmth.', preview: 'grain' },
      { name: 'Clean Minimal', desc: 'Pure, untextured surface with perfect clarity.', preview: 'clean' },
      { name: 'Gritty Edge', desc: 'Rough, textured finish with raw character.', preview: 'gritty' },
      { name: 'Neon Glow', desc: 'Vibrant neon effects with glowing highlights.', preview: 'neon' }
    ]
  }
];

let currentRound = 0;
let currentCardIndex = 0;
let results = { frame: '', shape: '', tone: '', finish: '' };
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let card = null;
let radiusValue = 12;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Hide loader after a short delay
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, 800);
  
  card = document.getElementById('card');
  setupCard();
  setupSwipeHandlers();
  setupButtons();
  setupShapeOverlay();
  updateRoundDisplay();
  // Initialize blimp position
  updateBlimpProgress();
  
  // Recalculate blimp position on window resize
  window.addEventListener('resize', () => {
    updateBlimpProgress();
  });
});

function setupCard() {
  const round = ROUNDS[currentRound];
  const cardData = round.cards[currentCardIndex];
  
  document.getElementById('card-name').textContent = cardData.name;
  document.getElementById('card-desc').textContent = cardData.desc;
  document.getElementById('card-vis').innerHTML = generatePreview(cardData.preview);
  
  // Reset card position
  card.style.transform = 'translate(0, 0) rotate(0deg)';
  card.style.opacity = '1';
  card.classList.remove('snapping', 'throwing', 'is-dragging');
  
  // Reset indicators to hidden
  const likeInd = document.querySelector('.ind-like');
  const nopeInd = document.querySelector('.ind-nope');
  if (likeInd) likeInd.style.opacity = '0';
  if (nopeInd) nopeInd.style.opacity = '0';
  
  // Reset drag state
  isDragging = false;
  currentX = 0;
  currentY = 0;
  
  // Show shape overlay only in Round 2
  const shapeOverlay = document.getElementById('shape-overlay');
  if (currentRound === 1) {
    shapeOverlay.classList.add('vis');
  } else {
    shapeOverlay.classList.remove('vis');
  }
}

function generatePreview(type) {
  const previews = {
    bento: `
      <div class="pv-bento">
        <div style="background: linear-gradient(135deg, rgba(255,77,0,0.15) 0%, rgba(255,144,232,0.1) 100%); border: 1px solid rgba(13,13,13,0.1);">
          <div style="width: 60%; height: 20px; background: rgba(13,13,13,0.3); border-radius: 3px; margin: 12px;"></div>
          <div style="width: 40%; height: 12px; background: rgba(13,13,13,0.2); border-radius: 2px; margin: 8px 12px;"></div>
        </div>
        <div style="background: rgba(13,13,13,0.08); border: 1px solid rgba(13,13,13,0.08);">
          <div style="width: 70%; height: 14px; background: rgba(13,13,13,0.25); border-radius: 2px; margin: 10px auto;"></div>
        </div>
        <div style="background: rgba(13,13,13,0.08); border: 1px solid rgba(13,13,13,0.08);">
          <div style="width: 50%; height: 10px; background: rgba(13,13,13,0.2); border-radius: 2px; margin: 8px auto;"></div>
        </div>
        <div style="background: rgba(255,77,0,0.1); border: 1px solid rgba(255,77,0,0.2);">
          <div style="width: 80%; height: 12px; background: rgba(255,77,0,0.4); border-radius: 2px; margin: 10px auto;"></div>
        </div>
      </div>
    `,
    split: `
      <div class="pv-split">
        <div class="sl" style="background: linear-gradient(135deg, rgba(255,77,0,0.2) 0%, rgba(255,77,0,0.05) 100%); border: 1px solid rgba(255,77,0,0.3); display: flex; flex-direction: column; justify-content: center; padding: 16px;">
          <div style="width: 80%; height: 24px; background: rgba(13,13,13,0.4); border-radius: 4px; margin-bottom: 12px;"></div>
          <div style="width: 60%; height: 16px; background: rgba(13,13,13,0.3); border-radius: 3px; margin-bottom: 8px;"></div>
          <div style="width: 70%; height: 14px; background: rgba(13,13,13,0.25); border-radius: 2px;"></div>
        </div>
        <div class="sr">
          <div style="background: rgba(13,13,13,0.1); border: 1px solid rgba(13,13,13,0.1); padding: 12px;">
            <div style="width: 90%; height: 12px; background: rgba(13,13,13,0.3); border-radius: 2px; margin-bottom: 8px;"></div>
            <div style="width: 75%; height: 10px; background: rgba(13,13,13,0.2); border-radius: 2px;"></div>
          </div>
          <div style="background: rgba(13,13,13,0.08); border: 1px solid rgba(13,13,13,0.08); padding: 12px;">
            <div style="width: 85%; height: 10px; background: rgba(13,13,13,0.25); border-radius: 2px; margin-bottom: 6px;"></div>
            <div style="width: 65%; height: 8px; background: rgba(13,13,13,0.2); border-radius: 2px;"></div>
          </div>
        </div>
      </div>
    `,
    swiss: `
      <div class="pv-swiss">
        <div style="width: 100%; height: 8px; background: rgba(13,13,13,0.4); border-radius: 4px;"></div>
        <div style="width: 55%; height: 8px; background: var(--orange); border-radius: 4px;"></div>
        <div style="width: 100%; height: 6px; background: rgba(13,13,13,0.3); border-radius: 3px;"></div>
        <div style="width: 70%; height: 6px; background: rgba(13,13,13,0.35); border-radius: 3px;"></div>
        <div style="width: 38%; height: 6px; background: rgba(13,13,13,0.25); border-radius: 3px;"></div>
        <div style="width: 100%; height: 4px; background: rgba(13,13,13,0.2); border-radius: 2px;"></div>
      </div>
    `,
    editorial: `
      <div class="pv-editorial">
        <div class="pe1" style="background: rgba(13,13,13,0.85); display: flex; align-items: center; padding: 0 16px;">
          <div style="width: 40%; height: 20px; background: rgba(255,255,255,0.3); border-radius: 3px;"></div>
        </div>
        <div class="pe2" style="background: var(--orange);"></div>
        <div class="pe3" style="background: rgba(13,13,13,0.05); padding: 16px; display: flex; flex-direction: column; gap: 8px;">
          <div style="width: 100%; height: 10px; background: rgba(13,13,13,0.15); border-radius: 2px;"></div>
          <div style="width: 95%; height: 10px; background: rgba(13,13,13,0.12); border-radius: 2px;"></div>
          <div style="width: 90%; height: 10px; background: rgba(13,13,13,0.1); border-radius: 2px;"></div>
        </div>
      </div>
    `,
    sharp: `<div class="pv-clean" style="border-radius: 0; background: rgba(255,255,255,0.95); border: 2px solid rgba(13,13,13,0.15); padding: 20px; display: flex; flex-direction: column; gap: 12px;"><div style="width: 100%; height: 16px; background: rgba(13,13,13,0.2); border-radius: 0;"></div><div style="width: 80%; height: 12px; background: rgba(13,13,13,0.15); border-radius: 0;"></div><div style="width: 60%; height: 10px; background: rgba(13,13,13,0.1); border-radius: 0;"></div></div>`,
    soft: `<div class="pv-clean" style="border-radius: 8px; background: rgba(255,255,255,0.95); border: 2px solid rgba(13,13,13,0.15); padding: 20px; display: flex; flex-direction: column; gap: 12px;"><div style="width: 100%; height: 16px; background: rgba(13,13,13,0.2); border-radius: 4px;"></div><div style="width: 80%; height: 12px; background: rgba(13,13,13,0.15); border-radius: 4px;"></div><div style="width: 60%; height: 10px; background: rgba(13,13,13,0.1); border-radius: 4px;"></div></div>`,
    round: `<div class="pv-clean" style="border-radius: 12px; background: rgba(255,255,255,0.95); border: 2px solid rgba(13,13,13,0.15); padding: 20px; display: flex; flex-direction: column; gap: 12px;"><div style="width: 100%; height: 16px; background: rgba(13,13,13,0.2); border-radius: 6px;"></div><div style="width: 80%; height: 12px; background: rgba(13,13,13,0.15); border-radius: 6px;"></div><div style="width: 60%; height: 10px; background: rgba(13,13,13,0.1); border-radius: 6px;"></div></div>`,
    pill: `<div class="pv-clean" style="border-radius: 24px; background: rgba(255,255,255,0.95); border: 2px solid rgba(13,13,13,0.15); padding: 20px; display: flex; flex-direction: column; gap: 12px;"><div style="width: 100%; height: 16px; background: rgba(13,13,13,0.2); border-radius: 12px;"></div><div style="width: 80%; height: 12px; background: rgba(13,13,13,0.15); border-radius: 12px;"></div><div style="width: 60%; height: 10px; background: rgba(13,13,13,0.1); border-radius: 12px;"></div></div>`,
    boldtech: `<div class="pv-boldtech" style="display: flex; align-items: center; justify-content: center; height: 100%; background: rgba(13,13,13,0.05); border-radius: 8px; padding: 20px;">BOLD</div>`,
    edmod: `<div class="pv-edmod" style="display: flex; align-items: center; justify-content: center; height: 100%; background: rgba(255,255,255,0.6); border-radius: 8px; padding: 20px; border: 1px solid rgba(13,13,13,0.1);">Elegant</div>`,
    rawmono: `<div class="pv-rawmono" style="display: flex; align-items: center; justify-content: center; height: 100%; background: rgba(13,13,13,0.9); color: rgba(255,255,255,0.9); border-radius: 8px; padding: 20px; font-family: 'Courier New', monospace;">MONO<br>SPACE</div>`,
    hand: `<div class="pv-hand" style="display: flex; align-items: center; justify-content: center; height: 100%; background: rgba(255,77,0,0.08); border-radius: 8px; padding: 20px;">hand</div>`,
    grain: `<div class="pv-grain" style="background: rgba(255,255,255,0.9); position: relative; overflow: hidden;"><div style="position: absolute; inset: 0; background: repeating-linear-gradient(45deg, rgba(13,13,13,0.03) 0, rgba(13,13,13,0.03) 1px, transparent 1px, transparent 8px);"></div><div style="position: relative; z-index: 1; padding: 20px; display: flex; flex-direction: column; gap: 10px; height: 100%;"><div style="width: 70%; height: 14px; background: rgba(13,13,13,0.2); border-radius: 2px;"></div><div style="width: 85%; height: 12px; background: rgba(13,13,13,0.15); border-radius: 2px;"></div></div></div>`,
    clean: `<div class="pv-clean" style="background: rgba(255,255,255,0.98); border: 1px solid rgba(13,13,13,0.08); padding: 20px; display: flex; flex-direction: column; gap: 12px;"><div style="width: 100%; height: 16px; background: rgba(13,13,13,0.15); border-radius: 4px;"></div><div style="width: 85%; height: 12px; background: rgba(13,13,13,0.12); border-radius: 3px;"></div><div style="width: 70%; height: 10px; background: rgba(13,13,13,0.1); border-radius: 2px;"></div></div>`,
    gritty: `
      <div class="pv-gritty" style="background: rgba(13,13,13,0.95); padding: 20px;">
        <div style="width: 80%; height: 4px; background: rgba(255,255,255,0.4); border-radius: 2px; margin-bottom: 8px;"></div>
        <div style="width: 100%; height: 3px; background: rgba(255,255,255,0.3); border-radius: 2px; margin-bottom: 8px;"></div>
        <div style="width: 60%; height: 4px; background: rgba(255,255,255,0.35); border-radius: 2px; margin-bottom: 8px;"></div>
        <div style="width: 90%; height: 3px; background: rgba(255,255,255,0.25); border-radius: 2px; margin-bottom: 8px;"></div>
        <div style="width: 75%; height: 3px; background: rgba(255,255,255,0.3); border-radius: 2px;"></div>
      </div>
    `,
    neon: `<div class="pv-neon" style="background: rgba(4,4,20,0.95); border: 1px solid rgba(61,255,208,0.3); box-shadow: 0 0 20px rgba(61,255,208,0.2), inset 0 0 20px rgba(61,255,208,0.1);">NEON</div>`
  };
  return previews[type] || '<div class="pv-clean"><div></div></div>';
}

function setupSwipeHandlers() {
  // Mouse events
  card.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', endDrag);
  
  // Touch events
  card.addEventListener('touchstart', startDragTouch);
  document.addEventListener('touchmove', dragTouch);
  document.addEventListener('touchend', endDrag);
}

function startDrag(e) {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  card.classList.add('is-dragging');
  e.preventDefault();
}

function startDragTouch(e) {
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  card.classList.add('is-dragging');
  e.preventDefault();
}

function drag(e) {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  updateCardTransform();
}

function dragTouch(e) {
  if (!isDragging) return;
  currentX = e.touches[0].clientX - startX;
  currentY = e.touches[0].clientY - startY;
  updateCardTransform();
  e.preventDefault();
}

function updateCardTransform() {
  if (!isDragging) return;
  
  const rotate = currentX * 0.1;
  const likeOpacity = currentX > 0 ? Math.min(currentX / 100, 1) : 0;
  const nopeOpacity = currentX < 0 ? Math.min(Math.abs(currentX) / 100, 1) : 0;
  
  card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`;
  
  const likeInd = document.querySelector('.ind-like');
  const nopeInd = document.querySelector('.ind-nope');
  if (likeInd) likeInd.style.opacity = likeOpacity;
  if (nopeInd) nopeInd.style.opacity = nopeOpacity;
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  card.classList.remove('is-dragging');
  
  const threshold = 100;
  if (Math.abs(currentX) > threshold) {
    if (currentX > 0) {
      handleLike();
    } else {
      handleNope();
    }
  } else {
    snapBack();
  }
}

function snapBack() {
  card.classList.add('snapping');
  card.style.transform = 'translate(0, 0) rotate(0deg)';
  card.style.opacity = '1';
  document.querySelector('.ind-like').style.opacity = '0';
  document.querySelector('.ind-nope').style.opacity = '0';
  currentX = 0;
  currentY = 0;
  
  setTimeout(() => {
    card.classList.remove('snapping');
  }, 420);
}

function handleLike() {
  flash('green');
  saveResult();
  updateBlimpProgress(); // Update blimp position when card is liked
  nextCard();
}

function handleNope() {
  flash('red');
  nextCard();
}

function flash(color = 'orange') {
  const flashEl = document.getElementById('flash');
  // Remove any existing color classes
  flashEl.classList.remove('flash-green', 'flash-red', 'flash-orange');
  // Add the appropriate color class
  flashEl.classList.add(`flash-${color}`);
  flashEl.classList.add('on');
  setTimeout(() => {
    flashEl.classList.remove('on');
    flashEl.classList.remove(`flash-${color}`);
  }, 100);
}

function saveResult() {
  const round = ROUNDS[currentRound];
  const cardData = round.cards[currentCardIndex];
  
  if (currentRound === 0) results.frame = cardData.name;
  else if (currentRound === 1) {
    results.shape = cardData.name;
    results.radius = radiusValue;
  }
  else if (currentRound === 2) results.tone = cardData.name;
  else if (currentRound === 3) results.finish = cardData.name;
  
  // Save to localStorage
  localStorage.setItem('schwep-results', JSON.stringify(results));
}

function nextCard() {
  currentCardIndex++;
  const round = ROUNDS[currentRound];
  
  if (currentCardIndex >= round.cards.length) {
    // Round complete - blimp should be at the exact node
    currentRound++;
    currentCardIndex = 0;
    
    // Update blimp to exact node position after round increment
    updateBlimpProgress();
    
    if (currentRound >= ROUNDS.length) {
      // All rounds complete
      showFinale();
      return;
    }
    
    updateRoundDisplay();
  } else {
    // Update blimp progress during round
    updateBlimpProgress();
  }
  
  setTimeout(() => {
    setupCard();
  }, 100);
}

function updateBlimp() {
  updateBlimpProgress();
}

function updateBlimpProgress() {
  const blimp = document.getElementById('blimp');
  const trackWrap = document.querySelector('.track-wrap');
  const stops = document.querySelectorAll('.tstop');
  const totalRounds = ROUNDS.length;
  
  if (!trackWrap || stops.length === 0) return;
  
  // Calculate progress: completed rounds + progress within current round
  const segmentSize = 100 / totalRounds; // 25% per round
  
  // Base progress from completed rounds (0%, 25%, 50%, 75%)
  const baseProgress = (currentRound / totalRounds) * 100;
  
  // Progress within current round (based on cards liked)
  let roundProgress = 0;
  if (currentRound < totalRounds) {
    const round = ROUNDS[currentRound];
    const totalCards = round.cards.length;
    
    if (currentCardIndex > 0 && currentCardIndex <= totalCards) {
      // Cards liked so far in this round
      const cardsLiked = currentCardIndex;
      
      // First card liked = 1/3 of segment, then continue proportionally
      if (cardsLiked === 1) {
        roundProgress = segmentSize / 3; // 1/3 of way to next node
      } else {
        // Continue from 1/3, then move proportionally for remaining cards
        const remainingProgress = (segmentSize * 2 / 3); // Remaining 2/3 of segment
        const progressRatio = (cardsLiked - 1) / (totalCards - 1);
        roundProgress = (segmentSize / 3) + (remainingProgress * progressRatio);
      }
    }
  }
  
  // Total progress percentage (0-100%)
  const totalProgressPercent = baseProgress + roundProgress;
  
  // Get track-wrap width
  const wrapWidth = trackWrap.offsetWidth;
  
  // Line starts at center of first node (4.5px) and ends at center of last node (width - 4.5px)
  const lineStart = 4.5;
  const lineEnd = wrapWidth - 4.5;
  const lineLength = lineEnd - lineStart;
  
  // Calculate position on the line (0% = lineStart, 100% = lineEnd)
  const positionOnLine = lineStart + (totalProgressPercent / 100) * lineLength;
  
  // Set blimp position in pixels (centered on the blimp via translateX(-50%))
  blimp.style.left = `${positionOnLine}px`;
  
  // Light up completed stops
  stops.forEach((stop, i) => {
    if (i < currentRound) {
      // Completed rounds are lit
      stop.classList.add('lit');
    } else if (i === currentRound && currentCardIndex > 0) {
      // Light up current stop if we've liked at least one card
      stop.classList.add('lit');
    } else {
      stop.classList.remove('lit');
    }
  });
}

function updateRoundDisplay() {
  const round = ROUNDS[currentRound];
  document.getElementById('round-label').textContent = round.label;
  document.getElementById('round-title').textContent = round.title;
  document.getElementById('round-num').textContent = currentRound + 1;
  updateBlimp();
}

function setupButtons() {
  document.getElementById('btn-like').addEventListener('click', handleLike);
  document.getElementById('btn-nope').addEventListener('click', handleNope);
  document.getElementById('btn-copy').addEventListener('click', copyDNA);
  document.getElementById('btn-again').addEventListener('click', reset);
}

function setupShapeOverlay() {
  const slider = document.getElementById('radius-slider');
  const pills = document.querySelectorAll('.sp-pill');
  
  slider.addEventListener('input', (e) => {
    radiusValue = parseInt(e.target.value);
    document.getElementById('radius-val').textContent = `${radiusValue}px`;
    updateRadiusPreview();
  });
  
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('on'));
      pill.classList.add('on');
      const r = parseInt(pill.dataset.r);
      radiusValue = r;
      slider.value = r;
      document.getElementById('radius-val').textContent = `${r}px`;
      updateRadiusPreview();
    });
  });
}

function updateRadiusPreview() {
  const preview = document.querySelector('.scard-vis .pv-clean');
  if (preview) {
    preview.style.borderRadius = `${radiusValue}px`;
  }
}

function showFinale() {
  // Save final results to localStorage
  localStorage.setItem('schwep-results', JSON.stringify(results));
  
  // Redirect to DNA reveal page
  setTimeout(() => {
    window.location.href = 'dna.html';
  }, 500);
}

function copyDNA() {
  const dna = JSON.stringify(results, null, 2);
  navigator.clipboard.writeText(dna).then(() => {
    const btn = document.getElementById('btn-copy');
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.textContent = original;
    }, 2000);
  });
}

function reset() {
  currentRound = 0;
  currentCardIndex = 0;
  results = { frame: '', shape: '', tone: '', finish: '' };
  radiusValue = 12;
  
  document.getElementById('finale').classList.remove('on');
  document.getElementById('radius-slider').value = 12;
  document.getElementById('radius-val').textContent = '12px';
  document.querySelectorAll('.sp-pill').forEach((p, i) => {
    p.classList.toggle('on', i === 2);
  });
  
  updateRoundDisplay();
  setupCard();
}
