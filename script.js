const taskInput = document.getElementById('task-input');
const descriptionInput = document.getElementById('description-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = [];
let taskIdCounter = 1;

window.addEventListener('load', () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        taskIdCounter = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
        renderTasks();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDescription = descriptionInput.value.trim();

    if (taskText.length >= 3 && taskDescription.length >= 3) {
        const task = {
            id: taskIdCounter,
            title: taskText,
            description: taskDescription,
            completed: false
        };

        tasks.push(task);
        saveTasks();
        taskIdCounter++;
        renderTasks();

        taskInput.value = '';
        descriptionInput.value = '';
    } else {
        alert('La tarea y la descripción deben tener al menos 3 caracteres');
    }
}

function renderTasks() {
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement('li');
        li.classList.add('task');

        if (task.completed) {
            li.classList.add('completed');
        }

        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.innerText = task.title;

        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('description');
        descriptionElement.innerText = task.description;

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.innerText = 'Editar';
        editBtn.addEventListener('click', () => editDescription(i));

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = 'Eliminar';
        deleteBtn.addEventListener('click', () => deleteTask(i));

        const completedBtn = document.createElement('button');
        completedBtn.classList.add('completed-btn');
        completedBtn.innerText = task.completed ? 'completada' : ' no completada';
        completedBtn.addEventListener('click', () => toggleTaskCompletion(i));

        li.appendChild(titleElement);
        li.appendChild(descriptionElement);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        li.appendChild(completedBtn);

        taskList.appendChild(li);
    }
}

function editDescription(index) {
    const task = tasks[index];
    const newDescription = prompt('Ingrese la nueva descripción', task.description);

    if (newDescription !== null && newDescription.length >= 3) {
        task.description = newDescription.trim();
        saveTasks();
        renderTasks();
    } else if (newDescription !== null) {
        alert('La descripción debe tener al menos 3 caracteres');
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', addTask);
