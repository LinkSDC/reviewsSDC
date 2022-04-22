const db = require('./index.js');

module.exports = {
  readReviews: (callback) => {
    var queryStr = ``;

    db.query(queryStr, (err, results) => {
      callback(err, results);
    })
  }

  readReviewsMeta: (callback) => {
    var queryStr = ``;

    db.query(queryStr, (err, results) => {
      callback(err, results);
    });
  }
}