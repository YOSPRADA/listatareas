import React from 'react';

const TaskForm = ({ handleAddTask, handleTaskInput, handleDescriptionInput }) => {
  return (
    <div id="task-container">
      <input
        type="text"
        id="task-input"
        placeholder="Tarea"
        onChange={handleTaskInput}
      />
      <input
        type="text"
        id="description-input"
        placeholder="Descripción"
        onChange={handleDescriptionInput}
      />
      <button id="add-task-btn" onClick={handleAddTask}>
        Agregar
      </button>
    </div>
  );
};

export default TaskForm;
