let position = 'start'; // Начальная точка
const maze = {
  start: { right: 'a1', forward: null, left: null },
  a1: { right: 'a2', forward: null, left: 'trap1' },
  a2: { right: 'exit', forward: 'b1', left: null },
  b1: { right: 'trap2', forward: null, left: 'a2' },
  trap1: { message: 'Вы провалились в яму...', end: true },
  trap2: { message: 'Стена оживает и закрывает путь...', end: true },
  exit: { message: 'Вы нашли выход!', end: true },
};

function move(direction) {
  const nextPosition = maze[position][direction];
  if (!nextPosition) {
    alert('Вы не можете пойти в этом направлении.');
    return;
  }

  if (maze[nextPosition].end) {
    alert(maze[nextPosition].message);
    return;
  }

  position = nextPosition;
  updateUI();
}

function updateUI() {
  const description = document.getElementById('description');
  description.innerHTML = `
    Вы стоите в коридоре. Справа — стена. Что делать?
    <button onclick="move('forward')">Идти прямо</button>
    <button onclick="move('left')">Повернуть налево</button>
    <button onclick="move('right')">Повернуть направо</button>
  `;
}
