import db from "../db";
import { Member } from '../db/models';

export const getAllMembers = async (): Promise<Member[]> => {
  return await db.members.GetAll();
}; 

export const getMembersWithNoRiotPuuid = async (): Promise<Member[]> => {
  return await db.members.GetAllWithNoRiotUuid();
}

export const getMemberById = async (id: number): Promise<Member | null> => {
  return await db.members.findById(id);
};

export const updateMemberPuuid = async (id: number, puuid: string): Promise<Member | null> => {
  return await db.members.updatePuuid(id, puuid);
};

