use scjt_bookstore;

INSERT INTO authors (name)
VALUES ('Thomas More'), 
	   ('Jane Austen'), 
       ('Lincoln Child'), 
       ('George Eliot');

INSERT INTO books (name, published_year, author_id)
VALUES ('Utopia', 1516, 1),
('Pride and Prejudice', 1813, 2),
('Utopia', 2002, 3),
('Silas Marner', 2005, 4),
('Test Book', NULL, 3);
