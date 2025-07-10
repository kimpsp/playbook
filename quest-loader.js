// === 🧩 Получаем элементы интерфейса ===
// ВНИМАНИЕ: этот файл должен быть подключен только на страницах с квестами
const questTitle = document.getElementById("quest-title");
const narration = document.getElementById("narration");
const choices = document.getElementById("choices");

// === 🔍 Получаем имя файла квеста из URL ===
const queryParams = new URLSearchParams(window.location.search);
const questFile = queryParams.get("quest") || "quest1.json";

// === 🗂️ Переменные для хранения данных квеста ===
let questData;
let current = "start";


// === 📦 Загрузка квеста из JSON ===
async function loadQuest() {
  try {
    const response = await fetch(`quests/${questFile}`);
    
    // Проверяем, успешен ли запрос
    if (!response.ok) throw new Error("Ошибка сети при загрузке квеста");

    questData = await response.json();
    questTitle.textContent = questData.title;
    showNode(current);

  } catch (error) {
    console.error("Не удалось загрузить квест:", error);
    narration.textContent = "Ошибка загрузки квеста. Попробуйте перезагрузить страницу.";
  }
}


// === 🧭 Отображение узла квеста ===
function showNode(key) {
  const node = questData.nodes[key];

  // Безопасное присвоение текста
  narration.textContent = node.text;
  choices.innerHTML = ""; // очищаем предыдущие кнопки

  node.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;

    btn.onclick = () => {
      if (choice.next === "home") {
        window.location.href = "index.html"; // переход на главную
      } else {
        current = choice.next;
        showNode(current); // рекурсивный вызов следующего шага
      }
    };

    choices.appendChild(btn);
  });
}


// === ⏱️ Запуск квеста после загрузки страницы ===
window.addEventListener("DOMContentLoaded", loadQuest);
