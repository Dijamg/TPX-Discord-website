import axios from 'axios';
import { BasicSummonerInfo, CurrentSeasonInfo, MasteryInfo, RiotAccountResponse, UpcomingClashTournament, LolMatchHistory, LolMatchDto, LolParticipantDto } from '../types';
import { getChampionIconUrl, getChampionIdToNameMap } from '../utils/championUtils';
import { getMatchRegionFromPlatform } from '../utils/regionUtils';

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

const getMatchHistoryV5Url = (region: string) => {
    return `https://${getMatchRegionFromPlatform(region)}.api.riotgames.com/lol/match/v5/matches/by-puuid/`;
}

const getMatchV5Url = (region: string, matchId: string) => {
    return `https://${getMatchRegionFromPlatform(region)}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
}

export const getRiotAccountV1 = async (riotGameName: string, riotTagLine: string): Promise<RiotAccountResponse | null> => {
    try {
        const response = await axios.get<RiotAccountResponse>(`${ACCOUNT_V1_URL}${riotGameName}/${riotTagLine}`, {
            headers: {
                'X-Riot-Token': process.env.RIOT_API_KEY!
            }
            });
            return response.data;
    } catch (error) {
        console.error(`Error getting riot uuid for ${riotGameName} ${riotTagLine}:`, error);
        return null;
    }
}

export const getBasicSummonerInfo = async (riotPuuid: string, riot_region: string): Promise<BasicSummonerInfo | null> => {
    try {
        const response = await axios.get<BasicSummonerInfo>(`${getSummonerV4Url(riot_region)}${riotPuuid}`, {
            headers: {
                'X-Riot-Token': process.env.RIOT_API_KEY!
            }
            });
            return response.data;
    } catch (error) {
        console.error(`Error getting basic summoner info for ${riotPuuid} in ${riot_region}:`, error);
        return null;
    }
}

export const getCurrentSeasonInfo = async (riotPuuid: string, riot_region: string): Promise<CurrentSeasonInfo[]> => {
    const response = await axios.get<CurrentSeasonInfo[]>(`${getLeagueV4Url(riot_region)}${riotPuuid}`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY!
        }
    });

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
        championName: championIdToNameMap[mastery.championId],
        championIconUrl: getChampionIconUrl(championIdToNameMap[mastery.championId])
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

    return response.data;
}

export const getMatchDetails = async (matchIds: string[], puuid: string, riot_region: string): Promise<LolMatchHistory[]> => {
    const results: LolMatchHistory[] = [];

    for (const matchId of matchIds) {
        const response = await axios.get<LolMatchDto>(`${getMatchV5Url(riot_region, matchId)}`, {
            headers: {
                'X-Riot-Token': process.env.RIOT_API_KEY!
            }
        });

        const matchDetails = response.data;

        const findWantedPlayer = matchDetails.info.participants.find((participant: LolParticipantDto) => participant.puuid === puuid);

        if (findWantedPlayer) {

            const teamKills = matchDetails.info.participants
            .filter((p: LolParticipantDto) => p.teamId === findWantedPlayer?.teamId)
            .reduce((sum: number, p: any) => sum + p.kills, 0);

            const kp = ((findWantedPlayer.kills + findWantedPlayer.assists) / teamKills) || 0;
            const kpPercent = +(kp * 100).toFixed(1);

            const championIdToNameMap = await getChampionIdToNameMap()

            const csPerMinute = +((findWantedPlayer.totalMinionsKilled + findWantedPlayer.neutralMinionsKilled) / (matchDetails.info.gameDuration / 60)).toFixed(1) || 0;

            results.push({
                matchId: matchId,
                puuid: puuid,
                queue: matchDetails.info.queueId,
                championName: championIdToNameMap[findWantedPlayer.championId],
                win: findWantedPlayer.win,
                kills: findWantedPlayer.kills,
                deaths: findWantedPlayer.deaths,
                assists: findWantedPlayer.assists,
                killParticipationPercent: kpPercent,
                totalMinionsKilled: findWantedPlayer.totalMinionsKilled + findWantedPlayer.neutralMinionsKilled,
                csPerMinute: csPerMinute,
                matchDuration: matchDetails.info.gameDuration,
                matchDate: new Date(matchDetails.info.gameEndTimestamp),
                championIconUrl: getChampionIconUrl(championIdToNameMap[findWantedPlayer.championId])
            });
        }
    }


    return results;
}

export const getMatchHistoryByQueue = async (riotPuuid: string, riot_region: string, queue: number): Promise<string[]> => {
    const response = await axios.get<string[]>(`${getMatchHistoryV5Url(riot_region)}${riotPuuid}/ids`, {
        headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY!
        },
        params: {
            count: 5,
            queue: queue,
            start: 0
        }
    });

    return response.data;
}

export const getMatchHistoryIds = async (riotPuuid: string, riot_region: string): Promise<string[]> => {
    const soloDuoMatchIds = await getMatchHistoryByQueue(riotPuuid, riot_region, 420 )
    const normalDraftMatchIds = await getMatchHistoryByQueue(riotPuuid, riot_region, 400 )
    const flexMatchIds = await getMatchHistoryByQueue(riotPuuid, riot_region, 440 )
    const aramMatchIds = await getMatchHistoryByQueue(riotPuuid, riot_region, 450 )

    const allMatchIds = [...soloDuoMatchIds, ...normalDraftMatchIds, ...flexMatchIds, ...aramMatchIds]; 

    return allMatchIds;
}
