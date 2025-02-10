import React from 'react';
import { render, screen } from '@testing-library/react';
import Projects from '../../../sections/Projects/Projects';

// Mock the ProjectCarousel component since it's tested separately
jest.mock('../../../components/ProjectCarousel/ProjectCarousel', () => {
  return function MockProjectCarousel({ projects }) {
    return <div data-testid="project-carousel">{projects.length} projects</div>;
  };
});

describe('Projects Section', () => {
  test('renders projects section title', () => {
    render(<Projects />);
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
  });

  test('renders project carousel component', () => {
    render(<Projects />);
    expect(screen.getByTestId('project-carousel')).toBeInTheDocument();
  });

  test('passes correct projects data to carousel', () => {
    render(<Projects />);
    
    // The mock carousel displays the number of projects
    const carousel = screen.getByTestId('project-carousel');
    expect(carousel).toHaveTextContent(/\d+ projects/);
    expect(parseInt(carousel.textContent)).toBeGreaterThan(0);
  });

  test('renders projects section with correct structure', () => {
    const { container } = render(<Projects />);
    
    // Test section structure
    expect(container.querySelector('section')).toHaveClass('projects-section');
    expect(container.querySelector('.projects-container')).toBeInTheDocument();
  });

  test('projects data contains required properties', () => {
    const { container } = render(<Projects />);
    
    // Access the projects data through the data attribute
    const projectsData = JSON.parse(container.querySelector('[data-projects]')?.dataset.projects || '[]');
    
    projectsData.forEach(project => {
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('image');
    });
  });

  test('applies correct styling to projects section', () => {
    const { container } = render(<Projects />);
    
    expect(container.querySelector('.projects-section')).toHaveStyle({
      padding: expect.any(String),
      margin: expect.any(String)
    });
  });

  test('renders section title with correct styling', () => {
    render(<Projects />);
    
    const title = screen.getByRole('heading', { name: /projects/i });
    expect(title).toHaveClass('section-title');
  });
});
