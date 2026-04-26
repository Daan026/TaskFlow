import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/dashboard" className="navbar-brand">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">TaskFlow</span>
        </Link>

        <div className="navbar-right">
          {user && (
            <>
              <span className="navbar-user">
                <span className="avatar">{initials}</span>
                <span className="user-name">{user.name}</span>
              </span>
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                Uitloggen
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
