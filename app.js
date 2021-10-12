const btEl = document.querySelector('#bosnia .date');

let now = dayjs();

let now2 = now.format();
// console.log(now, now2);
// const time = setInterval(function () {
//   const btNew = dayjs().format();
//   console.log(btNew);
//   btEl.textContent = btNew;
// }, 1000);

// Todo app

// Todo selectors
const taskSection = document.querySelector('.task-section');
const formSubmit = document.querySelector('#submitBtn');
const textInput = document.getElementById('todoTask');
const clearAll = document.querySelector('.clear-all');
const saveBtn = document.querySelector('.saveBtn');
const newListBtn = document.querySelector('.newListBtn');

const selectBar = document.querySelector('#select-list');

// Once DOM is loaded, check the LS and render from it
window.addEventListener('DOMContentLoaded', function () {
  checkLS();
});

// Add a list function
function addList() {
  let createID = Date.now();

  const tC = document.createElement('div');
  tC.classList.add('task-container');
  tC.id = createID;
  const title = document.createElement('h4');
  title.classList.add('title');
  title.textContent = 'Name of the list...';
  const removeBtn = document.createElement('i');
  removeBtn.classList.add('fas', 'fa-times-circle', 'removeList');
  const ul = document.createElement('ul');
  ul.classList.add('task-list');

  tC.appendChild(removeBtn);
  tC.appendChild(title);
  tC.appendChild(ul);

  taskSection.appendChild(tC);

  const optionEl = document.createElement('option');

  optionEl.textContent = title.innerText;
  optionEl.value = tC.id;

  selectBar.append(optionEl);
  storeLS();
}

/* <div class="task-container">
            <ul class="task-list"></ul>
            <div class="clear-all">
              <a href="#" class="clearBtn">Clear all</a>
            </div>
          </div> */

// Add a task function
function addTask(text) {
  const lists = document.querySelectorAll('.task-container');

  const selectedValue = selectBar.value;
  if (selectedValue != undefined) {
    lists.forEach(function (list) {
      if (list.id === selectedValue) {
        const li = document.createElement('li');
        li.classList.add('task-item');

        if (text == '' || text == null) {
          return;
        } else {
          li.innerHTML =
            text +
            `<span class="btns"><i class="fas fa-edit editBtn"></i><i class="fas fa-eraser removeBtn"></i></span>`;
          list.childNodes[2].appendChild(li);
        }
      }
    });
  }

  // donji dio

  textInput.value = '';
}

// function editTask(text) {}
// Event listeners

// listTitle.forEach(function (list) {
//
// });

newListBtn.addEventListener('click', function () {
  addList();
});

textInput.addEventListener('focusin', function () {
  textInput.placeholder = 'npr. Operi ves.';
});

textInput.addEventListener('focusout', function () {
  textInput.placeholder = 'Write something...';
});

formSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  // // const selected = selectBar.options[selectBar.selectedIndex].text;
  // const lists = document.querySelectorAll('.task-container');

  if (textInput.value != '') {
    addTask(textInput.value);
    storeLS();
  } else return;
});

taskSection.addEventListener('click', function (e) {
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

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.name = 'editInput';
    inputField.id = 'editInput';
    inputField.setAttribute('autofocus', true);
    liEl.forEach(function (li) {
      if (li.textContent === clickText) {
        li.addEventListener('dblclick', function () {
          inputField.value = clickText;
          li.innerHTML = '';
          inputField.autofocus = 'true';
          li.appendChild(inputField);
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
  } else if (click.classList.contains('title')) {
    const titles = document.querySelectorAll('.title');
    titles.forEach(function (title) {
      let savedText = title.textContent;
      title.addEventListener('dblclick', function () {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.name = 'editInput';
        inputField.id = 'editInput';

        inputField.setAttribute('autofocus', true);
        inputField.value = savedText;
        title.innerHTML = '';
        title.appendChild(inputField);

        title.addEventListener('focusout', function () {
          title.textContent = savedText;
        });
        inputField.addEventListener('keydown', function (e) {
          if (inputField.value === '') {
            return;
          } else {
            const text = inputField.value;

            if (e.key === 'Enter') {
              title.textContent = text;
              storeLS();
            }
          }
        });
      });
    });
  } else if (click.classList.contains('removeList')) {
    click.parentElement.remove();
    storeLS();
  }
});

clearAll.addEventListener('click', function (e) {
  const tasksEl = document.querySelectorAll('.task-item');
  const tasksCont = document.querySelectorAll('.task-container');
  const options = document.querySelectorAll('option');
  tasksEl.forEach(function (task) {
    task.remove();
  });
  tasksCont.forEach(function (task) {
    task.remove();
  });
  if (options) {
    options.forEach(function (option) {
      option.remove();
    });
  }
  localStorage.clear();
});

// Add to Local Storage
function storeLS() {
  const taskCont = document.querySelectorAll('.task-container');
  const taskEl = document.querySelectorAll('.task-item');

  let todoList = [];

  taskCont.forEach(function (task) {
    const textEl = task.childNodes[2].childNodes;
    let data = {
      id: undefined,
      title: undefined,
      tasks: [],
      optionID: undefined,
    };
    if (textEl.length != 0) {
      textEl.forEach(function (text) {
        data.tasks.push(text.innerText);
      });
    } else return;
    data.id = task.id;
    data.title = task.childNodes[1].innerText;
    data.optionID = task.id;

    todoList.push(data);

    localStorage.setItem('TodoList', JSON.stringify(todoList));
    data = {
      id: undefined,
      title: undefined,
      tasks: [],
      optionID: undefined,
    };
  });

  // *** THE OLD WAY!!! ***
  // const tasksEl = document.querySelectorAll('.task-item');
  // const tasks = [];

  // tasksEl.forEach(function (task) {
  //   tasks.push(task.textContent);
  // });
}

// Check, pull and render from local storage
function checkLS() {
  const checkList = JSON.parse(localStorage.getItem('TodoList'));

  if (checkList == undefined || checkList == null) {
    return;
  } else {
    checkList.forEach(function (list) {
      const id = list.id;
      const storageTitle = list.title;
      const tasks = list.tasks;
      const optionID = list.optionID;

      const tC = document.createElement('div');
      tC.classList.add('task-container');
      tC.id = id;

      const title = document.createElement('h4');
      title.classList.add('title');
      title.textContent = storageTitle;

      const removeBtn = document.createElement('i');
      removeBtn.classList.add('fas', 'fa-times-circle', 'removeList');
      const ul = document.createElement('ul');
      ul.classList.add('task-list');

      tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.innerHTML =
          task +
          `<span class="btns"><i class="fas fa-edit editBtn"></i><i class="fas fa-eraser removeBtn"></i></span>`;

        ul.appendChild(li);
      });

      tC.appendChild(removeBtn);
      tC.appendChild(title);
      tC.appendChild(ul);

      taskSection.appendChild(tC);

      const optionEl = document.createElement('option');

      optionEl.textContent = list.title;
      optionEl.value = optionID;

      selectBar.appendChild(optionEl);
    });
  }

  // const lsTasks = JSON.parse(localStorage.getItem('tasks'));

  // if (lsTasks != undefined || lsTasks != null) {
  //   lsTasks.forEach(function (task) {
  //     const li = document.createElement('li');
  //     li.classList.add('task-item');
  //     li.innerHTML =
  //       task +
  //       `<span class="btns"><i class="fas fa-edit editBtn"></i><i class="fas fa-eraser removeBtn"></i></span>`;

  //     ul.appendChild(li);
  //   });
  // }
}
// Todo app end
