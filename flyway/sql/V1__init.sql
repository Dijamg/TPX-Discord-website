CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE member_role AS ENUM ('Member', 'Moderator', 'Owner', 'Founder', 'Co-Owner');

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,   
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    revision_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    member_uuid UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL, 
    role member_role NOT NULL,
    img_url VARCHAR(255) NOT NULL DEFAULT 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    description TEXT,
    revision_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lol_account_info (
    id SERIAL PRIMARY KEY,
    riot_puuid VARCHAR(100) UNIQUE,
    member_id UUID REFERENCES members(member_uuid) ON DELETE CASCADE,
    riot_game_name VARCHAR(100) NOT NULL,
    riot_tag_line VARCHAR(100) NOT NULL,
    riot_region VARCHAR(100) NOT NULL,
    revision_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_member_identity UNIQUE (riot_game_name, riot_tag_line)
);

CREATE TABLE lol_basic_info (
    id SERIAL PRIMARY KEY,
    riot_puuid VARCHAR(100) REFERENCES lol_account_info(riot_puuid) ON DELETE CASCADE,
    summoner_level INT NOT NULL,
    summoner_icon_id INT NOT NULL,
    peak_rank VARCHAR(100),
    total_mastery_points INT NOT NULL,
    revision_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (riot_puuid)
);

CREATE TABLE lol_current_season_info (
    id SERIAL PRIMARY KEY,
    riot_puuid VARCHAR(100) REFERENCES lol_account_info(riot_puuid) ON DELETE CASCADE,
    queue_type VARCHAR(100) NOT NULL DEFAULT 'RANKED_SOLO_5x5',
    tier VARCHAR(100) NOT NULL,
    rank VARCHAR(100) NOT NULL,
    league_points INT NOT NULL,
    wins INT NOT NULL,
    losses INT NOT NULL,
    revision_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (riot_puuid)
);

CREATE TABLE lol_mastery_info (
    id SERIAL PRIMARY KEY,
    riot_puuid VARCHAR(100) REFERENCES lol_account_info(riot_puuid) ON DELETE CASCADE,
    champion_name VARCHAR(100) NOT NULL,
    champion_level INT NOT NULL,
    champion_points INT NOT NULL,
    revision_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE upcoming_clash_tournaments (
    id SERIAL PRIMARY KEY,
    theme_id VARCHAR(100) NOT NULL,
    name_key VARCHAR(100) NOT NULL,
    name_key_secondary VARCHAR(100) NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    revision_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tournaments (
    id SERIAL PRIMARY KEY,  
    theme VARCHAR(100) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT FALSE,
    img_url VARCHAR(255),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    revision_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

    -- Trigger to update active status of a tournament based on start date
    CREATE OR REPLACE FUNCTION update_active_status()
    RETURNS TRIGGER AS $$
    BEGIN
    IF NEW.start_date > NOW() THEN
        NEW.active := TRUE;
    ELSE
        NEW.active := FALSE;
    END IF;
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER trg_update_active
    BEFORE INSERT OR UPDATE ON tournaments
    FOR EACH ROW
    EXECUTE FUNCTION update_active_status();

CREATE TABLE lol_match_history (
    id SERIAL PRIMARY KEY,
    riot_puuid VARCHAR(100) REFERENCES lol_account_info(riot_puuid) ON DELETE CASCADE,
    queue INT NOT NULL,
    match_id VARCHAR(100) NOT NULL,
    champion_name VARCHAR(100) NOT NULL,
    win BOOLEAN NOT NULL,
    kills INT NOT NULL,
    deaths INT NOT NULL,
    assists INT NOT NULL,
    kill_participation_percent FLOAT NOT NULL,
    total_minions_killed INT NOT NULL,
    cs_per_minute FLOAT NOT NULL,
    match_duration INT NOT NULL,
    match_date TIMESTAMP WITH TIME ZONE NOT NULL,
    revision_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lol_mastery_puuid ON lol_mastery_info(riot_puuid);
CREATE INDEX idx_lol_match_puuid ON lol_match_history(riot_puuid);

