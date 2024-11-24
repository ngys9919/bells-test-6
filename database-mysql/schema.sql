-- SQL Schema for scjt_bookstore
CREATE DATABASE scjt_bookstore;

USE scjt_bookstore;

-- Authors table
CREATE TABLE authors (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR (255) NOT NULL,
PRIMARY KEY (id)
);

-- Books table
CREATE TABLE books (
id INT NOT NULL AUTO_INCREMENT, 
name VARCHAR (255) NOT NULL,
published_year INT,
author_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (author_id) REFERENCES authors (id)
);	
