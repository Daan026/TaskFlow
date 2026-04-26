import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const COLUMNS = [
  { key: 'todo', label: 'Te doen', icon: '○', color: '#94a3b8' },
  { key: 'doing', label: 'Bezig', icon: '◑', color: '#f59e0b' },
  { key: 'done', label: 'Klaar', icon: '●', color: '#10b981' },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [activeCol, setActiveCol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAll();
  }, [id]);

  const fetchAll = async () => {
    try {
      const [projRes, tasksRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/projects/${id}/tasks`),
      ]);
      setProject(projRes.data);
      setTasks(tasksRes.data);
    } catch {
      setError('Kon project niet laden.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e, status) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      const { data } = await api.post(`/projects/${id}/tasks`, {
        title: newTaskTitle,
        description: newTaskDesc,
        status,
      });
      setTasks([...tasks, data]);
      setNewTaskTitle('');
      setNewTaskDesc('');
      setActiveCol(null);
    } catch {
      setError('Taak aanmaken mislukt.');
    }
  };

  const moveTask = async (taskId, direction) => {
    const task = tasks.find((t) => t.id === taskId);
    const order = ['todo', 'doing', 'done'];
    const currentIdx = order.indexOf(task.status);
    const newIdx = currentIdx + direction;
    if (newIdx < 0 || newIdx >= order.length) return;
    const newStatus = order[newIdx];
    try {
      const { data } = await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map((t) => (t.id === taskId ? data : t)));
    } catch {
      setError('Verplaatsen mislukt.');
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Taak verwijderen?')) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch {
      setError('Verwijderen mislukt.');
    }
  };

  const tasksByStatus = (status) => tasks.filter((t) => t.status === status);

  if (loading) return <div className="page-container"><div className="loading-text">Laden…</div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            ← Dashboard
          </button>
          <h1 className="page-title">{project?.name}</h1>
          {project?.description && <p className="page-subtitle">{project.description}</p>}
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="board">
        {COLUMNS.map((col) => (
          <div key={col.key} className="column" style={{ '--col-color': col.color }}>
            <div className="column-header">
              <span className="col-icon" style={{ color: col.color }}>{col.icon}</span>
              <h3 className="col-title">{col.label}</h3>
              <span className="col-count">{tasksByStatus(col.key).length}</span>
            </div>

            <div className="task-list">
              {tasksByStatus(col.key).map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-body">
                    <h4 className="task-title">{task.title}</h4>
                    {task.description && <p className="task-desc">{task.description}</p>}
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn-move"
                      onClick={() => moveTask(task.id, -1)}
                      disabled={col.key === 'todo'}
                      title="Terug"
                    >←</button>
                    <button
                      className="btn-move"
                      onClick={() => moveTask(task.id, 1)}
                      disabled={col.key === 'done'}
                      title="Vooruit"
                    >→</button>
                    <button className="btn-task-delete" onClick={() => deleteTask(task.id)} title="Verwijderen">✕</button>
                  </div>
                </div>
              ))}
            </div>

            {activeCol === col.key ? (
              <form className="add-task-form" onSubmit={(e) => addTask(e, col.key)}>
                <input
                  type="text"
                  placeholder="Taaknaam..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  autoFocus
                  required
                />
                <input
                  type="text"
                  placeholder="Omschrijving (optioneel)"
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                />
                <div className="add-task-btns">
                  <button type="submit" className="btn btn-primary btn-sm">Toevoegen</button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setActiveCol(null)}>Annuleren</button>
                </div>
              </form>
            ) : (
              <button className="btn-add-task" onClick={() => setActiveCol(col.key)}>
                + Taak toevoegen
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
