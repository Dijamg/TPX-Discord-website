import axios from 'axios';
import { Member } from '../types';
import authHeader from './auth-headers';

const getAll = async (): Promise<Member[]> => {
  const response = await axios.get<Member[]>('/api/members');
  return response.data;
};

const add = async (member: Omit<Member, 'id' | 'revision_date' | 'member_uuid'>): Promise<Member> => {
  try {
    const response = await axios.post<Member>('/api/members', member, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    console.error("Error adding member:", error.message);
    throw error;
  }
};

const deleteMember = async (id: number): Promise<Member> => {
  const response = await axios.delete<Member>(`/api/members/${id}/delete`, { headers: authHeader() });
  return response.data;
};

export default { getAll, add, deleteMember };
