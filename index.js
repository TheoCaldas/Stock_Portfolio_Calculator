const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public', {root: __dirname}));

app.get('/', (req, res) => {
  res.sendFile('views/home.html', {root: __dirname })
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});