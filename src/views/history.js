import { storageService } from '../services/storage.js'

export const renderHistory = (element) => {
    const history = storageService.getHistory().reverse() // Newest first

    const listHtml = history.map(item => {
        const date = new Date(item.completedAt).toLocaleDateString()
        const time = new Date(item.completedAt).toLocaleTimeString()
        const durationMins = Math.floor(item.duration / 60)
        const durationSecs = item.duration % 60

        return `
      <div class="card" style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 600; text-transform: capitalize; color: var(--accent-color);">${item.type}</div>
          <div style="font-size: 0.875rem; color: var(--text-secondary);">${date} at ${time}</div>
        </div>
        <div style="font-size: 1.25rem; font-weight: 500;">
          ${durationMins}:${durationSecs.toString().padStart(2, '0')}
        </div>
      </div>
    `
    }).join('')

    element.innerHTML = `
    <div class="fade-in" style="max-width: 800px; margin: 0 auto;">
      ${listHtml || '<p style="text-align: center; margin-top: 2rem;">No history yet. Start moving!</p>'}
    </div>
  `
}
