CREATE TABLE Members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    role VARCHAR(255) NOT NULL,
    imgUrl VARCHAR(512) NOT NULL,
    riotGameName VARCHAR(255),
    riotTagLine VARCHAR(255),
    riotUuid VARCHAR(255),
    lostArkName VARCHAR(255),
    description TEXT NOT NULL
);
