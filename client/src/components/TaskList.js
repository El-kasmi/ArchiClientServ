import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import './TaskList.css'; // Assurez-vous de créer ce fichier CSS

const TaskList = ({ onEditTask, onViewTask }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur complète:', err);
      setError('Erreur lors du chargement des tâches');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  if (loading) return <div className="task-list-loading">Chargement...</div>;
  if (error) return <div className="task-list-error">{error}</div>;

  return (
    <div className="task-list">
      <h2 className="task-list-title">Liste des tâches</h2>
      {tasks.length === 0 ? (
        <p className="task-list-empty">Aucune tâche disponible</p>
      ) : (
        <ul className="task-list-items">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-item-content">
                <span
                  className="task-item-title"
                  onClick={() => onViewTask && onViewTask(task.id)}
                >
                  {task.title}
                </span>
                <span
                  className="task-item-status"
                  onClick={() => toggleTaskStatus(task)}
                  title={task.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
                >
                  {task.completed ? <i className="fas fa-check-circle"></i> : <i className="fas fa-hourglass-half"></i>}
                </span>
              </div>
              <div className="task-item-actions">
                <button className="task-item-edit" onClick={() => onEditTask && onEditTask(task)}>
                  <i className="fas fa-edit"></i> Modifier
                </button>
                <button className="task-item-delete" onClick={() => handleDelete(task.id)}>
                  <i className="fas fa-trash"></i> Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
