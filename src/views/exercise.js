import { storageService } from '../services/storage.js'

let stopwatchInterval = null
let elapsedSeconds = 0
let isRunning = false

export const renderExercise = (element) => {
    element.innerHTML = `
    <div class="card fade-in" style="max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <div id="stopwatch-display" style="font-size: 4rem; font-weight: 700; font-variant-numeric: tabular-nums; color: var(--success-color);">00:00</div>
        <div style="color: var(--text-secondary);">Elapsed Time</div>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
        <button id="ex-start-btn" class="btn btn-primary" style="min-width: 100px;">Start</button>
        <button id="ex-pause-btn" class="btn btn-outline" style="min-width: 100px;" disabled>Pause</button>
        <button id="ex-finish-btn" class="btn btn-outline" style="min-width: 100px; border-color: var(--success-color); color: var(--success-color);" disabled>Finish</button>
      </div>
    </div>
  `

    const display = element.querySelector('#stopwatch-display')
    const startBtn = element.querySelector('#ex-start-btn')
    const pauseBtn = element.querySelector('#ex-pause-btn')
    const finishBtn = element.querySelector('#ex-finish-btn')

    function updateDisplay() {
        const m = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')
        const s = (elapsedSeconds % 60).toString().padStart(2, '0')
        display.textContent = `${m}:${s}`
    }

    startBtn.addEventListener('click', () => {
        isRunning = true
        startBtn.disabled = true
        pauseBtn.disabled = false
        finishBtn.disabled = false

        stopwatchInterval = setInterval(() => {
            elapsedSeconds++
            updateDisplay()
        }, 1000)
    })

    pauseBtn.addEventListener('click', () => {
        isRunning = false
        clearInterval(stopwatchInterval)
        startBtn.disabled = false
        startBtn.textContent = 'Resume'
        pauseBtn.disabled = true
    })

    finishBtn.addEventListener('click', () => {
        isRunning = false
        clearInterval(stopwatchInterval)

        if (elapsedSeconds > 0) {
            storageService.saveWorkout({
                type: 'exercise',
                duration: elapsedSeconds,
                completedAt: new Date().toISOString()
            })
            alert('Workout saved!')
        }

        elapsedSeconds = 0
        updateDisplay()
        startBtn.disabled = false
        startBtn.textContent = 'Start'
        pauseBtn.disabled = true
        finishBtn.disabled = true
    })
}
