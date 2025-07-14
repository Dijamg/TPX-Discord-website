export type Member = {
    id: number,
    name: string,
    role: string,
    img_url: string, 
    riot_game_name: string | null, 
    riot_tag_line: string | null, 
    riot_puuid: string | null, 
    lostarkname: string | null, 
    description: string,
    riot_region: string,
}

export type BasicLolInfo = {
    id: number,
    riot_puuid: string,
    summoner_icon_id: number,
    summoner_level: number,
    peak_rank: string,
    total_mastery_points: number,
    revision_date: string,
}

export type CurrentSeasonLolInfo = {
    id: number,
    riot_puuid: string,
    queue_type: string,
    tier: string,
    rank: string,
    league_points: number,
    wins: number,
    losses: number,
}

export type MasteryInfo = {
    id: number,
    riot_puuid: string,
    champion_name: string,
    champion_level: number,
    champion_points: number,
}

export type UpcomingClashTournament = {
    id: number,
    theme_id: string,
    name_key: string,
    name_key_secondary: string,
}

export type Tournament = {
    id: number,
    theme: string,
    active: boolean,
    img_url: string | null,
}

export type LolMatchHistory = {
    matchId: string,
    riot_puuid: string,
    champion_name: string,
    win: boolean,
    kills: number,
    deaths: number,
    assists: number,
    kill_participation_percent: number,
    total_minions_killed: number,
    cs_per_minute: number,
    match_duration: number,
    match_date: Date,
}

export type AllProps = {
    members: Member[],
    basicLolInfo: BasicLolInfo[],
    currentSeasonLolInfo: CurrentSeasonLolInfo[],
    masteryInfo: MasteryInfo[],
    upcomingClashTournaments: UpcomingClashTournament[],
    tournaments: Tournament[],
    lolMatchHistory: LolMatchHistory[],
}