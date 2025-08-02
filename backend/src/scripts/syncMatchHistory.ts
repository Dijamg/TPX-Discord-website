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
                const existingIds = new Set(currentMatchHistory.map(m => m.match_id));

                //Get match history from riot api, 5 latest soloq, flex, normal and aram matches
                const matchHistoryIds = await RiotService.getMatchHistoryIds(accountInfo.riot_puuid!, accountInfo.riot_region!);
                const latestIds = new Set(matchHistoryIds);

                // filter out matches that are already in the database
                const newMatchHistoryIds = matchHistoryIds.filter(id => !existingIds.has(id));

                const newMatchHistory = await RiotService.getMatchDetails(newMatchHistoryIds, accountInfo.riot_puuid!, accountInfo.riot_region!);
                
                // add new match history to database
                for (const match of newMatchHistory) {
                    await LolMatchHistoryService.addLolMatchHistoryByPuuid(accountInfo.riot_puuid!, match.matchId, match.queue, match.championName, match.win, match.kills, match.deaths, match.assists, match.totalMinionsKilled, match.matchDuration, match.matchDate, match.killParticipationPercent, match.csPerMinute, match.championIconUrl);
                }

                //Delete the matches currently in the database, which dont belong to latest 5 soloq and normal draft. Do this only if there are new matches.
                if (newMatchHistory.length > 0) {
                    const matchesToDelete = currentMatchHistory.filter((match) => !latestIds.has(match.match_id));
                    for(const match of matchesToDelete){
                        await LolMatchHistoryService.deleteLolMatchHistoryByMatchId(match.match_id)
                    }
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



