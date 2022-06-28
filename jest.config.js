const nextJest = require('next/jest')

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/jest.mocks.js'],
}

const createJestConfig = nextJest({
  dir: './',
})(customJestConfig)

module.exports = async () => {
  const jestConfig = await createJestConfig()

  const moduleNameMapper = {
    ...jestConfig.moduleNameMapper,
    '^@/(.*)$': '<rootDir>/src/$1',
  }

  return { ...jestConfig, moduleNameMapper }
}
