import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Hero from './components/Hero.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import Admin from './components/Admin.jsx';

const Home = () => (
  <div className="bg-fog text-ink font-sans overflow-x-hidden">
    <Sidebar />
    <main>
      <Hero />
      <Experience />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
