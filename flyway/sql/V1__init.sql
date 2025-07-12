CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    role VARCHAR(255) NOT NULL,
    img_url VARCHAR(512) NOT NULL,
    riot_game_name VARCHAR(255),
    riot_tag_line VARCHAR(255),
    riot_puuid VARCHAR(255) UNIQUE,
    lost_ark_name VARCHAR(255),
    description TEXT NOT NULL
);

CREATE TABLE lol_basic_info (
    id SERIAL PRIMARY KEY,
    riot_puuid VARCHAR(255) REFERENCES members(riot_puuid),
    summoner_level INT NOT NULL,
    summoner_icon_id INT NOT NULL,
    peak_rank VARCHAR(255),
    revision_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lol_current_rank_info (
    id SERIAL PRIMARY KEY,
    riot_puuid VARCHAR(255) REFERENCES members(riot_puuid),
    current_tier VARCHAR(255) NOT NULL,
    current_rank VARCHAR(255) NOT NULL,
    current_league_points INT NOT NULL,
    wins INT NOT NULL,
    losses INT NOT NULL,
    peak_rank VARCHAR(255) NOT NULL,
    revision_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


