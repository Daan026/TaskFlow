import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch {
      setError('Kon projecten niet laden.');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const { data } = await api.post('/projects', { name: newName, description: newDesc });
      setProjects([data, ...projects]);
      setNewName('');
      setNewDesc('');
      setShowForm(false);
    } catch {
      setError('Aanmaken mislukt.');
    } finally {
      setCreating(false);
    }
  };

  const deleteProject = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Project verwijderen?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
    } catch {
      setError('Verwijderen mislukt.');
    }
  };

  const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
  const projectColor = (id) => colors[id % colors.length];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Projecten</h1>
          <p className="page-subtitle">Welkom terug, {user?.name} 👋</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Annuleren' : '+ Nieuw project'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showForm && (
        <div className="card form-card">
          <h3>Nieuw project</h3>
          <form onSubmit={createProject} className="inline-form">
            <div className="form-group">
              <label>Projectnaam</label>
              <input
                type="text"
                placeholder="Bijv. Website redesign"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Omschrijving (optioneel)</label>
              <input
                type="text"
                placeholder="Korte omschrijving..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={creating}>
              {creating ? <span className="spinner" /> : 'Aanmaken'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3].map((n) => <div key={n} className="card card-skeleton" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>Geen projecten</h3>
          <p>Maak je eerste project aan om te beginnen.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => navigate(`/projects/${project.id}`)}
              style={{ '--accent': projectColor(project.id) }}
            >
              <div className="project-card-accent" />
              <div className="project-card-body">
                <h3 className="project-name">{project.name}</h3>
                {project.description && (
                  <p className="project-desc">{project.description}</p>
                )}
                <div className="project-meta">
                  <span className="project-date">
                    {new Date(project.createdAt).toLocaleDateString('nl-NL')}
                  </span>
                </div>
              </div>
              <button
                className="btn-delete"
                onClick={(e) => deleteProject(project.id, e)}
                title="Verwijderen"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
