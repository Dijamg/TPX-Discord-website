export type Member = {
    id: number,
    name: string,
    role: string,
    imgurl: string, 
    riotgamename: string | null, 
    riottagline: string | null, 
    riotuuid: string | null, 
    lostarkname: string | null, 
    description: string,
}

export type Tournament = {
    id: number,
    name: string,
    description: string,
    imgurl: string | null,
}