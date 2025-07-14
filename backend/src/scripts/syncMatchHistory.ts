import { MemberService, RiotService, LolMatchHistoryService } from "../services";

export const syncMatchHistory = async () => {
    try {
        //Get all members with riot_puuid
        const members = await MemberService.getMembersWithRiotPuuid();
        for (const member of members) {
            try {
                //Check if current user has match history in database
                const currentMatchHistory = await LolMatchHistoryService.getAllLolMatchHistory();

                //Get match history from riot api
                const matchHistory = await RiotService.getMatchHistory(member.riot_puuid!, member.riot_region!);

                if (currentMatchHistory) {
                    //if user has current match history, delete all match history.
                    await LolMatchHistoryService.deleteLolMatchHistoryByPuuid(member.riot_puuid!);
                }

                    for (const match of matchHistory) {
                    await LolMatchHistoryService.addLolMatchHistoryByPuuid(member.riot_puuid!, match.matchId, match.championName, match.win, match.kills, match.deaths, match.assists, match.totalMinionsKilled, match.matchDuration, match.matchDate, match.killParticipationPercent, match.csPerMinute);
                }
            } catch (error) {
                console.error(`Error syncing member ${member.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}



