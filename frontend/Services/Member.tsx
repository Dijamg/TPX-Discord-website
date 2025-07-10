import axios from 'axios';
import { Member } from '../types';

export const getMembers = async (): Promise<Member[]> => {
  const response = await axios.get<Member[]>('/api/members');
  return response.data;
};
