import db from "../db";
import { LolBasicInfo, LolCurrentSeasonInfo } from '../db/models';

// Get all lol basic info
export const getAllLolCurrentSeasonInfo = async (): Promise<LolCurrentSeasonInfo[]> => {
  return await db.lolCurrentSeasonInfo.getAll();
};

// Get lol basic info by puuid
export const getLolCurrentSeasonInfoByPuuid = async (puuid: string): Promise<LolCurrentSeasonInfo | null> => {
  return await db.lolCurrentSeasonInfo.findByPuuid(puuid);
};

export const getLolCurrentSeasonInfoById = async (id: number): Promise<LolCurrentSeasonInfo | null> => {
  return await db.lolCurrentSeasonInfo.findById(id);
};

// Add lol basic info by puuid
export const addLolCurrentSeasonInfoByPuuid = async (puuid: string, queue_type: string, tier: string, rank: string, league_points: number, wins: number, losses: number): Promise<LolCurrentSeasonInfo> => {
  return await db.lolCurrentSeasonInfo.add(puuid, queue_type, tier, rank, league_points, wins, losses);
};

// update lol basic info by puuid
export const updateLolCurrentSeasonInfoByPuuid = async (puuid: string, queue_type: string, tier: string, rank: string, league_points: number, wins: number, losses: number): Promise<LolCurrentSeasonInfo> => {
  return await db.lolCurrentSeasonInfo.update(puuid, queue_type, tier, rank, league_points, wins, losses);
};
