const { getTasks } = require('./functions.js');
const { updateTask } = require('./functions.js');
const { deleteTask } = require('./functions.js');
const { loadTasks } = require('./functions.js');
const { addTask } = require('./functions.js');
const { checkStatus } = require('./functions.js');
const { getLastId } = require('./functions.js');
const { setLastId } = require('./functions.js');
const { clearAllBtn } = require('./functions.js');

// Modify items

const clickLabelUser = (e) => {
  const liElement = e.target.parentNode;
  if (liElement.classList.contains('completed')) {
    return;
  }
  liElement.classList.add('editing', 'erasing');
  const taElement = e.target.nextElementSibling;
  taElement.focus();
};

const blurTextAreaUser = (e) => {
  const lblElement = e.target.previousElementSibling;
  lblElement.innerHTML = e.target.value;
  const liElement = e.target.parentNode;
  const { taskid } = e.target.parentNode.dataset;
  setTimeout(() => {
    liElement.classList.remove('editing', 'erasing');
  }, 750);
  updateTask(taskid, e.target.value);
};

// Delete items

const removeTaskUser = (e) => {
  const { taskid } = e.target.parentNode.dataset;
  deleteTask(taskid);
  const liElement = e.target.parentNode;
  liElement.remove();
  const list = document.querySelectorAll('.list-items');
  const tasks = getTasks();
  list.forEach((e) => {
    e.dataset.taskindex = tasks.find((ee) => ee.id === Number(e.dataset.taskid)).index;
  });
};

// If checked

const checkStatusUser = (e) => {
  const { taskid } = e.target.parentNode.dataset;
  checkStatus(taskid);
  const liElement = e.target.parentNode;
  liElement.classList.toggle('completed', !liElement.classList.contains('completed'));
};

// Clear all completed

const clearCompletedUser = () => {
  const ulElement = document.querySelector('.check-list');
  const liElements = ulElement.childNodes;
  let i = 0;
  while (i < liElements.length) {
    const liElement = liElements[i];
    const cbElement = liElement.querySelector('.check-box');
    if (cbElement.checked) {
      liElement.remove();
    } else {
      i += 1;
      liElement.dataset.taskindex = i;
    }
  }
  clearAllBtn();
};

// Create new items

const createTask = (task) => {
  const tasks = getTasks();
  tasks.sort((a, b) => a.index - b.index);
  const ulList = document.querySelector('.check-list');
  const insideUl = `
  <input id="ck-${task.id}" class="check-box" type="checkbox" name="checkBox">
  <label class="lb-task" id="lb-${task.id}" for="ta-${task.id}">${task.description}</label>
  <textarea id="ta-${task.id}" class="ta-task" name="edit-task">${task.description}</textarea>
  <span class="dots material-symbols-outlined">more_vert</span>
  <span class="trash material-symbols-outlined">delete</span>
  `;

  const liToTasks = document.createElement('li');
  liToTasks.setAttribute('class', 'list-items');
  if (task.isCompleted) {
    liToTasks.classList.add('completed');
  }
  liToTasks.setAttribute('data-taskid', `${task.id}`);
  liToTasks.setAttribute('data-taskindex', `${task.index}`);
  liToTasks.innerHTML = insideUl;
  liToTasks.querySelector('.lb-task').onclick = clickLabelUser;
  liToTasks.querySelector('.ta-task').onblur = blurTextAreaUser;
  liToTasks.querySelector('.trash').onclick = removeTaskUser;
  const cbElement = liToTasks.querySelector('.check-box');
  cbElement.checked = task.isCompleted;
  cbElement.onclick = checkStatusUser;
  ulList.appendChild(liToTasks);
};

// Add items

const inputElement = () => document.querySelector('#description');
const todoForm = () => document.querySelector('.add-items');
const add = (e) => {
  e.preventDefault();
  const inputValue = inputElement().value;
  if (inputValue !== '') {
    const tasks = getTasks();
    const indexId = tasks.length + 1;
    const id = getLastId() + 1;
    setLastId(id);
    const task = {
      description: inputValue,
      isCompleted: false,
      index: indexId,
      id,
    };
    addTask(task);
    createTask(task);
    todoForm().reset();
  }
  inputElement().focus();
};

const displayTasks = () => {
  const tasks = getTasks();
  tasks.forEach((task) => createTask(task));
};

const setup = () => {
  loadTasks();
  displayTasks();
  todoForm().addEventListener('submit', add);
  document.querySelector('.btn').addEventListener('click', () => clearCompletedUser());
};

module.exports = {
  blurTextAreaUser,
  removeTaskUser,
  checkStatusUser,
  clearCompletedUser,
  add,
  setup,
};