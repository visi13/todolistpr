const form = document.getElementById('todo-form');
const input = document.getElementById('new-task');
const prioritySelect = document.getElementById('priority');
const list = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let theme = localStorage.getItem('theme') || 'light';

if (theme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
});

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `priority-${task.priority} ${task.done ? 'completed' : ''}`;
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleDone(${index})">✅</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  const priority = prioritySelect.value;
  if (!text) return;
  tasks.push({ text, done: false, priority });
  input.value = '';
  prioritySelect.value = 'low';
  saveTasks();
  renderTasks();
});

window.toggleDone = (index) => {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
};

window.deleteTask = (index) => {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
};

renderTasks();
