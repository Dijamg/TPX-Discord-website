// IF a newly added member has riot_game_name and riot_tag_line, sync their info from riot api
// This script adds the riot_puuid to the member and then syncs the basic info, current season info, and mastery info

import { Member } from "../db/models";
import { LolBasicInfoService, LolCurrentSeasonInfoService, LolMasteryInfoService, LolMatchHistoryService, MemberService, PeakRankScraperService, RiotService } from "../services";
import { BasicSummonerInfo } from "../types";

export const syncNewMemberInfo = async (member: Member, riotPuuid: string, basicInfo: BasicSummonerInfo) => {
    console.log(`Syncing information for newly added member ${member.name}`);
    try {
        //Sync riot puuid
        await MemberService.updateMemberPuuid(member.id, riotPuuid);

        //Get peak rank from op.gg
        const peakRank = await PeakRankScraperService.getPeakRank(`${member.riot_game_name}-${member.riot_tag_line}`, member.riot_region!);

        //Get total mastery points from riot api    
        const totalMasteryPoints = await RiotService.getTotalMasteryScore(riotPuuid, member.riot_region!);

        //Sync basic info
        await LolBasicInfoService.addLolBasicInfoByPuuid(riotPuuid, basicInfo.summonerLevel, basicInfo.profileIconId, peakRank, totalMasteryPoints);

        //Sync current season info
        const allCurrentSeasonInfo = await RiotService.getCurrentSeasonInfo(riotPuuid, member.riot_region!);  
        const currentSeasonInfo = allCurrentSeasonInfo.find(info => info.queueType === 'RANKED_SOLO_5x5');

        if (currentSeasonInfo) {
            await LolCurrentSeasonInfoService.addLolCurrentSeasonInfoByPuuid(riotPuuid, currentSeasonInfo.queueType, currentSeasonInfo.tier, currentSeasonInfo.rank, currentSeasonInfo.leaguePoints, currentSeasonInfo.wins, currentSeasonInfo.losses);
        }

        //Sync mastery info
        const masteryInfo = await RiotService.getMasteryInfo(riotPuuid, member.riot_region!);
        for (const mastery of masteryInfo) {
            await LolMasteryInfoService.addLolMasteryInfoByPuuid(riotPuuid, mastery.championName, mastery.championLevel, mastery.championPoints);
        }

        //Sync match history
        const matchHistory = await RiotService.getMatchHistory(riotPuuid, member.riot_region!);
        for (const match of matchHistory) {
            await LolMatchHistoryService.addLolMatchHistoryByPuuid(riotPuuid, match.matchId, match.championName, match.win, match.kills, match.deaths, match.assists, match.totalMinionsKilled, match.matchDuration, match.matchDate, match.killParticipationPercent, match.csPerMinute);
        }   
    } catch (error) {
        console.error(`Error syncing member ${member.name}:`, error);
    }
}