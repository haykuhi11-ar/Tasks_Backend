
--1
CREATE DATABASE bookstore;
\l
\c bookstore
\conninfo

--2
CREATE USER librarian WITH PASSWORD 'lib123';
CREATE USER visitor WITH PASSWORD 'vis123';
\du
GRANT CONNECT ON DATABASE bookstore TO visitor;
ALTER USER librarian WITH PASSWORD 'newpass456';
ALTER ROLE visitor NOLOGIN;
ALTER ROLE visitor WITH LOGIN;

--3
CREATE TABLE authors (
    id serial PRIMARY KEY,
    name text NOT NULL,
    birth_year integer CHECK (birth_year BETWEEN 1000 AND 2100),
    country text DEFAULT 'Unknown'
);

CREATE TABLE books (
    id serial PRIMARY KEY,
    title text NOT NULL,
    author_id integer REFERENCES authors(id),
    price numeric(10, 2) NOT NULL CHECK(price > 0),
    in_stock boolean DEFAULT true,
    published_date date,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE customers (
    id serial PRIMARY KEY,
    full_name text NOT NULL,
    email text UNIQUE NOT NULL,
    phone text,
    registered_at timestamptz DEFAULT now()
);

\dt
\d books


--4
INSERT INTO authors (name, birth_year, country) VALUES 
('Hovhannes Tumanyan', 1869, 'Armenia'),
('George Orwell', 1903, 'United Kingdom'),
('Alexander Pushkin', 1799, 'Russia');

INSERT INTO books (title, author_id, price, in_stock, published_date) VALUES
('Anoush', 1, 8.50, true, '1890-01-01'),
('The Gidg', 1, 12.00, false, '1908-01-01'),
('1984', 2, 15.99, true, '1949-06-08'),
('Animal Farm', 2, 55.00, true, '1945-08-17'),
('Eugene Onegin', 3, 25.40, true, '1833-02-27');

-- Task 4.2 — Attempting to insert a date using only the year format
-- Command: INSERT INTO books (title, author_id, price, in_stock, published_date) VALUES ('Anoush', 1, 8.50, true, '1890');
-- Error: ERROR: invalid input syntax for type date: "1890"
-- Reason: The 'date' data type requires a full YYYY-MM-DD format (e.g., '1890-01-01') rather than just a year.

INSERT INTO customers (full_name, email, phone) VALUES 
('James Doe', 'james@example.com', '+123456789'),
('Anna Sargsyan', 'anna@example.com', NULL),
('Bob Smith', 'bob@example.com', '+987654321');

-- Task 4.4 — Attempting to insert a book with a price of 0
-- Command: 
-- INSERT INTO books (title, author_id, price, in_stock, published_date) VALUES 
-- ('Gikor', 1, 0, true, '1895-01-01');
-- Error: ERROR: new row for relation "books" violates check constraint "books_price_check"
-- Detail: Failing row contains (6, Gikor, 1, 0.00, t, 1895-01-01, 2026-06-01 11:10:07.789798+04).
-- Reason: The CHECK (price > 0) constraint prevents adding products with a zero or negative price.

-- Task 4.5 — Attempting to insert a customer with a duplicate email
-- Command:
-- INSERT INTO customers (full_name, email) VALUES 
-- ('Bob Lee', 'bob@example.com');
-- Error: ERROR: duplicate key value violates unique constraint "customers_email_key"
-- Detail: Key (email)=(bob@example.com) already exists.
-- Reason: The UNIQUE constraint on the email column prevents two customers from using the exact same email address.

--4.6
--Show all books, sorted by price from highest to lowest
SELECT * FROM books
ORDER BY price DESC;

--Show only books that cost less than 20
SELECT * FROM books
WHERE price < 20;

-- Show only the title and price columns of all books
SELECT title, price FROM books;

--Show all authors from Armenia
SELECT * FROM authors 
WHERE country = 'Armenia';

-- Show the 3 most recently added books
SELECT * FROM books
ORDER BY created_at DESC
LIMIT 3;

--Show all books that are NOT in stock
SELECT * FROM books
WHERE in_stock = false;

--5
UPDATE books 
SET price = price * 1.10;

UPDATE books
SET in_stock = false
WHERE price > 50;

UPDATE books
SET phone = '1234567890'
WHERE email = 'bob@example.com';

DELETE FROM books
WHERE title LIKE '%Anush%';

--5.5 Why is it dangerous to write UPDATE or DELETE without a WHERE clause?
-- Writing UPDATE or DELETE without a WHERE clause is dangerous because 
-- it applies the action to EVERY row in the table. Without a filter, 
-- it will modify or wipe out all your data permanently in a single execution.

ALTER TABLE books
ADD COLUMN pages integer NULL;

ALTER TABLE customers
ADD COLUMN is_active boolean DEFAULT true;

ALTER TABLE customers
RENAME COLUMN full_name TO name;

ALTER TABLE books
ALTER COLUMN pges TYPE smallint;

ALTER TABLE books
ADD CONSTRAINT chk_pages_positive CHECK (pages > 0);

ALTER TABLE authors
DROP COLUMN country;

ALTER TABLE authors
ADD COLUMN country varchar(100) DEFAULT 'Armenia';

GRANT SELECT, INSERT, UPDATE, DELETE ON books TO librarian;

GRANT SELECT ON books TO visitor;

--7.3 Try to insert a new book — what happens? Write the result as a comment.
-- ERROR: permission denied for table books
-- Explanation: The operation fails because the user 'visitor' has only 
-- been granted SELECT (read-only) privileges on the 'books' table.

--7.4 Still as visitor, try to SELECT from authors — what happens? Why?
-- Result: ERROR: permission denied for table authors
-- Why: In PostgreSQL, all permissions are explicitly denied by default (Secure by Default). 
-- Since the 'visitor' user was only granted SELECT privileges on the 'books' table, 
-- they have absolutely no access rights to the 'authors' table or any other table 
-- until they are explicitly given permission or added to a group that has it.

-- 7.5 Go back to your postgres user.
--Add visitor to the readers group role you created in Task 2.4.
--Then grant SELECT on ALL TABLES to the readers group.

GRANT readers TO visitor;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readers;


-- Task 7.6 Verification Result:
REVOKE INSERT ON books FROM librarian;

-- Command: INSERT INTO books (title, price, in_stock) VALUES ('Book', 10.00, true);
-- Error: ERROR: permission denied for table books
-- Explanation: The verification is successful. The database correctly blocks the operation 
-- because the INSERT privilege was revoked from the 'librarian' user.

--8
SELECT books.title, authors.name 
FROM books
JOIN authors ON books.author_id = authors.id;

SELECT books.title, authors.name, authors.birth_year
FROM books
JOIN authors ON books.author_id = authors.id
WHERE authors.birth_year > 1900;

SELECT authors.name, COUNT(books.id) AS book_count
FROM authors
LEFT JOIN books ON authors.id = books.author_id
GROUP BY authors.id, authors.name;

SELECT authors.name, COUNT(books.id) AS book_count
FROM authors
JOIN books ON authors.id = books.author_id
GROUP BY authors.id, authors.name
HAVING COUNT(books.id) > 1;

--BONUS 
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT customers.name, 
SUM(books.price * orders.quantity) AS total_spent
FROM customers
JOIN orders ON customers.id = orders.customer_id
JOIN books ON orders.book_id = books.id
GROUP BY customers.id, customers.name;

CREATE ROLE bookstore_admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO bookstore_admin;
GRANT bookstore_admin TO librarian;

ALTER ROLE visitor VALID UNTIL '2026-07-01 23:59:59';

ALTER TABLE books 
ADD COLUMN genre VARCHAR(50) CHECK (genre IN ('fiction', 'non-fiction', 'poetry', 'children'));

-- INSERT INTO books (title, price, in_stock, genre) 
-- VALUES ('Steve Jobs Bio', 29.99, true, 'biography');

-- Error: ERROR: new row for relation "books" violates check constraint "books_genre_check"
-- DETAIL:  Failing row contains (6, Steven Jobs BIO, null, 29.20, t, null, 2026-06-01 22:48:13.311679+04, null, biography).
-- Explanation: The database blocks the INSERT operation because 'biography' is not 
-- included in the allowed list of genres defined by the CHECK constraint.


--9
SELECT pid, usename, client_addr, state 
FROM pg_stat_activity 
WHERE datname = 'bookstore';

-- DROP USER visitor
-- Error: ERROR: role "visitor" cannot be dropped because some objects depend on it
-- Detail: privileges for table books, privileges for schema public
-- Why: In PostgreSQL, you cannot drop a user that still holds privileges on any database objects, 
-- or belongs to a role group that has active assignments. PostgreSQL prevents this to avoid orphaned permissions.

REASSIGN OWNED BY visitor TO postgres;
DROP OWNED BY visitor;
DROP USER visitor;

-- Did the order matter? Yes, the order matters.
-- Why: The 'books' table has a foreign key constraint (author_id) that references the 'authors' table. 
-- If you try to drop 'authors' first, PostgreSQL will block it with an error because 'books' depends on it. 
-- Therefore, you must drop the dependent table ('books') first, or use 'DROP TABLE authors CASCADE;'.

\c postgres
DROP DATABASE bookstore;

