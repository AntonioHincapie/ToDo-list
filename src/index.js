import _ from 'lodash';
import './style.css';

const { clean } = require('./modules/variables.js');
const { refresh } = require('./modules/variables.js');
const printTasks = require('./modules/printtasks.js');
const clearAll = require('./modules/cleancompleted.js');
const submit = require('./modules/submittask.js');

window.onload = printTasks();

refresh.addEventListener('click', () => {
  document.location.reload(true);
});

clean.addEventListener('click', () => {
  clearAll();
  printTasks();
});

submit();