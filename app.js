const form = document.querySelector('form');
const textInput = document.getElementById('todoTask');
const ul = document.querySelector('.task-container ul');

document.addEventListener('DOMContentLoaded', checkLS);

function addTask(text) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  if (text == '' || text === null) {
    return;
  } else {
    li.innerHTML = text + `<i class="fas fa-eraser removeBtn"></i>`;
    ul.appendChild(li);
  }
  textInput.value = '';
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  addTask(textInput.value);
  storeLS();
});

ul.addEventListener('click', function (e) {
  const click = e.target;
  const clickText = e.target.parentElement.textContent;
  if (click.classList.contains('removeBtn')) {
    click.parentElement.remove();

    const ls = JSON.parse(localStorage.getItem('tasks'));
    const newLs = ls.filter(lsItem => lsItem !== clickText);
    console.log(newLs);
    localStorage.setItem('tasks', JSON.stringify(newLs));
  }
});

function storeLS() {
  const tasksEl = document.querySelectorAll('.task-item');
  const tasks = [];

  tasksEl.forEach(function (task) {
    tasks.push(task.textContent);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function checkLS() {
  const lsTasks = JSON.parse(localStorage.getItem('tasks'));
  if (lsTasks != undefined || lsTasks != null) {
    lsTasks.forEach(function (task) {
      const li = document.createElement('li');
      li.classList.add('task-item');
      li.innerHTML = task + `<i class="fas fa-eraser removeBtn"></i>`;
      ul.appendChild(li);
    });
  }
}
