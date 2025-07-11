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

  // Обработчик кнопки
  musicBtn.addEventListener("click", toggleMusic);
}

if (volumeSlider) {
  // Поддержка desktop
  volumeSlider.addEventListener("input", handleVolumeChange);

  // Поддержка mobile (touch)
  volumeSlider.addEventListener("touchmove", handleVolumeChange);
  volumeSlider.addEventListener("touchstart", handleVolumeChange);
}

// === ФУНКЦИИ ===

function handleVolumeChange() {
  if (!music) return;

  const newVolume = parseFloat(volumeSlider.value);
  music.volume = newVolume;
  console.log("Громкость установлена:", newVolume);
}

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
    setTimeout(() => {
      isPlaying = false;
      musicBtn.textContent = "🎵";
    }, 50);
  }
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
