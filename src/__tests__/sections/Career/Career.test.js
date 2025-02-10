import React from 'react';
import { render, screen } from '@testing-library/react';
import Career from '../../../sections/Career/Career';

describe('Career Section', () => {
  test('renders career section title', () => {
    render(<Career />);
    expect(screen.getByText('Career')).toBeInTheDocument();
  });

  test('renders Fall River Florist Supply experience', () => {
    render(<Career />);
    
    // Position and company
    const positionElements = screen.getAllByText('Web and Systems Developer');
    expect(positionElements.length).toBeGreaterThan(0);
    expect(screen.getAllByText('Fall River Florist Supply')).not.toHaveLength(0);
    
    // Date
    expect(screen.getByText('2023 - Present')).toBeInTheDocument();
    
    // Description
    expect(screen.getByText(/A local company in my hometown where I worked as a systems programmer and web developer/i)).toBeInTheDocument();
  });

  test('renders UNH IOL experience', () => {
    render(<Career />);
    
    // Position and company
    expect(screen.getByText('Network Technician')).toBeInTheDocument();
    expect(screen.getByText('UNH InterOperability Laboratory')).toBeInTheDocument();
    
    // Date
    expect(screen.getByText('Nov 2019 – Nov 2021')).toBeInTheDocument();
  });

  test('renders career section with correct structure', () => {
    const { container } = render(<Career />);
    
    // Test section structure
    expect(container.querySelector('section')).toHaveClass('career-section');
    expect(container.querySelector('.career-container')).toBeInTheDocument();
    expect(container.querySelector('.positions-list')).toBeInTheDocument();
    expect(container.querySelector('.position-details')).toBeInTheDocument();
  });

  test('renders company images', () => {
    render(<Career />);
    
    const image = screen.getByAltText('Web and Systems Developer');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('fall-river-florist-supply.jpeg'));
    expect(image).toHaveClass('position-image');
  });

  test('applies correct styling to career elements', () => {
    render(<Career />);
    
    // Test styling classes
    expect(screen.getByText('Career')).toBeInTheDocument();
    const positionElements = screen.getAllByText('Web and Systems Developer');
    expect(positionElements.length).toBeGreaterThan(0);
    expect(screen.getAllByText('Fall River Florist Supply')).not.toHaveLength(0);
    
    const positionItems = document.querySelectorAll('.position-item');
    expect(positionItems.length).toBeGreaterThan(0);
  });

  test('renders experience items in chronological order', () => {
    render(<Career />);
    
    const periods = screen.getAllByText(/\d{4}/);
    const dates = periods.map(period => period.textContent);
    
    // Verify dates are in reverse chronological order
    const sortedDates = [...dates].sort((a, b) => {
      const yearA = parseInt(a.match(/\d{4}/)[0]);
      const yearB = parseInt(b.match(/\d{4}/)[0]);
      return yearB - yearA;
    });
    
    expect(dates).toEqual(sortedDates);
  });
});
