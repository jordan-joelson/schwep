// Archive Page Logic

// Component Library - UI Components
const COMPONENT_LIBRARY = [
  { name: 'Accordion', aliases: 'Arrow toggle, Collapse, Collapsible sections, Collapsible, Details, Disclosure, Expandable, Expander, ShowyHideyThing', category: 'content', description: 'A vertical stack of interactive headings used to toggle the display of further information; each item can be collapsed with just a short label visible or expanded to show the full content.' },
  { name: 'Alert', aliases: 'Notification, Feedback, Message, Banner, Callout', category: 'feedback', description: 'A way of informing the user of important changes in a prominent way.' },
  { name: 'Avatar', category: 'content', description: 'A graphical representation of a user: usually a photo, illustration, or initial.' },
  { name: 'Badge', aliases: 'Tag, Label, Chip', category: 'content', description: 'A small label, generally appearing inside or in close proximity to another larger interface component, representing a status, property, or some other metadata.' },
  { name: 'Breadcrumbs', aliases: 'Breadcrumb trail', category: 'navigation', description: 'A list of links showing the location of the current page in the navigational hierarchy.' },
  { name: 'Button', category: 'form', description: 'Buttons trigger an action such as submitting a form or showing/hiding an interface component.' },
  { name: 'Button group', aliases: 'Toolbar', category: 'form', description: 'A wrapper for multiple, related buttons.' },
  { name: 'Card', aliases: 'Tile', category: 'layout', description: 'A container for content representing a single entity. e.g. a contact, article, or task.' },
  { name: 'Carousel', aliases: 'Content slider', category: 'content', description: 'A means of displaying multiple slides of content, one or more at a time. Navigation between slides can be controlled via swiping, scrolling, or buttons.' },
  { name: 'Checkbox', category: 'form', description: 'An input for choosing from predefined options: when used alone, it gives a binary choice (checked/unchecked); in a group it allows the user to select multiple values from a list of options.' },
  { name: 'Color picker', category: 'form', description: 'An input for choosing a color.' },
  { name: 'Combobox', aliases: 'Autocomplete, Autosuggest', category: 'form', description: 'An input that behaves similarly to a select, with the addition of a free text input to filter options.' },
  { name: 'Date input', category: 'form', description: 'A means of inputting a date – often separated into multiple individual fields for day/month/year.' },
  { name: 'Datepicker', aliases: 'Calendar, Datetime picker', category: 'form', description: 'A visual way to choose a date using a calendar view.' },
  { name: 'Drawer', aliases: 'Tray, Flyout, Sheet', category: 'layout', description: 'A panel which slides out from the edge of the screen.' },
  { name: 'Dropdown menu', aliases: 'Select menu', category: 'navigation', description: 'A menu in which options are hidden by default but can be shown by interacting with a button; it differs from a select in that it shows actions or navigation options and is not a form input.' },
  { name: 'Empty state', category: 'content', description: 'An indication to the user that there is no data to display in the current view; it often includes an alternative action (e.g. try a different search term).' },
  { name: 'Fieldset', category: 'form', description: 'A wrapper for related form fields.' },
  { name: 'File', aliases: 'Attachment, Download', category: 'content', description: 'A representation of a file such as an uploaded attachment or a downloadable PDF.' },
  { name: 'File upload', aliases: 'File input, File uploader, Dropzone', category: 'form', description: 'An input which allows users to upload a file from their device.' },
  { name: 'Footer', category: 'layout', description: 'Commonly appearing at the bottom of a page or section, a footer is used to display copyright and legal information or links to related content.' },
  { name: 'Form', category: 'form', description: 'A grouping of input controls that allow a user to submit information to a server.' },
  { name: 'Header', category: 'layout', description: 'An element that appears across the top of all pages on a website or application; it usually contains the site name and main navigation.' },
  { name: 'Heading', category: 'content', description: 'A title or caption used to introduce a new section.' },
  { name: 'Hero', aliases: 'Jumbotron, Banner', category: 'layout', description: 'A large banner, usually appearing as one of the first items on a page; it often contains a full-width image.' },
  { name: 'Icon', category: 'content', description: 'An icon is a graphic symbol designed to visually indicate the purpose of an interface element.' },
  { name: 'Image', aliases: 'Picture', category: 'content', description: 'An element for embedding images.' },
  { name: 'Label', aliases: 'Form label', category: 'form', description: 'A text label for form inputs.' },
  { name: 'Link', aliases: 'Anchor, Hyperlink', category: 'navigation', description: 'A link is a reference to a resource. This can be external (e.g. a different web page) or internal (e.g. a specific element in the current document).' },
  { name: 'List', category: 'content', description: 'Lists are used for grouping a collection of related items. In HTML there are three types: unordered list, ordered list, and description list.' },
  { name: 'Modal', aliases: 'Dialog, Popup, Modal window', category: 'feedback', description: 'A modal is an interface element that appears over other content. It requires an interaction from the user before they can return to whatever is underneath.' },
  { name: 'Navigation', aliases: 'Nav, Menu', category: 'navigation', description: 'A container for navigation links; these can be to other pages (e.g. main site navigation) or to elements within the current page (e.g. a table of contents).' },
  { name: 'Pagination', category: 'navigation', description: 'Pagination is the process of splitting information over multiple pages instead of showing it all on a single page; also the name for the interface component used for navigating between these pages.' },
  { name: 'Popover', category: 'feedback', description: 'An element that pops up from another element over other content; it differs from a tooltip in that it is usually triggered via click instead of hover and can contain interactive elements.' },
  { name: 'Progress bar', aliases: 'Progress', category: 'feedback', description: 'A horizontal bar indicating the current completion status of a long-running task, usually updated continuously as the task progresses, instead of in discrete steps.' },
  { name: 'Progress indicator', aliases: 'Progress tracker, Stepper, Steps, Timeline, Meter', category: 'feedback', description: 'A representation of a user\'s progress through a series of discrete steps.' },
  { name: 'Quote', aliases: 'Pull quote, Block quote', category: 'content', description: 'Quotes are used to display a quotation: either from a person or another outside source or to highlight a passage of the current document (a pull quote).' },
  { name: 'Radio button', aliases: 'Radio, Radio group', category: 'form', description: 'Radio buttons allow a user to select a single option from a list of predefined options.' },
  { name: 'Rating', category: 'form', description: 'Ratings let users see and/or set a star rating for a product or other item.' },
  { name: 'Rich text editor', aliases: 'RTE, wysiwyg editor', category: 'form', description: 'An interface for editing "rich text" content (i.e. with formatting), usually through a WYSIWYG interface.' },
  { name: 'Search input', aliases: 'Search', category: 'form', description: 'Search inputs allow users to find content by entering a search term.' },
  { name: 'Segmented control', aliases: 'Toggle button group', category: 'form', description: 'A hybrid somewhere between a button group, radio buttons, and tabs; segmented controls are used to switch between different options or views.' },
  { name: 'Select', aliases: 'Dropdown, Select input', category: 'form', description: 'A form input used for selecting a value: when collapsed it shows the currently selected option and when expanded, it shows a scrollable list of predefined options for the user to choose from.' },
  { name: 'Separator', aliases: 'Divider, Horizonal rule, Vertical rule', category: 'layout', description: 'A separator between two elements, usually consisting of a horizontal line.' },
  { name: 'Skeleton', aliases: 'Skeleton loader', category: 'feedback', description: 'A placeholder layout for content which hasn\'t yet loaded, usually built up of grey boxes.' },
  { name: 'Skip link', category: 'navigation', description: 'Links within a page for skipping to another section, primarily for users who navigate using a keyboard.' },
  { name: 'Slider', aliases: 'Range input', category: 'form', description: 'A form control for choosing a value within a preset range of values.' },
  { name: 'Spinner', aliases: 'Loader, Loading', category: 'feedback', description: 'A visual indicator that a process is happening in the background but the interface is not yet ready for interaction.' },
  { name: 'Stack', category: 'layout', description: 'A wrapper component for adding a consistent margin between components.' },
  { name: 'Stepper', aliases: 'Nudger, Quantity, Counter', category: 'form', description: 'A control for editing a numeric value with buttons for decrementing / incrementing.' },
  { name: 'Table', category: 'content', description: 'A component for displaying large amounts of data in rows and columns; commonly referred to as a \'Data Table\' when it includes sorting and/ or filtering functionality.' },
  { name: 'Tabs', aliases: 'Tabbed interface', category: 'navigation', description: 'Tabbed interfaces are a way of navigating between multiple panels, reducing clutter and fitting more into a smaller space.' },
  { name: 'Text input', category: 'form', description: 'A form control that accepts a single line of text.' },
  { name: 'Textarea', aliases: 'Textbox, Text box', category: 'form', description: 'A form control for editing multi-line text.' },
  { name: 'Toast', aliases: 'Snackbar', category: 'feedback', description: 'A type of alert which appears in a layer above other content, visually similar to a mobile or desktop push notification.' },
  { name: 'Toggle', aliases: 'Switch, Lightswitch, Toggle button', category: 'form', description: 'A control used to switch between two states: often on or off.' },
  { name: 'Tooltip', aliases: 'Toggletip', category: 'feedback', description: 'A means of displaying a description or extra information about an element, usually on hover, but can also be on click or tap.' },
  { name: 'Tree view', category: 'content', description: 'A component for displaying nested hierarchical information, such as a table of contents or directory structure.' },
  { name: 'Video', aliases: 'Video player', category: 'content', description: 'Video players are used for displaying video content; they often include controls to control playback.' },
  { name: 'Visually hidden', category: 'content', description: 'A utility for hiding content visually while keeping it accessible to screen readers and other assistive technologies.' }
];

// Design Dictionary - Terms and definitions
const DESIGN_DICTIONARY = {
  'Bento Grid': {
    category: 'Layout',
    definition: 'A modular grid system inspired by Japanese bento boxes, featuring varied card sizes that create visual hierarchy and balance.'
  },
  'Split Layout': {
    category: 'Layout',
    definition: 'An asymmetric two-column layout with a dominant primary section and a secondary supporting section, creating dynamic visual flow.'
  },
  'Swiss Grid': {
    category: 'Layout',
    definition: 'A clean, structured grid system with precise spacing and alignment, inspired by Swiss design principles of clarity and order.'
  },
  'Editorial': {
    category: 'Layout',
    definition: 'A magazine-style layout characterized by large typography, generous white space, and editorial composition techniques.'
  },
  'Sharp Corners': {
    category: 'Shape',
    definition: 'Crisp, geometric edges with 0px border radius, creating a modern, technical aesthetic with precise angles.'
  },
  'Soft Corners': {
    category: 'Shape',
    definition: 'Gentle curves with 8px border radius, providing subtle softening while maintaining a structured appearance.'
  },
  'Round Corners': {
    category: 'Shape',
    definition: 'Smooth, rounded edges with 12px border radius, balancing structure with approachability and modern design sensibilities.'
  },
  'Pill Shape': {
    category: 'Shape',
    definition: 'Fully rounded corners with 24px+ border radius, creating pill-shaped elements that feel friendly and approachable.'
  },
  'Bold Tech': {
    category: 'Tone',
    definition: 'Strong, confident typography with high contrast, conveying authority and technological sophistication.'
  },
  'Editorial Modern': {
    category: 'Tone',
    definition: 'Elegant serif typography with refined spacing, evoking sophistication and editorial elegance.'
  },
  'Raw Mono': {
    category: 'Tone',
    definition: 'Monospace typewriter aesthetic with raw energy, suggesting technical precision and unfiltered authenticity.'
  },
  'Handwritten': {
    category: 'Tone',
    definition: 'Playful, personal script with organic flow, adding human warmth and personality to digital interfaces.'
  },
  'Grain Texture': {
    category: 'Finish',
    definition: 'Subtle film grain overlay that adds vintage warmth and tactile depth to digital surfaces.'
  },
  'Clean Minimal': {
    category: 'Finish',
    definition: 'Pure, untextured surface with perfect clarity, emphasizing content over decoration.'
  },
  'Gritty Edge': {
    category: 'Finish',
    definition: 'Rough, textured finish with raw character, suggesting authenticity and unpolished creativity.'
  },
  'Neon Glow': {
    category: 'Finish',
    definition: 'Vibrant neon effects with glowing highlights, creating high-energy, futuristic visual impact.'
  }
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

  // Load and display visions
  loadVisions();
  
  // Load and display dictionary
  loadDictionary();
  
  // Load and display component library
  loadComponentLibrary();
  
  // Setup filter buttons
  setupLibraryFilters();
});

function loadVisions() {
  const savedVisions = JSON.parse(localStorage.getItem('schwep-visions') || '[]');
  const galleryGrid = document.getElementById('gallery-grid');
  const emptyState = document.getElementById('empty-state');

  if (savedVisions.length === 0) {
    galleryGrid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  galleryGrid.style.display = 'grid';
  galleryGrid.innerHTML = '';

  // Sort by date (newest first)
  savedVisions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  savedVisions.forEach((vision, index) => {
    const card = createVisionCard(vision, index);
    galleryGrid.appendChild(card);
  });
}

function createVisionCard(vision, index) {
  const card = document.createElement('div');
  card.className = 'vision-card';
  card.dataset.index = index;

  // Generate preview based on frame
  const previewType = getPreviewType(vision.frame);
  // Handle radius as number or string like "12px"
  let radius = 12;
  if (vision.radius) {
    if (typeof vision.radius === 'string' && vision.radius.includes('px')) {
      radius = parseInt(vision.radius.replace('px', '')) || 12;
    } else {
      radius = parseInt(vision.radius) || 12;
    }
  }

  // Apply background and styling based on finish
  const bgStyle = getFinishStyle(vision.finish);

  card.innerHTML = `
    <div class="vision-preview" style="${bgStyle}">
      <div class="vision-preview-content">
        ${generatePreview(previewType, radius)}
      </div>
    </div>
    <div class="vision-info">
      <div class="vision-name">${vision.frame || 'Untitled Vision'}</div>
      <div class="vision-specs">
        ${vision.frame ? `<span class="vision-spec">${vision.frame}</span>` : ''}
        ${vision.shape ? `<span class="vision-spec">${vision.shape}</span>` : ''}
        ${vision.tone ? `<span class="vision-spec">${vision.tone}</span>` : ''}
        ${vision.finish ? `<span class="vision-spec">${vision.finish}</span>` : ''}
      </div>
      <div class="vision-date">${formatDate(vision.timestamp)}</div>
      <div class="vision-actions">
        <button class="vision-btn" onclick="viewVision(${index})">View</button>
        <button class="vision-btn" onclick="copyVision(${index})">Copy</button>
        <button class="vision-btn delete" onclick="deleteVision(${index})">Delete</button>
      </div>
    </div>
  `;

  // Add click handler to view vision
  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('vision-btn')) {
      viewVision(index);
    }
  });

  return card;
}

function getPreviewType(frame) {
  if (!frame) return 'bento';
  const frameLower = frame.toLowerCase();
  if (frameLower.includes('split')) return 'split';
  if (frameLower.includes('swiss')) return 'swiss';
  if (frameLower.includes('editorial')) return 'editorial';
  return 'bento';
}

function getFinishStyle(finish) {
  const styles = {
    'Grain Texture': 'background: repeating-linear-gradient(45deg, rgba(13,13,13,.18) 0, rgba(13,13,13,.18) 1px, transparent 1px, transparent 5px);',
    'Clean Minimal': 'background: rgba(245, 245, 245, .8);',
    'Gritty Edge': 'background: rgba(13, 13, 13, .85);',
    'Neon Glow': 'background: rgba(4, 4, 26, .9);'
  };
  return styles[finish] || 'background: rgba(255, 255, 255, .1);';
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

function formatDate(timestamp) {
  if (!timestamp) return 'Unknown date';
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function viewVision(index) {
  const savedVisions = JSON.parse(localStorage.getItem('schwep-visions') || '[]');
  if (savedVisions[index]) {
    // Save to current results and redirect to DNA page
    localStorage.setItem('schwep-results', JSON.stringify(savedVisions[index]));
    window.location.href = 'dna.html';
  }
}

function copyVision(index) {
  const savedVisions = JSON.parse(localStorage.getItem('schwep-visions') || '[]');
  if (savedVisions[index]) {
    const dnaCode = JSON.stringify(savedVisions[index], null, 2);
    navigator.clipboard.writeText(dnaCode).then(() => {
      showToast('Vision copied to clipboard!');
    }).catch(() => {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = dnaCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('Vision copied to clipboard!');
    });
  }
}

function deleteVision(index) {
  if (!confirm('Are you sure you want to delete this vision?')) return;
  
  const savedVisions = JSON.parse(localStorage.getItem('schwep-visions') || '[]');
  savedVisions.splice(index, 1);
  localStorage.setItem('schwep-visions', JSON.stringify(savedVisions));
  
  // Reload visions
  loadVisions();
  showToast('Vision deleted');
}

function loadDictionary() {
  const savedVisions = JSON.parse(localStorage.getItem('schwep-visions') || '[]');
  const dictionaryGrid = document.getElementById('dictionary-grid');
  
  // Collect all unique terms from saved visions
  const learnedTerms = new Set();
  
  savedVisions.forEach(vision => {
    if (vision.frame) learnedTerms.add(vision.frame);
    if (vision.shape) learnedTerms.add(vision.shape);
    if (vision.tone) learnedTerms.add(vision.tone);
    if (vision.finish) learnedTerms.add(vision.finish);
  });

  // If no visions, show all terms as "available to learn"
  if (learnedTerms.size === 0) {
    Object.keys(DESIGN_DICTIONARY).forEach(term => {
      learnedTerms.add(term);
    });
  }

  dictionaryGrid.innerHTML = '';

  // Sort terms by category
  const termsByCategory = {};
  Array.from(learnedTerms).forEach(term => {
    const termData = DESIGN_DICTIONARY[term];
    if (termData) {
      if (!termsByCategory[termData.category]) {
        termsByCategory[termData.category] = [];
      }
      termsByCategory[termData.category].push({ name: term, ...termData });
    }
  });

  // Display terms grouped by category
  Object.keys(termsByCategory).sort().forEach(category => {
    termsByCategory[category].forEach(term => {
      const termCard = createTermCard(term);
      dictionaryGrid.appendChild(termCard);
    });
  });
}

function createTermCard(term) {
  const card = document.createElement('div');
  card.className = 'dictionary-term';
  
  card.innerHTML = `
    <div class="term-category">${term.category}</div>
    <div class="term-name">${term.name}</div>
    <div class="term-definition">${term.definition}</div>
  `;

  return card;
}

function showToast(message) {
  // Create a simple toast notification
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--black);
    color: white;
    padding: 12px 24px;
    border-radius: 100px;
    font-size: .85rem;
    font-weight: 700;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(13, 13, 13, .3);
    animation: toastSlide 0.3s ease-out;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastSlide 0.3s ease-out reverse';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
}

// Add CSS animation for toast
const style = document.createElement('style');
style.textContent = `
  @keyframes toastSlide {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Component Library Functions
let currentFilter = 'all';

function loadComponentLibrary(filter = 'all') {
  const libraryGrid = document.getElementById('library-grid');
  if (!libraryGrid) return;
  
  currentFilter = filter;
  libraryGrid.innerHTML = '';
  
  // Filter components
  const filteredComponents = filter === 'all' 
    ? COMPONENT_LIBRARY 
    : COMPONENT_LIBRARY.filter(comp => comp.category === filter);
  
  // Sort alphabetically
  filteredComponents.sort((a, b) => a.name.localeCompare(b.name));
  
  // Create component cards
  filteredComponents.forEach(component => {
    const card = createComponentCard(component);
    libraryGrid.appendChild(card);
  });
}

function createComponentCard(component) {
  const card = document.createElement('div');
  card.className = 'library-component';
  card.dataset.category = component.category;
  
  const categoryLabels = {
    form: 'Form',
    navigation: 'Navigation',
    feedback: 'Feedback',
    layout: 'Layout',
    content: 'Content'
  };
  
  // Generate example HTML based on component name
  const exampleHTML = generateComponentExample(component.name);
  
  card.innerHTML = `
    <div class="component-header">
      <div class="component-name">${component.name}</div>
      <div class="component-category">${categoryLabels[component.category] || component.category}</div>
    </div>
    ${exampleHTML ? `<div class="component-example">${exampleHTML}</div>` : ''}
    <div class="component-description">${component.description}</div>
    ${component.aliases ? `<div class="component-aliases">Also known as: <em>${component.aliases}</em></div>` : ''}
  `;
  
  return card;
}

function generateComponentExample(componentName) {
  const examples = {
    'Accordion': '<div class="ex-accordion"><div class="ex-accordion-item"><div class="ex-accordion-header">Section 1 ▼</div></div><div class="ex-accordion-item"><div class="ex-accordion-header">Section 2 ▶</div></div></div>',
    'Alert': '<div class="ex-alert">Important message here</div>',
    'Avatar': '<div class="ex-avatar-group"><div class="ex-avatar">JD</div><div class="ex-avatar">AB</div><div class="ex-avatar">SM</div></div>',
    'Badge': '<div class="ex-badge-group"><span class="ex-badge">New</span><span class="ex-badge">Active</span><span class="ex-badge">3</span></div>',
    'Breadcrumbs': '<div class="ex-breadcrumbs">Home > Products > Category</div>',
    'Button': '<div class="ex-button-group"><button class="ex-btn">Primary</button><button class="ex-btn ex-btn-secondary">Secondary</button></div>',
    'Button group': '<div class="ex-btn-group"><button class="ex-btn-small">Left</button><button class="ex-btn-small">Center</button><button class="ex-btn-small">Right</button></div>',
    'Card': '<div class="ex-card"><div class="ex-card-header">Title</div><div class="ex-card-body">Content here</div></div>',
    'Carousel': '<div class="ex-carousel"><div class="ex-carousel-dot active"></div><div class="ex-carousel-dot"></div><div class="ex-carousel-dot"></div></div>',
    'Checkbox': '<div class="ex-checkbox-group"><label class="ex-checkbox"><input type="checkbox" checked> Option 1</label><label class="ex-checkbox"><input type="checkbox"> Option 2</label></div>',
    'Color picker': '<div class="ex-color-picker"><div class="ex-color" style="background: #FF4D00;"></div><div class="ex-color" style="background: #00D46A;"></div><div class="ex-color" style="background: #FF90E8;"></div></div>',
    'Combobox': '<div class="ex-combobox"><input type="text" placeholder="Search..." class="ex-input"><div class="ex-dropdown">Option 1</div></div>',
    'Date input': '<div class="ex-date-input"><input type="date" class="ex-input" value="2024-01-15"></div>',
    'Datepicker': '<div class="ex-datepicker"><div class="ex-calendar-grid"><div class="ex-cal-day">1</div><div class="ex-cal-day">2</div><div class="ex-cal-day selected">3</div></div></div>',
    'Drawer': '<div class="ex-drawer">← Slide out panel</div>',
    'Dropdown menu': '<div class="ex-dropdown-menu"><button class="ex-btn">Menu ▼</button></div>',
    'Empty state': '<div class="ex-empty"><div class="ex-empty-icon">📭</div><div class="ex-empty-text">No items found</div></div>',
    'Fieldset': '<fieldset class="ex-fieldset"><legend>Group</legend><input type="text" class="ex-input" placeholder="Field 1"></fieldset>',
    'File': '<div class="ex-file"><div class="ex-file-icon">📄</div><div class="ex-file-name">document.pdf</div></div>',
    'File upload': '<div class="ex-upload"><div class="ex-upload-area">Drop files here</div></div>',
    'Footer': '<div class="ex-footer">© 2024 Company</div>',
    'Form': '<form class="ex-form"><input type="text" class="ex-input" placeholder="Name"><button class="ex-btn">Submit</button></form>',
    'Header': '<div class="ex-header"><div class="ex-header-logo">Logo</div><nav class="ex-header-nav">Nav</nav></div>',
    'Heading': '<div class="ex-heading"><h1>Heading 1</h1><h2>Heading 2</h2></div>',
    'Hero': '<div class="ex-hero"><h1>Hero Title</h1><p>Hero subtitle</p></div>',
    'Icon': '<div class="ex-icon-group">⚙️ 🔍 ❤️ ⭐</div>',
    'Image': '<div class="ex-image"><div class="ex-image-placeholder">🖼️</div></div>',
    'Label': '<div class="ex-label-group"><label>Label:</label><input type="text" class="ex-input"></div>',
    'Link': '<div class="ex-link-group"><a href="#" class="ex-link">Link 1</a> <a href="#" class="ex-link">Link 2</a></div>',
    'List': '<ul class="ex-list"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>',
    'Modal': '<div class="ex-modal"><div class="ex-modal-content">Modal content</div></div>',
    'Navigation': '<nav class="ex-nav"><a href="#" class="ex-nav-link active">Home</a><a href="#" class="ex-nav-link">About</a></nav>',
    'Pagination': '<div class="ex-pagination"><button class="ex-page-btn">‹</button><button class="ex-page-btn active">1</button><button class="ex-page-btn">2</button><button class="ex-page-btn">›</button></div>',
    'Popover': '<div class="ex-popover"><button class="ex-btn">Hover me</button><div class="ex-popover-content">Popover text</div></div>',
    'Progress bar': '<div class="ex-progress-bar"><div class="ex-progress-fill" style="width: 65%;"></div></div>',
    'Progress indicator': '<div class="ex-progress-indicator"><div class="ex-step active">1</div><div class="ex-step-line"></div><div class="ex-step">2</div><div class="ex-step-line"></div><div class="ex-step">3</div></div>',
    'Quote': '<blockquote class="ex-quote">"This is a quote"</blockquote>',
    'Radio button': '<div class="ex-radio-group"><label class="ex-radio"><input type="radio" name="ex" checked> Option 1</label><label class="ex-radio"><input type="radio" name="ex"> Option 2</label></div>',
    'Rating': '<div class="ex-rating">⭐⭐⭐⭐☆</div>',
    'Rich text editor': '<div class="ex-editor"><div class="ex-editor-toolbar">B I U</div><div class="ex-editor-content">Edit text...</div></div>',
    'Search input': '<div class="ex-search"><input type="search" placeholder="Search..." class="ex-input">🔍</div>',
    'Segmented control': '<div class="ex-segmented"><button class="ex-seg-btn active">Option 1</button><button class="ex-seg-btn">Option 2</button></div>',
    'Select': '<select class="ex-select"><option>Option 1</option><option>Option 2</option></select>',
    'Separator': '<div class="ex-separator"></div>',
    'Skeleton': '<div class="ex-skeleton"><div class="ex-skeleton-line"></div><div class="ex-skeleton-line short"></div></div>',
    'Skip link': '<a href="#main" class="ex-skip-link">Skip to main content</a>',
    'Slider': '<div class="ex-slider"><input type="range" class="ex-range" value="50"></div>',
    'Spinner': '<div class="ex-spinner">⟳</div>',
    'Stack': '<div class="ex-stack"><div class="ex-stack-item">Item 1</div><div class="ex-stack-item">Item 2</div></div>',
    'Stepper': '<div class="ex-stepper"><button class="ex-step-btn">-</button><input type="number" value="1" class="ex-step-input"><button class="ex-step-btn">+</button></div>',
    'Table': '<table class="ex-table"><tr><th>Name</th><th>Value</th></tr><tr><td>Item</td><td>123</td></tr></table>',
    'Tabs': '<div class="ex-tabs"><button class="ex-tab active">Tab 1</button><button class="ex-tab">Tab 2</button></div>',
    'Text input': '<input type="text" placeholder="Enter text..." class="ex-input">',
    'Textarea': '<textarea class="ex-textarea" placeholder="Multi-line text..."></textarea>',
    'Toast': '<div class="ex-toast">Notification message</div>',
    'Toggle': '<label class="ex-toggle"><input type="checkbox" checked><span class="ex-toggle-slider"></span></label>',
    'Tooltip': '<div class="ex-tooltip"><button class="ex-btn">Hover me</button><span class="ex-tooltip-text">Tooltip text</span></div>',
    'Tree view': '<div class="ex-tree"><div class="ex-tree-item">📁 Folder 1</div><div class="ex-tree-item indent">📄 File 1</div></div>',
    'Video': '<div class="ex-video"><div class="ex-video-placeholder">▶ Video</div></div>',
    'Visually hidden': '<div class="ex-visually-hidden">Hidden from view</div>'
  };
  
  return examples[componentName] || '';
}

function setupLibraryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Load filtered components
      const filter = btn.dataset.filter;
      loadComponentLibrary(filter);
    });
  });
}
