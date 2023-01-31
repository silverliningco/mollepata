const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/dcnebates-ng13'));

app.get('/*', (req,res) =>
  res.sendFile('index.html', {root: 'dist/dcnebates-ng13/'})
);

app.listen(process.env.PORT || 8080);