import React from 'react';
import ProjectCarousel from '../../components/ProjectCarousel/ProjectCarousel';
import './Projects.css';

const Projects = () => {
  // Sample project data
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "A brief description of project 1",
      image: "/assets/project-images/project1.jpeg"
    },
    {
      id: 2,
      title: "Project 2",
      description: "A brief description of project 2",
      image: "/assets/project-images/project2.jpeg"
    },
    {
      id: 3,
      title: "Project 3",
      description: "A brief description of project 3",
      image: "/assets/project-images/project3.png"
    },

    {
      id: 4,
      title: "Project 4",
      description: "A brief description of project 4",
      image: "/assets/project-images/project4.png"
    },

    {
      id: 5,
      title: "Project 5",
      description: "A brief description of project 5",
      image: "/assets/project-images/project3.png"
    },
    
    // Add more projects as needed
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-title">Projects</h2>
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
};

export default Projects;