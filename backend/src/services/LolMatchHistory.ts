import db from "../db";
import { LolMatchHistory } from '../db/models';

// get all lol match history
export const getAllLolMatchHistory = async (): Promise<LolMatchHistory[]> => {
  return await db.lolMatchHistory.getAll();
};

// get lol match history by puuid
export const getLolMatchHistoryByPuuid = async (puuid: string): Promise<LolMatchHistory[]> => {
  return await db.lolMatchHistory.findByPuuid(puuid);
};

// get lol match history by id
export const getLolMatchHistoryById = async (id: number): Promise<LolMatchHistory | null> => {
  return await db.lolMatchHistory.findById(id);
};

// add lol match history by puuid
export const addLolMatchHistoryByPuuid = async (puuid: string, match_id: string, queue: number, champion_name: string, win: boolean, kills: number, deaths: number, assists: number, totalMinionsKilled: number, matchDuration: number, matchDate: Date, killParticipationPercent: number, csPerMinute: number): Promise<LolMatchHistory> => {
    return await db.lolMatchHistory.add(puuid, match_id, queue, champion_name, win, kills, deaths, assists, totalMinionsKilled, matchDuration, matchDate, killParticipationPercent, csPerMinute);
};

// delete all lol match history by puuid
export const deleteLolMatchHistoryByPuuid = async (puuid: string): Promise<null> => {
  return await db.lolMatchHistory.deleteByPuuid(puuid);
};

// delete match history by match id
export const deleteLolMatchHistoryByMatchId = async (matchId: string): Promise<null> => {
  return await db.lolMatchHistory.deleteByMatchId(matchId);
};

// trim to 5 matches by deleting older matches
export const trimTo5 = async (puuid: string): Promise<null> => {
  return await db.lolMatchHistory.trimTo5(puuid);
};
