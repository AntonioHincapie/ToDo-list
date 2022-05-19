const { addTask } = require('./functions.js');
const { deleteTask } = require('./functions.js');
const { getTasks } = require('./functions.js');
const { setTasks } = require('./functions.js');
const { add } = require('./userex.js');
const { removeTaskUser } = require('./userex.js');

// Mock HTML
const html = `<section id="todo-list">
<h1 class="head-form">Today's To Do <span class="material-symbols-outlined">autorenew</span></h1>
<form class="add-items">
  <div class="placeholder">
    <input id="description" type="text" value="Add yo your list...">
    <span class="material-symbols-outlined">keyboard_return</span>
  </div>
  <ul class="check-list"></ul>
  <button class="btn" type="button"> Clear all completed </button>
</form>
</section>`;

const liElement = `<li>
  <input id="ck-id" class="check-box" type="checkbox" name="checkBox">
  <label class="lb-task" id="lb-id" for="ta-id">description</label>
  <textarea id="ta-id" class="ta-task" name="edit-task">description</textarea>
  <span class="dots material-symbols-outlined">more_vert</span>
  <span class="trash material-symbols-outlined">delete</span>
</li>`;

document.body.innerHTML = html;

// Test pure functions
describe('Add and Remove from storage', () => {
  test('Add item', () => {
    addTask({
      description: 'Some task', completed: false, index: 1, id: 1,
    });
    expect(getTasks()).toEqual([
      {
        description: 'Some task',
        completed: false,
        index: 1,
        id: 1,
      },
    ]);
  });

  test('Remove item', () => {
    setTasks([{
      description: 'Some task',
      completed: false,
      index: 1,
      id: 1,
    }]);
    deleteTask('1');
    expect(getTasks()).toBeDefined();
    expect(getTasks()).toHaveLength(0);
  });
});

// Test HTML DOM manipulation
describe('Add and Remove from HTML', () => {
  test('Add', () => {
    const liContainer = document.querySelector('.check-list');
    const event = {
      preventDefault: () => {},
    };
    add(event);
    expect(liContainer.childNodes).toBeDefined();
    expect(liContainer.childNodes).toHaveLength(1);
  });

  test('Remove', () => {
    const liContainer = document.querySelector('.check-list');
    liContainer.innerHTML = liElement;
    const btnElement = document.querySelector('.trash');
    const event = {
      target: btnElement,
    };
    removeTaskUser(event);
    expect(liContainer.childNodes).toBeDefined();
    expect(liContainer.childNodes).toHaveLength(0);
  });
});
