import db from "../db";
import { LolBasicInfo } from '../db/models';

// Get all lol basic info
export const getAllLolBasicInfo = async (): Promise<LolBasicInfo[]> => {
  return await db.lolBasicInfo.getAll();
};

// Get lol basic info by puuid
export const getLolBasicInfoByPuuid = async (puuid: string): Promise<LolBasicInfo | null> => {
  return await db.lolBasicInfo.findByPuuid(puuid);
};

// Add lol basic info by puuid
export const addLolBasicInfoByPuuid = async (puuid: string, summonerLevel: number, summonerIconId: number, peakRank: string | null): Promise<LolBasicInfo> => {
  return await db.lolBasicInfo.add(puuid, summonerLevel, summonerIconId, peakRank);
};

// update lol basic info by puuid
export const updateLolBasicInfoByPuuid = async (puuid: string, summonerLevel: number, summonerIconId: number, peakRank: string | null): Promise<LolBasicInfo> => {
  return await db.lolBasicInfo.update(puuid, summonerLevel, summonerIconId, peakRank);
};
