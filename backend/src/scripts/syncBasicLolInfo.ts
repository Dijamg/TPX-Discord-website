import { MemberService, RiotService, LolBasicInfoService } from "../services";

export const syncBasicLolInfo = async () => {
    try {
        //Get all members with riot_puuid
        const members = await MemberService.getMembersWithRiotPuuid();
        console.log(`Found ${members.length} members to sync basic lol info`);

        for (const member of members) {
            try {
                //Check if current user has basic info
                console.log(`Checking if member ${member.id} has basic info`);
                const currentBasicInfo = await LolBasicInfoService.getLolBasicInfoByPuuid(member.riot_puuid!);
                //Basic info from riot api
                const basicInfo = await RiotService.getBasicSummonerInfo(member.riot_puuid!);

                if (currentBasicInfo) {
                    console.log(`Updating basic info for member ${member.id}`);
                    await LolBasicInfoService.updateLolBasicInfoByPuuid(member.riot_puuid!, basicInfo.summonerLevel, basicInfo.profileIconId, "lowmasta");
                    console.log(`Successfully updated member ${member.id} with puuid: ${member.riot_puuid}`);
                } else {
                    console.log(`No basic info found for member ${member.id}`);
                    await LolBasicInfoService.addLolBasicInfoByPuuid(member.riot_puuid!, basicInfo.summonerLevel, basicInfo.profileIconId, "master");
                    console.log(`Successfully added basic info for member ${member.id}`);
                }
            } catch (error) {
                console.error(`Error syncing member ${member.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}



