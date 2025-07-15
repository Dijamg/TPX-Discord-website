import axios from 'axios';
import { BasicLolInfo } from '../types';

const getAll = async (): Promise<BasicLolInfo[]> => {
  const response = await axios.get<BasicLolInfo[]>('/api/lol-basic-info');
  return response.data;
};

export default { getAll };
