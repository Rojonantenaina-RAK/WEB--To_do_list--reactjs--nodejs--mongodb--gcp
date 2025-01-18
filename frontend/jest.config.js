module.exports = {
    testEnvironment: 'jsdom', // Simulate a DOM environment for React tests
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest", // Transpile JSX/TSX files using Babel
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Include .tsx and .ts for TypeScript support
  };
  