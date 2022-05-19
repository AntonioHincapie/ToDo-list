let tasks = [];
let lastId = Number(localStorage.getItem('lastId')) || 0;

const getLastId = () => lastId;

const setLastId = (id) => {
  lastId = Number(id);
  localStorage.setItem('lastId', lastId);
};

const loadTasks = () => {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const sTasks = [...tasks];
  const uTaskId = sTasks.sort((a, b) => b.id - a.id)[0]?.id || 0;
  if (uTaskId > lastId) {
    setLastId(uTaskId);
  }
};

const getTasks = () => tasks;

const setTasks = (pTasks) => {
  tasks = pTasks;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = (task) => {
  tasks.push(task);
  setTasks(tasks);
};

const updateTask = (taskId, newValue) => {
  const task = tasks.find((e) => e.id === Number(taskId));
  task.description = newValue;
  setTasks(tasks);
};

const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId, 10));
  tasks.forEach((e, i) => {
    tasks[i].index = i + 1;
  });
  setTasks(tasks);
};

const checkStatus = (taskId) => {
  const task = tasks.find((e) => e.id === Number(taskId));
  task.isCompleted = !task.isCompleted;
  setTasks(tasks);
};

const clearAllBtn = () => {
  const cleared = tasks.filter((task) => !task.isCompleted);
  tasks = cleared.map((task, i) => ({ ...task, index: i + 1 }));
  setTasks(tasks);
};

module.exports = {
  getLastId,
  setLastId,
  loadTasks,
  getTasks,
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  checkStatus,
  clearAllBtn,
};