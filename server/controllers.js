const models = require('./models.js');

module.exports = {
  getReviews: (req, res) => {

    models.readReviews((err, data) => {
      if (err) {
        console.log('err @ getreviews:', err);
        res.sendStatus(500);
      } else {
        res.json(data);
      }
    })
  },

  getReviewsMeta: (req, res) => {

    res.send('stuff2')
    // models.readReviewsMeta((err, data) => {
    //   if (err) {
    //     console.log('err @ getReviewsMeta:', err);
    //     res.sendStatus(500);
    //   } else {
    //     res.json(data);
    //   }
    // })
  },

  // postReview: (req, res) => {},

  // putHelpful: (req, res) => {},

  // putReport: (req, res) => {}
};
