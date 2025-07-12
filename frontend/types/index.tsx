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
}

export type Tournament = {
    id: number,
    name: string,
    description: string,
    img_url: string | null,
}

export type BasicLolInfo = {
    id: number,
    riot_puuid: string,
    summoner_icon_id: number,
    summoner_level: number,
    peak_rank: string,
    revision_date: string,
}

export type AllProps = {
    members: Member[],
    basicLolInfo: BasicLolInfo[]
}