const STORAGE_KEYS = {
    HISTORY: 'extimer_history',
    HABITS: 'extimer_habits'
}

export const storageService = {
    saveWorkout(workout) {
        const history = this.getHistory()
        history.push({
            id: Date.now(),
            date: new Date().toISOString(),
            ...workout
        })
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history))
    },

    getHistory() {
        const data = localStorage.getItem(STORAGE_KEYS.HISTORY)
        return data ? JSON.parse(data) : []
    },

    saveHabit(habitName) {
        const habits = this.getHabits()
        habits.push({
            id: Date.now(),
            name: habitName,
            completedDates: []
        })
        localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits))
    },

    getHabits() {
        const data = localStorage.getItem(STORAGE_KEYS.HABITS)
        return data ? JSON.parse(data) : []
    },

    toggleHabit(habitId, dateString) {
        const habits = this.getHabits()
        const habit = habits.find(h => h.id === habitId)
        if (habit) {
            const index = habit.completedDates.indexOf(dateString)
            if (index === -1) {
                habit.completedDates.push(dateString)
            } else {
                habit.completedDates.splice(index, 1)
            }
            localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits))
        }
    },

    deleteHabit(habitId) {
        let habits = this.getHabits()
        habits = habits.filter(h => h.id !== habitId)
        localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits))
    }
}
