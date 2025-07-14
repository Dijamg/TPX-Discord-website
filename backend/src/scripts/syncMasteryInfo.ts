import { MemberService, RiotService, LolMasteryInfoService } from "../services";

export const syncMasteryInfo = async () => {
    console.log('Syncing mastery info');
    try {
        //Get all members with riot_puuid
        const members = await MemberService.getMembersWithRiotPuuid();
        for (const member of members) {
            try {
                //Check if current user has mastery info in database
                const currentMasteryInfo = await LolMasteryInfoService.getLolMasteryInfoByPuuid(member.riot_puuid!);

                //Get mastery info from riot api
                const masteryInfo = await RiotService.getMasteryInfo(member.riot_puuid!, member.riot_region!);

                if (currentMasteryInfo.length > 0) {
                    //if user has current mastery info, delete all mastery info.
                    console.log(`Deleting all mastery info for member ${member.riot_puuid}`);
                    await LolMasteryInfoService.deleteLolMasteryInfoByPuuid(member.riot_puuid!);
                }

                for (const mastery of masteryInfo) {
                    await LolMasteryInfoService.addLolMasteryInfoByPuuid(member.riot_puuid!, mastery.championName, mastery.championLevel, mastery.championPoints);
                }
            } catch (error) {
                console.error(`Error syncing member ${member.id}:`, error);
            }
        }
        console.log(`Synced mastery info for all members`);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}



