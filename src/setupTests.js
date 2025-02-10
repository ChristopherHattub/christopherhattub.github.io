// jest-dom adds custom jest matchers for asserting on DOM nodes
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
    this.observerEntries = [];
  }

  observe(element) {
    this.elements.add(element);
    this.callback(this.observerEntries);
    return null;
  }

  unobserve(element) {
    this.elements.delete(element);
    return null;
  }

  disconnect() {
    this.elements.clear();
    return null;
  }
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock window methods and properties
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollTo and scrollBy
window.scrollTo = jest.fn();
Element.prototype.scrollTo = jest.fn();
Element.prototype.scrollBy = jest.fn();

// Mock ResizeObserver
class MockResizeObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(element) {
    this.elements.add(element);
    return null;
  }

  unobserve(element) {
    this.elements.delete(element);
    return null;
  }

  disconnect() {
    this.elements.clear();
    return null;
  }
}

global.ResizeObserver = MockResizeObserver;

// Mock canvas context
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({
    data: new Array(4),
  })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => []),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  translate: jest.fn(),
  transform: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
}));

// Mock window.fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    blob: () => Promise.resolve(new Blob()),
  })
);

// Mock console methods to avoid noise in tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
console.error = (...args) => {
  if (args[0]?.includes?.('Warning:')) return;
  if (args[0]?.includes?.('Error:')) return;
  originalConsoleError.call(console, ...args);
};
console.warn = (...args) => {
  if (args[0]?.includes?.('Warning:')) return;
  originalConsoleWarn.call(console, ...args);
};

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 120,
  height: 120,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}));

// Mock scrollLeft
Object.defineProperty(Element.prototype, 'scrollLeft', {
  configurable: true,
  get: function() { return 0; },
  set: function(value) { /* do nothing */ }
});

// Mock clientWidth and clientHeight
Object.defineProperty(Element.prototype, 'clientWidth', {
  configurable: true,
  get: function() { return 1024; }
});

Object.defineProperty(Element.prototype, 'clientHeight', {
  configurable: true,
  get: function() { return 768; }
});
