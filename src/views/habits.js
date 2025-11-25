import { storageService } from '../services/storage.js'
import { createIcons, icons } from 'https://esm.sh/lucide'

export const renderHabits = (element) => {
  const today = new Date().toISOString().split('T')[0]

  function renderList() {
    const habits = storageService.getHabits()
    const listHtml = habits.map(habit => {
      const isCompleted = habit.completedDates.includes(today)
      return `
        <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <input 
              type="checkbox" 
              class="habit-checkbox" 
              data-id="${habit.id}" 
              ${isCompleted ? 'checked' : ''}
              style="width: 24px; height: 24px; cursor: pointer; accent-color: var(--accent-color);"
            >
            <span style="font-size: 1.1rem; ${isCompleted ? 'text-decoration: line-through; color: var(--text-secondary);' : ''}">${habit.name}</span>
          </div>
          <button class="btn-delete" data-id="${habit.id}" style="background: none; border: none; color: var(--danger-color); cursor: pointer; opacity: 0.7;"><i data-lucide="trash-2"></i></button>
        </div>
      `
    }).join('')

    element.querySelector('#habits-list').innerHTML = listHtml || '<p style="text-align: center; margin-top: 2rem;">No habits yet. Add one above!</p>'
    createIcons({ icons })

    // Re-attach listeners
    element.querySelectorAll('.habit-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        storageService.toggleHabit(parseInt(e.target.dataset.id), today)
        renderList()
      })
    })

    element.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (confirm('Delete this habit?')) {
          storageService.deleteHabit(parseInt(e.target.dataset.id))
          renderList()
        }
      })
    })
  }

  element.innerHTML = `
    <div class="fade-in" style="max-width: 800px; margin: 0 auto;">
      <div class="card" style="margin-bottom: 2rem;">
        <div style="display: flex; gap: 1rem;">
          <input type="text" id="new-habit-input" class="form-input" placeholder="Enter a new habit (e.g., Drink Water)">
          <button id="add-habit-btn" class="btn btn-primary">Add</button>
        </div>
      </div>

      <div id="habits-list"></div>
    </div>
  `

  const addBtn = element.querySelector('#add-habit-btn')
  const input = element.querySelector('#new-habit-input')

  addBtn.addEventListener('click', () => {
    const name = input.value.trim()
    if (name) {
      storageService.saveHabit(name)
      input.value = ''
      renderList()
    }
  })

  renderList()
}
