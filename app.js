const express = require('express');

const app = express();
const router = require('./server/routes');

app.use(express.json());
app.use('/api/fec2/rfp/reviews', router);
const port = 3002;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});