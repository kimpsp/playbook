// === 1. Глобальные переменные ===
let current; // текущий шаг квеста
let questData; // данные загруженного квеста

// Элементы интерфейса квеста
let questTitle, narration, choices;

// Если это страница квеста — получаем элементы интерфейса
if (window.location.pathname.endsWith("quest.html")) {
  questTitle = document.getElementById("quest-title");
  narration = document.getElementById("narration");
  choices = document.getElementById("choices");
}


// === 2. Функция: переход на главную ===
function goHome() {
  window.location.href = "index.html";
}


// === 3. Функция: отображение текущего узла квеста ===
function showNode(key) {
  const node = questData.nodes[key];

  narration.textContent = node.text;
  choices.innerHTML = ""; // очищаем старые кнопки

  node.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;

    btn.onclick = () => {
      if (choice.next === "home") {
        goHome(); // если нужно вернуться на главную
      } else {
        current = choice.next;
        showNode(current); // переходим к следующему шагу
      }
    };

    choices.appendChild(btn);
  });
}


// === 4. Функция: загрузка квеста из JSON ===
async function loadQuest() {
  const queryParams = new URLSearchParams(window.location.search);
  const questFile = queryParams.get("quest") || "quest1.json";

  try {
    const response = await fetch(`quests/${questFile}`);
    questData = await response.json();

    // Устанавливаем название квеста
    questTitle.textContent = questData.title;

    // Загружаем музыку, если указана в JSON
    if (questData.music) {
      const musicElement = document.getElementById("bg-music");
      musicElement.src = questData.music;
      musicElement.play().catch(e => {
        console.log("Автовоспроизведение запрещено браузером");
      });
    }

    current = "start"; // начальный узел квеста
    showNode(current);

  } catch (error) {
    narration.textContent = "Ошибка загрузки квеста.";
    console.error("Ошибка загрузки квеста:", error);
  }
}


// === 5. Функция: рендеринг квестов на главной странице ===
async function renderQuests() {
  try {
    const response = await fetch("quests.json");
    const data = await response.json();

    const container = document.getElementById("quests");
    container.innerHTML = ""; // очистить старые квесты

    data.quests.forEach(quest => {
      const card = document.createElement("div");
      card.className = "quest-card";

      // Бейдж "Новинка"
      const newBadge = quest.new_badge ? '<div class="badge-new">Новинка</div>' : "";

      card.innerHTML = `
        <div class="quest-cover">
          ${newBadge}
          <img src="${quest.cover}" alt="${quest.title}">
        </div>
        <div class="quest-title">${quest.title}</div>
        <div class="quest-desc">${quest.description}</div>
        <div class="quest-status">${quest.status}</div>
        <button onclick="startQuest('${quest.file}')">Начать</button>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Ошибка загрузки списка квестов:", error);
  }
}


// === 6. Функция: переход к выбранному квесту ===
function startQuest(jsonFile) {
  window.location.href = `quest.html?quest=${jsonFile}`;
}


// === 7. Определение контекста: index.html или quest.html ===
if (window.location.pathname.endsWith("quest.html")) {
  loadQuest(); // загружаем квест
} else {
  renderQuests(); // отрисовываем список квестов
}
