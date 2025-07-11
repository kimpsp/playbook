// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle-btn");
const volumeSlider = document.getElementById("volume-slider");

let isMusicStarted = false;

console.log("music:", music);
console.log("musicBtn:", musicBtn);
console.log("volumeSlider:", volumeSlider);

// === ИНИЦИАЛИЗАЦИЯ ===

if (music) {
  // Восстанавливаем громкость из localStorage
  const savedVolume = localStorage.getItem("musicVolume");
  if (savedVolume !== null && volumeSlider) {
    music.volume = parseFloat(savedVolume);
    volumeSlider.value = savedVolume;
  }

  // Восстанавливаем состояние кнопки
  const savedState = localStorage.getItem("musicState");
  if (savedState === "paused") {
    music.pause();
    if (musicBtn) musicBtn.textContent = "🎵";
  } else {
    if (musicBtn) musicBtn.textContent = "⏸️";
  }
}

// === ОБРАБОТЧИКИ СОБЫТИЙ (подключаются, если элементы существуют) ===

if (musicBtn) {
  musicBtn.addEventListener("click", toggleMusic);
}

if (volumeSlider) {
  volumeSlider.addEventListener("input", () => setVolume(volumeSlider.value));
  volumeSlider.addEventListener("touchmove", () => setVolume(volumeSlider.value));
}

// === НОВАЯ ФУНКЦИЯ: ВКЛЮЧЕНИЕ МУЗЫКИ ПРИ КЛИКЕ НА СТРАНИЦЕ ===

document.addEventListener("click", handleFirstClick, { once: true });

function handleFirstClick(event) {
  const targetIsNotAudioControl = !event.target.closest(".audio-controls");

  if (!isMusicStarted && targetIsNotAudioControl && music) {
    playMusic();
  }
}

// === ФУНКЦИИ ===

function playMusic() {
  if (!music) return;

  music.play()
    .then(() => {
      isMusicStarted = true;
      localStorage.setItem("musicState", "playing");
      if (musicBtn) musicBtn.textContent = "⏸️";
      console.log("✅ Музыка успешно запущена");
    })
    .catch((e) => {
      console.warn("❌ Автовоспроизведение заблокировано:", e.message);
      isMusicStarted = false;
    });
}

function toggleMusic() {
  if (!music) return;

  if (music.paused) {
    music.play()
      .then(() => {
        localStorage.setItem("musicState", "playing");
        if (musicBtn) musicBtn.textContent = "⏸️";
      })
      .catch(() => {
        console.warn("❌ Не удалось возобновить воспроизведение");
      });
  } else {
    music.pause();
    localStorage.setItem("musicState", "paused");
    if (musicBtn) musicBtn.textContent = "🎵";
  }
}

function setVolume(value) {
  if (!music) return;
  const volumeValue = parseFloat(value);
  music.volume = volumeValue;
  localStorage.setItem("musicVolume", volumeValue);
}
