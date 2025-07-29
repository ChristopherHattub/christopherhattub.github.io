import React, { useState, useEffect } from 'react';
import ProjectCarousel from '../../components/ProjectCarousel/ProjectCarousel';
import './Projects.css';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Wait for contact animations (0.8s) plus 0s delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800); // 800ms for contact animations only, removed the 2s delay

    return () => clearTimeout(timer);
  }, []);

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "IdeaBall",
      description: "application for organizing lists of ideas",
      image: `${process.env.PUBLIC_URL}/assets/project-images/construction.png`
    },
    {
      id: 2,
      title: "TodoTracker",
      description: "Custom todo list app that allows users to track their progress and goals",
      image: `${process.env.PUBLIC_URL}/assets/project-images/construction.png`
    },
    {
      id: 3,
      title: "Gas and Oil Spending Prediction Model",
      description: "Predicting gas and oil spending based on historical data and weather data",
      image: `${process.env.PUBLIC_URL}/assets/project-images/construction.png`
    },

    {
      id: 4,
      title: "Project 4",
      description: "Placeholder",
      image: `${process.env.PUBLIC_URL}/assets/project-images/construction.png`
    },

    {
      id: 5,
      title: "Project 5",
      description: "placeholder",
      image: `${process.env.PUBLIC_URL}/assets/project-images/construction.png`
    },
    
    // Add more projects as needed
  ];

  return (
    <section 
      id="projects" 
      className={`projects-section ${isVisible ? 'visible animate-expand' : ''}`}
    >
      <div className="projects-container">
        <div className="section-title-wrapper">
          <div className="title-background-shape"></div>
          <h2 className="section-title">Projects</h2>
        </div>
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
};

export default Projects;