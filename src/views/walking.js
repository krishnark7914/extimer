import { audioService } from '../services/audio.js'
import { storageService } from '../services/storage.js'

let timerInterval = null
let remainingTime = 0
let totalTime = 0
let isRunning = false
let intervalTime = 0
let currentInterval = 0

export const renderWalking = (element) => {
    element.innerHTML = `
    <div class="card fade-in" style="max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <div id="timer-display" style="font-size: 4rem; font-weight: 700; font-variant-numeric: tabular-nums; color: var(--accent-color);">00:00</div>
        <div id="status-display" style="color: var(--text-secondary); font-size: 1.1rem; height: 1.5rem;">Ready to walk</div>
      </div>

      <div class="input-group">
        <label class="input-label">Total Duration (minutes)</label>
        <input type="number" id="duration-input" class="form-input" value="30" min="1">
      </div>

      <div class="input-group">
        <label class="input-label">Interval Beep (minutes) - 0 for none</label>
        <input type="number" id="interval-input" class="form-input" value="5" min="0">
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
        <button id="start-btn" class="btn btn-primary" style="min-width: 120px;">Start</button>
        <button id="stop-btn" class="btn btn-outline" style="min-width: 120px;" disabled>Stop</button>
      </div>
    </div>
  `

    const startBtn = element.querySelector('#start-btn')
    const stopBtn = element.querySelector('#stop-btn')
    const durationInput = element.querySelector('#duration-input')
    const intervalInput = element.querySelector('#interval-input')
    const timerDisplay = element.querySelector('#timer-display')
    const statusDisplay = element.querySelector('#status-display')

    function updateDisplay(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0')
        const s = (seconds % 60).toString().padStart(2, '0')
        timerDisplay.textContent = `${m}:${s}`
    }

    function finish() {
        stop()
        audioService.playStop()
        statusDisplay.textContent = 'Workout Completed!'
        storageService.saveWorkout({
            type: 'walking',
            duration: totalTime,
            completedAt: new Date().toISOString()
        })
    }

    function stop() {
        clearInterval(timerInterval)
        isRunning = false
        startBtn.disabled = false
        stopBtn.disabled = true
        startBtn.textContent = 'Start'
        durationInput.disabled = false
        intervalInput.disabled = false
    }

    startBtn.addEventListener('click', () => {
        if (isRunning) return

        const durationMins = parseInt(durationInput.value) || 30
        const intervalMins = parseInt(intervalInput.value) || 0

        totalTime = durationMins * 60
        remainingTime = totalTime
        intervalTime = intervalMins * 60
        currentInterval = intervalTime

        isRunning = true
        startBtn.disabled = true
        stopBtn.disabled = false
        durationInput.disabled = true
        intervalInput.disabled = true
        statusDisplay.textContent = 'Walking...'

        audioService.playStart()
        updateDisplay(remainingTime)

        timerInterval = setInterval(() => {
            remainingTime--
            updateDisplay(remainingTime)

            // Interval Check
            if (intervalTime > 0) {
                currentInterval--
                if (currentInterval <= 0) {
                    audioService.playInterval()
                    currentInterval = intervalTime
                    statusDisplay.textContent = 'Interval Reached!'
                    setTimeout(() => statusDisplay.textContent = 'Walking...', 2000)
                }
            }

            if (remainingTime <= 0) {
                finish()
            }
        }, 1000)
    })

    stopBtn.addEventListener('click', () => {
        stop()
        statusDisplay.textContent = 'Stopped'
    })
}
