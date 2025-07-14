import db from "../db";
import { LolMatchHistory } from '../db/models';

// Get all lol basic info
export const getAllLolMatchHistory = async (): Promise<LolMatchHistory[]> => {
  return await db.lolMatchHistory.getAll();
};

// Get lol basic info by puuid
export const getLolMatchHistoryByPuuid = async (puuid: string): Promise<LolMatchHistory | null> => {
  return await db.lolMatchHistory.findByPuuid(puuid);
};

export const getLolMatchHistoryById = async (id: number): Promise<LolMatchHistory | null> => {
  return await db.lolMatchHistory.findById(id);
};

// Add lol basic info by puuid
export const addLolMatchHistoryByPuuid = async (puuid: string, match_id: string, champion_name: string, win: boolean, kills: number, deaths: number, assists: number, totalMinionsKilled: number, matchDuration: number, matchDate: Date, killParticipationPercent: number, csPerMinute: number): Promise<LolMatchHistory> => {
    return await db.lolMatchHistory.add(puuid, match_id, champion_name, win, kills, deaths, assists, totalMinionsKilled, matchDuration, matchDate, killParticipationPercent, csPerMinute);
};

// delete all mastery info by puuid
export const deleteLolMatchHistoryByPuuid = async (puuid: string): Promise<null> => {
  return await db.lolMatchHistory.deleteByPuuid(puuid);
};
