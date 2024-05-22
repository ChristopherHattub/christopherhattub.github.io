import React from 'react';
import './styles/ProjectsPage.css'; 
import Carousel from '../components/Carousel'; 

const ProjectsPage = () => {
  return (
    <div className="projects-page">
      <h1>My Projects</h1>
      <Carousel />
    </div>
  );
};

export default ProjectsPage;
