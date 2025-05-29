<script>
  function selectQuest(button) {
    // Находим все карточки
    const cards = document.querySelectorAll('.quest-card');

    // Убираем у всех класс 'active'
    cards.forEach(card => card.classList.remove('active'));

    // Находим родителя кнопки (это наш .quest-card)
    const selectedCard = button.closest('.quest-card');

    // Добавляем класс 'active' только этой карточке
    selectedCard.classList.add('active');
  }
</script>
