import React, { useState } from 'react';
import { taskService } from '../services/api';
import './TaskForm.css';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      const newTask = await taskService.createTask({ title });
      setTitle('');
      if (onTaskAdded) onTaskAdded(newTask); // Appeler la fonction pour ajouter la tâche
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3 className="task-form-title">Ajouter une tâche</h3>
      <div className="task-form-group">
        <input
          type="text"
          className="task-form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nouvelle tâche"
          disabled={submitting}
        />
      </div>
      <button
        type="submit"
        className={`task-form-button ${submitting ? 'submitting' : ''}`}
        disabled={submitting}
      >
        {submitting ? 'Ajout...' : 'Ajouter'}
      </button>
    </form>
  );
};

export default TaskForm;
