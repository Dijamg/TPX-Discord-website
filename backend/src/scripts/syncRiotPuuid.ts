//This script is used to update the riot_uuid field in the members
//table for the entries that have a riot_game_name and riot_tag_line but no riot_uuid

import { MemberService, RiotService } from "../services";

export const syncRiotUuid = async () => {
    try {
        const members = await MemberService.getMembersWithNoRiotPuuid();
        console.log(`Found ${members.length} members to sync`);
        
        for (const member of members) {
            console.log(`MEMBER TO BE UPDATED: ${JSON.stringify(member)}`);
            console.log(`SYNCING RIOT UUID FOR ${member.riot_game_name} ${member.riot_tag_line}`);
            try {
                const riotPuuid = await RiotService.getRiotUuid(member.riot_game_name!, member.riot_tag_line!);
                await MemberService.updateMemberPuuid(member.id, riotPuuid);
                console.log(`Successfully updated member ${member.id} with puuid: ${riotPuuid}`);
            } catch (error) {
                console.error(`Error syncing member ${member.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}



