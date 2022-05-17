const { addInput } = require('./variables.js');
const { addTask } = require('./add-remove.js');
const { submitTask } = require('./variables.js');

const submit = () => {
  submitTask.addEventListener('click', () => {
    addTask();
    document.location.reload(true);
    addInput.value = '';
  });
};

module.exports = submit;