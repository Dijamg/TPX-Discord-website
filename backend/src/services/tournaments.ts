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

export const addUpcomingClashTournament = async (theme_id: string, name_key: string, name_key_secondary: string): Promise<null> => {
  return await db.tournament.addUpcomingClashTournament(theme_id, name_key, name_key_secondary);
}

