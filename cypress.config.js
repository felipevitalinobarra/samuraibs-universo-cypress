const { defineConfig } = require("cypress");
const { Pool } = require('pg')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const pool = new Pool({
        host: 'ep-morning-rice-a5b06iwm.us-east-2.aws.neon.tech',
        user: 'SamuraiBS-Dev_owner',
        password: 'cXM2fGYF6Spx',
        database: 'SamuraiBS-Dev',
        port: 5432,
        ssl: true
      })

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
