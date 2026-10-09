import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Trash2, LogOut, RefreshCw, MailOpen, Inbox } from 'lucide-react';
import { API_URL } from '../config';
import './Admin.css';

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

const Admin = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState(null);

  const token = localStorage.getItem('adminToken');

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  }, [navigate]);

  // `url` is an API path like '/api/contact'; API_URL is prepended here
  const authFetch = useCallback(
    async (url, options = {}) => {
      const res = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        logout();
        throw new Error('Unauthorized');
      }
      return res;
    },
    [token, logout]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await authFetch('/api/contact');
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load messages.');
      setMessages(data);
    } catch (err) {
      if (err.message !== 'Unauthorized') setError(err.message || 'Server error.');
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    load();
  }, [token, navigate, load]);

  const toggleRead = async (id) => {
    try {
      const res = await authFetch(`/api/contact/${id}/read`, { method: 'PATCH' });
      const updated = await res.json();
      if (res.ok) setMessages((prev) => prev.map((m) => (m._id === id ? updated : m)));
    } catch (_) {}
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      const res = await authFetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (_) {}
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <main className="admin-page bg-fog text-ink">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow text-accent">Dashboard</p>
          <h1 className="font-serif font-semibold admin-title">Contact Requests</h1>
        </div>
        <div className="admin-actions">
          <button onClick={load} className="admin-btn" aria-label="Refresh">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button onClick={logout} className="admin-btn admin-btn-dark">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <section className="admin-stats">
        <div className="admin-stat">
          <span className="admin-stat-num">{messages.length}</span>
          <span className="admin-stat-label">Total</span>
        </div>
        <div className="admin-stat">
          <span className="admin-stat-num text-accent">{unread}</span>
          <span className="admin-stat-label">Unread</span>
        </div>
      </section>

      {error && <div className="admin-error">{error}</div>}

      {loading ? (
        <p className="admin-empty">Loading…</p>
      ) : messages.length === 0 ? (
        <div className="admin-empty">
          <Inbox className="w-8 h-8" />
          <p>No requests yet.</p>
        </div>
      ) : (
        <ul className="admin-list">
          {messages.map((m) => (
            <li key={m._id} className={`admin-item ${m.read ? '' : 'admin-item-unread'}`}>
              <button
                className="admin-item-head"
                onClick={() => setOpenId(openId === m._id ? null : m._id)}
              >
                <div className="admin-item-who">
                  <strong>{m.name}</strong>
                  <span>{m.email}</span>
                </div>
                <span className="admin-item-date">{formatDate(m.createdAt)}</span>
              </button>

              <p className={`admin-item-msg ${openId === m._id ? 'open' : ''}`}>{m.message}</p>

              <div className="admin-item-foot">
                <a href={`mailto:${m.email}`} className="admin-link">
                  <Mail className="w-4 h-4" /> Reply
                </a>
                <button onClick={() => toggleRead(m._id)} className="admin-link">
                  <MailOpen className="w-4 h-4" /> {m.read ? 'Mark unread' : 'Mark read'}
                </button>
                <button onClick={() => remove(m._id)} className="admin-link admin-link-danger">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Admin;
