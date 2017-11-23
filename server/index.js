const express = require('express');
const bodyParser = require('body-parser');

// set port number
const PORT  = process.env.PORT || 8000;

const app = express();

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// use folder f
app.use(express.static(`${__dirname}/../`));

// start server
app.listen(PORT, () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});
