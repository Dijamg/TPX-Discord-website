// IF a newly added member has riot_game_name and riot_tag_line, sync their info from riot api
// This script adds the riot_puuid to the member and then syncs the basic info, current season info, and mastery info

import { LolAccountInfoService, LolBasicInfoService, LolCurrentSeasonInfoService, LolMasteryInfoService, LolMatchHistoryService, MemberService, PeakRankScraperService, RiotService } from "../services";
import { BasicSummonerInfo } from "../types";
import { LolAccountInfo } from "../db/models";

export const syncNewMemberInfo = async (accountInfo: LolAccountInfo, riotPuuid: string, basicInfo: BasicSummonerInfo) => {
    console.log(`Syncing information for newly added member ${accountInfo.riot_game_name}`);
    try {
        //Sync riot puuid
        await LolAccountInfoService.updateLolAccountInfoRiotPuuid(accountInfo.id, riotPuuid);

        //Get peak rank from op.gg
        const peakRank = await PeakRankScraperService.getPeakRank(`${accountInfo.riot_game_name}-${accountInfo.riot_tag_line}`, accountInfo.riot_region!);

        //Get total mastery points from riot api    
        const totalMasteryPoints = await RiotService.getTotalMasteryScore(riotPuuid, accountInfo.riot_region!);

        //Sync basic info
        await LolBasicInfoService.addLolBasicInfoByPuuid(riotPuuid, basicInfo.summonerLevel, basicInfo.profileIconId, peakRank, totalMasteryPoints);

        //Sync current season info
        const allCurrentSeasonInfo = await RiotService.getCurrentSeasonInfo(riotPuuid, accountInfo.riot_region!);  
        const currentSeasonInfo = allCurrentSeasonInfo.find(info => info.queueType === 'RANKED_SOLO_5x5');

        if (currentSeasonInfo) {
            await LolCurrentSeasonInfoService.addLolCurrentSeasonInfoByPuuid(riotPuuid, currentSeasonInfo.queueType, currentSeasonInfo.tier, currentSeasonInfo.rank, currentSeasonInfo.leaguePoints, currentSeasonInfo.wins, currentSeasonInfo.losses);
        }

        //Sync mastery info
        const masteryInfo = await RiotService.getMasteryInfo(riotPuuid, accountInfo.riot_region!);
        for (const mastery of masteryInfo) {
            await LolMasteryInfoService.addLolMasteryInfoByPuuid(riotPuuid, mastery.championName, mastery.championLevel, mastery.championPoints);
        }

        //Sync match history
        const matchHistoryIds = await RiotService.getMatchHistoryIds(riotPuuid, accountInfo.riot_region!);

        const matchHistory = await RiotService.getMatchDetails(matchHistoryIds, riotPuuid, accountInfo.riot_region!);


        for (const match of matchHistory) {
            await LolMatchHistoryService.addLolMatchHistoryByPuuid(riotPuuid, match.matchId, match.queue, match.championName, match.win, match.kills, match.deaths, match.assists, match.totalMinionsKilled, match.matchDuration, match.matchDate, match.killParticipationPercent, match.csPerMinute);
        }   
    } catch (error) {
        console.error(`Error syncing member ${accountInfo.riot_game_name}:`, error);
    }
}