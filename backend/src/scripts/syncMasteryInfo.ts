import { MemberService, RiotService, LolMasteryInfoService } from "../services";

export const syncMasteryInfo = async () => {
    try {
        //Get all members with riot_puuid
        const members = await MemberService.getMembersWithRiotPuuid();
        for (const member of members) {
            try {
                //Check if current user has mastery info in database
                const currentMasteryInfo = await LolMasteryInfoService.getAllLolMasteryInfo();

                //Get mastery info from riot api
                const masteryInfo = await RiotService.getMasteryInfo(member.riot_puuid!, member.riot_region!);

                if (currentMasteryInfo) {
                    //if user has current mastery info, delete all mastery info.
                    await LolMasteryInfoService.deleteLolMasteryInfoByPuuid(member.riot_puuid!);
                }

                for (const mastery of masteryInfo) {
                    await LolMasteryInfoService.addLolMasteryInfoByPuuid(member.riot_puuid!, mastery.championName, mastery.championLevel, mastery.championPoints);
                }
            } catch (error) {
                console.error(`Error syncing member ${member.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}



