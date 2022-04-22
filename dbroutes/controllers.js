const models = require('./models.js');

module.exports = {
  getReviews: (req, res) => {

    models.readReviews((err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        // res.json(results);
        console.log(results);
      }
    })
  }

  getReviewsMeta: (req, res) => {

    models.readReviewsMeta((err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        // res.json(results);
        console.log(results);
      }
    })
  }
}