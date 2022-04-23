const db = require('./index.js');

module.exports = {
  readReviews: (dataObj, callback) => {
    var queryStr = `SELECT * FROM reviews WHERE product_id = ${dataObj.product}`;

    db.query(queryStr)
    .then((results) => {
      const alteredResults = results.rows.slice(0, dataObj.count).map((review) => {
        // NEED TO FIX DATE, THIS DOESN'T WORK
        review.date = new Date(review.date);
        var queryStr = `SELECT * FROM reviews_photos WHERE review_id = ${review.review_id}`;

        return db.query(queryStr)
        .then((photos) => {
          review['photos'] = photos.rows;
          return review;
        })
        .catch((err) => {
          callback(err, null);
        })
      })
      Promise.all(alteredResults)
      .then((review) => {
        dataObj.results = review;
        callback(null, dataObj);
      })
    })
    .catch((err) => {
      callback(err, null)
    })
  },

  readReviewsMeta: (callback) => {
    // I need
    // characteristics
      // comfort
      // fit
      // length
      // quality
    // ratings
    // recommended
    var queryStr = `SELECT * FROM `;

    db.query(queryStr, (err, results) => {
      callback(err, results);
    });
  },

  sendReview: () => {},

  changeHelpful: () => {},

  changeReport: () => {}
};
