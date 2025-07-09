const questContainer = document.getElementById("quests");

quests.forEach(quest => {
  const card = document.createElement("div");
  card.className = "quest-card";

  const title = document.createElement("div");
  title.className = "quest-title";
  title.textContent = quest.title;

  const status = document.createElement("div");
  status.className = "quest-status";
  status.textContent = quest.status;

  card.appendChild(title);
  card.appendChild(status);

  if (quest.available && quest.file) {
    const btn = document.createElement("button");
    btn.textContent = "Начать";
    btn.style.marginTop = "10px";
    btn.onclick = () => startQuest(quest.file);
    card.appendChild(btn);
  }

  questContainer.appendChild(card);
});
