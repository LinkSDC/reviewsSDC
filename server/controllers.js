const models = require('./models.js');

module.exports = {
  getReviews: (req, res) => {

    const { product_id } = req.query;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const { sort } = req.query || 'relevance';

    models.readReviews(product_id, count, page, sort, (err, data) => {
      if (err) {
        console.log('err @ getreviews:', err);
        res.sendStatus(500);
      } else {
        const dataObj = {product_id, count, page, data};
        res.json(dataObj);
      }
    })
  },

  getReviewsMeta: (req, res) => {

    const { product_id } = req.query;

    models.readReviewsMeta(product_id, (err, data) => {
      if (err) {
        console.log('err @ getReviewsMeta:', err);
        res.sendStatus(500);
      } else {
        res.json(data);
      }
    })
  },

  postReview: (req, res) => {
    models.sendReview({...req.body}, (err, data) => {
      if (err) {
        console.log('err @ postReview: ', err);
        res.sendStatus(500);
      } else {
        res.send(data);
      }
    })
  },

  putHelpful: (req, res) => {
    const { review_id } = req.params;

    models.changeHelpful(review_id, (err, data) => {
      if (err) {
        console.log('err @ putHelpful: ', err);
        res.sendStatus(500);
      } else {
        res.send(data);
      }
    })
  },

  putReport: (req, res) => {
    const { review_id } = req.params;

    models.changeReport(review_id, (err, data) => {
      if (err) {
        console.log('err @ putReport: ', err);
        res.sendStatus(500);
      } else {
        res.send(data);
      }
    })
  }
};
