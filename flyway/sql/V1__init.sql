CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    role VARCHAR(255) NOT NULL,
    img_url VARCHAR(512) NOT NULL,
    riot_game_name VARCHAR(255),
    riot_tag_line VARCHAR(255),
    riot_puuid VARCHAR(255) UNIQUE,
    riot_region VARCHAR(255) NOT NULL DEFAULT 'EUW1',
    lost_ark_name VARCHAR(255),
    description TEXT NOT NULL
);

CREATE TABLE lol_basic_info (
    id SERIAL PRIMARY KEY,
    riot_puuid VARCHAR(255) REFERENCES members(riot_puuid),
    summoner_level INT NOT NULL,
    summoner_icon_id INT NOT NULL,
    peak_rank VARCHAR(255),
    total_mastery_points INT NOT NULL,
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

CREATE TABLE lol_current_season_info (
    id SERIAL PRIMARY KEY,
    riot_puuid VARCHAR(255) REFERENCES members(riot_puuid),
    queue_type VARCHAR(255) NOT NULL DEFAULT 'RANKED_SOLO_5x5',
    tier VARCHAR(255) NOT NULL,
    rank VARCHAR(255) NOT NULL,
    league_points INT NOT NULL,
    wins INT NOT NULL,
    losses INT NOT NULL,
    revision_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lol_mastery_info (
    id SERIAL PRIMARY KEY,
    riot_puuid VARCHAR(255) REFERENCES members(riot_puuid),
    champion_name VARCHAR(255) NOT NULL,
    champion_level INT NOT NULL,
    champion_points INT NOT NULL,
    revision_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


