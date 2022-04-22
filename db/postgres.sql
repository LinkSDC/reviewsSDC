SELECT 'CREATE DATABASE atelier'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'atelier')\gexec


\c atelier

CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY UNIQUE,
  product_id INT NOT NULL,
  rating SMALLINT NOT NULL,
  date BIGINT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT,
  response TEXT NOT NULL,
  helpfulness INT NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  review_id INT NOT NULL,
  url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  product_id INT NOT NULL,
  characteristic_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS characteristics_reviews (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value SMALLINT
);

ALTER TABLE reviews_photos ADD FOREIGN KEY (review_id) REFERENCES reviews(review_id);
ALTER TABLE characteristics_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews(review_id);
ALTER TABLE characteristics_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics(id);