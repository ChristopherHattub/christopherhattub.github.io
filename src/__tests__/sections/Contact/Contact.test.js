import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../../../sections/Contact/Contact';

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
  Github: () => <div data-testid="github-icon">Github</div>,
  Linkedin: () => <div data-testid="linkedin-icon">Linkedin</div>,
  Mail: () => <div data-testid="email-icon">Mail</div>,
  MapPin: () => <div data-testid="location-icon">MapPin</div>,
}));

describe('Contact Section', () => {
  test('renders contact information correctly', () => {
    render(<Contact />);
    
    // Personal information
    expect(screen.getByText('Christopher Hattub')).toBeInTheDocument();
    expect(screen.getByText('chris.hattub@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('New Hampshire Seacoast Area')).toBeInTheDocument();
  });

  test('renders social links with correct attributes', () => {
    render(<Contact />);
    
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    
    // Test href attributes
    expect(githubLink).toHaveAttribute('href', 'https://github.com/ChristopherHattub');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/christopher-hattub-558926201/');
    
    // Test target attribute for external links
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    
    // Test rel attribute for security
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders section with correct structure', () => {
    const { container } = render(<Contact />);
    
    // Test section structure
    expect(container.querySelector('section')).toHaveClass('contact-section');
    expect(container.querySelector('.columns-wrapper')).toBeInTheDocument();
  });

  test('renders contact icons', () => {
    render(<Contact />);
    
    // Test for presence of contact icons
    expect(screen.getByTestId('email-icon')).toBeInTheDocument();
    expect(screen.getByTestId('location-icon')).toBeInTheDocument();
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
  });

  test('applies correct styling to contact elements', () => {
    const { container } = render(<Contact />);
    
    // Test styling classes
    const section = container.querySelector('section');
    expect(section).toHaveClass('contact-section');
    
    // Test text sections
    const textSections = container.querySelectorAll('.text-section');
    expect(textSections.length).toBeGreaterThan(0);
    
    // Test social links
    const socialLinks = screen.getAllByRole('link');
    socialLinks.forEach(link => {
      if (link.href.includes('github') || link.href.includes('linkedin')) {
        expect(link).toHaveClass('social-link');
      }
    });
  });
});
