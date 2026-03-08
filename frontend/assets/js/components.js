// Simple component loader
async function loadComponent(id, path) {
  try {
    const response = await fetch(path);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(`Error loading component ${id}:`, error);
  }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('nav-component');
  const footerEl = document.getElementById('footer-component');
  
  if (navEl) {
    loadComponent('nav-component', 'components/nav.html');
  }
  if (footerEl) {
    loadComponent('footer-component', 'components/footer.html');
  }
});
