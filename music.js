// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle-btn");
const volumeSlider = document.querySelector(".audio-controls input[type='range']");

let isMusicStarted = false;

// === ИНИЦИАЛИЗАЦИЯ ===

if (music && musicBtn) {
  // Устанавливаем начальную громкость
  music.volume = parseFloat(volumeSlider?.value || 0.5);

  // Привязываем события
  musicBtn.addEventListener("click", toggleMusic);
}

if (volumeSlider) {
  volumeSlider.addEventListener("input", () => {
    setVolume(volumeSlider.value);
  });
}

// === ФУНКЦИИ ===

/**
 * Переключает воспроизведение музыки и меняет иконку кнопки
 */
function toggleMusic() {
  if (!music) return;

  if (music.paused) {
    music.play()
      .then(() => {
        musicBtn.textContent = "⏸️"; // меняем на паузу
        isMusicStarted = true;
      })
      .catch((e) => {
        console.warn("Воспроизведение невозможно:", e.message);
        isMusicStarted = false;
      });
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
  if (!music) return;
  music.volume = parseFloat(value);
}

/**
 * Автозапуск музыки при первом клике на странице
 */
document.addEventListener("click", (event) => {
  // Проверяем, клик был ли НЕ по кнопке управления музыкой
  const targetIsNotAudioControl = !event.target.closest(".audio-controls");

  if (!isMusicStarted && music && targetIsNotAudioControl) {
    music.play()
      .then(() => {
        musicBtn.textContent = "⏸️";
        isMusicStarted = true;
      })
      .catch((e) => {
        console.warn("Автовоспроизведение заблокировано:", e.message);
        isMusicStarted = false;
      });
  }
});

// === ДОПОЛНИТЕЛЬНО: КНОПКА "НАВЕРХ" С АНИМАЦИЕЙ ===

const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.style.opacity = "1";
      backToTopButton.style.pointerEvents = "auto";
    } else {
      backToTopButton.style.opacity = "0";
      backToTopButton.style.pointerEvents = "none";
    }
  });
}
