import { MemberService, RiotService, LolCurrentSeasonInfoService } from "../services";

export const syncCurrentSeasonLolInfo = async () => {
    console.log('Syncing current season lol info');
    try {
        //Get all members with riot_puuid
        const members = await MemberService.getMembersWithRiotPuuid();

        for (const member of members) {
            try {
                //Check if current user has current season info in database (only ranked solo 5x5)
                const currentSeasonInfo = await LolCurrentSeasonInfoService.getLolCurrentSeasonInfoByPuuid(member.riot_puuid!);

                //Get current season info from riot api
                const AllSeasonInfo = await RiotService.getCurrentSeasonInfo(member.riot_puuid!, member.riot_region!);
                const seasonInfo = AllSeasonInfo.find(info => info.queueType === 'RANKED_SOLO_5x5');

                if (seasonInfo) {
                    if (currentSeasonInfo) {
                        await LolCurrentSeasonInfoService.updateLolCurrentSeasonInfoByPuuid(member.riot_puuid!, seasonInfo.queueType, seasonInfo.tier, seasonInfo.rank, seasonInfo.leaguePoints, seasonInfo.wins, seasonInfo.losses);
                    } else {
                        await LolCurrentSeasonInfoService.addLolCurrentSeasonInfoByPuuid(member.riot_puuid!, seasonInfo.queueType, seasonInfo.tier, seasonInfo.rank, seasonInfo.leaguePoints, seasonInfo.wins, seasonInfo.losses);
                    }
                } else {
                    console.log(`No current season info found for member ${member.id}`);
                }
            } catch (error) {
                console.error(`Error syncing member ${member.id}:`, error);
            }
        }
        console.log(`Synced current season info for all members`);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}



