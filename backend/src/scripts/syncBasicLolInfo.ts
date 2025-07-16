import { MemberService, RiotService, LolBasicInfoService, PeakRankScraperService } from "../services";

export const syncBasicLolInfo = async () => {
    console.log('Syncing basic lol info');
    try {
        //Get all members with riot_puuid
        const members = await MemberService.getMembersWithRiotPuuid();
        for (const member of members) {
            try {
                //Check if current user has basic info in database
                const currentBasicInfo = await LolBasicInfoService.getLolBasicInfoByPuuid(member.riot_puuid!);

                //Get basic info from riot api
                const basicInfo = await RiotService.getBasicSummonerInfo(member.riot_puuid!, member.riot_region!);

                if(!basicInfo) {
                    console.log(`No basic info found for ${member.riot_puuid}`);
                    continue;
                }

                //Get peak rank from op.gg
                const peakRank = await PeakRankScraperService.getPeakRank(`${member.riot_game_name}-${member.riot_tag_line}`, member.riot_region!);

                //Get total mastery points from riot api
                const totalMasteryPoints = await RiotService.getTotalMasteryScore(member.riot_puuid!, member.riot_region!);

                if (currentBasicInfo) {
                    await LolBasicInfoService.updateLolBasicInfoByPuuid(member.riot_puuid!, basicInfo!.summonerLevel, basicInfo!.profileIconId, peakRank, totalMasteryPoints);
                } else {
                    await LolBasicInfoService.addLolBasicInfoByPuuid(member.riot_puuid!, basicInfo!.summonerLevel, basicInfo!.profileIconId, peakRank, totalMasteryPoints);
                }
            } catch (error) {
                console.error(`Error syncing member ${member.id}:`, error);
            }
        }
        console.log(`Synced basic info for all members`);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}



