import { RiotService, LolMasteryInfoService, LolAccountInfoService } from "../services";

export const syncMasteryInfo = async () => {
    console.log('Syncing mastery info');
    try {
        //Get all account infos with riot_puuid
        const accountInfos = await LolAccountInfoService.getAllLolAccountInfoWithRiotPuuid();
        for (const accountInfo of accountInfos) {
            try {
                //Check if current user has mastery info in database
                const currentMasteryInfo = await LolMasteryInfoService.getLolMasteryInfoByPuuid(accountInfo.riot_puuid!);

                //Get mastery info from riot api
                const masteryInfo = await RiotService.getMasteryInfo(accountInfo.riot_puuid!, accountInfo.riot_region!);

                if (currentMasteryInfo.length > 0) {
                    //if user has current mastery info, delete all mastery info.
                    console.log(`Deleting all mastery info for account info ${accountInfo.id}`);
                    await LolMasteryInfoService.deleteLolMasteryInfoByPuuid(accountInfo.riot_puuid!);
                }

                for (const mastery of masteryInfo) {
                    await LolMasteryInfoService.addLolMasteryInfoByPuuid(accountInfo.riot_puuid!, mastery.championName, mastery.championLevel, mastery.championPoints);
                }
            } catch (error) {
                console.error(`Error syncing account info ${accountInfo.id}:`, error);
            }
        }
        console.log(`Synced mastery info for all league accounts`);
    } catch (error) {
        console.error('Error fetching league accounts:', error);
    }
}



