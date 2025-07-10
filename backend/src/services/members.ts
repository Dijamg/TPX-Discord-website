import db from "../db";
import { Member } from '../db/models';

export const getAllMembers = async (): Promise<Member[]> => {
  console.log("getAllMembers");
  return await db.members.GetAll();
}; 

export const getMemberById = async (id: number): Promise<Member | null> => {
  return await db.members.findById(id);
};