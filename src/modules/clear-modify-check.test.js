const { setTasks } = require('./functions.js');
const { getTasks } = require('./functions.js');
const { updateTask } = require('./functions.js');
const { clearAllBtn } = require('./functions.js');
const { checkStatus } = require('./functions.js');

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

  test('Clear all completed tasks', () => {
    setTasks([{
      description: 'Task 1',
      isCompleted: true,
      index: 1,
      id: 1,
    },
    {
      description: 'Task 2',
      isCompleted: false,
      index: 2,
      id: 2,
    },
    {
      description: 'Task 3',
      isCompleted: true,
      index: 3,
      id: 3,
    },
    ]);
    clearAllBtn();
    const items = getTasks();
    expect(items).toBeDefined();
    expect(items).toHaveLength(1);
    expect(items[0].isCompleted).toBe(false);
    expect(items[0].index).toEqual(1);
  });

  test('Check box status', () => {
    setTasks([{
      description: 'Completed',
      isCompleted: false,
      index: 1,
      id: 1,
    }]);
    checkStatus('1');
    expect(getTasks()).toBeDefined();
    expect(getTasks()[0].isCompleted).toBe(true);
  });
});