// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle-btn");
const volumeSlider = document.querySelector(".audio-controls input[type='range']");

let isMusicStarted = false; // флаг, что пользователь уже запустил музыку вручную
let isPlaying = false; // точное состояние воспроизведения

// === ИНИЦИАЛИЗАЦИЯ ===

if (music && musicBtn) {
  // Устанавливаем начальную громкость
  if (volumeSlider) {
    music.volume = parseFloat(volumeSlider.value);
  }

  // Обработчики событий
  musicBtn.addEventListener("click", toggleMusic);

  // Обновляем состояние при ошибке или окончании
  music.addEventListener("ended", () => {
    isPlaying = false;
    musicBtn.textContent = "🎵";
  });

  music.addEventListener("pause", () => {
    isPlaying = false;
    musicBtn.textContent = "🎵";
  });

  music.addEventListener("play", () => {
    isPlaying = true;
    musicBtn.textContent = "⏸️";
  });
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
    music.pause();
    isPlaying = false;
    musicBtn.textContent = "🎵";
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
 * Обновляет состояние музыки при возврате на главную
 */
function resetMusicState() {
  if (!music) return;

  if (!music.src) {
    // Если src пустой (например, после открытия квеста), восстанавливаем
    music.src = "sounds/menu_theme_long.mp3";
  }

  // Можно автоматически продолжить воспроизведение
  if (isPlaying) {
    music.play().catch(() => {});
  }
}

// === АВТО-СТАРТ ПРИ ПЕРВОМ КЛИКЕ ===

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
      });
  }
});

// === ДОПОЛНИТЕЛЬНО: СЛЕДИМ ЗА СКРОЛЛОМ И КНОПКОЙ "НАВЕРХ" ===

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
