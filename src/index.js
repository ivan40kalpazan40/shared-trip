const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const initHandlebars = require('./config/handlebars.config');
const initDb = require('./config/db.config');
const { DB_CONNECTION_STRING, PORT } = require('./config/constants.config');
const router = require('./router');
const app = express();

// STATIC FILES SETUP
app.use(express.static(path.resolve(__dirname, './public')));
require('./config/handlebars.config');
initHandlebars(app);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
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
