const app = require('express')();
const initExpress = require('./config/express.config');
const initHandlebars = require('./config/handlebars.config');
const initDb = require('./config/db.config');
const { auth } = require('./middleware/authMiddleware');
const { DB_CONNECTION_STRING, PORT } = require('./config/constants.config');
const router = require('./router');

initExpress(app);
initHandlebars(app);
app.use(auth);
app.use(router);
initDb(DB_CONNECTION_STRING)
  .then(() => {
    console.log(`connected to DATABASE .... `);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is active on port ${PORT}....`);
    });
  })
  .catch((error) => {
    console.log(`ERROR::DB CONNECTION:: ${error.message}`);
  });
