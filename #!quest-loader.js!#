// === 🧩 Получаем элементы интерфейса ===
// Убедитесь, что на странице есть элементы с этими ID
const questTitle = document.getElementById("quest-title");
const narration = document.getElementById("narration");
const choices = document.getElementById("choices");

// === 🔍 Получаем имя файла квеста из URL ===
const queryParams = new URLSearchParams(window.location.search);
const questFile = queryParams.get("quest") || "quests/default.json"; // путь по умолчанию

// === 🗂️ Переменные для хранения данных квеста ===
let questData;
let current; // будет установлен после загрузки квеста

// === 📦 Загрузка квеста из JSON ===
async function loadQuest() {
  try {
    const response = await fetch(questFile);

    // Проверяем, успешен ли запрос
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }

    questData = await response.json();

    // Устанавливаем текущий узел из startNode
    current = questData.startNode;

    // Проверяем, существует ли начальный узел
    if (!questData.nodes[current]) {
      throw new Error(`Начальный узел "${current}" не найден в nodes.`);
    }

    // Отображаем название и первый узел
    questTitle.textContent = questData.title || "Текстовый квест";
    showNode(current);

  } catch (error) {
    console.error("Не удалось загрузить квест:", error);
    narration.textContent = `Ошибка загрузки квеста: ${error.message}. Проверьте путь к файлу или содержимое JSON.`;
    choices.innerHTML = "";
  }
}

// === 🧭 Отображение узла квеста ===
function showNode(key) {
  const node = questData.nodes[key];

  // Проверка существования узла
  if (!node) {
    narration.textContent = "Ошибка: узел не найден.";
    choices.innerHTML = `<button onclick="location.href='index.html'">На главную</button>`;
    return;
  }

  // Безопасное присвоение текста
  narration.textContent = node.text || "Нет описания.";

  // Очищаем предыдущие кнопки
  choices.innerHTML = "";

  // Если узел не имеет выборов — это финал
  if (!node.choices || node.choices.length === 0) {
    const btn = document.createElement("button");
    btn.textContent = "На главную";
    btn.onclick = () => {
      window.location.href = "index.html";
    };
    choices.appendChild(btn);
    return;
  }

  // Создаём кнопки для каждого выбора
  node.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text || "Продолжить";

    btn.onclick = () => {
      if (choice.next === "home") {
        window.location.href = "index.html"; // переход на главную
      } else {
        current = choice.next;
        showNode(current); // переход к следующему узлу
      }
    };

    choices.appendChild(btn);
  });
}

// === ⏱️ Запуск квеста после загрузки страницы ===
window.addEventListener("DOMContentLoaded", loadQuest);
