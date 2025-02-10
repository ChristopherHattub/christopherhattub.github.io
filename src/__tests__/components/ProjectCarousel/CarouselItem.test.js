import React from 'react';
import { render, screen } from '@testing-library/react';
import CarouselItem from '../../../components/ProjectCarousel/CarouselItem';

describe('CarouselItem Component', () => {
  const mockProject = {
    id: 1,
    title: 'Test Project',
    description: 'Test Description',
    image: 'test-image.jpg'
  };

  test('renders project information correctly', () => {
    render(<CarouselItem project={mockProject} />);
    
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    
    const image = screen.getByAltText(mockProject.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProject.image);
  });

  test('applies correct CSS classes', () => {
    render(<CarouselItem project={mockProject} />);
    
    expect(screen.getByAltText(mockProject.title)).toHaveClass('project-image');
    expect(screen.getByText(mockProject.title).parentElement).toHaveClass('project-overlay');
  });
});
