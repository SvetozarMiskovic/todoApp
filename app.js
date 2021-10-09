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
const listTitle = document.querySelectorAll('.title');

// Once DOM is loaded, check the LS and render from it
window.addEventListener('DOMContentLoaded', function () {
  checkLS();
});

// Add a list function
function addList() {
  let createID = Date.now();
  console.log(createID);
  const tC = document.createElement('div');
  tC.classList.add('task-container');
  tC.id = createID;
  const title = document.createElement('h4');
  title.classList.add('title');
  title.textContent = 'Name of the list...';
  const removeBtn = document.createElement('i');
  removeBtn.classList.add('fas', 'fa-times-circle');
  const ul = document.createElement('ul');
  ul.classList.add('task-list');

  tC.appendChild(removeBtn);
  tC.appendChild(title);
  tC.appendChild(ul);

  taskSection.appendChild(tC);

  const optionEl = document.createElement('option');

  optionEl.textContent = `List ${selectBar.length + 1}`;
  optionEl.value = tC.id;

  selectBar.append(optionEl);

  const optTracker = [];
  let optData = { list: undefined, id: undefined };
  const options = document.querySelectorAll('option');

  options.forEach(function (option) {
    optData.list = option.textContent;
    optData.id = option.value;
    optTracker.push(optData);
    optData = { list: undefined, id: undefined };
  });

  localStorage.setItem('listTracker', JSON.stringify(optTracker));
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
  const options = document.querySelectorAll('option');

  const selectedValue = selectBar.value;
  if (selectedValue != undefined) {
    lists.forEach(function (list) {
      if (list.id === selectedValue) {
        console.log(list.id);
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

listTitle.forEach(function (list) {
  list.addEventListener('dblclick', function () {
    let savedText = list.textContent;
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.name = 'editInput';
    inputField.id = 'editInput';
    inputField.autofocus = true;
    inputField.value = savedText;
    list.innerHTML = '';
    list.appendChild(inputField);

    list.addEventListener('focusout', function () {
      list.textContent = savedText;
    });
    inputField.addEventListener('keydown', function (e) {
      if (inputField.value === '') {
        return;
      } else {
        const text = inputField.value;

        if (e.key === 'Enter') {
          list.textContent = text;
        }
      }
    });
  });
});

newListBtn.addEventListener('click', function () {
  addList();

  storeLS();
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
  const todoList = [];

  let data = { id: '', title: '', tasks: [] };
  const selectedValue = selectBar.value;
  const taskEl = document.querySelectorAll('.task-item');

  taskCont.forEach(function (task) {
    const title = task.children[1].innerText;
    let id = task.id;
    taskEl.forEach(function (text) {
      if (text.parentElement.parentElement.id == selectedValue) {
        data.tasks.push(text.innerText);
      }
      // const title = titleEl.textContent;

      // if (selectedValue == task.id) {
      // }
    });
    data.id = id;
    data.title = title;

    todoList.push(data);
    data = { id: '', title: '', tasks: [] };
  });

  localStorage.setItem('TodoList', JSON.stringify(todoList));

  // *** THE OLD WAY!!! ***
  // const tasksEl = document.querySelectorAll('.task-item');
  // const tasks = [];

  // tasksEl.forEach(function (task) {
  //   tasks.push(task.textContent);
  // });
}

// Check, pull and render from local storage
function checkLS() {
  // let optData = { list: undefined, id: undefined };
  // const optTracker = [];
  // optTracker.push(optData);
  // localStorage.setItem('listTracker', JSON.stringify(optTracker));

  const checkList = JSON.parse(localStorage.getItem('TodoList'));
  const checkTracker = JSON.parse(localStorage.getItem('listTracker'));

  if (
    checkList != undefined ||
    checkList != null ||
    checkTracker != undefined ||
    checkTracker != null
  ) {
    checkList.forEach(function (list) {
      let id = list.id;
      const storageTitle = list.title;
      const tasks = list.tasks;

      const tC = document.createElement('div');
      tC.classList.add('task-container');
      tC.id = id;
      const title = document.createElement('h4');
      title.classList.add('title');
      title.textContent = storageTitle;
      const removeBtn = document.createElement('i');
      removeBtn.classList.add('fas', 'fa-times-circle');
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

      // localNumber.forEach(function (number) {});
    });
    checkTracker.forEach(function (object) {
      const objectId = object.id;
      const objectText = object.list;
      const optionEl = document.createElement('option');

      optionEl.textContent = objectText;
      optionEl.value = objectId;

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
