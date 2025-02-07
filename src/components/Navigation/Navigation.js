// src/components/Navigation/Navigation.js
import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('contact');

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact', 'projects', 'career', 'education'];
      const navHeight = document.querySelector('.navigation').offsetHeight;
      const scrollPosition = window.scrollY + navHeight + 100;

      // Find the section that takes up the most viewport space
      let maxVisibleSection = null;
      let maxVisibleHeight = 0;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            maxVisibleSection = section;
          }
        }
      });

      if (maxVisibleSection) {
        setActiveSection(maxVisibleSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const navHeight = document.querySelector('.navigation').offsetHeight;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-list">
          {['Contact', 'Projects', 'Career', 'Education'].map((item) => (
            <li key={item} className="nav-item">
              <button
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;