//This script is used to update the riot_uuid field in the members
//table for the entries that have a riot_game_name and riot_tag_line but no riot_uuid

import { LolAccountInfoService, RiotService } from "../services";

export const syncRiotPuuid = async () => {
    console.log('Syncing riot puuid');
    try {
        const accountInfos = await LolAccountInfoService.getAllLolAccountInfoWithNoRiotPuuid();
        console.log(`Found ${accountInfos.length} account infos to sync`);
        
        for (const accountInfo of accountInfos) {
            try {   
                const riotAccount = await RiotService.getRiotAccountV1(accountInfo.riot_game_name!, accountInfo.riot_tag_line!);
                if(!riotAccount) {
                    console.log(`No riot puuid found for ${accountInfo.riot_game_name} ${accountInfo.riot_tag_line}`);
                    continue;
                }
                await LolAccountInfoService.updateLolAccountInfoRiotPuuid(accountInfo.id, riotAccount.puuid);
            } catch (error) {
                console.error(`Error syncing account info ${accountInfo.id}:`, error);
            }
        }
        console.log(`Synced riot puuid for all account infos`);
    } catch (error) {
        console.error('Error fetching account infos:', error);
    }
}



