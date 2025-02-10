import { useMediaQuery, BREAKPOINTS } from '../../utils/responsive';
import { renderHook } from '@testing-library/react';

describe('Responsive Utils', () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    // Mock window.matchMedia
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  describe('useMediaQuery', () => {
    test('returns false for unmatched query', () => {
      const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
      expect(result.current).toBe(false);
    });

    test('returns true for matched query', () => {
      window.matchMedia.mockImplementation(query => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
      expect(result.current).toBe(true);
    });

    test('handles media query change events', () => {
      let mediaQueryCallback;
      const mockMediaQueryList = {
        matches: false,
        media: '(min-width: 768px)',
        onchange: null,
        addEventListener: jest.fn((event, callback) => {
          mediaQueryCallback = callback;
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };

      window.matchMedia.mockImplementation(() => mockMediaQueryList);

      const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
      expect(result.current).toBe(false);

      // Simulate media query change
      if (mediaQueryCallback) {
        mediaQueryCallback({ matches: true });
      }
    });
  });

  describe('BREAKPOINTS', () => {
    test('contains all required breakpoint values', () => {
      expect(BREAKPOINTS).toEqual({
        mobile: expect.any(String),
        tablet: expect.any(String),
        desktop: expect.any(String),
        largeDesktop: expect.any(String)
      });
    });

    test('breakpoint values are valid CSS media queries', () => {
      Object.values(BREAKPOINTS).forEach(breakpoint => {
        // Check that it contains valid media query syntax
        expect(breakpoint).toMatch(/^\([^)]+\)|\([^)]+\) and \([^)]+\)$/);
      });
    });
  });
});
