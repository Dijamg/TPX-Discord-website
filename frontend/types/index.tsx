export type Member = {
    id: number,
    name: string,
    role: string,
    img_url: string, 
    riot_game_name: string | null, 
    riot_tag_line: string | null, 
    riot_uuid: string | null, 
    lostarkname: string | null, 
    description: string,
}

export type Tournament = {
    id: number,
    name: string,
    description: string,
    img_url: string | null,
}