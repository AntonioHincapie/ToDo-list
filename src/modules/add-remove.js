const TASK = require('./tarea.js');
const { addInput } = require('./variables.js');
const { setStorage } = require('./storage.js');

const addTask = () => {
  TASK.TASKarr.push({
    taskDescrip: addInput.value, completed: false, index: TASK.TASKarr.length + 1,
  });
  setStorage();
};

const deleteTask = (element) => {
  TASK.TASKarr = TASK.TASKarr.filter((task) => task.index !== parseInt(element.id, 10));
  TASK.TASKarr.forEach((task, ind) => {
    task.index = ind + 1;
  });
  element.remove();
  setStorage();
};

module.exports = { addTask, deleteTask };