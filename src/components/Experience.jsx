import React from 'react';
import './Experience.css';

const roles = [
  {
    title: 'Frontend Developer',
    company: 'Ideovercity — Arfa Software Technology Park, Lahore',
    dates: '6 Months Experience',
    description:
      'Worked as a Frontend Designer crafting responsive, high-precision user interfaces and web layouts focused on smooth performance and user experience.',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    title: 'Backend Developer',
    company: 'Ideovercity — Arfa Software Technology Park, Lahore',
    dates: '6 Months Experience',
    description:
      'Worked as a Backend Developer building RESTful APIs, handling MongoDB databases, and configuring Node.js/Express service logic.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="exp-animate-up relative py-32 px-6 lg:pl-32 lg:pr-12 bg-charcoal overflow-hidden">
      <span
        aria-hidden="true"
        className="experience-outline absolute -top-6 left-1/2 -translate-x-1/2 font-serif font-semibold select-none whitespace-nowrap"
        style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.08)' }}
      >
        EXPERIENCE
      </span>

      <div className="relative z-10 max-w-5xl mx-auto pt-20">
        <p className="text-accent text-xs uppercase tracking-widest font-semibold mb-4">Where I've worked</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-white max-w-xl mb-16">
          One year building complete digital products across frontend & backend.
        </h2>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-16">
          {roles.map((role) => (
            <div key={role.title} className="relative">
              {/* Ghost card offset behind for depth */}
              <div className="exp-card exp-card-back border-hair-light absolute inset-0 bg-white/5" aria-hidden="true" />

              <div className="exp-card exp-card-front border-hair-light relative bg-white p-7">
                <span className="text-xs font-semibold text-steel">{role.dates}</span>
                <h3 className="text-xl font-bold text-ink mt-2">{role.title}</h3>
                <p className="text-sm text-accent font-medium mb-3">{role.company}</p>
                <p className="text-sm text-steel leading-relaxed mb-5">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border-hair text-[11px] uppercase tracking-wide px-2.5 py-1 text-steel"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;