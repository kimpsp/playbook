// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
let audioContext;
let audioSource;
let gainNode;

const musicBtn = document.getElementById("music-toggle-btn");
const volumeSlider = document.getElementById("volume-slider");

let isPlaying = false;
let audioBuffer;

// === ИНИЦИАЛИЗАЦИЯ ===

// Создаём контекст при первом взаимодействии пользователя
document.addEventListener("click", loadAndPlayAudio, { once: true });

function loadAndPlayAudio() {
  // Инициализируем AudioContext
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Загружаем аудиофайл
  fetch("sounds/menu_theme_long.mp3")
    .then(response => response.arrayBuffer())
    .then(data => {
      return new Promise((resolve, reject) => {
        audioContext.decodeAudioData(data, resolve, reject);
      });
    })
    .then(buffer => {
      audioBuffer = buffer;

      // Создаём источник и узел громкости
      audioSource = audioContext.createBufferSource();
      gainNode = audioContext.createGain();

      // Настраиваем цепочку воспроизведения
      audioSource.buffer = audioBuffer;
      audioSource.loop = true;
      audioSource.connect(gainNode).connect(audioContext.destination);

      // Воспроизводим
      audioSource.start();
      isPlaying = true;
      musicBtn.textContent = "⏸️";

      // Устанавливаем начальную громкость
      gainNode.gain.value = parseFloat(volumeSlider.value);
    })
    .catch(e => {
      console.error("Ошибка загрузки или воспроизведения аудио:", e);
    });
}

// === ФУНКЦИИ ===

function toggleMusic() {
  if (!audioContext || !audioBuffer) return;

  if (!isPlaying) {
    // Возобновяем воспроизведение
    audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.loop = true;
    audioSource.connect(gainNode).connect(audioContext.destination);
    audioSource.start();
    isPlaying = true;
    musicBtn.textContent = "⏸️";
  } else {
    // Ставим на паузу
    audioSource.stop();
    isPlaying = false;
    musicBtn.textContent = "🎵";
  }
}

function setVolume(value) {
  if (!gainNode) return;
  gainNode.gain.value = parseFloat(value);
}

// === ОБРАБОТЧИКИ СОБЫТИЙ ===

if (musicBtn) {
  musicBtn.addEventListener("click", toggleMusic);
}

if (volumeSlider) {
  volumeSlider.addEventListener("input", () => {
    setVolume(volumeSlider.value);
  });

  volumeSlider.addEventListener("touchmove", () => {
    setVolume(volumeSlider.value);
  });
}
