// This mock file handles various static file imports in tests
module.exports = {
  // Default string for basic file imports
  __esModule: true,
  default: 'test-file-stub',
  
  // Mock specific file types if needed
  src: 'test-file-stub',
  
  // Mock SVG component properties
  ReactComponent: {
    $$typeof: Symbol.for('react.forward_ref'),
    render: () => null,
  },
}; 