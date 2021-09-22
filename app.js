const formSubmit = document.querySelector('#submitBtn');
const textInput = document.getElementById('todoTask');
const ul = document.querySelector('.task-container ul');
const clearAll = document.querySelector('.clear-all');
const saveBtn = document.querySelector('.saveBtn');

function retPrev() {
  //
}
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
  if (textInput.value != '') {
    addTask(textInput.value);
  } else return;
  storeLS();
});

ul.addEventListener('click', function (e) {
  e.preventDefault();
  const click = e.target;
  let clickText = e.target.parentElement.parentElement.textContent;

  if (click.classList.contains('removeBtn')) {
    click.parentElement.parentElement.remove();

    storeLS();
  } else if (click.classList.contains('editBtn')) {
    textInput.value = clickText;
    if (textInput.value === '') {
      return;
    } else {
      saveBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const tasksEl = document.querySelectorAll('.task-item');
        tasksEl.forEach(function (task) {
          if (task.textContent == clickText && textInput.value !== '') {
            task.innerHTML =
              textInput.value +
              `<span class="btns"><i class="fas fa-edit editBtn"></i><i class="fas fa-eraser removeBtn"></i></span>`;
            storeLS();
            textInput.value = '';
          }
        });
      });
    }
  } else if (click.classList.contains('task-item')) {
    const liEl = document.querySelectorAll('.task-item');
    clickText = e.target.textContent;
    const itemPressed = clickText;

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.name = 'editInput';
    inputField.id = 'editInput';

    liEl.forEach(function (li) {
      if (li.textContent === clickText) {
        li.addEventListener('dblclick', function () {
          inputField.value = clickText;
          li.innerHTML = '';
          inputField.autofocus = 'true';
          li.appendChild(inputField);
          // Do nothing when focus out

          // Do nothing when focus out - END!
        });

        inputField.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            li.innerHTML =
              inputField.value +
              `<span class="btns"><i class="fas fa-edit editBtn"></i><i class="fas fa-eraser removeBtn"></i></span>`;
            storeLS();
          }
        });
      }
      inputField.addEventListener('focusout', function () {
        location.reload();
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
