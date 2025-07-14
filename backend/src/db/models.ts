export interface Member {
    id: number;
    name: string;
    role: string;
    img_url: string | null;
    riot_game_name: string | null;
    riot_tag_line: string | null;
    riot_puuid: string | null;
    description: string;
    riot_region: string;    
    revision_date: Date;
}

export interface LolBasicInfo {
    id: number;
    member_id: number;
    riot_puuid: string;
    summoner_level: number;
    summoner_icon_id: number;
    peak_rank: string;
    total_mastery_points: number;
    revision_date: Date;
}

export interface LolCurrentSeasonInfo {
    id: number;
    riot_puuid: string;
    queue_type: string;
    tier: string;
    rank: string;
    league_points: number;
    wins: number;
    losses: number;
    revision_date: Date;
}

export interface LolMasteryInfo {
    id: number;
    riot_puuid: string;
    champion_name: string;
    champion_level: number;
    champion_points: number;
    revision_date: Date;
}

export interface UpcomingClashTournament {
    id: number;
    theme_id: string;
    name_key: string;
    name_key_secondary: string;
    start_date: Date;
    revision_date: Date;
}

export interface Tournament {
    id: number;
    theme: string;
    active: boolean;
    img_url: string | null;
    start_date: Date;
    revision_date: Date;
}

export interface LolMatchHistory {
    id: number;
    riot_puuid: string;
    match_id: string;
    champion_name: string;
    win: boolean;
    kills: number;
    deaths: number;
    assists: number;
    kill_participation_percent: number;
    total_minions_killed: number;
    cs_per_minute: number;
    match_duration: number;
    match_date: Date;
    revision_date: Date;
}

export interface Account {
    id: number;
    username: string;
    password: string;
    is_admin: boolean;
    revision_date: Date;
}
