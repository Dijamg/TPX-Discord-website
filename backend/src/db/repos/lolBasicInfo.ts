// src/db/repos/lolBasicInfo.ts
import { IDatabase, IMain } from "pg-promise";
import { LolBasicInfo } from "../models";

    export class LolBasicInfoRepository {
     /**
     * @param db
     * Automated database connection context/interface.
     *
     * If you ever need to access other repositories from this one,
     * you will have to replace type 'IDatabase<any>' with 'any'.
     *
     * @param pgp
     * Library's root, if ever needed, like to access 'helpers'
     * or other namespaces available from the root.
     */
     constructor(
        private db: IDatabase<any>,
        private pgp: IMain,
    ) {}

    //get all lol_basic_info
    getAll(): Promise<LolBasicInfo[]> {
        return this.db.any("SELECT * FROM lol_basic_info");
    }

    // Tries to find a lol_basic_info from riot_puuid;
    findByPuuid(puuid: string): Promise<LolBasicInfo | null> {
        return this.db.oneOrNone("SELECT * FROM lol_basic_info WHERE riot_puuid = $1", puuid);
    }

    // Add lol basic info by puuid
    add(puuid: string, summonerLevel: number, summonerIconId: number, peakRank: string): Promise<LolBasicInfo> {
        return this.db.one("INSERT INTO lol_basic_info (riot_puuid, summoner_level, summoner_icon_id, peak_rank) VALUES ($1, $2, $3, $4) RETURNING *", [puuid, summonerLevel, summonerIconId, peakRank]);
    }

    // update lol basic info by puuid
    update(puuid: string, summonerLevel: number, summonerIconId: number, peakRank: string): Promise<LolBasicInfo> {
        return this.db.one("UPDATE lol_basic_info SET summoner_level = $1, summoner_icon_id = $2, peak_rank = $3, revision_date = CURRENT_TIMESTAMP WHERE riot_puuid = $4 RETURNING *", [summonerLevel, summonerIconId, peakRank, puuid]);
    }
}