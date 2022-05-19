const { addTask } = require('./functions.js');
const { deleteTask } = require('./functions.js');
const { getTasks } = require('./functions.js');
const { setTasks } = require('./functions.js');

describe('Add and Remove from storage', () => {
  test('Add item', () => {
    addTask({
      description: 'Finish your project', completed: false, index: 1, id: 1,
    });
    expect(getTasks()).toEqual([
      {
        description: 'Finish your project',
        completed: false,
        index: 1,
        id: 1,
      },
    ]);
  });

  test('Remove item', () => {
    setTasks([{
      description: 'Finish your project',
      completed: false,
      index: 1,
      id: 1,
    }]);
    deleteTask('1');
    expect(getTasks()).toBeDefined();
    expect(getTasks()).toHaveLength(0);
  });
});