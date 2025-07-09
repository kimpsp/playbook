const questTitle = document.getElementById("quest-title");
const narration = document.getElementById("narration");
const choices = document.getElementById("choices");

const queryParams = new URLSearchParams(window.location.search);
const questFile = queryParams.get("quest") || "quest1.json";

let questData;
let current = "start";

async function loadQuest() {
  const response = await fetch(`quests/${questFile}`);
  questData = await response.json();
  questTitle.textContent = questData.title;
  showNode(current);
}

function showNode(key) {
  const node = questData.nodes[key];
  narration.innerText = node.text;
  choices.innerHTML = "";

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
}

window.onload = loadQuest;
