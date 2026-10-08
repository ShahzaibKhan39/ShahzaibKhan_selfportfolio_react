import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed.');
        setLoading(false);
        return;
      }

      localStorage.setItem('adminToken', data.token);
      navigate('/admin');
    } catch (err) {
      setError('Server error. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <main className="login-page bg-ink text-white">
      <div className="login-wrap">
        <a href="/" className="login-back">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </a>

        <form onSubmit={handleSubmit} className="login-card bg-white text-ink" noValidate>
          <div className="login-icon">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="font-serif font-semibold login-title">Admin Login</h1>
          <p className="login-sub">Sign in to view contact requests.</p>

          <label htmlFor="email" className="login-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@example.com"
            autoComplete="username"
            required
            className="login-field bg-fog"
          />

          <label htmlFor="password" className="login-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="current-password"
            required
            className="login-field bg-fog"
          />

          {error && (
            <div role="alert" className="login-error">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading} className="login-submit bg-accent text-white">
            {loading ? 'Signing in…' : 'Sign In'} <LogIn className="w-4 h-4" />
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
