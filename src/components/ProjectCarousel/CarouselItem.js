import React from 'react';

const CarouselItem = ({ project }) => {
  return (
    <div className="project-card">
      <img 
        src={project.image} 
        alt={project.title} 
        className="project-image"
      />
      <div className="project-overlay">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
    </div>
  );
};

export default CarouselItem;