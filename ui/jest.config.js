module.exports = {
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '@vue/vue3-jest'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironmentOptions: {
    customExportConditions: [
      'node',
      'node-addons'
    ]
  },
  testEnvironment: 'jsdom'

}
