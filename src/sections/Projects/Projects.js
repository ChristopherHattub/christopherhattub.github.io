import React, { useState, useEffect } from 'react';
import ProjectCarousel from '../../components/ProjectCarousel/ProjectCarousel';
import './Projects.css';
import constructionImage from '../../assets/construction.png';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Wait for contact animations (0.8s) plus 0s delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800); // 800ms for contact animations only, removed the 2s delay

    return () => clearTimeout(timer);
  }, []);

  // 
  const projects = [
    {
      id: 1,
      title: "IdeaBall",
      description: "application for organizing lists of ideas",
      image: constructionImage
    },
    {
      id: 2,
      title: "TodoTracker",
      description: "Custom todo list app that allows users to track their progress and goals",
      image: constructionImage
    },
    {
      id: 3,
      title: "Gas and Oil Spending Prediction Model",
      description: "Predicting gas and oil spending based on historical data and weather data",
      image: constructionImage
    },

    {
      id: 4,
      title: "Iphone to Android Secure Data Transfer Shortcut Applications",
      description: "A collection of shortcut applications that allow users to prepare data for transfer from their iPhone to their Android device, without using a any third party data processing.",
      image: constructionImage
    },

    {
      id: 5,
      title: "Project 5",
      description: "placeholder",
      image: constructionImage
    },
    
    // 
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