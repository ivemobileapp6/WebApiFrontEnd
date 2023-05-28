module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jest-environment-jsdom', // Change this line
  transformIgnorePatterns: ['/node_modules/'],
};