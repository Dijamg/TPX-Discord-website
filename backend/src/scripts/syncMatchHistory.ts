import { MemberService, RiotService, LolMatchHistoryService } from "../services";

export const syncMatchHistory = async () => {
    console.log('Syncing match history');
    try {
        //Get all members with riot_puuid
        const members = await MemberService.getMembersWithRiotPuuid();
        for (const member of members) {
            try {
                //current match history in db
                const currentMatchHistory = await LolMatchHistoryService.getLolMatchHistoryByPuuid(member.riot_puuid!);

                //Get match history from riot api, last 5 matches
                const matchHistory = await RiotService.getMatchHistory(member.riot_puuid!, member.riot_region!);

                // filter out matches that are already in the database
                const existingIds = new Set(currentMatchHistory.map(m => m.match_id));

                const newMatchHistory = matchHistory.filter(match =>
                    !existingIds.has(match.matchId)
                  );
                
                // add new match history to database
                for (const match of newMatchHistory) {
                    await LolMatchHistoryService.addLolMatchHistoryByPuuid(member.riot_puuid!, match.matchId, match.championName, match.win, match.kills, match.deaths, match.assists, match.totalMinionsKilled, match.matchDuration, match.matchDate, match.killParticipationPercent, match.csPerMinute);
                }

                // Trim the db to hold max 5 matches for each user. Do this only if there are new matches.
                if (newMatchHistory.length > 0) {
                    await LolMatchHistoryService.trimTo5(member.riot_puuid!);
                  }

                console.log(`Added ${newMatchHistory.length} new matches for ${member.riot_puuid}`);
            } catch (error) {
                console.error(`Error syncing member ${member.id}:`, error);
            }
        }
        console.log(`Synced match history for all members`);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}



