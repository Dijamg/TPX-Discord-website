import db from "../db";
import { LolMasteryInfo } from '../db/models';

// Get all lol basic info
export const getAllLolMasteryInfo = async (): Promise<LolMasteryInfo[]> => {
  return await db.lolMasteryInfo.getAll();
};

// Get lol basic info by puuid
export const getLolMasteryInfoByPuuid = async (puuid: string): Promise<LolMasteryInfo[]> => {
  return await db.lolMasteryInfo.findByPuuid(puuid);
};

export const getLolMasteryInfoById = async (id: number): Promise<LolMasteryInfo | null> => {
  return await db.lolMasteryInfo.findById(id);
};

// Add lol basic info by puuid
export const addLolMasteryInfoByPuuid = async (puuid: string, champion_name: string, champion_level: number, champion_points: number): Promise<LolMasteryInfo> => {
  return await db.lolMasteryInfo.add(puuid, champion_name, champion_level, champion_points);
};

// delete all mastery info by puuid
export const deleteLolMasteryInfoByPuuid = async (puuid: string): Promise<null> => {
  return await db.lolMasteryInfo.deleteByPuuid(puuid);
};
