const { setStorage } = require('./storage.js');
const TASK = require('./tarea.js');

const modifyTask = (index, value) => {
  TASK.TASKarr[index - 1].taskDescrip = value;
  setStorage();
};

module.exports = modifyTask;