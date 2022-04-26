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
  response TEXT,
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

-- add foreign keys
ALTER TABLE reviews_photos ADD FOREIGN KEY (review_id) REFERENCES reviews(review_id);
ALTER TABLE characteristics_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews(review_id);
ALTER TABLE characteristics_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics(id);

-- port from csv files to tables
COPY reviews FROM '/home/brc/reviewsSDC/reviews.csv' DELIMITER ',' CSV HEADER;
COPY reviews_photos FROM '/home/brc/reviewsSDC/reviews_photos.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/home/brc/reviewsSDC/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristics_reviews FROM '/home/brc/reviewsSDC/characteristics_reviews.csv' DELIMITER ',' CSV HEADER;

-- create indexes on relevant tables
CREATE INDEX idx_product_id ON reviews (product_id);
CREATE INDEX idx_photos_review_id ON reviews_photos (review_id);
CREATE INDEX idx_characteristics_id ON characteristics_reviews(review_id);
CREATE INDEX idx_characteristics_reviews_id ON characteristics_reviews(characteristic_id);