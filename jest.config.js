// @ts-check

const { default: nextJest } = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/src/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: [
    '<rootDir>/tests/mocks/ResizeObserver.mock.ts',
    '<rootDir>/tests/mocks/watchMedia.mock.ts',
  ],
}

module.exports = createJestConfig(customJestConfig)
