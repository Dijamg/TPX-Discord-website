import db from "../db";
import { Tournament, UpcomingClashTournament } from '../db/models';

export const getAllUpcomingClashTournaments = async (): Promise<UpcomingClashTournament[]> => {
  return await db.tournament.GetAllUpcomingClashTournaments();
}; 

export const getUpcomingClashTournamentById = async (id: number): Promise<UpcomingClashTournament | null> => {
  return await db.tournament.getUpcomingClashTournamentById(id);
}

export const getAllTournaments = async (): Promise<Tournament[]> => {
  return await db.tournament.GetAllTournaments();
}

export const getTournamentById = async (id: number): Promise<Tournament | null> => {
  return await db.tournament.getTournamentById(id);
}

export const deleteUpcomingClashTournament = async (id: number): Promise<null> => {
  return await db.tournament.deleteUpcomingClashTournament(id);
}

export const addUpcomingClashTournament = async (theme_id: string, name_key: string, name_key_secondary: string, start_date: Date): Promise<null> => {
  return await db.tournament.addUpcomingClashTournament(theme_id, name_key, name_key_secondary, start_date);
}

export const addTournament = async (tournament: Omit<Tournament, 'id' | 'revision_date'>): Promise<Tournament> => {
  return await db.tournament.addTournament(tournament);
}

export const deleteTournament = async (id: number): Promise<null> => {
  return await db.tournament.deleteTournament(id);
}

export const updateTournamentActiveStatus = async (id: number, active: boolean): Promise<null> => {
  return await db.tournament.updateTournamentActiveStatus(id, active);
}


