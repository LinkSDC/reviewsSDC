const db = require('./index.js');

module.exports = {
  readReviews: (product_id, count, page, sort, callback) => {
    const offset = (page - 1) * count;
    let sortField;
    if (sort === 'newest') {
      sortField = 'date DESC';
    } else if (sort === 'helpful') {
      sortField = 'helpfulness DESC';
    } else {
      sortField = 'helpfulness DESC, date DESC';
    }

    const queryString = `SELECT review_id, rating, summary, recommend, response, body, to_timestamp(date / 1000) date, reviewer_name, helpfulness, (SELECT COALESCE(json_agg(row_to_json(reviews_photos)), '[]' :: json) reviews_photos FROM ( SELECT id, url FROM reviews_photos WHERE reviews_photos.review_id = reviews.review_id ) reviews_photos ) FROM reviews WHERE product_id = $1 AND reported = false ORDER BY $4 LIMIT $2 OFFSET $3`;

    db.query( queryString, [ product_id, count, offset, sortField], (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      }
    );
  },

  readReviewsMeta: (product_id, callback) => {},

  sendReview: ({ product_id, rating, summary, body, recommend, name, email, photos, characteristics }, callback) => {
    const date = Date.now();
    const queryString = `INSERT INTO reviews VALUES (product_id = $1, rating = $2, summary = $3, recommend = $4, name = $6, email = $7, date = $8, reported = false, helpfulness = 0);`;

    db.query(queryString, [product_id, rating, summary, body, recommend, name, email], (err, response) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, response.rows);
      }
    })
  },

  changeHelpful: (review_id, callback) => {
    const queryString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = $1`;

    db.query(queryString, [review_id], (err, response) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, response.rows);
      }
    })
  },

  changeReport: (review_id) => {
    const queryString = `UPDATE reviews SET reported = true WHERE review_id = $1`;

    db.query(queryString, [review_id], (err, response) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, response.rows);
      }
    })
  }
};
