const { defineConfig } = require("cypress");
const pool = require('./db');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        removeUser(email) {
          return new Promise(function (resolve, reject) {
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function (error, result) {
              if (error) {
                reject(error);
              } else {
                resolve({ success: result });
              }
            });
          });
        },

        findToken(email) {
          return new Promise(function (resolve, reject) {
            pool.query(
              `SELECT B.token 
               FROM public.users A 
               INNER JOIN public.user_tokens B 
               ON A.id = B.user_id 
               WHERE A.email = $1 
               ORDER BY B.created_at`,
              [email],
              function (error, result) {
                if (error) {
                  reject(error);
                } else if (result.rows.length > 0) {
                  resolve({ token: result.rows[0].token });
                } else {
                  resolve({ token: null });
                }
              }
            );
          });
        }
      });
    },

    "baseUrl": "http://localhost:3000",
    "apiServer": "http://localhost:3333",
    "viewportWidth": 1440,
    "viewportHeight": 900
  },
});