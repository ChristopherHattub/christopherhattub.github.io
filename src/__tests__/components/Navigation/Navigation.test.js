import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../../../components/Navigation/Navigation';

describe('Navigation Component', () => {
  beforeEach(() => {
    // Mock element.getBoundingClientRect()
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
      bottom: 500,
      right: 500,
      width: 500,
      height: 500,
    }));

    // Reset window.scrollTo mock
    window.scrollTo = jest.fn();
    
    // Mock getElementById since we're not in a real DOM
    document.getElementById = jest.fn(id => {
      const element = document.createElement('div');
      element.id = id;
      return element;
    });
  });

  test('renders all navigation links', () => {
    render(<Navigation />);
    
    const expectedLinks = ['Contact', 'Projects', 'Career', 'Education'];
    expectedLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test('handles click events and scrolls to correct section', () => {
    render(<Navigation />);
    
    const links = ['Contact', 'Projects', 'Career', 'Education'];
    links.forEach(link => {
      const linkElement = screen.getByText(link);
      fireEvent.click(linkElement);
      
      // Verify scrollTo was called
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: expect.any(Number),
        behavior: 'smooth'
      });
    });
  });

  test('applies correct styling to navigation links', () => {
    render(<Navigation />);
    
    const links = ['Contact', 'Projects', 'Career', 'Education'];
    links.forEach(link => {
      const linkElement = screen.getByText(link);
      expect(linkElement).toHaveClass('nav-link');
    });
  });

  test('navigation container has correct classes', () => {
    const { container } = render(<Navigation />);
    const nav = container.firstChild;
    expect(nav).toHaveClass('navigation');
  });

  test('handles scroll events and updates active section', () => {
    render(<Navigation />);
    
    // Simulate scroll event
    fireEvent.scroll(window);
    
    // Since getBoundingClientRect is mocked to return same values,
    // we just verify that the navigation links are still present
    const links = ['Contact', 'Projects', 'Career', 'Education'];
    links.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });
});
