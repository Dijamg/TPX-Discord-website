export type Member = {
    id: number,
    name: string,
    imgUrl: string | null, 
    riotId: string | null, 
    steamId: string | null, 
    lostArkId: string | null, 
    description: string,
}

export type Tournament = {
    id: number,
    name: string,
    description: string,
    imgUrl: string | null,
}