
import { MemberService, RiotService, TournamentService } from "../services";

export const syncUpcomingClashes = async () => {
    try {
        const currentClashes = await TournamentService.getAllUpcomingClashTournaments();
        const upcomingClashes = await RiotService.getUpcomingClashTournaments();
           
        if(currentClashes.length === 0) {
            //If there are no current clashes, add all upcoming clashes
            for (const clash of upcomingClashes) {
                await TournamentService.addUpcomingClashTournament(clash.themeId, clash.nameKey, clash.nameKeySecondary);
            }
        } else {
            //If there are current clashes, delete all current clashes and add all upcoming clashes
            for (const clash of currentClashes) {
                await TournamentService.deleteUpcomingClashTournament(clash.id);
            }
            for (const clash of upcomingClashes) {
                await TournamentService.addUpcomingClashTournament(clash.themeId, clash.nameKey, clash.nameKeySecondary);
            }
        }
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}



