const TASK = require('./tarea.js');

const setStorage = () => {
  localStorage.setItem('task', JSON.stringify(TASK.TASKarr));
};

const getStorage = () => {
  if (JSON.parse(localStorage.getItem('task'))) {
    TASK.TASKarr = JSON.parse(localStorage.getItem('task'));
  } else {
    TASK.TASKarr = [];
  }
};

module.exports = { setStorage, getStorage };