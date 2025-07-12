
import axios from 'axios';

const ACCOUNT_V1_URL = "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"
const SUMMONER_V4_URL = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/"

interface BasicSummonerInfo {
    puuid: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}

interface RiotAccountResponse {
    puuid: string;
    gameName: string;
    tagLine: string;
}

export const getRiotUuid = async (riotGameName: string, riotTagLine: string): Promise<string> => {
    console.log(`WHAT IS CALLED? ${ACCOUNT_V1_URL}${riotGameName}/${riotTagLine}`);
    const response = await axios.get<RiotAccountResponse>(`${ACCOUNT_V1_URL}${riotGameName}/${riotTagLine}`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY!
        }
    });
    return response.data.puuid;
}

export const getBasicSummonerInfo = async (riotPuuid: string): Promise<BasicSummonerInfo> => {
    const response = await axios.get<BasicSummonerInfo>(`${SUMMONER_V4_URL}${riotPuuid}`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY!
        }
    });
    return response.data;
}
