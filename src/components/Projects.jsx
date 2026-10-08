import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Marketplace',
    description:
      'High-converting online store featuring custom product filtering, secure Stripe checkout, user accounts, and real-time inventory management.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=900&auto=format&fit=crop',
    snippet: 'const order = await Order.create(payload)',
    stack: ['MERN Stack', 'React', 'Node.js', 'Stripe'],
    live: '#',
    repo: '#',
    span: 'lg:col-span-7',
  },
  {
    id: 2,
    title: 'Real Estate Portal',
    description:
      'Property discovery platform with interactive location filtering, virtual tour requests, mortgage calculators, and direct agent messaging.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=900&auto=format&fit=crop',
    snippet: 'const listings = await Property.find({ price: { $lte: maxPrice } })',
    stack: ['React', 'MongoDB', 'Express', 'Node.js'],
    live: '#',
    repo: '#',
    span: 'lg:col-span-5',
  },
  {
    id: 3,
    title: 'Law Firm Platform',
    description:
      'Professional corporate legal site with case intake forms, consultation scheduling, attorney directory, and secure client portal.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=900&auto=format&fit=crop',
    snippet: 'app.post("/api/consultations", createBooking)',
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    live: '#',
    repo: '#',
    span: 'lg:col-span-5',
  },
  {
    id: 4,
    title: 'Doctor Appointment System',
    description:
      'Healthcare web app providing patient doctor searches, live slot booking, instant calendar syncing, and automated appointment reminders.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=900&auto=format&fit=crop',
    snippet: 'io.emit("appointment:confirmed", slot)',
    stack: ['MERN Stack', 'React', 'Node.js', 'Socket.io'],
    live: '#',
    repo: '#',
    span: 'lg:col-span-7',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 lg:pl-32 lg:pr-12 bg-fog">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-accent text-xs uppercase tracking-widest font-semibold mb-4">Selected work</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-ink">Featured Projects</h2>
          </div>
          <p className="text-steel max-w-sm">
            Tailored web applications including e-commerce platforms, real estate portals, law firm systems, and healthcare booking applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={`mosaic-card border-hair relative bg-white p-5 ${project.span}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            >
              <div className="mosaic-img-wrap relative aspect-video bg-gray-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="mosaic-img w-full h-full object-cover"
                />
                <span className="code-chip absolute bottom-3 left-3 bg-black/75 text-[#8ec9ff] text-[11px] px-3 py-1.5">
                  {project.snippet}
                </span>
              </div>

              <div className="flex items-start justify-between mt-5 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-ink">{project.title}</h3>
                  <p className="text-sm text-steel mt-2 leading-relaxed">{project.description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a
                    href={project.live}
                    aria-label={`Live preview of ${project.title}`}
                    className="tech-badge border-hair p-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={project.repo}
                    aria-label={`GitHub repository for ${project.title}`}
                    className="tech-badge border-hair p-2"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-hair text-[11px] uppercase tracking-wide px-2.5 py-1 text-steel"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;