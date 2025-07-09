function renderQuests() {
  const container = document.getElementById("quests");
  container.innerHTML = "";

  quests.forEach(q => {
    const card = document.createElement("div");
    card.className = "quest-card";

    card.innerHTML = `
      <div class="quest-title">${q.id}. ${q.title}</div>
      <div class="quest-status">${q.status}</div>
      ${q.available ? `<button onclick="startQuest('${q.file}')">Начать</button>` : ""}
    `;

    container.appendChild(card);
  });
}

function startQuest(file) {
  window.location.href = file;
}

window.onload = renderQuests;
