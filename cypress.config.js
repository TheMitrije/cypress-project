const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    env: {
      // requestMode: true,
      hideCredentials: false,
    },
    baseUrl: "https://reqres.in/"
  },
});
