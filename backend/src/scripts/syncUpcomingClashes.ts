
import { MemberService, RiotService, TournamentService } from "../services";

export const syncUpcomingClashes = async () => {
    console.log('Syncing upcoming clashes');
    try {
        const currentClashes = await TournamentService.getAllUpcomingClashTournaments();

        const upcomingClashes = await RiotService.getUpcomingClashTournaments();

        const existingIds = new Set(currentClashes.map(c => c.id));

        //clashes that are not in the database
        const newClashes = upcomingClashes.filter(clash => !existingIds.has(clash.id));

        // We want to delete all clashes that are not in the upcomingClashes array
        const upcomingClashIds = new Set(upcomingClashes.map(c => c.id));

        for (const clash of currentClashes) {
            if (!upcomingClashIds.has(clash.id)) {
                await TournamentService.deleteUpcomingClashTournament(clash.id);
            }
        }
        // we want to add all new clashes to the database
        for (const clash of newClashes) {
            if(clash.schedule.length > 0) {
                const startTime = new Date(clash.schedule[0].startTime);
                await TournamentService.addUpcomingClashTournament(clash.themeId, clash.nameKey, clash.nameKeySecondary, startTime);
            }
        }

        console.log(`Synced upcoming clashes`);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}



