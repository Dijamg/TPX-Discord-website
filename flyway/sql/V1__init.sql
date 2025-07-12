CREATE TABLE Members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    role VARCHAR(255) NOT NULL,
    img_url VARCHAR(512) NOT NULL,
    riot_game_name VARCHAR(255),
    riot_tag_line VARCHAR(255),
    riot_uuid VARCHAR(255),
    lost_ark_name VARCHAR(255),
    description TEXT NOT NULL
);
