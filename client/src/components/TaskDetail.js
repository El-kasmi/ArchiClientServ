import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import './TaskDetail.css'; //  fichier CSS

const TaskDetail = ({ taskId, onBack }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await taskService.getTaskById(taskId);
        setTask(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement de la tâche');
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  if (loading) return <div className="task-detail-loading">Chargement...</div>;
  if (error) return <div className="task-detail-error">{error}</div>;
  if (!task) return <div className="task-detail-not-found">Tâche non trouvée</div>;

  return (
    <div className="task-detail">
      <h2 className="task-detail-title">Détails de la tâche</h2>
      <div className="task-info">
        <p>
          <strong>ID:</strong> {task.id}
        </p>
        <p>
          <strong>Titre:</strong> {task.title}
        </p>
        <p>
          <strong>Statut:</strong> {task.completed ? 'Terminée ✅' : 'En cours ⏳'}
        </p>
      </div>
      <button className="task-detail-back-button" onClick={onBack}>
        <i className="fas fa-arrow-left"></i> Retour à la liste
      </button>
    </div>
  );
};

export default TaskDetail;