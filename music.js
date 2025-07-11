// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
let audioContext;
let audioSource;
let gainNode;

const musicBtn = document.getElementById("music-toggle-btn");
const volumeSlider = document.getElementById("volume-slider");

let isPlaying = false;
let audioBuffer;
let currentTrackUrl = null;

console.log("musicBtn:", musicBtn);
console.log("volumeSlider:", volumeSlider);

// === ИНИЦИАЛИЗАЦИЯ ===

// Проверяем, есть ли элементы управления музыкой
if (musicBtn && volumeSlider) {
  // Создаём контекст при первом взаимодействии пользователя
  document.addEventListener("click", loadAndPlayAudio, { once: true });
} else {
  console.warn("Не найдены элементы управления музыкой");
}

// === ФУНКЦИИ ===

function loadAndPlayAudio() {
  try {
    // Инициализируем AudioContext
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    console.log("AudioContext создан:", audioContext);

    // Получаем URL трека из <audio> или по умолчанию
    const audioElement = document.getElementById("bg-music");
    currentTrackUrl = audioElement?.src || "sounds/menu_theme_long.mp3";

    console.log("Трек загружен:", currentTrackUrl);

    if (!currentTrackUrl) {
      throw new Error("Не найден источник звука");
    }

    // Загружаем аудиофайл
    fetch(currentTrackUrl)
      .then(response => {
        if (!response.ok) throw new Error("Ошибка загрузки файла");
        return response.arrayBuffer();
      })
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
        if (musicBtn) musicBtn.textContent = "⏸️";

        // Устанавливаем начальную громкость
        const savedVolume = localStorage.getItem("musicVolume") || 0.5;
        gainNode.gain.value = parseFloat(savedVolume);
        if (volumeSlider) volumeSlider.value = savedVolume;
      })
      .catch(e => {
        console.error("Ошибка загрузки или воспроизведения аудио:", e);
      });

  } catch (e) {
    console.error("Ошибка создания AudioContext:", e.message);
  }
}

function toggleMusic() {
  if (!audioContext) {
    console.warn("AudioContext ещё не создан");
    alert("Подождите, музыка ещё загружается...");
    return;
  }

  if (!audioBuffer) {
    console.warn("Аудиобуфер ещё не загружен");
    alert("Файл музыки ещё загружается...");
    return;
  }

  if (!isPlaying) {
    // Возобновляем воспроизведение
    audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.loop = true;
    audioSource.connect(gainNode).connect(audioContext.destination);
    audioSource.start();
    isPlaying = true;
    if (musicBtn) musicBtn.textContent = "⏸️";
  } else {
    // Ставим на паузу
    audioSource.stop();
    isPlaying = false;
    if (musicBtn) musicBtn.textContent = "🎵";
  }
}

function setVolume(value) {
  const volumeValue = parseFloat(value);
  if (gainNode) gainNode.gain.value = volumeValue;
  localStorage.setItem("musicVolume", volumeValue); // Сохраняем
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
