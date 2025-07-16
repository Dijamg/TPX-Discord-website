import axios from 'axios';
import { Tournament, UpcomingClashTournament } from '../types';
import authHeader from './auth-headers';

const getAllTournaments = async (): Promise<Tournament[]> => {
  const response = await axios.get<Tournament[]>('/api/tournaments');
  return response.data;
};

const addTournament = async (tournament: Omit<Tournament, 'id' | 'revision_date'>): Promise<Tournament> => {
  const response = await axios.post<Tournament>('/api/tournaments', tournament, { headers: authHeader() });
  return response.data;
};

const getAllUpcomingClashTournaments = async (): Promise<UpcomingClashTournament[]> => {
  const response = await axios.get<UpcomingClashTournament[]>('/api/upcoming-clash-tournaments');
  return response.data;
};

const deleteTournament = async (id: number): Promise<void> => {
  await axios.delete(`/api/tournaments/${id}/delete`, { headers: authHeader() });
};

export default { getAllTournaments, getAllUpcomingClashTournaments, addTournament, deleteTournament };
