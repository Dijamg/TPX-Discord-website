import axios from 'axios';
import { LolAccountInfo } from '../types';
import authHeader from './auth-headers';

const getAll = async (): Promise<LolAccountInfo[]> => {
  const response = await axios.get<LolAccountInfo[]>('/api/lol-account-info');
  return response.data;
};

const getById = async (id: number): Promise<LolAccountInfo> => {
  const response = await axios.get<LolAccountInfo>(`/api/lol-account-info/${id}`);
  return response.data;
};

const add = async (lolAccountInfo: Omit<LolAccountInfo, 'id' | 'revision_date' | 'riot_puuid'>): Promise<LolAccountInfo> => {
  const response = await axios.post<LolAccountInfo>('/api/lol-account-info', lolAccountInfo, { headers: authHeader() });
  return response.data;
};

const deleteAccount = async (id: number): Promise<LolAccountInfo> => {
  const response = await axios.delete<LolAccountInfo>(`/api/lol-account-info/${id}`, { headers: authHeader() });
  return response.data;
};

export default { getAll, getById, add, deleteAccount };
