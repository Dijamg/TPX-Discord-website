// Syncs the active status of tournaments based on the start date

import { TournamentService } from "../services";

export const syncTournamentsActiveStatus = async () => {
    console.log('Syncing tournaments active status');   
    const tournaments = await TournamentService.getAllTournaments();
    const now = new Date();
  
    for (const tournament of tournaments) {
      const shouldBeActive = tournament.start_date > now;
  
      if (tournament.active !== shouldBeActive) {
        await TournamentService.updateTournamentActiveStatus(tournament.id, shouldBeActive);
      }
    }
    console.log('Tournaments active status synced');
  };
