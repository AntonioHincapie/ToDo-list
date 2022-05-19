const { setTasks } = require('./functions.js');
const { getTasks } = require('./functions.js');
const { updateTask } = require('./functions.js');

describe('Modify, Clear All, If Checked in Storage', () => {
  test('Modify the value of the task', () => {
    setTasks([{
      description: 'Some input',
      isCompleted: false,
      index: 1,
      id: 1,
    }]);
    const newValue = 'Other input';
    updateTask('1', newValue);
    const items = getTasks();
    expect(items).toBeDefined();
    expect(items).toHaveLength(1);
    expect(items[0].description).toBe(newValue);
  });
});