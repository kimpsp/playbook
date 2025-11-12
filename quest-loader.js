// === 🧩 Основные элементы интерфейса ===
const questTitle = document.getElementById("quest-title");
const narration = document.getElementById("narration");
const choices = document.getElementById("choices");
const inventoryEl = document.getElementById("inventory") || null;
const adBanner = document.getElementById("ad-banner"); // Баннер (может быть пустым)

// === 🔍 Получение параметров из URL ===
const queryParams = new URLSearchParams(window.location.search);
const questFile = queryParams.get("quest") || "quests/default.json";

// === 🗂️ Глобальные переменные ===
let questData;
let current;
let inventory = []; // Хранит ID предметов

// === 🎵 Аудио-проигрыватель (один экземпляр) ===
const audioPlayer = new Audio();
audioPlayer.loop = true;

// === 📦 Загрузка квеста ===
async function loadQuest() {
  try {
    const response = await fetch(questFile);
    if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);

    questData = await response.json();

    // Установка начального узла
    current = questData.startNode;

    // Настройка заголовка
    questTitle.textContent = questData.title;

    // Воспроизведение музыки (если есть)
    const musicSrc = questData.music || questData.default_music;
    if (musicSrc) {
      audioPlayer.src = musicSrc;
      audioPlayer.play().catch(e => console.warn("Автовоспроизведение отклонено"));
    }

    // Отображение первого узла
    showNode(current);

  } catch (error) {
    console.error("Не удалось загрузить квест:", error);
    narration.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
  }
}

// === 🧭 Отображение узла ===
function showNode(key) {
  const node = questData.nodes[key];
  if (!node) {
    narration.innerHTML = `<p>⚠️ Узел "${key}" не найден.</p>`;
    return;
  }

  // Очистка
  narration.innerHTML = "";
  choices.innerHTML = "";

  // === 🖼️ Изображение (если есть) ===
  if (node.image) {
    const img = document.createElement("img");
    img.src = node.image;
    img.alt = "Сцена";
    img.classList.add("scene-image");
    narration.appendChild(img);
  }

  // === 📝 Текст ===
  const textP = document.createElement("p");
  textP.textContent = node.text;
  narration.appendChild(textP);

  // === 🎒 Обработка действий (например, добавление в инвентарь) ===
  if (node.actions && Array.isArray(node.actions)) {
    node.actions.forEach(action => {
      if (action.type === "add_inventory" && action.item) {
        if (!inventory.includes(action.item)) {
          inventory.push(action.item);
        }
      }
      if (action.type === "remove_inventory" && action.item) {
        inventory = inventory.filter(id => id !== action.item);
      }
    });
  }

  // === 🧰 Обновление инвентаря (если элемент существует) ===
  updateInventory();

  // === 🔘 Кнопки выбора ===
  if (node.choices && node.choices.length > 0) {
    node.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;

      btn.onclick = () => {
        if (choice.next === "home") {
          window.location.href = "index.html";
        } else {
          current = choice.next;
          showNode(current);
        }
      };

      choices.appendChild(btn);
    });
  } else {
    // Если нет выборов — добавляем кнопку "На главную"
    const btn = document.createElement("button");
    btn.textContent = "На главную";
    btn.onclick = () => {
      window.location.href = "index.html";
    };
    choices.appendChild(btn);
  }

  // === 📢 Рекламный баннер (просто для демонстрации) ===
  if (adBanner) {
    adBanner.innerHTML = `
      <a href="https://example.com" target="_blank">
        <img src="ads/banner_728x90.jpg" alt="Реклама" style="width:100%; max-width:728px; height:auto;">
      </a>
    `;
  }
}

// === 🎒 Обновление отображения инвентаря ===
function updateInventory() {
  if (!inventoryEl || !questData.inventory) return;

  inventoryEl.innerHTML = "<h3>Инвентарь:</h3>";
  if (inventory.length === 0) {
    inventoryEl.innerHTML += "<p>Пусто</p>";
    return;
  }

  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.style.padding = "0";

  inventory.forEach(itemId => {
    const item = questData.inventory.find(i => i.id === itemId);
    if (item) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.name}</strong>: ${item.description}`;
      ul.appendChild(li);
    }
  });

  inventoryEl.appendChild(ul);
}

// === ⏱️ Запуск после загрузки страницы ===
window.addEventListener("DOMContentLoaded", loadQuest);
