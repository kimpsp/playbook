// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle-btn");
const volumeSlider = document.getElementById("volume-slider");

let isMusicStarted = false;

console.log("music:", music);
console.log("musicBtn:", musicBtn);
console.log("volumeSlider:", volumeSlider);

if (!music) {
  console.warn("❌ Элемент <audio> не найден");
}

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
} else {
  console.warn("⚠️ Не все элементы управления музыкой найдены");
}

// === ФУНКЦИИ ===

function handleFirstClick(event) {
  // Проверяем, не был ли клик по управлению музыкой
  const targetIsNotAudioControl = !event.target.closest(".audio-controls");

  if (!isMusicStarted && targetIsNotAudioControl) {
    playMusic();
  }
}

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
        musicBtn.textContent = "⏸️";
      })
      .catch(() => {
        console.warn("❌ Не удалось возобновить воспроизведение");
      });
  } else {
    music.pause();
    localStorage.setItem("musicState", "paused");
    musicBtn.textContent = "🎵";
  }
}

function setVolume(value) {
  if (!music) return;
  const volumeValue = parseFloat(value);
  music.volume = volumeValue;
  localStorage.setItem("musicVolume", volumeValue);
}
