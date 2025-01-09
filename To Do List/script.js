const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const clearAllButton = document.getElementById('clear-all-btn');
const loadTasks = document.getElementsByName('loadTasks');

document.addEventListener('DOMContentLoaded', loadTasks);
addTaskButton.addEventListener('click', addTask);
clearAllButton.addEventListener('click', clearAllTasks);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return; 
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    saveTask(task);

    taskInput.value = '';
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();
}

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function renderTasks() {
    const tasks = getTasks();

    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        const span = document.createElement('span');
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add('task-completed');
        }

        span.addEventListener('click', () => toggleTaskCompletion(task.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

function toggleTaskCompletion(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(taskId) {
    const tasks = getTasks().filter(t => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function clearAllTasks() {
    localStorage.removeItem('tasks');
    renderTasks();
}
