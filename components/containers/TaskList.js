import React, { useState, useEffect } from 'react';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskInput.trim().length >= 3 && descriptionInput.trim().length >= 3) {
      const newTask = {
        id: Date.now(),
        title: taskInput.trim(),
        description: descriptionInput.trim(),
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setTaskInput('');
      setDescriptionInput('');
    } else {
      alert('La tarea y la descripción deben tener al menos 3 caracteres');
    }
  };

  const handleEditTask = (id, newDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleToggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div id="box-container">
      <div id="container">
        <h1>Lista de Tareas</h1>
        <TaskForm
          handleAddTask={handleAddTask}
          handleTaskInput={(e) => setTaskInput(e.target.value)}
          handleDescriptionInput={(e) => setDescriptionInput(e.target.value)}
        />
        <ul id="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleEdit={() => {
                const newDescription = prompt(
                  'Ingrese la nueva descripción',
                  task.description
                );
                if (newDescription !== null && newDescription.length >= 3) {
                  handleEditTask(task.id, newDescription.trim());
                } else if (newDescription !== null) {
                  alert('La descripción debe tener al menos 3 caracteres');
                }
              }}
              handleDelete={() => handleDeleteTask(task.id)}
              handleToggleCompletion={() => handleToggleTaskCompletion(task.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
