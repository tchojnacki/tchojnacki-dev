// @ts-check

const nextJest = /** @type {import('next/jest').default} */ (
  /** @type {unknown} */ (require('next/jest'))
)

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/src/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['ResizeObserver', 'showModal', 'watchMedia'].map(
    file => `<rootDir>/tests/mocks/${file}.mock.ts`
  ),
}

module.exports = createJestConfig(customJestConfig)
