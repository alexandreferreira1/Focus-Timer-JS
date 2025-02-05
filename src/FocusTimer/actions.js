import state from "./state.js";
import * as timer from "./timer.js";
import * as el from "./elements.js";
import * as sounds from "./sounds.js";

// Controla as ações executadas ao pressionar os botões de controle

export function toggleRunning() {
  if (state.minutes == 0 && state.seconds == 0) {
    return;
  }

  state.isRunning = document.documentElement.classList.toggle("running");

  timer.contdown();

  sounds.buttonPressAudio.play();

  if (!state.isMute && state.isRunning) {
    sounds.bgAudio.play();
  } else {
    sounds.bgAudio.pause();
  }
}

export function reset() {
  state.isRunning = false;
  document.documentElement.classList.remove("running");

  timer.updateDisplay();

  sounds.bgAudio.pause();
  sounds.buttonPressAudio.play();
}

export function set() {
  el.minutes.setAttribute("contenteditable", true);
  el.minutes.focus();
}

export function toggleMusic() {
  state.isMute = !document.documentElement.classList.toggle("music-on");

  if (!state.isMute && state.isRunning) {
      sounds.bgAudio.play();
} else {
    sounds.bgAudio.pause();
  }
}
