const TASK = require('./tarea.js');
const { setStorage } = require('./storage.js');

const clearAll = () => {
  TASK.TASKarr = TASK.TASKarr.filter((task) => task.completed !== true);
  TASK.TASKarr.forEach((task, ind) => {
    task.index = ind + 1;
  });
  setStorage();
};

module.exports = clearAll;