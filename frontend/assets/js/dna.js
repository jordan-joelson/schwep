// DNA Reveal Page Logic

// Get results from localStorage (set by engine.js)
let results = {
  frame: '',
  shape: '',
  tone: '',
  finish: '',
  radius: 12
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Hide loading screen
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }, 800);

  // Load results from localStorage
  loadResults();
  
  // Save vision to archive
  saveVisionToArchive();
  
  // Update spec sheet
  updateSpecSheet();
  
  // Generate mockup
  generateMockup();
  
  // Setup buttons
  setupButtons();
});

function loadResults() {
  const savedResults = localStorage.getItem('schwep-results');
  if (savedResults) {
    try {
      results = JSON.parse(savedResults);
    } catch (e) {
      console.error('Error parsing results:', e);
    }
  }
  
  // Fallback to URL params if localStorage is empty
  if (!results.frame) {
    const params = new URLSearchParams(window.location.search);
    results.frame = params.get('frame') || 'Bento Grid';
    results.shape = params.get('shape') || 'Round Corners';
    results.tone = params.get('tone') || 'Bold Tech';
    results.finish = params.get('finish') || 'Clean Minimal';
    results.radius = parseInt(params.get('radius')) || 12;
  }
}

function updateSpecSheet() {
  document.getElementById('spec-frame').textContent = results.frame || '-';
  // Display shape with radius if available
  let shapeDisplay = results.shape || '-';
  if (results.radius && results.shape) {
    shapeDisplay = `${results.shape} (${results.radius}px)`;
  }
  document.getElementById('spec-shape').textContent = shapeDisplay;
  document.getElementById('spec-tone').textContent = results.tone || '-';
  document.getElementById('spec-finish').textContent = results.finish || '-';
  document.getElementById('spec-radius').textContent = results.radius ? `${results.radius}px` : '-';
}

function generateMockup() {
  const container = document.getElementById('mockup-container');
  if (!container) return;

  // Determine preview type based on frame selection
  let previewType = 'bento';
  if (results.frame) {
    const frameLower = results.frame.toLowerCase();
    if (frameLower.includes('split')) previewType = 'split';
    else if (frameLower.includes('swiss')) previewType = 'swiss';
    else if (frameLower.includes('editorial')) previewType = 'editorial';
    else previewType = 'bento';
  }

  // Generate preview HTML
  container.innerHTML = generatePreview(previewType, results.radius || 12);
}

function generatePreview(type, radius = 12) {
  const radiusValue = radius || 12;
  
  switch (type) {
    case 'bento':
      return `
        <div class="pv-bento" style="border-radius: ${radiusValue}px;">
          <div style="border-radius: ${radiusValue}px;"></div>
          <div style="border-radius: ${radiusValue}px;"></div>
          <div style="border-radius: ${radiusValue}px;"></div>
          <div style="border-radius: ${radiusValue}px;"></div>
        </div>
      `;
    
    case 'split':
      return `
        <div class="pv-split">
          <div class="sl" style="border-radius: ${radiusValue}px;"></div>
          <div class="sr">
            <div style="border-radius: ${radiusValue}px;"></div>
            <div style="border-radius: ${radiusValue}px;"></div>
          </div>
        </div>
      `;
    
    case 'swiss':
      return `
        <div class="pv-swiss">
          <div style="border-radius: ${radiusValue}px;"></div>
          <div style="border-radius: ${radiusValue}px;"></div>
          <div style="border-radius: ${radiusValue}px;"></div>
          <div style="border-radius: ${radiusValue}px;"></div>
          <div style="border-radius: ${radiusValue}px;"></div>
        </div>
      `;
    
    case 'editorial':
      return `
        <div class="pv-editorial">
          <div class="pe1" style="border-radius: ${radiusValue}px;"></div>
          <div class="pe2" style="border-radius: ${radiusValue}px;"></div>
          <div class="pe3" style="border-radius: ${radiusValue}px;"></div>
        </div>
      `;
    
    default:
      return `
        <div class="pv-bento" style="border-radius: ${radiusValue}px;">
          <div style="border-radius: ${radiusValue}px;"></div>
          <div style="border-radius: ${radiusValue}px;"></div>
          <div style="border-radius: ${radiusValue}px;"></div>
          <div style="border-radius: ${radiusValue}px;"></div>
        </div>
      `;
  }
}

function setupButtons() {
  const btnCopy = document.getElementById('btn-copy');
  const btnAgain = document.getElementById('btn-again');

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const dnaCode = generateDNACode();
      navigator.clipboard.writeText(dnaCode).then(() => {
        btnCopy.textContent = 'Copied!';
        setTimeout(() => {
          btnCopy.textContent = 'Copy DNA Code';
        }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = dnaCode;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btnCopy.textContent = 'Copied!';
        setTimeout(() => {
          btnCopy.textContent = 'Copy DNA Code';
        }, 2000);
      });
    });
  }

  if (btnAgain) {
    btnAgain.addEventListener('click', () => {
      localStorage.removeItem('schwep-results');
      window.location.href = 'engine.html';
    });
  }
}

function saveVisionToArchive() {
  // Only save if we have complete results
  if (!results.frame || !results.shape || !results.tone || !results.finish) {
    return;
  }

  // Get existing visions
  const savedVisions = JSON.parse(localStorage.getItem('schwep-visions') || '[]');
  
  // Create vision object
  const vision = {
    ...results,
    timestamp: new Date().toISOString(),
    id: Date.now().toString()
  };

  // Check if this vision already exists (same frame, shape, tone, finish, radius)
  const exists = savedVisions.some(v => 
    v.frame === vision.frame &&
    v.shape === vision.shape &&
    v.tone === vision.tone &&
    v.finish === vision.finish &&
    v.radius === vision.radius
  );

  // Only add if it doesn't exist
  if (!exists) {
    savedVisions.push(vision);
    localStorage.setItem('schwep-visions', JSON.stringify(savedVisions));
  }
}

function generateDNACode() {
  return JSON.stringify({
    frame: results.frame,
    shape: results.shape,
    tone: results.tone,
    finish: results.finish,
    radius: results.radius,
    timestamp: new Date().toISOString()
  }, null, 2);
}
