import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Hero.css';

const rotatingPhrases = [
  "I can create any design",
  "I can work 24 h maintaining the sites",
  "I have experience of one year"
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Trigger fade out
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % rotatingPhrases.length);
        setFade(true); // Trigger fade in
      }, 300); // Duration matches CSS transition
    }, 3000); // Switches phrase every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="hero-animate-up grid-field relative min-h-screen flex items-center pl-6 pr-6 lg:pl-32 lg:pr-12 pt-28 lg:pt-0 overflow-hidden"
    >
      <div className="w-full grid lg:grid-cols-12 gap-10 items-center max-w-7xl mx-auto">
        
        {/* Left: headline */}
        <div className="hero-animate-up hero-delay-1 lg:col-span-6 relative z-20 order-2 lg:order-1">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.12] text-ink">
            Hi, I'm Shahzaib Khan 
            <br />
            <span
              className={`italic font-light block mt-2 text-ink hero-phrase ${
                fade ? 'phrase-enter' : 'phrase-exit'
              }`}
            >
              / {rotatingPhrases[index]}
            </span>
          </h1>

          <p className="mt-6 max-w-sm text-steel text-base leading-relaxed">
            I build intuitive, user-centric digital Web App with clarity and purpose.
          </p>

          <a
            href="#contact"
            className="hero-cta inline-flex items-center gap-2 mt-10 bg-accent text-white font-medium px-7 py-3.5"
          >
            Let's Work <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Right: portrait collage */}
        <div className="hero-portrait-container lg:col-span-6 relative h-[620px] order-1 lg:order-2 flex justify-center lg:block">
          {/* Oversized background word */}
          <span
            aria-hidden="true"
            className="hero-oversized outline-text absolute -top-6 right-0 font-serif select-none z-0"
          >
            Shahzaib Khan
          </span>

          {/* Offset grid fragment */}
          <div className="grid-fragment border-hair absolute left-4 top-6 w-24 h-24 sm:w-32 sm:h-32 bg-fog/60 z-10 hidden sm:block" />

          {/* Portrait card */}
          <div className="hero-portrait-frame border-hair absolute right-0 sm:right-2 top-10 bottom-6 w-[85%] sm:w-[75%] lg:w-[70%] bg-charcoal z-20 shadow-2xl">
            <img
              src="/Images/Hero%20Section.png"
              alt="Portrait of Shahzaib Khan"
              className="hero-portrait w-full h-full object-cover"
            />
            <span className="hero-stamp absolute bottom-4 right-4 font-serif text-3xl sm:text-4xl italic">
              Khan
            </span>
          </div>

          {/* Small offset stat card */}
          <div className="border-hair absolute left-0 bottom-0 sm:left-2 bg-white px-5 py-4 z-30 shadow-lg hidden sm:block">
            <p className="text-3xl font-serif text-ink">1+</p>
            <p className="text-[11px] uppercase tracking-widest text-steel mt-1">Year Experience of MERN STACK</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;