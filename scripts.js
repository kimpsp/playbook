const quests = [
  {
    id: 1,
    title: "Лабиринт",
    status: "Переработка",
    available: true,
    file: "quest1.html"
  },
  {
    id: 2,
    title: "Лабиринт v2",
    status: "Доступен",
    available: true,
    file: "quest2.html"
  },
  {
    id: 3,
    title: "Лабиринт v3",
    status: "На испытаниях",
    available: true,
    file: "quest3.html"
  },
  {
    id: 4,
    title: "Проклятие болот",
    status: "В разработке",
    available: false
  },
  {
    id: 5,
    title: "Башня теней",
    status: "В разработке",
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
