import axios from 'axios';
import { CurrentSeasonLolInfo } from '../types';

const getAll = async (): Promise<CurrentSeasonLolInfo[]> => {
  const response = await axios.get<CurrentSeasonLolInfo[]>('/api/lol-current-season-info');
  return response.data;
};

export default { getAll };
