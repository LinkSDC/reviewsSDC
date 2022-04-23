const models = require('./models.js');

module.exports = {
  getReviews: (req, res) => {

    const { product_id, sort} = req.query;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const results = [];

    const dataObj = {product: product_id, page, count, results};

    models.readReviews(dataObj, (err, data) => {
      if (err) {
        console.log('err @ getreviews:', err);
        res.status(500);
      } else {
        res.json(data);
      }
    })
  },

  getReviewsMeta: (req, res) => {

    models.readReviewsMeta((err, data) => {
      if (err) {
        console.log('err @ getReviewsMeta:', err);
        res.sendStatus(500);
      } else {
        res.json(data);
      }
    })
  },

  postReview: (req, res) => {
    res.status(204).send();
  },

  putHelpful: (req, res) => {
    res.status(204).send();
  },

  putReport: (req, res) => {
    res.status(204).send();
  }
};
