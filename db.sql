CREATE DATABASE yelp;

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
);

DROP TABLE restaurants;

INSERT INTO restaurants (name, location, price_range)
VALUES
    ('McDonald''s', 'New York', 3),
    ('Pizza Hut', 'Las Vegas', 2),
    ('Wendy''s', 'Denver', 3);