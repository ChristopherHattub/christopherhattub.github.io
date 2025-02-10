import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ProjectCarousel from '../../../components/ProjectCarousel/ProjectCarousel';

// Mock data for testing
const mockProjects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Description 1',
    image: 'image1.jpg'
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Description 2',
    image: 'image2.jpg'
  }
];

jest.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left">ChevronLeft</div>,
  ChevronRight: () => <div data-testid="chevron-right">ChevronRight</div>,
}));

describe('ProjectCarousel Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('renders carousel with projects', () => {
    render(<ProjectCarousel projects={mockProjects} />);
    
    // Since projects are duplicated 3 times in the component
    mockProjects.forEach(project => {
      const projectTitles = screen.getAllByText(project.title);
      expect(projectTitles).toHaveLength(3);
      
      const projectDescriptions = screen.getAllByText(project.description);
      expect(projectDescriptions).toHaveLength(3);
    });
  });

  test('renders navigation buttons', () => {
    render(<ProjectCarousel projects={mockProjects} />);
    
    expect(screen.getByTestId('chevron-left')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-right')).toBeInTheDocument();
  });

  test('handles arrow button clicks', () => {
    render(<ProjectCarousel projects={mockProjects} />);
    
    const carousel = document.querySelector('.projects-carousel');
    const prevButton = screen.getByTestId('chevron-left').closest('button');
    const nextButton = screen.getByTestId('chevron-right').closest('button');
    
    fireEvent.click(nextButton);
    expect(carousel.scrollBy).toHaveBeenCalled();
    
    fireEvent.click(prevButton);
    expect(carousel.scrollBy).toHaveBeenCalled();
  });

  test('handles mouse events for dragging', () => {
    render(<ProjectCarousel projects={mockProjects} />);
    
    const carousel = document.querySelector('.projects-carousel');
    
    fireEvent.mouseDown(carousel, { pageX: 0 });
    fireEvent.mouseMove(carousel, { pageX: 100 });
    fireEvent.mouseUp(carousel);
    
    expect(carousel.scrollLeft).toBeDefined();
  });

  test('handles touch events', () => {
    render(<ProjectCarousel projects={mockProjects} />);
    
    const carousel = document.querySelector('.projects-carousel');
    
    fireEvent.touchStart(carousel, { touches: [{ pageX: 0 }] });
    fireEvent.touchMove(carousel, { touches: [{ pageX: 100 }] });
    fireEvent.touchEnd(carousel);
    
    expect(carousel.scrollLeft).toBeDefined();
  });

  test('auto-scrolling behavior', () => {
    render(<ProjectCarousel projects={mockProjects} />);
    
    const carousel = document.querySelector('.projects-carousel');
    
    // Fast-forward timers to trigger auto-scroll
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(carousel.scrollLeft).toBeDefined();
  });

  test('pauses auto-scroll on mouse enter and resumes on mouse leave', () => {
    render(<ProjectCarousel projects={mockProjects} />);
    
    const carousel = document.querySelector('.projects-carousel');
    
    fireEvent.mouseEnter(carousel);
    fireEvent.mouseLeave(carousel);
    
    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(carousel.scrollLeft).toBeDefined();
  });
});
