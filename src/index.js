const express = require('express');
const initHandlebars = require('./config/handlebars');
const app = express();

require('./config/handlebars');
initHandlebars(app);
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log(`Server is active on port 3000....`);
});
