export function renderSidebar(element, props) {
  const { activeView, onNavigate, theme, onToggleTheme } = props

  const menuItems = [
    { id: 'walking', label: 'Walking', icon: 'footprints' },
    { id: 'exercise', label: 'Exercise', icon: 'dumbbell' },
    { id: 'habits', label: 'Habits', icon: 'check-circle-2' },
    { id: 'history', label: 'History', icon: 'calendar-days' }
  ]

  element.innerHTML = `
    <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 0.5rem;">
      <div style="width: 32px; height: 32px; background: var(--accent-color); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">E</div>
      <h2 style="margin: 0; font-size: 1.25rem;">Extimer</h2>
    </div>
    
    <nav style="flex: 1;">
      <ul style="list-style: none; padding: 0;">
        ${menuItems.map(item => `
          <li style="margin-bottom: 0.5rem;">
            <button 
              class="nav-btn ${activeView === item.id ? 'active' : ''}"
              data-view="${item.id}"
              style="
                width: 100%;
                text-align: left;
                padding: 0.75rem 1rem;
                background: ${activeView === item.id ? 'var(--accent-color)' : 'transparent'};
                color: ${activeView === item.id ? 'white' : 'var(--text-secondary)'};
                border: none;
                border-radius: 0.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-weight: 500;
                transition: all 0.2s;
              "
            >
              <i data-lucide="${item.icon}"></i>
              ${item.label}
            </button>
          </li>
        `).join('')}
      </ul>
    </nav>

    <div style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
      <button id="theme-toggle" class="btn btn-outline" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
        ${theme === 'light' ? '<i data-lucide="moon"></i> Dark Mode' : '<i data-lucide="sun"></i> Light Mode'}
      </button>
    </div>
  `

  // Event Listeners
  element.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      onNavigate(btn.dataset.view)
    })
  })

  element.querySelector('#theme-toggle').addEventListener('click', onToggleTheme)
}
