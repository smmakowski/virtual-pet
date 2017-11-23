const express = require('express');
const bodyParser = require('body-parser');

// const sitePath = process.arg[2] || '.';
const PORT  = process.env.PORT || 8000;

const app = express();

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(express.static(`${__dirname}/../`));

app.listen(PORT, () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});
