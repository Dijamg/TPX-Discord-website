import axios from 'axios';
import { MasteryInfo } from '../types';

const getAll = async (): Promise<MasteryInfo[]> => {
  const response = await axios.get<MasteryInfo[]>('/api/lol-mastery-info');
  return response.data;
};

export default { getAll };
