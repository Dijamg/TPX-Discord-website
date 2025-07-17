import { RiotService, LolCurrentSeasonInfoService, LolAccountInfoService } from "../services";

export const syncCurrentSeasonLolInfo = async () => {
    console.log('Syncing current season lol info');
    try {
        //Get all account infos with riot_puuid
        const accountInfos = await LolAccountInfoService.getAllLolAccountInfoWithRiotPuuid();

        for (const accountInfo of accountInfos) {
            try {
                //Check if current user has current season info in database (only ranked solo 5x5)
                const currentSeasonInfo = await LolCurrentSeasonInfoService.getLolCurrentSeasonInfoByPuuid(accountInfo.riot_puuid!);

                //Get current season info from riot api
                const AllSeasonInfo = await RiotService.getCurrentSeasonInfo(accountInfo.riot_puuid!, accountInfo.riot_region!);
                const seasonInfo = AllSeasonInfo.find(info => info.queueType === 'RANKED_SOLO_5x5');

                if (seasonInfo) {
                    if (currentSeasonInfo) {
                        await LolCurrentSeasonInfoService.updateLolCurrentSeasonInfoByPuuid(accountInfo.riot_puuid!, seasonInfo.queueType, seasonInfo.tier, seasonInfo.rank, seasonInfo.leaguePoints, seasonInfo.wins, seasonInfo.losses);
                    } else {
                        await LolCurrentSeasonInfoService.addLolCurrentSeasonInfoByPuuid(accountInfo.riot_puuid!, seasonInfo.queueType, seasonInfo.tier, seasonInfo.rank, seasonInfo.leaguePoints, seasonInfo.wins, seasonInfo.losses);
                    }
                } else {
                    console.log(`No current season info found for account info ${accountInfo.id}`);
                }
            } catch (error) {
                console.error(`Error syncing account info ${accountInfo.id}:`, error);
            }
        }
        console.log(`Synced current season info for all league accounts`);
    } catch (error) {
        console.error('Error fetching league accounts:', error);
    }
}



