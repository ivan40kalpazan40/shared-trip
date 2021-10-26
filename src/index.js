const express = require('express');
const path = require('path');
const initHandlebars = require('./config/handlebars');
const app = express();

// STATIC FILES SETUP
app.use(express.static(path.resolve(__dirname, './public')));

require('./config/handlebars');
initHandlebars(app);
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log(`Server is active on port 3000....`);
});
