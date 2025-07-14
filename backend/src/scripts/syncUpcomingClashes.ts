
import { MemberService, RiotService, TournamentService } from "../services";

export const syncUpcomingClashes = async () => {
    console.log('Syncing upcoming clashes');
    try {
        const currentClashes = await TournamentService.getAllUpcomingClashTournaments();
        const upcomingClashes = await RiotService.getUpcomingClashTournaments();
           
         //If there are current clashes, delete all current clashes and add all upcoming clashes
         if(currentClashes.length > 0) {
            console.log(`Deleting all current clashes and adding all upcoming clashes`);
            for (const clash of currentClashes) {
                await TournamentService.deleteUpcomingClashTournament(clash.id);
            }
        }

        //Add all upcoming clashes
        for (const clash of upcomingClashes) {
            await TournamentService.addUpcomingClashTournament(clash.themeId, clash.nameKey, clash.nameKeySecondary);
        }
        console.log(`Synced upcoming clashes`);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}



