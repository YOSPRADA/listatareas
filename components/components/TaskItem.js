import React from 'react';

const TaskItem = ({ task, handleEdit, handleDelete, handleToggleCompletion }) => {
  return (
    <li className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="title">{task.title}</div>
      <div className="description">{task.description}</div>
      <button className="edit-btn" onClick={handleEdit}>
        Editar
      </button>
      <button className="delete-btn" onClick={handleDelete}>
        Eliminar
      </button>
      <button className="completed-btn" onClick={handleToggleCompletion}>
        {task.completed ? 'No Completada' : 'Completada'}
      </button>
    </li>
  );
};

export default TaskItem;
