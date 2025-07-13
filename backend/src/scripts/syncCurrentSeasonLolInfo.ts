import { MemberService, RiotService, LolCurrentSeasonInfoService } from "../services";

export const syncCurrentSeasonLolInfo = async () => {
    try {
        //Get all members with riot_puuid
        const members = await MemberService.getMembersWithRiotPuuid();
        console.log(`Found ${members.length} members to sync current season lol info`);

        for (const member of members) {
            try {
                //Check if current user has current season info in database (only ranked solo 5x5)
                console.log(`Checking if member ${member.id} has current season info`);
                const currentSeasonInfo = await LolCurrentSeasonInfoService.getLolCurrentSeasonInfoByPuuid(member.riot_puuid!);

                //Get current season info from riot api
                const AllSeasonInfo = await RiotService.getCurrentSeasonInfo(member.riot_puuid!);
                const seasonInfo = AllSeasonInfo.find(info => info.queueType === 'RANKED_SOLO_5x5');

                if (seasonInfo) {
                    if (currentSeasonInfo) {
                        console.log(`Updating current season info for member ${member.id}`);
                        await LolCurrentSeasonInfoService.updateLolCurrentSeasonInfoByPuuid(member.riot_puuid!, seasonInfo.queueType, seasonInfo.tier, seasonInfo.rank, seasonInfo.leaguePoints, seasonInfo.wins, seasonInfo.losses);
                        console.log(`Successfully updated member ${member.id} with puuid: ${member.riot_puuid}`);
                    } else {
                        console.log(`No current season info found for member ${member.id}`);
                        await LolCurrentSeasonInfoService.addLolCurrentSeasonInfoByPuuid(member.riot_puuid!, seasonInfo.queueType, seasonInfo.tier, seasonInfo.rank, seasonInfo.leaguePoints, seasonInfo.wins, seasonInfo.losses);
                        console.log(`Successfully added current season info for member ${member.id}`);
                    }
                } else {
                    console.log(`No current season info found for member ${member.id}`);
                }
            } catch (error) {
                console.error(`Error syncing member ${member.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}



