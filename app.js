const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const router = require('./server/routes');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/fec2/rfp/reviews', router);
const port = 3002;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});