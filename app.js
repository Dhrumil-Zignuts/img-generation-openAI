const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Set a view JS
app.set('view engine', 'ejs');

const statement = require('./routes/statementRoutes');
app.use('/statement', statement);

app.get('/', (req, res) => {
  res.redirect('/statement/renderHome');
});

app.listen(3000, () => {
  console.log('server is running on 3000 port');
});
