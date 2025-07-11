//This script is used to update the riotPuuid field in the members
//table for the entries that have a riotGameName and riotTagLine but no riotPuuid

import { MemberService, RiotService } from "../services";

export const syncRiotUuid = async () => {
    try {
        const members = await MemberService.getMembersWithNoRiotPuuid();
        console.log(`Found ${members.length} members to sync`);
        
        for (const member of members) {
            console.log(`MEMBER TO BE UPDATED: ${JSON.stringify(member)}`);
            console.log(`SYNCING RIOT UUID FOR ${member.riotgamename} ${member.riottagline}`);
            try {
                const riotPuuid = await RiotService.getRiotUuid(member.riotgamename!, member.riottagline!);
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



