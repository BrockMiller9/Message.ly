CREATE DATABASE messagely; 

DROP TABLE IF EXISTS users_1;
DROP TABLE IF EXISTS messages_1;

CREATE TABLE users_1 (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE messages_1 (
    id SERIAL PRIMARY KEY,
    from_username text NOT NULL REFERENCES users_1,
    to_username text NOT NULL REFERENCES users_1,
    body text NOT NULL,
    sent_at timestamp with time zone NOT NULL,
    read_at timestamp with time zone
);
