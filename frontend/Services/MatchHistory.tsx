import axios from 'axios';
import { LolMatchHistory } from '../types';

const getAll = async (): Promise<LolMatchHistory[]> => {
  const response = await axios.get<LolMatchHistory[]>('/api/lol-match-history');
  return response.data;
};

export default { getAll };
