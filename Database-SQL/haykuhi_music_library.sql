--1


--2
CREATE DATABASE music_library;
\c music_library

CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    release_year INTEGER NOT NULL CHECK(release_year BETWEEN 1000 AND EXTRACT(YEAR FROM CURRENT_DATE)),
    artist_id INTEGER NOT NULL REFERENCES artists(id)
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    album_id INTEGER NOT NULL REFERENCES albums(id),
    duration_seconds INTEGER NOT NULL CHECK(duration_seconds > 0),
    genre VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INTEGER NOT NULL CHECK(age > 0),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE listening_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    song_id INTEGER NOT NULL REFERENCES songs(id),
    listened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\dt
\d artists
\d albums
\d songs
\d users
\d listening_history

--3

ALTER TABLE artists
ADD COLUMN bio text;

ALTER TABLE artists
DROP COLUMN bio;

INSERT INTO artists (name, country) VALUES 
    ('System of a Down', 'USA/Armenia'),
    ('Daft Punk', 'France'),
    ('Adele', 'United Kingdom'),
    ('Imagine Dragons', 'USA'),
    ('Stromae', 'Belgium'),
    ('Coldplay', 'United Kingdom'),
    ('Linkin Park', 'USA'),
    ('Eminem', 'USA'),
    ('Rihanna', 'Barbados'),
    ('Arctic Monkeys', 'United Kingdom')
;

INSERT INTO albums (title, artist_id, release_year) VALUES 
    ('Toxicity', 1, 2001),
    ('Discovery', 2, 2001),
    ('25', 3, 2015),
    ('Evolve', 4, 2017),
    ('Racine Carrée', 5, 2013),
    ('Parachutes', 6, 2000),
    ('Hybrid Theory', 7, 2000),
    ('Recovery', 8, 2010),
    ('Anti', 9, 2016),
    ('AM', 10, 2013);
;

INSERT INTO songs (title, album_id, duration_seconds, genre) VALUES 
    ('Chop Suey!', 1, 210, 'Rock'),
    ('One More Time', 2, 320, 'Electronic'),
    ('Hello', 3, 295, 'Pop'),
    ('Believer', 4, 204, 'Rock'),
    ('Papaoutai', 5, 232, 'Pop'),
    ('Yellow', 6, 269, 'Alternative'),
    ('In the End', 7, 216, 'Rock'),
    ('Lose Yourself', 8, 326, 'Rap'),
    ('Diamonds', 9, 225, 'Pop'),
    ('Do I Wanna Know?', 10, 272, 'Rock');
;

INSERT INTO users (username, email, age) VALUES 
    ('anna', 'anna@mail.com', 20),
    ('bob', 'bob@mail.com', 23),
    ('maria', 'maria@mail.com', 45),
    ('alex', 'alex@mail.com', 67),
    ('lisa', 'lisa@mail.com', 56),
    ('david', 'david@mail.com', 12),
    ('sara', 'sara@mail.com', 23),
    ('mike', 'mike@mail.com', 3),
    ('nina', 'nina@mail.com', 7),
    ('leo', 'leo@mail.com', 90);
;

INSERT INTO listening_history (user_id, song_id, listened_at) VALUES 
    (11, 3, '2026-06-01 11:00:00'),
    (11, 5, '2026-06-01 11:10:00'),
    (2, 1, '2026-06-01 11:20:00'),
    (2, 7, '2026-06-01 11:30:00'),
    (3, 2, '2026-06-01 11:40:00'),
    (3, 9, '2026-06-01 11:50:00'),
    (4, 6, '2026-06-01 12:00:00'),
    (5, 8, '2026-06-01 12:10:00'),
    (6, 4, '2026-06-01 12:20:00'),
    (7, 10, '2026-06-01 12:30:00'),

    (2, 1, '2026-06-02 09:00:00'),
    (4, 2, '2026-06-02 09:05:00'),
    (5, 3, '2026-06-02 09:10:00'),
    (6, 4, '2026-06-02 09:15:00'),
    (7, 5, '2026-06-02 09:20:00'),
    (8, 6, '2026-06-02 09:25:00'),
    (10, 7, '2026-06-02 09:30:00'),
    (11, 8, '2026-06-02 09:35:00'),
    (2, 9, '2026-06-02 09:40:00'),
    (4, 10, '2026-06-02 09:45:00'),

    (5, 1, '2026-06-02 10:00:00'),
    (6, 2, '2026-06-02 10:05:00'),
    (7, 3, '2026-06-02 10:10:00'),
    (8, 4, '2026-06-02 10:15:00'),
    (10, 5, '2026-06-02 10:20:00'),
    (11, 6, '2026-06-02 10:25:00'),
    (2, 7, '2026-06-02 10:30:00'),
    (4, 8, '2026-06-02 10:35:00'),
    (5, 9, '2026-06-02 10:40:00'),
    (6, 10, '2026-06-02 10:45:00'),

    (7, 1, '2026-06-02 11:00:00'),
    (8, 2, '2026-06-02 11:05:00'),
    (10, 3, '2026-06-02 11:10:00'),
    (11, 4, '2026-06-02 11:15:00'),
    (2, 5, '2026-06-02 11:20:00'),
    (4, 6, '2026-06-02 11:25:00'),
    (5, 7, '2026-06-02 11:30:00'),
    (6, 8, '2026-06-02 11:35:00'),
    (7, 9, '2026-06-02 11:40:00'),
    (8, 10, '2026-06-02 11:45:00')
;

INSERT INTO songs (title, album_id, duration_seconds, genre) VALUES (
    'Broken Song', 1, -120, 'Rock'
);

-- ERROR:  new row for relation "songs" violates check constraint "duration_seconds"
-- DETAIL:  Failing row contains (11, Broken Song, 1, -120, Rock).

INSERT INTO albums (title, artist_id, release_year) VALUES (
    'Ghost Album', 999, 2025
);

-- ERROR:  insert or update on table "albums" violates foreign key constraint "albums_artist_id_fkey"
-- DETAIL:  Key (artist_id)=(999) is not present in table "artists".

INSERT INTO users (username, email, age)
VALUES ('Bob', 'bob@mail.com', 34);

-- ERROR:  duplicate key value violates unique constraint "users_email_key"
-- DETAIL:  Key (email)=(bob@mail.com) already exists.

INSERT INTO users (username, email, age)
VALUES ('Mike', 'mike@mail.com', 23);

-- ERROR:  duplicate key value violates unique constraint "users_email_key"
-- DETAIL:  Key (email)=(mike@mail.com) already exists.

--4
SELECT * FROM artists
ORDER BY name ASC;

SELECT * FROM songs
WHERE duration_seconds > 240
ORDER BY duration_seconds DESC;

SELECT * FROM albums
WHERE release_year BETWEEN 2010 AND 2020;

SELECT * FROM songs
WHERE title ILIKE '%love%';

SELECT * FROM songs
ORDER BY id DESC
LIMIT 5;

SELECT * FROM listening_history
WHERE listened_at > NOW() - INTERVAL '7 days'
ORDER BY listened_at DESC;

--5

SELECT COUNT(*) AS total_songs
FROM songs;

SELECT ROUND(AVG(duration_seconds) / 60.0, 2) AS avg_minutes
FROM songs;

SELECT 
MIN(duration_seconds) AS shortest_song,
MAX(duration_seconds) AS longest_song
FROM songs;

SELECT genre, COUNT(*) AS songs_count
FROM songs
GROUP BY genre
ORDER BY songs_count DESC;

SELECT genre, AVG(duration_seconds) AS avg_length
FROM songs 
GROUP BY genre;

SELECT genre, COUNT(*) AS songs_count
FROM songs
GROUP BY genre
HAVING COUNT(*) > 3
ORDER BY songs_count DESC;

SELECT 
    (release_year / 10) * 10 AS decade,
    COUNT(*) AS albums_count
FROM albums
GROUP BY (release_year / 10) * 10
ORDER BY decade;

SELECT user_id, COUNT(*) AS listening_count
FROM listening_history
GROUP BY user_id
ORDER BY listening_count DESC;

SELECT song_id, COUNT(*) AS play_count
FROM listening_history
GROUP BY song_id
ORDER BY play_count DESC
LIMIT 1;

--6

SELECT
songs.title AS song_title,
albums.title AS album_title
FROM songs
JOIN albums ON songs.album_id = albums.id;

SELECT 
songs.title AS song_title,
albums.title AS album_title,
artists.name AS artist_name
FROM songs
JOIN albums ON songs.album_id = albums.id
JOIN artists ON albums.artist_id = artists.id;

SELECT artists.name,
COUNT(albums.id) AS album_count
FROM artists
LEFT JOIN albums ON albums.artist_id = artists.id
GROUP BY artists.id, artists.name
ORDER BY album_count DESC;

SELECT artists.name,
ROUND(SUM(songs.duration_seconds) / 60.0, 2) AS total_minutes
FROM artists
JOIN albums ON albums.artist_id = artists.id
JOIN songs ON songs.album_id = albums.id
GROUP BY artists.id, artists.name
ORDER BY total_minutes DESC;

SELECT users.username,
COUNT(listening_history.id) AS total_listens
FROM users
JOIN listening_history ON listening_history.user_id = users.id 
GROUP BY users.id, users.username
ORDER BY total_listens DESC;

SELECT songs.genre,
COUNT(*) AS listens
FROM listening_history
JOIN songs ON listening_history.song_id = songs.id
WHERE listening_history.user_id = 1
GROUP BY songs.genre
ORDER BY listens DESC;

SELECT songs.title,
COUNT(listening_history.id) AS play_count
FROM listening_history
JOIN songs ON listening_history.song_id = songs.id
GROUP BY songs.id, songs.title
ORDER BY play_count DESC
LIMIT 5;

SELECT users.username,
ROUND(SUM(songs.duration_seconds) / 60.0, 2) AS total_minutes
FROM users
JOIN listening_history ON listening_history.user_id = users.id
JOIN songs ON listening_history.song_id = songs.id
GROUP BY users.id, users.username
ORDER BY total_minutes DESC
LIMIT 3;

--BONUS
--1

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE playlist_songs (
    id SERIAL PRIMARY KEY,
    playlist_id INTEGER NOT NULL REFERENCES playlists(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    song_id INTEGER NOT NULL REFERENCES songs(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO playlists (user_id, name) VALUES
(1, 'Rock Favorites'),
(2, 'Chill Mix'),
(3, 'Pop Hits');

INSERT INTO playlist_songs (playlist_id, user_id ,song_id) VALUES
(1, 4, 1),
(1, 3, 2),
(1, 5, 1),

(2, 4, 3),
(2, 3, 4),
(2, 5, 18),

(3, 5, 5),
(3, 4, 6),
(3, 3, 9);

SELECT 
    playlists.name AS playlist_name,
    songs.title AS song_title,
    artists.name AS artist_name
FROM playlists
JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id
JOIN songs ON playlist_songs.song_id = songs.id
JOIN albums ON songs.album_id = albums.id
JOIN artists ON albums.artist_id = artists.id
ORDER BY playlists.name;

--2

SELECT EXTRACT(MONTH FROM listened_at) AS month,
    COUNT(*) AS total_listens
FROM listening_history
GROUP BY EXTRACT(MONTH FROM listened_at)
ORDER BY month;

--3

SELECT a.user_id AS user_1, b.user_id AS user_2,
COUNT(*) AS common_songs
FROM listening_history a
JOIN listening_history b
ON a.song_id = b.song_id
AND a.user_id < b.user_id
GROUP BY a.user_id, b.user_id
ORDER BY common_songs DESC;

--4 

SELECT users.username,
COUNT(DISTINCT songs.genre) AS genre_count
FROM users
JOIN listening_history ON listening_history.user_id = users.id
JOIN songs ON listening_history.song_id = songs.id
GROUP BY users.id, users.username
ORDER BY genre_count DESC
LIMIT 1;

--5

SELECT songs.*
FROM songs
LEFT JOIN listening_history
    ON listening_history.song_id = songs.id
WHERE listening_history.song_id IS NULL;

---------------------------------------------------------------

--7

DELETE FROM artists
WHERE id = 2;

---

\d albums
ALTER TABLE albums
DROP CONSTRAINT albums_artist_id_fkey;

ALTER TABLE albums
ADD CONSTRAINT albums_artist_id_fkey
FOREIGN KEY (artist_id) REFERENCES artists(id)
ON DELETE CASCADE;

DELETE FROM artists
WHERE id = 1;

-- With ON DELETE CASCADE on albums.artist_id,
-- deleting an artist automatically deletes their albums.
-- Songs are deleted only if songs.album_id also uses ON DELETE CASCADE.


ALTER TABLE albums
DROP CONSTRAINT albums_artist_id_fkey;

ALTER TABLE albums
ADD CONSTRAINT albums_artist_id_fkey
FOREIGN KEY (artist_id) REFERENCES artists(id)
ON DELETE RESTRICT;

--8

DROP TABLE playlist_songs;
DROP TABLE listening_history;
DROP TABLE playlists;
DROP TABLE songs;
DROP TABLE albums;
DROP TABLE users;
DROP TABLE artists;


\dt

\c postgres

DROP DATABASE music_library;
\l
