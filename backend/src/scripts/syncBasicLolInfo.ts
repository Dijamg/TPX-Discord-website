import { RiotService, LolBasicInfoService, PeakRankScraperService, LolAccountInfoService } from "../services";

export const syncBasicLolInfo = async () => {
    console.log('Syncing basic lol info');
    try {
        //Get all account infos with riot_puuid
        const accountInfos = await LolAccountInfoService.getAllLolAccountInfoWithRiotPuuid();
        for (const accountInfo of accountInfos) {
            try {
                //Check if current user has basic info in database
                const currentBasicInfo = await LolBasicInfoService.getLolBasicInfoByPuuid(accountInfo.riot_puuid!);

                //Get basic info from riot api
                const basicInfo = await RiotService.getBasicSummonerInfo(accountInfo.riot_puuid!, accountInfo.riot_region!);

                if(!basicInfo) {
                    console.log(`No basic info found for ${accountInfo.riot_puuid}`);
                    continue;
                }

                //Get peak rank from op.gg
                const peakRank = await PeakRankScraperService.getPeakRank(`${accountInfo.riot_game_name}-${accountInfo.riot_tag_line}`, accountInfo.riot_region!);

                //Get total mastery points from riot api
                const totalMasteryPoints = await RiotService.getTotalMasteryScore(accountInfo.riot_puuid!, accountInfo.riot_region!);

                if (currentBasicInfo) {
                    await LolBasicInfoService.updateLolBasicInfoByPuuid(accountInfo.riot_puuid!, basicInfo!.summonerLevel, basicInfo!.profileIconId, peakRank, totalMasteryPoints);
                } else {
                    await LolBasicInfoService.addLolBasicInfoByPuuid(accountInfo.riot_puuid!, basicInfo!.summonerLevel, basicInfo!.profileIconId, peakRank, totalMasteryPoints);
                }
            } catch (error) {
                console.error(`Error syncing account info ${accountInfo.id}:`, error);
            }
        }
        console.log(`Synced basic info for all league accounts`);
    } catch (error) {
        console.error('Error fetching league accounts:', error);
    }
}



