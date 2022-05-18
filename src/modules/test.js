const { addTask, deleteTask } = require('./add-remove.js');
const { setStorage, getStorage } = require('./storage.js');
const TASK = require('./tarea.js');

describe('Add and Delete tasks', () => {
  const htmlNoTask = `
  <div id="to-do-list">
      <div id="todo-title">
        <p>Today´s To Do</p>
        <span id="reload">&#x21bb;</span>
      </div>
      <div id="add">
        <input id="addinput" type="text" placeholder="Add to your list..." value="Some input"/>
        <span id="submittask">&#x21ea;</span>
      </div>
      <div id="list"></div>
      <button id="clear" type="reset">Clear all completed</button>
    </div>`;

    const htmlWithTask = `
    <div id="to-do-list">
      <div id="todo-title">
        <p>Today´s To Do</p>
        <span id="reload">&#x21bb;</span>
      </div>
      <div id="add">
        <input id="addinput" type="text" placeholder="Add to your list..." />
        <span id="submittask">&#x21ea;</span>
      </div>
      <div id="list">
        <div id="container">
          <input type="checkbox" value="false" id="1">
          <input id="1" placeholder="Some input">
          <span style="display: block;">⋮</span>
          <span id="1" class="trash" style="display: none;">🗑️</span>
        </div>
      </div>
      <button id="clear" type="reset">Clear all completed</button>
    </div>`;
  
  test('Add Task', () => {
    document.body.innerHTML = htmlNoTask;
    const addInput = document.getElementById('addinput');
    addInput.setAttribute('value', 'Some input');

    addTask();

    expect(getStorage()).toEqual([{
      taskDescrip: 'Some input',
      completed: false,
      index: 1,
    }]);
  });
});