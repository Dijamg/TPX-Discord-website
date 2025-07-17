import db from "../db";
import { LolAccountInfo } from '../db/models';

export const getAllLolAccountInfo = async (): Promise<LolAccountInfo[]> => {
  return await db.lolAccountInfo.GetAll();
}; 


export const getLolAccountInfoById = async (id: number): Promise<LolAccountInfo | null> => {
  return await db.lolAccountInfo.findById(id);
};

export const addLolAccountInfo = async (accountInfo: Omit<LolAccountInfo, 'id' | 'revision_date' | 'riot_puuid'>): Promise<LolAccountInfo> => {
  return await db.lolAccountInfo.add(accountInfo);
};

export const deleteLolAccountInfo = async (id: number): Promise<LolAccountInfo | null> => {
  return await db.lolAccountInfo.delete(id);
};

export const getLolAccountInfoByMemberId = async (memberId: number): Promise<LolAccountInfo | null> => {
  return await db.lolAccountInfo.findByMemberId(memberId);
};

export const getAllLolAccountInfoWithNoRiotPuuid = async (): Promise<LolAccountInfo[]> => {
  return await db.lolAccountInfo.GetAllWithNoRiotPuuid();
};

export const getAllLolAccountInfoWithRiotPuuidButNoLolBasicInfo = async (): Promise<LolAccountInfo[]> => {
  return await db.lolAccountInfo.GetAllWithRiotPuuidButNoLolBasicInfo();
};

export const getAllLolAccountInfoWithRiotPuuid = async (): Promise<LolAccountInfo[]> => {
  return await db.lolAccountInfo.GetAllWithRiotPuuid();
}

export const updateLolAccountInfoRiotPuuid = async (id: number, riotPuuid: string): Promise<LolAccountInfo | null> => {
  return await db.lolAccountInfo.updateRiotPuuid(id, riotPuuid);
};

export const getLolAccountInfoByRiotData = async (riotGameName: string, riotTagLine: string): Promise<LolAccountInfo | null> => {
  return await db.lolAccountInfo.findByRiotData(riotGameName, riotTagLine);
};

export const getLolAccountInfoByRiotPuuid = async (riotPuuid: string): Promise<LolAccountInfo | null> => {
  return await db.lolAccountInfo.findByRiotPuuid(riotPuuid);
};
