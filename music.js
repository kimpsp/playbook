// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle-btn");

// === ФУНКЦИИ ===

/**
 * Переключает воспроизведение музыки и меняет иконку кнопки
 */
function toggleMusic() {
  if (music.paused) {
    music.play().catch(e => console.log("Автовоспроизведение запрещено браузером"));
    musicBtn.textContent = "⏸️"; // меняем на паузу
  } else {
    music.pause();
    musicBtn.textContent = "🎵"; // возвращаем воспроизведение
  }
}

/**
 * Устанавливает громкость музыки
 * @param {string} value - значение из ползунка (0 до 1)
 */
function setVolume(value) {
  music.volume = parseFloat(value);
}

// === АВТОЗАПУСК МУЗЫКИ ПРИ ПЕРВОМ КЛИКЕ ===

let isMusicStarted = false;

document.addEventListener("click", () => {
  if (!isMusicStarted && music && musicBtn) {
    music.play().catch(() => {});
    musicBtn.textContent = "⏸️";
    isMusicStarted = true;
  }
});
