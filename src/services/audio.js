export const audioService = {
    ctx: null,

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)()
        }
    },

    playBeep(frequency = 440, duration = 0.1, type = 'sine') {
        this.init()
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = type
        osc.frequency.value = frequency

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start()

        // Fade out to avoid clicking sound
        gain.gain.setValueAtTime(1, this.ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration)

        osc.stop(this.ctx.currentTime + duration)
    },

    playStart() {
        this.playBeep(880, 0.1) // High pitch
        setTimeout(() => this.playBeep(1760, 0.2), 100)
    },

    playStop() {
        this.playBeep(440, 0.3, 'triangle') // Low pitch
    },

    playInterval() {
        this.playBeep(660, 0.15, 'square') // Distinct sound
    }
}
