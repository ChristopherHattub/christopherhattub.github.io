import React from 'react';
import { render, screen } from '@testing-library/react';
import Education from '../../../sections/Education/Education';

describe('Education Section', () => {
  test('renders education section title', () => {
    render(<Education />);
    expect(screen.getByText('Educational Background')).toBeInTheDocument();
  });

  test('renders UNH information', () => {
    render(<Education />);
    
    // University name and degree
    expect(screen.getByText(/University of New Hampshire/i)).toBeInTheDocument();
    expect(screen.getByText(/Bachelor of Science in Computer Science/i)).toBeInTheDocument();
    
    // Date
    expect(screen.getByText(/2018-2023/i)).toBeInTheDocument();
    
    // Description
    expect(screen.getByText(/Relevant coursework in software development, algorithms, and data structures./i)).toBeInTheDocument();
  });

  test('renders education section with correct structure', () => {
    const { container } = render(<Education />);
    
    // Test section structure
    expect(container.querySelector('section')).toHaveClass('education-section');
    expect(container.querySelector('.education-content')).toBeInTheDocument();
  });

  test('renders education image', () => {
    render(<Education />);
    const image = screen.getByAltText('Education Background');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('kingsbury-hall.jpg'));
  });

  test('applies correct styling to education elements', () => {
    render(<Education />);
    
    // Test styling classes
    expect(screen.getByText('Educational Background')).toHaveClass('text-3xl', 'font-bold', 'mb-4', 'text-gray-800');
    expect(screen.getByText('University Degree')).toHaveClass('text-xl', 'font-semibold', 'text-[#F59D16]');
    expect(screen.getByText(/Bachelor of Science in Computer Science/i)).toHaveClass('text-lg', 'text-gray-700');
  });
});
