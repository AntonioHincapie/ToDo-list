const { addTask, deleteTask } = require('./add-remove.js');
const { setStorage, getStorage } = require('./storage.js');



describe('Add and Delete tasks', () => {
  test('Add Task', () => {
    addTask({
      taskDescrip: addInput.value, completed: false, index: TASK.TASKarr.length + 1,
    });
    expect(getStorage()).toEqual([{
      taskDescrip: 'Some imput',
      completed: false,
      index: TASK.TASKarr.length + 1,
    }]);
  });
});