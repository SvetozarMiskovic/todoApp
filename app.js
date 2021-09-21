const formSubmit = document.querySelector('#submitBtn');
const textInput = document.getElementById('todoTask');
const ul = document.querySelector('.task-container ul');
const clearAll = document.querySelector('.clear-all');
const saveBtn = document.querySelector('.saveBtn');

// Once DOM is loaded, check the LS and render from it
window.addEventListener('DOMContentLoaded', function () {
  checkLS();
});

// Add a task function
function addTask(text) {
  const li = document.createElement('li');

  li.classList.add('task-item');

  if (text == '' || text == null) {
    return;
  } else {
    li.innerHTML =
      text +
      `<span class="btns"><i class="fas fa-edit editBtn"></i><i class="fas fa-eraser removeBtn"></i></span>`;

    ul.appendChild(li);
  }
  textInput.value = '';
}

// function editTask(text) {}
// Event listeners
textInput.addEventListener('focusin', function () {
  textInput.placeholder = 'npr. Operi ves.';
});

textInput.addEventListener('focusout', function () {
  textInput.placeholder = 'Write something...';
});

formSubmit.addEventListener('click', function (e) {
  e.preventDefault();

  addTask(textInput.value);
  storeLS();
});

ul.addEventListener('click', function (e) {
  e.preventDefault();
  const click = e.target;
  const clickText = e.target.parentElement.parentElement.textContent;

  if (click.classList.contains('removeBtn')) {
    click.parentElement.parentElement.remove();

    storeLS();
  } else if (click.classList.contains('editBtn')) {
    textInput.value = clickText;
    saveBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const tasksEl = document.querySelectorAll('.task-item');
      tasksEl.forEach(function (task) {
        if (task.textContent == clickText) {
          task.innerHTML =
            textInput.value +
            `<span class="btns"><i class="fas fa-edit editBtn"></i><i class="fas fa-eraser removeBtn"></i></span>`;
          storeLS();
        }
      });
    });
  }
});

clearAll.addEventListener('click', function () {
  const tasksEl = document.querySelectorAll('.task-item');

  tasksEl.forEach(function (task) {
    task.remove();
  });

  localStorage.clear();
});

// Add to Local Storage
function storeLS() {
  const tasksEl = document.querySelectorAll('.task-item');
  const tasks = [];

  tasksEl.forEach(function (task) {
    tasks.push(task.textContent);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Check, pull and render from local storage
function checkLS() {
  const lsTasks = JSON.parse(localStorage.getItem('tasks'));

  if (lsTasks != undefined || lsTasks != null) {
    lsTasks.forEach(function (task) {
      const li = document.createElement('li');
      li.classList.add('task-item');
      li.innerHTML =
        task +
        `<span class="btns"><i class="fas fa-edit editBtn"></i><i class="fas fa-eraser removeBtn"></i></span>`;

      ul.appendChild(li);
    });
  }
}
