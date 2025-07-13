import axios from 'axios';
import { BasicSummonerInfo, CurrentSeasonInfo, MasteryInfo, RiotAccountResponse, UpcomingClashTournament } from '../types';
import { getChampionIdToNameMap } from '../utils/masteryUtils';

const ACCOUNT_V1_URL = "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"
const CLASH_V1_URL = "https://euw1.api.riotgames.com/lol/clash/v1/tournaments"

const getSummonerV4Url = (region: string) => {
    return `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/`;
}

const getLeagueV4Url = (region: string) => {
    return `https://${region}.api.riotgames.com/lol/league/v4/entries/by-puuid/`;
}

const getMasteryV4Url = (region: string) => {
    return `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/`;
}

const getScoresV4Url = (region: string) => {
    return `https://${region}.api.riotgames.com/lol/champion-mastery/v4/scores/by-puuid/`;
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

export const getBasicSummonerInfo = async (riotPuuid: string, riot_region: string): Promise<BasicSummonerInfo> => {
    const response = await axios.get<BasicSummonerInfo>(`${getSummonerV4Url(riot_region)}${riotPuuid}`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY!
        }
    });
    return response.data;
}

export const getCurrentSeasonInfo = async (riotPuuid: string, riot_region: string): Promise<CurrentSeasonInfo[]> => {
    const response = await axios.get<CurrentSeasonInfo[]>(`${getLeagueV4Url(riot_region)}${riotPuuid}`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY!
        }
    });

    console.log("CURRENT SEASON INFO: ");
    console.log(JSON.stringify(response.data));
    return response.data;
}

export const getMasteryInfo = async (riotPuuid: string, riot_region: string): Promise<MasteryInfo[]> => {
    const response = await axios.get<MasteryInfo[]>(`${getMasteryV4Url(riot_region)}${riotPuuid}/top`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY!
        },
        params: {
            count: 5
        }
    });

    const data =  response.data;
    const championIdToNameMap = await getChampionIdToNameMap();
    
    return data.map((mastery) => ({
        ...mastery,
        championName: championIdToNameMap[mastery.championId]
    }));
}

export const getTotalMasteryScore = async (riotPuuid: string, riot_region: string): Promise<number> => {
    const response = await axios.get<number>(`${getScoresV4Url(riot_region)}${riotPuuid}`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY!
        }
    });
    return response.data;
}

export const getUpcomingClashTournaments = async (): Promise<UpcomingClashTournament[]> => {
    const response = await axios.get<UpcomingClashTournament[]>(CLASH_V1_URL, {
        headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY!
        }
    });

    console.log("UPCOMING CLASH TOURNAMENTS: ");
    console.log(JSON.stringify(response.data));

    return response.data;
}