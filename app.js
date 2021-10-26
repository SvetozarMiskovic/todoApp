// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Timer!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Plugins
dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);

// Selectors
const btEl = document.querySelector('#bosnia .date');
const engEl = document.querySelector('#england .date');
const ausEl = document.querySelector('#australia .date');
const japEl = document.querySelector('#japan .date');

// Format Dates Function
const formatDates = function (country, element) {
  const date = country.format('DD/MM/YYYY').toString();
  const time = country.format('HH:mm:ss');
  const day = country.format('dddd');

  return (element.innerHTML = `${day} </br>` + `${date} </br>` + `${time}`);
};
// Clocks
const time = setInterval(function () {
  const bosnia = dayjs().tz('Europe/Sarajevo');
  const japan = dayjs().tz('Asia/Tokyo');
  const england = dayjs().tz('Europe/London');
  const australia = dayjs().tz('Australia/Sydney');

  // Bosnia time
  formatDates(bosnia, btEl);
  // England time
  formatDates(england, engEl);
  // Australia time
  formatDates(australia, ausEl);
  // Japan time

  formatDates(japan, japEl);
}, 1000);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!End of Timer!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Todo app !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Todo selectors
const taskSection = document.querySelector('.task-section');
const formSubmit = document.querySelector('#submitBtn');
const textInput = document.getElementById('todoTask');
const clearAll = document.querySelector('.clear-all');
const saveBtn = document.querySelector('.saveBtn');
const newListBtn = document.querySelector('.newListBtn');
const todoApp = document.querySelector('.todo-app');
const selectBar = document.querySelector('#select-list');
const applyBtn = document.querySelector('.applyBtn');

// Once DOM is loaded, check the LS and render from it

window.addEventListener('DOMContentLoaded', function () {
  checkLS();
  checkClearBtn();
  checkColor();
});
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Check which option is selected and color!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function checkColor() {
  let rgb = { r: 0, g: 0, b: 0 };

  const colorPicker = document.querySelector('#colorPicker');
  const lists = document.querySelectorAll('.task-container');
  const selectedValue = selectBar.value;
  lists.forEach(function (list) {
    if (list.id === selectedValue) {
      let rgbCol = list.style.backgroundColor.slice(
        4,
        list.style.backgroundColor.length - 1
      );
      const rgbColArr = rgbCol.split(',');
      const r = Number(rgbColArr[0]);
      const g = Number(rgbColArr[1]);
      const b = Number(rgbColArr[2]);
      rgb = { r: r, g: g, b: b };

      function rgbToHex(r, g, b) {
        return (
          '#' + rgb.r.toString(16) + rgb.g.toString(16) + rgb.b.toString(16)
        );
      }
      const color = rgbToHex();
      colorPicker.value = color;
    }
  });
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Hide/Show Clear all button function!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function checkClearBtn() {
  const lists = document.querySelectorAll('.task-container');
  if (lists.length < 1) {
    clearAll.classList.add('hidden');
  } else {
    clearAll.classList.remove('hidden');
  }
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Add a list function!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Add a task function!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
  textInput.value = '';
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Event listeners!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
selectBar.addEventListener('click', function () {
  checkColor();
});
applyBtn.addEventListener('click', function () {
  const colorPicker = document.querySelector('#colorPicker');
  const lists = document.querySelectorAll('.task-container');

  const selectedValue = selectBar.value;
  if (selectedValue != undefined) {
    lists.forEach(function (list) {
      if (list.id === selectedValue) {
        list.style.backgroundColor = colorPicker.value;
      }
      storeLS();
    });
  }
});

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

  if (textInput.value != '') {
    addTask(textInput.value);
    storeLS();
  } else return;
});

taskSection.addEventListener('click', function (e) {
  e.preventDefault();
  const click = e.target;
  let clickText = e.target.parentElement.parentElement.textContent;

  // !!!!!!Remove a task!!!!!!
  if (click.classList.contains('removeBtn')) {
    click.parentElement.parentElement.remove();

    storeLS();
    // !!!!!!Edit a task!!!!!!
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
    // !!!!!!Edit a task(secondary option)!!!!!!
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
    // !!!!!!Edit a title!!!!!!
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
    // !!!!!!Remove a list!!!!!!
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

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Add to Local Storage!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function storeLS() {
  const taskCont = document.querySelectorAll('.task-container');

  let data = {
    id: '',
    title: '',
    tasks: [],
    optionID: '',
    color: '',
  };
  let todoList = [];

  taskCont.forEach(function (task) {
    const textEl = task.childNodes[2].childNodes;
    data.id = task.id;
    data.title = task.childNodes[1].innerText;
    data.optionID = task.id;
    data.color = task.style.backgroundColor;
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
      color: '',
    };
  });
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Read from local storage!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
      const color = list.color;

      const tC = document.createElement('div');
      tC.classList.add('task-container');
      tC.id = id;
      tC.style.backgroundColor = color;

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
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!End of Todo app !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
