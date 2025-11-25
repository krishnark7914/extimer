import { createIcons, icons } from 'https://esm.sh/lucide'
import './style.css'
import { renderSidebar } from './src/components/sidebar.js'
import { renderHeader } from './src/components/header.js'
import { renderWalking } from './src/views/walking.js'
import { renderExercise } from './src/views/exercise.js'
import { renderHabits } from './src/views/habits.js'
import { renderHistory } from './src/views/history.js'

const app = document.querySelector('#app')

// State
let currentState = {
  view: 'walking', // default view
  theme: localStorage.getItem('theme') || 'light',
  mobileMenuOpen: false
}

// Apply Theme
document.documentElement.setAttribute('data-theme', currentState.theme)

// Layout Structure
app.innerHTML = `
  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  <aside class="sidebar" id="sidebar"></aside>
  <div class="main-wrapper">
    <header class="header" id="header"></header>
    <main class="content-area" id="main-content"></main>
  </div>
`

// Router
const routes = {
  walking: { render: renderWalking, title: 'Walking Tracker' },
  exercise: { render: renderExercise, title: 'Exercise Timer' },
  habits: { render: renderHabits, title: 'Habits' },
  history: { render: renderHistory, title: 'History & Analysis' }
}

function navigateTo(viewName) {
  if (routes[viewName]) {
    currentState.view = viewName
    render()
  }
}



function render() {
  // Update Sidebar (active state)
  renderSidebar(document.querySelector('#sidebar'), {
    activeView: currentState.view,
    onNavigate: (view) => {
      navigateTo(view)
      closeMobileMenu() // Close menu after navigation on mobile
    },
    theme: currentState.theme,
    onToggleTheme: toggleTheme
  })

  // Update Header
  renderHeader(document.querySelector('#header'), {
    title: routes[currentState.view].title,
    onToggleMobileMenu: toggleMobileMenu
  })

  // Update Main Content
  const mainContent = document.querySelector('#main-content')
  mainContent.innerHTML = '' // Clear current content
  routes[currentState.view].render(mainContent)

  // Initialize Icons
  createIcons({ icons })
}

function toggleTheme() {
  currentState.theme = currentState.theme === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', currentState.theme)
  localStorage.setItem('theme', currentState.theme)
  render() // Re-render to update icons if necessary
}

function toggleMobileMenu() {
  currentState.mobileMenuOpen = !currentState.mobileMenuOpen
  const sidebar = document.querySelector('#sidebar')
  const overlay = document.querySelector('#sidebar-overlay')

  if (currentState.mobileMenuOpen) {
    sidebar.classList.add('mobile-open')
    overlay.classList.add('active')
  } else {
    sidebar.classList.remove('mobile-open')
    overlay.classList.remove('active')
  }
}

function closeMobileMenu() {
  if (currentState.mobileMenuOpen) {
    currentState.mobileMenuOpen = false
    document.querySelector('#sidebar').classList.remove('mobile-open')
    document.querySelector('#sidebar-overlay').classList.remove('active')
  }
}

// Initial Render
render()

// Setup overlay click handler
document.querySelector('#sidebar-overlay').addEventListener('click', closeMobileMenu)

