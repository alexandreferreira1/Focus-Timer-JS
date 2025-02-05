import state from "./state.js"
import * as el from './elements.js'
import { reset } from './actions.js'
import * as sounds from './sounds.js'

// Lógica para rodar o contador e atualizar o display. Utilizado no actions.js

export function contdown() {
    clearTimeout(state.contdownId)

    if (!state.isRunning) {
        return
    }

    let minutes  = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)
    
    seconds--

    if (seconds < 0) {
        seconds = 59
        minutes--
    }

    if (minutes < 0) {
        sounds.bgAudio.pause()
        sounds.kitchenTimer.play()
        reset()
        return
    }

    updateDisplay(minutes, seconds)

    // Recebe o id do contdown para zerar ele no começo e não acumular
    state.contdownId = setTimeout(() => {contdown()}, 1000)
}

export function updateDisplay(minutes, seconds) {
    minutes = minutes ?? state.minutes
    seconds = seconds ?? state.seconds

    el.minutes.textContent = String(minutes).padStart(2, "0")
    el.seconds.textContent = String(seconds).padStart(2, "0")
}