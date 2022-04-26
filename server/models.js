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

    const queryString = `SELECT review_id, rating, summary, recommend, response, body, to_timestamp(date / 1000) date, reviewer_name, helpfulness, (SELECT COALESCE(json_agg(row_to_json(reviews_photos)), '[]' :: json) reviews_photos FROM ( SELECT id, url FROM reviews_photos WHERE reviews_photos.review_id = reviews.review_id ) reviews_photos ) FROM reviews WHERE product_id = $1 AND reported = false ORDER BY $4 LIMIT $2 OFFSET $3;`;

    db.query(queryString, [product_id, count, offset, sortField], (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      }
    );
  },

  readReviewsMeta: (id, callback) => {
    const queryString = `
    SELECT json_build_object (
      'id', ${id},
      'ratings', (
        SELECT json_object_agg(rating, count)
        FROM (
          SELECT rating, COUNT(*)
          FROM reviews
          WHERE product_id = ${id}
          GROUP BY rating
          ORDER BY rating
          ) AS ratings
      ),
      'recommended', (
        SELECT json_object_agg(
          CAST(
            CASE WHEN recommend = 'true' THEN 1
            ELSE 0
            END as bit
          ), count)
        FROM (
          SELECT recommend, COUNT(*)
          FROM reviews
          WHERE product_id = ${id}
          GROUP BY recommend
          ORDER BY recommend
        ) AS recommend
      ),
      'characteristics', (
          (SELECT json_agg(
            json_build_object(
              'id', characteristics.id,
              'characteristic_name', characteristics.characteristic_name,
              'value', ((SELECT AVG (value) FROM characteristics_reviews WHERE characteristic_id = characteristics.id)::numeric(10,4))
            )
          ) FROM characteristics WHERE id = ${id})
      )
    ) AS result
  ;`;

    db.query(queryString, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    })
  },

  sendReview: ({ product_id, rating, summary, body, recommend, name, email, photos, characteristics }, callback) => {
    const date = Date.now();
    const queryString = `INSERT INTO reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email, date, reported, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

    db.query(queryString, [product_id, rating, summary, body, recommend, name, email, date, false, 0], (err, response) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, response.rows);
      }
    })
  },

  changeHelpful: (review_id, callback) => {
    const queryString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = $1;`;

    db.query(queryString, [review_id], (err, response) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, response.rows);
      }
    })
  },

  changeReport: (review_id, callback) => {
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
