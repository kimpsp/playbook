// === Проверяем, доступен ли контейнер для квестов ===
const questContainer = document.getElementById("quests");
if (!questContainer) {
    console.warn("Контейнер .quests не найден. renderQuests.js остановлен.");
    // Можно также показать сообщение пользователю
    // document.body.innerHTML += "<p>Ошибка загрузки квестов</p>";
    exit;
}

// === Предположим, что данные квестов передаются как массив объектов ===
// В реальности этот массив должен загружаться через fetch() из quests.json
// Для примера создаём его здесь:

const quests = [
    {
        title: "Приключение 1",
        description: "Исследуйте древний замок.",
        status: "Доступен",
        file: "quest1.json",
        cover: "images/quest1.jpg",
        new_badge: true,
        available: true
    },
    {
        title: "Приключение 2",
        description: "Спасите принцессу.",
        status: "В процессе",
        file: "",
        cover: "",
        new_badge: false,
        available: false
    }
];

// === Отрисовка квестов ===

quests.forEach(quest => {
    const card = document.createElement("div");
    card.className = "quest-card";

    // Бейдж "Новинка"
    if (quest.new_badge) {
        const badge = document.createElement("div");
        badge.className = "badge-new";
        badge.textContent = "Новинка";
        card.appendChild(badge);
    }

    // Обложка квеста
    const cover = document.createElement("div");
    cover.className = "quest-cover";

    const img = document.createElement("img");
    img.alt = quest.title || "Квест";

    if (quest.cover) {
        img.src = quest.cover;
    } else {
        img.src = "images/placeholder.jpg"; // убедитесь, что файл существует
        img.alt += " (заглушка)";
    }

    cover.appendChild(img);
    card.appendChild(cover);

    // Заголовок
    const title = document.createElement("div");
    title.className = "quest-title";
    title.textContent = quest.title || "(Без названия)";
    card.appendChild(title);

    // Описание (если есть)
    if (quest.description) {
        const desc = document.createElement("div");
        desc.className = "quest-desc";
        desc.textContent = quest.description;
        card.appendChild(desc);
    }

    // Статус
    const status = document.createElement("div");
    status.className = "quest-status";
    status.textContent = quest.status || "Неизвестный статус";
    card.appendChild(status);

    // Кнопка "Начать"
    if (quest.available && quest.file) {
        const btn = document.createElement("button");
        btn.textContent = "Начать";

        btn.onclick = () => {
            window.location.href = `quest.html?quest=${encodeURIComponent(quest.file)}`;
        };

        card.appendChild(btn);
    }

    // Добавляем карточку в DOM
    questContainer.appendChild(card);
});
