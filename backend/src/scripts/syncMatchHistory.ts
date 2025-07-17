import { RiotService, LolMatchHistoryService, LolAccountInfoService } from "../services";

export const syncMatchHistory = async () => {
    console.log('Syncing match history');
    try {
        //Get all account infos with riot_puuid
        const accountInfos = await LolAccountInfoService.getAllLolAccountInfoWithRiotPuuid();
        for (const accountInfo of accountInfos) {
            try {
                //current match history in db
                const currentMatchHistory = await LolMatchHistoryService.getLolMatchHistoryByPuuid(accountInfo.riot_puuid!);

                //Get match history from riot api, last 5 matches
                const matchHistory = await RiotService.getMatchHistory(accountInfo.riot_puuid!, accountInfo.riot_region!);

                // filter out matches that are already in the database
                const existingIds = new Set(currentMatchHistory.map(m => m.match_id));

                const newMatchHistory = matchHistory.filter(match =>
                    !existingIds.has(match.matchId)
                  );
                
                // add new match history to database
                for (const match of newMatchHistory) {
                    await LolMatchHistoryService.addLolMatchHistoryByPuuid(accountInfo.riot_puuid!, match.matchId, match.championName, match.win, match.kills, match.deaths, match.assists, match.totalMinionsKilled, match.matchDuration, match.matchDate, match.killParticipationPercent, match.csPerMinute);
                }

                // Trim the db to hold max 5 matches for each user. Do this only if there are new matches.
                if (newMatchHistory.length > 0) {
                    await LolMatchHistoryService.trimTo5(accountInfo.riot_puuid!);
                  }

                console.log(`Added ${newMatchHistory.length} new matches for ${accountInfo.riot_puuid}`);
            } catch (error) {
                console.error(`Error syncing member ${accountInfo.id}:`, error);
            }
        }
        console.log(`Synced match history for all league accounts`);
    } catch (error) {
        console.error('Error fetching league accounts:', error);
    }
}



