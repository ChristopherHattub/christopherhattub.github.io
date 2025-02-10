import { scrollToSection, getActiveSection } from '../../utils/scrolling';

describe('Scrolling Utils', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
    
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
      bottom: 500,
      right: 500,
      width: 500,
      height: 500,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('scrollToSection', () => {
    test('scrolls to section with correct offset', () => {
      const mockSection = document.createElement('div');
      document.body.appendChild(mockSection);
      
      scrollToSection(mockSection);
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: expect.any(Number),
        behavior: 'smooth'
      });
      
      document.body.removeChild(mockSection);
    });

    test('handles null section gracefully', () => {
      scrollToSection(null);
      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('getActiveSection', () => {
    test('returns active section based on viewport position', () => {
      const sections = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      
      sections.forEach(section => document.body.appendChild(section));
      
      const activeSection = getActiveSection(sections);
      expect(activeSection).toBeDefined();
      
      sections.forEach(section => document.body.removeChild(section));
    });

    test('returns first section when no section is in viewport', () => {
      // Mock getBoundingClientRect to return position outside viewport
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        top: 2000,
        bottom: 2500
      }));

      const sections = [
        document.createElement('div'),
        document.createElement('div')
      ];
      
      sections.forEach(section => document.body.appendChild(section));
      
      const activeSection = getActiveSection(sections);
      expect(activeSection).toBe(sections[0]);
      
      sections.forEach(section => document.body.removeChild(section));
    });

    test('handles empty sections array', () => {
      const activeSection = getActiveSection([]);
      expect(activeSection).toBeUndefined();
    });

    test('handles null sections', () => {
      const activeSection = getActiveSection(null);
      expect(activeSection).toBeUndefined();
    });
  });
});
