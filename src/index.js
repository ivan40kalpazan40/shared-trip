const express = require('express');
const path = require('path');
const initHandlebars = require('./config/handlebars');
const router = require('./router');
const app = express();

// STATIC FILES SETUP
app.use(express.static(path.resolve(__dirname, './public')));

require('./config/handlebars');
initHandlebars(app);
app.use(router);

app.listen(3000, () => {
  console.log(`Server is active on port 3000....`);
});
