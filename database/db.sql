CREATE DATABASE tcc_db;

USE tcc_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (email, password)
VALUES
  ('test1@example.com', 'password1'),
  ('test2@example.com', 'password2'),
  ('test3@example.com', 'password3');
