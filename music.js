// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle-btn");
const volumeSlider = document.querySelector(".audio-controls input[type='range']");

let isMusicStarted = false;
let isPlaying = false;

// === ИНИЦИАЛИЗАЦИЯ ===

if (music && musicBtn) {
  // Устанавливаем начальную громкость
  if (volumeSlider) {
    music.volume = parseFloat(volumeSlider.value);
  }

  // Слушатели событий для синхронизации состояния
  music.addEventListener("play", () => {
    isPlaying = true;
    musicBtn.textContent = "⏸️";
  });

  music.addEventListener("pause", () => {
    isPlaying = false;
    musicBtn.textContent = "🎵";
  });

  music.addEventListener("ended", () => {
    isPlaying = false;
    musicBtn.textContent = "🎵";
  });

  // Обработчики событий кнопки
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

  if (!isPlaying) {
    music.play()
      .then(() => {
        // Музыка играет
        isPlaying = true;
        isMusicStarted = true;
        musicBtn.textContent = "⏸️";
      })
      .catch((e) => {
        console.warn("Не удалось возобновить воспроизведение:", e.message);
        isMusicStarted = false;
        isPlaying = false;
      });
  } else {
    // Добавляем небольшую задержку, чтобы убедиться, что браузер успел обработать pause
    music.pause();
    setTimeout(() => {
      isPlaying = false;
      musicBtn.textContent = "🎵";
    }, 50);
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
 * Автозапуск музыки при первом клике
 */
document.addEventListener("click", (event) => {
  const targetIsNotAudioControl = !event.target.closest(".audio-controls");

  if (!isMusicStarted && targetIsNotAudioControl) {
    music.play()
      .then(() => {
        isPlaying = true;
        isMusicStarted = true;
        musicBtn.textContent = "⏸️";
      })
      .catch((e) => {
        console.warn("Автовоспроизведение заблокировано:", e.message);
        isMusicStarted = false;
        isPlaying = false;
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
