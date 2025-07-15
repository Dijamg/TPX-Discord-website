import axios from 'axios';
import { Member } from '../types';

const getAll = async (): Promise<Member[]> => {
  const response = await axios.get<Member[]>('/api/members');
  return response.data;
};

export default { getAll };
