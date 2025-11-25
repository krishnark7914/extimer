export function renderHeader(element, props) {
  const { title, onToggleMobileMenu } = props

  element.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <button class="mobile-menu-toggle" id="mobile-menu-btn" aria-label="Toggle menu">
        <i data-lucide="menu" style="width: 24px; height: 24px;"></i>
      </button>
      <h1 style="margin: 0; font-size: 1.5rem; font-weight: 600;">${title}</h1>
    </div>
    
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div class="user-info" style="text-align: right; display: none;">
        <div style="font-weight: 500; color: var(--text-primary);">User Profile</div>
        <div style="font-size: 0.75rem; color: var(--text-secondary);">user@example.com</div>
      </div>
      <div class="profile-icon" style="
        width: 40px; 
        height: 40px; 
        background-color: var(--accent-color); 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.2s ease;
      ">
        <i data-lucide="user" style="width: 20px; height: 20px; color: white;"></i>
      </div>
      <button class="btn btn-outline logout-btn" style="padding: 0.5rem; font-size: 0.875rem;">Logout</button>
    </div>
  `

  // Add event listener for mobile menu toggle
  const menuBtn = element.querySelector('#mobile-menu-btn')
  if (menuBtn && onToggleMobileMenu) {
    menuBtn.addEventListener('click', onToggleMobileMenu)
  }
}

