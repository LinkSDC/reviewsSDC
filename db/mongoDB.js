const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
  id: Number NOT NULL,
  product_id: Number,
  page: Number,
  count: Number,
  results: [
    {
      review_id: Number,
      rating: Number,
      summary: {
        type: String,
        max: 60,
      },
      recommend: Boolean,
      response: {
        type: String,
        min: 50,
        max: 1,000,
      },
      body: {
        type: String,
        min: 50,
        max: 1,000,
      },
      date: String,
      reviewer_name: String,
      helpfulness: Number,
      photos: [{
        id: Number,
        url: String,
      },],
    }
  ]
});

const reviewsMetaSchema = mongoose.Schema({
  product_id: Number NOT NULL,
  reviews: [reviewsSchema],
  meta: {
    ratings: {
      ratings: {
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
      },
      recommend: {
        true: Number,
        false: Number,
      },
      characteristics: {
        Size: {
          id: Number,
          value: Number,
        },
        Width: {
          id: Number,
          value: Number,
        },
        Comfort: {
          id: Number,
          value: Number,
        },
        Quality: {
          id: Number,
          value: Number,
        },
        Length: {
          id: Number,
          value: Number,
        },
        Fit: {
          id: Number,
          value: Number,
        },
      }
    }
  }
});
