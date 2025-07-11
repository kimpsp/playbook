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
    try {
      music.volume = parseFloat(volumeSlider.value);
    } catch (e) {
      console.warn("Ошибка установки начальной громкости", e);
    }
  }

  // Слушатели событий для синхронизации состояния
  try {
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
  } catch (e) {
    console.warn("Ошибка добавления слушателей событий", e);
  }

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
    try {
      music.play()
        .then(() => {
          isPlaying = true;
          isMusicStarted = true;
          if (musicBtn) musicBtn.textContent = "⏸️";
        })
        .catch((e) => {
          console.warn("Не удалось возобновить воспроизведение:", e.message);
          isMusicStarted = false;
          isPlaying = false;
        });
    } catch (e) {
      console.error("Ошибка при попытке запуска музыки", e);
    }
  } else {
    try {
      music.pause();
      setTimeout(() => {
        isPlaying = false;
        if (musicBtn) musicBtn.textContent = "🎵";
      }, 50);
    } catch (e) {
      console.error("Ошибка при паузе", e);
    }
  }
}

/**
 * Устанавливает громкость музыки
 * @param {string} value - значение из ползунка (0 до 1)
 */
function setVolume(value) {
  if (!music) return;
  try {
    music.volume = parseFloat(value);
  } catch (e) {
    console.warn("Ошибка установки громкости", e);
  }
}

/**
 * Автозапуск музыки при первом клике
 */
document.addEventListener("click", (event) => {
  const targetIsNotAudioControl = !event.target.closest(".audio-controls");

  if (!music || !targetIsNotAudioControl || isMusicStarted) return;

  try {
    music.play()
      .then(() => {
        isPlaying = true;
        isMusicStarted = true;
        if (musicBtn) musicBtn.textContent = "⏸️";
      })
      .catch((e) => {
        console.warn("Автовоспроизведение заблокировано:", e.message);
        isMusicStarted = false;
        isPlaying = false;
      });
  } catch (e) {
    console.error("Ошибка автовоспроизведения", e);
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
