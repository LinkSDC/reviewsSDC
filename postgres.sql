DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY UNIQUE,
  product_id INT NOT NULL,
  rating SMALLINT NOT NULL,
  date TIMESTAMP NOT NULL,
  summary VARCHAR(60) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR(200) NOT NULL,
  reviewer_email VARCHAR(200),
  response VARCHAR(1000) NOT NULL,
  helpfulness INT NOT NULL,
);

DROP TABLE IF EXISTS reviews_photos;

CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  review_id INT NOT NULL,
  url VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  product_id INT NOT NULL,
  characteristic_name VARCHAR(255) NOT NULL,
)

DROP TABLE IF EXISTS characteristics_reviews;

CREATE TABLE characteristics_reviews (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value SMALLINT,
)

ALTER TABLE reviews_photos ADD FOREIGN KEY (review_id) REFERENCES reviews(review_id);
ALTER TABLE characteristics_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews(review_id);
ALTER TABLE characteristics_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics(id);