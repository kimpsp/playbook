const quests = [
  {
    id: 1,
    title: "Jurrassic World Park",
    status: "Тестирование",
    available: true,
    file: "quests/quest1.json"
  },
  {
    id: 2,
    title: "Лабиринт v2",
    status: "Разработка",
    available: true,
    file: "quest2.html"
  },
  {
    id: 3,
    title: "Лабиринт v3",
    status: "Паузы",
    available: false
    //file: "quest3.html"
  },
  {
    id: 4,
    title: "Проклятие болот",
    status: "Пауза",
    available: false
  },
  {
    id: 5,
    title: "Башня теней",
    status: "Пауза",
    available: false,
  },
  {
    id: 6,
    title: "Башня теней дубль для теста генераций",
    status: "Пауза",
    available: false
  }
];



// <script>
//   function selectQuest(button) {
//     // Находим все карточки
//     const cards = document.querySelectorAll('.quest-card');

//     // Убираем у всех класс 'active'
//     cards.forEach(card => card.classList.remove('active'));

//     // Находим родителя кнопки (это наш .quest-card)
//     const selectedCard = button.closest('.quest-card');

//     // Добавляем класс 'active' только этой карточке
//     selectedCard.classList.add('active');
//   }a
// </script>
