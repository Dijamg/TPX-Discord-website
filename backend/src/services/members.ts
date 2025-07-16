import db from "../db";
import { Member } from '../db/models';

export const getAllMembers = async (): Promise<Member[]> => {
  return await db.members.GetAll();
}; 

export const getMembersWithNoRiotPuuid = async (): Promise<Member[]> => {
  return await db.members.GetAllWithNoRiotPuuid();
}

export const getMembersWithRiotPuuid = async (): Promise<Member[]> => {
  return await db.members.GetAllWithRiotPuuid();
}

export const getMemberById = async (id: number): Promise<Member | null> => {
  return await db.members.findById(id);
};

export const updateMemberPuuid = async (id: number, puuid: string): Promise<Member | null> => {
  return await db.members.updatePuuid(id, puuid);
};

export const addMember = async (member: Omit<Member, 'id' | 'revision_date' | 'riot_puuid'>): Promise<Member> => {
  return await db.members.add(member);
};

export const deleteMember = async (id: number): Promise<Member | null> => {
  return await db.members.delete(id);
};

export const getMemberByRiotData = async (riotGameName: string, riotTagLine: string, riotRegion: string): Promise<Member | null> => {
  return await db.members.findByRiotData(riotGameName, riotTagLine, riotRegion);
};