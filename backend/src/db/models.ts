export interface Member {
    id: number;
    name: string;
    role: string;
    img_url: string | null;
    riot_game_name: string | null;
    riot_tag_line: string | null;
    riot_puuid: string | null;
    lostarkname: string | null;
    description: string;
}

export interface LolBasicInfo {
    id: number;
    member_id: number;
    riot_puuid: string;
    summoner_level: number;
    summoner_icon_id: number;
    peak_rank: string;
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
}
