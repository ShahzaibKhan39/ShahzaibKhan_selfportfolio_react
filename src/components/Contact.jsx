import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import './Contact.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Enter your full name.' : '';
      case 'email':
        return !emailPattern.test(value) ? 'Enter a valid email address.' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message should be at least 10 characters.' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.values(nextErrors).some(Boolean)) {
      setStatus({ loading: false, success: false, message: 'Please fix the highlighted fields.' });
      return;
    }

    setStatus({ loading: true, success: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, message: 'Message sent — I\u2019ll reply soon.' });
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
        setErrors({});
      } else {
        setStatus({ loading: false, success: false, message: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, message: 'Server error. Please try again later.' });
    }
  };

  return (
    <section id="contact" className="contact-animate-up grid-field py-32 px-6 lg:pl-32 lg:pr-12 bg-ink text-white relative">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
        {/* Left: outline heading */}
        <div className="lg:col-span-5">
          <p className="text-accent text-xs uppercase tracking-widest font-semibold mb-6">Let's talk</p>
          <h2
            className="contact-outline font-serif font-semibold select-none"
            style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.5)' }}
          >
            GET IN
            <br />
            TOUCH
          </h2>
          <p className="text-gray-400 mt-8 max-w-xs">
            Have a project in mind, or looking to hire a full-stack developer? Send a message below.
          </p>
          <div className="flex items-center gap-3 mt-8 text-sm">
            <Mail className="w-4 h-4 text-accent" />
            <span>sk0963415@gmail.com</span>
          </div>
        </div>

        {/* Right: layered paper-style form */}
        <div className="lg:col-span-7 relative">
          <div className="paper-sheet paper-sheet-1 border-hair-light" aria-hidden="true" />
          <div className="paper-sheet paper-sheet-2 border-hair-light" aria-hidden="true" />

          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative bg-white text-ink p-8 sm:p-10 border-hair"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-steel mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  className="contact-field w-full px-4 py-3 bg-fog"
                />
                {touched.name && errors.name && (
                  <p className="text-xs text-red-600 mt-2">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-steel mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  className="contact-field w-full px-4 py-3 bg-fog"
                />
                {touched.email && errors.email && (
                  <p className="text-xs text-red-600 mt-2">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="message" className="block text-xs uppercase tracking-widest text-steel mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tell me about your project..."
                aria-invalid={Boolean(errors.message)}
                className="contact-field w-full px-4 py-3 bg-fog resize-none"
              />
              {touched.message && errors.message && (
                <p className="text-xs text-red-600 mt-2">{errors.message}</p>
              )}
            </div>

            {status.message && (
              <div
                role="status"
                className={`status-banner mt-6 p-4 text-sm flex items-center gap-3 border ${
                  status.success
                    ? 'bg-green-50 border-green-300 text-green-800'
                    : 'bg-red-50 border-red-300 text-red-800'
                }`}
              >
                {status.success ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status.loading}
              className="contact-submit w-full sm:w-auto mt-8 inline-flex items-center justify-center gap-2 bg-accent text-white font-medium px-8 py-3.5"
            >
              {status.loading ? 'Sending…' : 'Send Message'} <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;