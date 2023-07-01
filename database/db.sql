CREATE DATABASE tcc_db;

USE tcc_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, email, password)
VALUES
  ('user1', 'test1@example.com', 'password1'),
  ('user2', 'test2@example.com', 'password2'),
  ('user3', 'test3@example.com', 'password3');
