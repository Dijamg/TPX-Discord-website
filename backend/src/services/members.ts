import db from "../db";
import { Member } from '../db/models';

export const getAllMembers = async (): Promise<Member[]> => {
  return await db.members.GetAll();
}; 


export const getMemberById = async (id: number): Promise<Member | null> => {
  return await db.members.findById(id);
};

export const addMember = async (member: Omit<Member, 'id' | 'revision_date' | 'member_uuid'>): Promise<Member> => {
  return await db.members.add(member);
};

export const deleteMember = async (id: number): Promise<Member | null> => {
  return await db.members.delete(id);
};

export const getMemberByName = async (name: string): Promise<Member | null> => {
  return await db.members.findByName(name);
};