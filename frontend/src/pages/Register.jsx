import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Wachtwoorden komen niet overeen.');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registratie mislukt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">TaskFlow</span>
        </div>
        <h2 className="auth-title">Account aanmaken</h2>
        <p className="auth-subtitle">Begin vandaag met organiseren</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Naam</label>
            <input name="name" type="text" placeholder="Jan de Vries" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>E-mailadres</label>
            <input name="email" type="email" placeholder="jan@voorbeeld.nl" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Wachtwoord</label>
            <input name="password" type="password" placeholder="Min. 6 tekens" value={form.password} onChange={handleChange} required minLength={6} />
          </div>
          <div className="form-group">
            <label>Bevestig wachtwoord</label>
            <input name="confirm" type="password" placeholder="Herhaal wachtwoord" value={form.confirm} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Registreren'}
          </button>
        </form>
        <p className="auth-footer">
          Al een account? <Link to="/login">Inloggen</Link>
        </p>
      </div>
    </div>
  );
}
