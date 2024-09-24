const { defineConfig } = require("cypress");
const pool = require('./db');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        removeUser(email) {
          return new Promise(function (resolve) {
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function (error, result) {
              if (error) {
                throw error
              }
              resolve({ success: result })
            })
          })
        }
      })
    },

    "baseUrl": "http://localhost:3000",
    "viewportWidth": 1440,
    "viewportHeight": 900

  },
});
