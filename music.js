// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle-btn");
const volumeSlider = document.getElementById("volume-slider");

let isMusicStarted = false;

// === ИНИЦИАЛИЗАЦИЯ ===

if (music && musicBtn && volumeSlider) {
  // Восстанавливаем громкость из localStorage
  const savedVolume = localStorage.getItem("musicVolume");
  if (savedVolume !== null) {
    music.volume = parseFloat(savedVolume);
    volumeSlider.value = savedVolume;
  }

  // Восстанавливаем состояние кнопки
  const savedState = localStorage.getItem("musicState");
  if (savedState === "paused") {
    music.pause();
    musicBtn.textContent = "🎵";
  } else {
    musicBtn.textContent = "⏸️";
  }

  // Обработчики событий
  musicBtn.addEventListener("click", toggleMusic);
  volumeSlider.addEventListener("input", () => setVolume(volumeSlider.value));
  volumeSlider.addEventListener("touchmove", () => setVolume(volumeSlider.value));

  // === НОВАЯ ФУНКЦИЯ: ВКЛЮЧЕНИЕ МУЗЫКИ ПРИ КЛИКЕ НА СТРАНИЦЕ ===
  document.addEventListener("click", handleFirstClick, { once: true });
}

// === ФУНКЦИИ ===

/**
 * Первый клик на странице — запускает музыку
 */
function handleFirstClick(event) {
  const targetIsNotAudioControl = !event.target.closest(".audio-controls");

  if (!isMusicStarted && targetIsNotAudioControl && localStorage.getItem("musicState") !== "muted") {
    playMusic();
  }
}

/**
 * Запуск музыки и сохранение состояния
 */
function playMusic() {
  if (!music) return;

  music.play()
    .then(() => {
      isMusicStarted = true;
      localStorage.setItem("musicState", "playing");
      if (musicBtn) musicBtn.textContent = "⏸️";
    })
    .catch((e) => {
      console.warn("Автовоспроизведение заблокировано:", e.message);
      isMusicStarted = false;
    });
}

/**
 * Переключает воспроизведение музыки
 */
function toggleMusic() {
  if (!music) return;

  if (music.paused) {
    music.play()
      .then(() => {
        localStorage.setItem("musicState", "playing");
        musicBtn.textContent = "⏸️";
      })
      .catch(() => {
        console.warn("Не удалось возобновить воспроизведение");
      });
  } else {
    music.pause();
    localStorage.setItem("musicState", "paused");
    musicBtn.textContent = "🎵";
  }
}

/**
 * Устанавливает громкость и сохраняет в localStorage
 */
function setVolume(value) {
  if (!music) return;
  const volumeValue = parseFloat(value);
  music.volume = volumeValue;
  localStorage.setItem("musicVolume", volumeValue);
}
