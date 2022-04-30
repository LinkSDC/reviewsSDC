const express = require('express');
const cors = require('cors');
require('newrelic');

const app = express();
const router = require('./server/routes');

app.use(cors());
app.use(express.json());
app.use('/api/fec2/rfp/reviews', router);
const port = 3002;

app.get('/loaderio-7c51c99a567151ad844aad39e7375e6f/', (req, res) => {
  res.send('loaderio-7c51c99a567151ad844aad39e7375e6f');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});