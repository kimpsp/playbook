const questContainer = document.getElementById("quests");

quests.forEach(quest => {
  const card = document.createElement("div");
  card.className = "quest-card";

  // Превью изображение (заглушка или реальное)
  const image = document.createElement("div");
  image.className = "quest-image";
  image.style.backgroundImage = quest.image
    ? `url(${quest.image})`
    : `url('placeholder.jpg')`; // добавь заглушку в проект

  // Название
  const title = document.createElement("div");
  title.className = "quest-title";
  title.textContent = quest.title;

  // Статус
  const status = document.createElement("div");
  status.className = "quest-status";
  status.textContent = quest.status;

  // Кнопка "Начать"
  if (quest.available && quest.file) {
    const btn = document.createElement("button");
    btn.textContent = "Начать";
    btn.onclick = () => {
      window.location.href = `quest.html?quest=${quest.file}`;
    };
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(status);
    card.appendChild(btn);
  } else {
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(status);
  }

  questContainer.appendChild(card);
});
