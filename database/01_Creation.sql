-- Extension for handling hashes using the crypt algorithm
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Database
CREATE TABLE CLIENT(
	client_id SERIAL PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	avatar_url VARCHAR(300),
	email VARCHAR(150) NOT NULL UNIQUE,
	password_hash VARCHAR(200) NOT NULL,
	role VARCHAR(5) NOT NULL CHECK (role IN ('Admin', 'User'))
);


CREATE TABLE REVIEW(
	review_id SERIAL PRIMARY KEY,
	client_id INT NOT NULL,
	comment VARCHAR(200) NOT NULL,
	rating INT NOT NULL CHECK(rating BETWEEN 1 AND 5),
	is_published BOOLEAN NOT NULL DEFAULT FALSE,

	FOREIGN KEY(client_id) REFERENCES CLIENT(client_id)
);


CREATE TABLE CATEGORY(
	category_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);


CREATE TABLE PRODUCT(
	product_id SERIAL PRIMARY KEY,
	category_id INT NOT NULL,
	name VARCHAR(100) NOT NULL,
	description VARCHAR(200) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	image_url VARCHAR(300) NOT NULL,
	is_available BOOLEAN NOT NULL DEFAULT TRUE,

	FOREIGN KEY(category_id) REFERENCES CATEGORY(category_id)
);