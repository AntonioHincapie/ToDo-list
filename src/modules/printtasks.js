const TASK = require('./tarea.js');
const { list } = require('./variables.js');
const { deleteTask } = require('./add-remove.js');
const { getStorage } = require('./storage.js');
const modifyTask = require('./modifytask.js');
const changeBox = require('./checkbox.js');

const printTasks = () => {
  getStorage();
  list.innerHTML = '';
  for (let i = 0; i < TASK.TASKarr.length; i += 1) {
    const taskContainer = document.createElement('div');
    const checkBox = document.createElement('input');
    const taskText = document.createElement('input');
    const taskIndex = document.createElement('span');
    const trashCan = document.createElement('span');
    taskContainer.id = 'container';
    checkBox.type = 'checkbox';
    checkBox.value = 'false';
    checkBox.id = `${i + 1}`;
    taskText.id = `${i + 1}`;
    taskText.setAttribute('placeholder', `${TASK.TASKarr[i].taskDescrip}`);
    taskIndex.innerHTML = '&#x22EE;';
    trashCan.innerHTML = '&#x1F5D1;';
    trashCan.id = `${i + 1}`;
    trashCan.className = 'trash';
    list.appendChild(taskContainer);
    taskContainer.append(checkBox, taskText, taskIndex, trashCan);
    trashCan.addEventListener('click', (e) => {
      deleteTask(e.target);
      document.location.reload(true);
    });
    taskText.addEventListener('click', () => {
      taskIndex.style.display = 'none';
      trashCan.style.display = 'block';
    });
    taskText.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const elementIndex = taskText.id;
        const valueText = taskText.value;
        modifyTask(elementIndex, valueText);
        document.location.reload(true);
      }
    });
    list.addEventListener('mouseleave', () => {
      taskIndex.style.display = 'block';
      trashCan.style.display = 'none';
    });
    checkBox.addEventListener('change', (e) => {
      if (e.target.checked) {
        taskText.style.textDecoration = 'line-through';
        changeBox(e);
      } else {
        taskText.style.textDecoration = 'none';
        changeBox(e);
      }
    });
  }
};

module.exports = printTasks;