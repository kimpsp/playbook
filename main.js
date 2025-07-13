// === 1. Глобальные переменные ===

// Переменная для хранения текущего шага квеста
let current;

// Переменная для хранения данных всего квеста (загружается из JSON)
let questData;

// Элементы интерфейса: заголовок, текст и кнопки выбора
// Они доступны только на странице квеста (quest.html)
let questTitle, narration, choices;

// Если мы сейчас на странице квеста — получаем элементы интерфейса
if (window.location.pathname.endsWith("quest.html")) {
    questTitle = document.getElementById("quest-title");
    narration = document.getElementById("narration");
    choices = document.getElementById("choices");
}


// === 2. Функция: переход на главную ===

/**
 * Перенаправляет пользователя на главную страницу.
 */
function goHome() {
    window.location.href = "index.html";
}


// === 3. Функция: отображение текущего узла квеста ===

/**
 * Отображает узел квеста (текст + кнопки) по ключу.
 * @param {string} key - имя текущего узла (например, 'start', 'step_1')
 */
function showNode(key) {
    const node = questData.nodes[key]; // Получаем данные текущего узла

    narration.textContent = node.text; // Выводим текст квеста
    choices.innerHTML = ""; // Очищаем старые кнопки

    // === НОВАЯ ЛОГИКА: ПОДДЕРЖКА ИЗОБРАЖЕНИЙ ===
    const questImage = document.getElementById("quest-image");
    if (questImage) {
        if (node.image) {
            questImage.src = node.image;
            questImage.style.display = "block";
        } else {
            questImage.style.display = "none";
        }
    }

    // Проходим по вариантам выбора и создаём кнопки
    node.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.classList.add("quest-choice-button"); // ✅ Применяем стиль

        // Обработчик клика на кнопку выбора
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

/**
 * Загружает JSON-файл квеста и инициализирует его отображение
 */
async function loadQuest() {
    const queryParams = new URLSearchParams(window.location.search);
    const questFile = queryParams.get("quest") || "quest1.json";

    try {
        const response = await fetch(`quests/${questFile}`);

        // Проверяем, успешен ли запрос
        if (!response.ok) {
            throw new Error("Не удалось загрузить файл квеста");
        }

        questData = await response.json(); // Парсим JSON

        // Устанавливаем заголовок квеста
        if (questTitle && questData.title) {
            questTitle.textContent = questData.title;
        }

        // Если в квесте указана музыка — загружаем и запускаем её
        if (questData.music) {
            const musicElement = document.getElementById("bg-music");
            if (musicElement) {
                musicElement.src = questData.music;
                musicElement.play().catch(e => {
                    console.log("Автовоспроизведение запрещено браузером");
                });
            }
        }

        current = "start"; // Начинаем с первого шага
        showNode(current); // Отображаем начальный узел

    } catch (error) {
        // В случае ошибки выводим сообщение пользователю
        if (narration) {
            narration.textContent = "Ошибка загрузки квеста.";
        }
        console.error("Ошибка загрузки квеста:", error);
    }
}


// === 5. Функция: создание карточки квеста ===

/**
 * Создаёт DOM-элемент карточки квеста
 * @param {Object} quest - объект квеста из JSON
 * @returns {HTMLElement}
 */
function createQuestCard(quest) {
    const card = document.createElement("div");
    card.className = "quest-card";

    // Бейдж "Новинка"
    const badge = quest.new_badge ? '<div class="badge-new">Новинка</div>' : "";

    // Кнопка действия
    let buttonHTML = "";
    switch (quest.status) {
        case "Доступен":
            buttonHTML = `<button onclick="startQuest('${encodeURIComponent(quest.file)}')">Начать</button>`;
            break;
        case "В процессе":
            buttonHTML = `<button disabled>В разработке</button>`;
            break;
        case "Заблокирован":
            buttonHTML = `<button disabled>Заблокирован</button>`;
            break;
        default:
            buttonHTML = `<button onclick="startQuest('${encodeURIComponent(quest.file)}')">Начать</button>`;
    }

    card.innerHTML = `
        ${badge}
        <div class="quest-cover">
            <img src="${encodeURIComponent(quest.cover)}" alt="${encodeURIComponent(quest.title)}">
        </div>
        <div class="quest-title">${quest.title}</div>
        <div class="quest-desc">${quest.description || ""}</div>
        <div class="quest-status">${quest.status}</div>
        ${buttonHTML}
    `;

    return card;
}


// === 6. Функция: рендеринг квестов на главной странице ===

/**
 * Загружает список квестов из quests.json и отображает их на главной
 */
async function renderQuests() {
    try {
        const response = await fetch("quests.json");
        const data = await response.json();

        const container = document.getElementById("quests");
        if (!container) return;

        container.innerHTML = ""; // Очищаем предыдущие квесты

        // Для каждого квеста создаём карточку и добавляем на страницу
        data.quests.forEach(quest => {
            const card = createQuestCard(quest);
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Ошибка загрузки списка квестов:", error);
    }
}


// === 7. Функция: переход к выбранному квесту ===

/**
 * Переход на страницу квеста с передачей имени файла в URL
 * @param {string} jsonFile - имя JSON-файла квеста
 */
function startQuest(jsonFile) {
    window.location.href = `quest.html?quest=${encodeURIComponent(jsonFile)}`;
}


// === 8. Определение контекста: index.html или quest.html ===

// Автоматически определяем, какую функцию запустить
if (window.location.pathname.endsWith("quest.html")) {
    loadQuest(); // загружаем квест
} else {
    renderQuests(); // отрисовываем список квестов
}
