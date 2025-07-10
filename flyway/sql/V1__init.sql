CREATE TABLE Members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    imgUrl VARCHAR(512),
    riotId VARCHAR(255),
    steamId VARCHAR(255),
    lostArkId VARCHAR(255),
    description TEXT NOT NULL
);
