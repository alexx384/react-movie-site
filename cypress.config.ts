import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      REQUEST_URI: 'http://localhost:4000',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
