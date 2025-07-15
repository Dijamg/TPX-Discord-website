import axios from 'axios';
import { Tournament, UpcomingClashTournament } from '../types';

const getAllTournaments = async (): Promise<Tournament[]> => {
  const response = await axios.get<Tournament[]>('/api/tournaments');
  return response.data;
};

const getAllUpcomingClashTournaments = async (): Promise<UpcomingClashTournament[]> => {
  const response = await axios.get<UpcomingClashTournament[]>('/api/upcoming-clash-tournaments');
  return response.data;
};

export default { getAllTournaments, getAllUpcomingClashTournaments };
