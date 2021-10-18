// Clocks
dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);

// Selectors
const btEl = document.querySelector('#bosnia .date');
const engEl = document.querySelector('#england .date');
const ausEl = document.querySelector('#australia .date');
const japEl = document.querySelector('#japan .date');

// App
const time = setInterval(function () {
  const bosnia = dayjs().tz('Europe/Sarajevo');
  const japan = dayjs().tz('Asia/Tokyo');
  const england = dayjs().tz('Europe/London');
  const australia = dayjs().tz('Australia/Sydney');

  // Bosnia time
  const bosniaDate = bosnia.format('DD/MM/YYYY').toString();
  const bosniaTime = bosnia.format('HH:mm:ss');
  const bosniaDay = bosnia.format('dddd');

  btEl.innerHTML =
    `${bosniaDay} </br>` + `${bosniaDate} </br>` + `${bosniaTime}`;

  // England time
  const englandDate = england.format('DD/MM/YYYY').toString();
  const englandTime = england.format('HH:mm:ss');
  const englandDay = england.format('dddd');

  engEl.innerHTML =
    `${englandDay} </br>` + `${englandDate} </br>` + `${englandTime}`;

  // Australia time
  const australiaDate = australia.format('DD/MM/YYYY').toString();
  const australiaTime = australia.format('HH:mm:ss');
  const australiaDay = australia.format('dddd');

  ausEl.innerHTML =
    `${australiaDay} </br>` + `${australiaDate} </br>` + `${australiaTime}`;

  // Japan time
  const japanDate = japan.format('DD/MM/YYYY').toString();
  const japanTime = japan.format('HH:mm:ss');
  const japanDay = japan.format('dddd');

  japEl.innerHTML = `${japanDay} </br>` + `${japanDate} </br>` + `${japanTime}`;
}, 1000);

// End of Clocks

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
  checkClearBtn();
});

function checkClearBtn() {
  const lists = document.querySelectorAll('.task-container');
  if (lists.length < 1) {
    clearAll.classList.add('hidden');
  } else {
    clearAll.classList.remove('hidden');
  }
}

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
  checkClearBtn();
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
              location.reload();
            }
          }
        });
      });
    });
  } else if (click.classList.contains('removeList')) {
    const ls = JSON.parse(localStorage.getItem('TodoList'));

    if (ls.length == 1) {
      click.parentElement.remove();
      localStorage.clear();
    } else {
      click.parentElement.remove();
      storeLS();
    }

    location.reload();
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
  checkClearBtn();
});

// Add to Local Storage
function storeLS() {
  const taskCont = document.querySelectorAll('.task-container');
  let data = {
    id: '',
    title: '',
    tasks: [],
    optionID: '',
  };
  let todoList = [];

  taskCont.forEach(function (task) {
    const textEl = task.childNodes[2].childNodes;
    data.id = task.id;
    data.title = task.childNodes[1].innerText;
    data.optionID = task.id;
    if (textEl.length != 0) {
      textEl.forEach(function (text) {
        data.tasks.push(text.innerText);
      });
    }

    todoList.push(data);

    localStorage.setItem('TodoList', JSON.stringify(todoList));
    data = {
      id: '',
      title: '',
      tasks: [],
      optionID: '',
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
