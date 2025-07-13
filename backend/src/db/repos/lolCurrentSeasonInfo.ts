// src/db/repos/lolBasicInfo.ts
import { IDatabase, IMain } from "pg-promise";
import { LolBasicInfo, LolCurrentSeasonInfo } from "../models";

    export class LolCurrentSeasonInfoRepository {
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

    //get all lol_current_season_info
    getAll(): Promise<LolCurrentSeasonInfo[]> {
        return this.db.any("SELECT * FROM lol_current_season_info");
    }

    //get lol_current_season_info by id
    findById(id: number): Promise<LolCurrentSeasonInfo | null> {
        return this.db.oneOrNone("SELECT * FROM lol_current_season_info WHERE id = $1", id);
    }

    // Tries to find a lol_current_season_info from riot_puuid; For now we only support ranked solo 5x5
    findByPuuid(puuid: string): Promise<LolCurrentSeasonInfo | null> {
        return this.db.oneOrNone("SELECT * FROM lol_current_season_info WHERE riot_puuid = $1 AND queue_type = 'RANKED_SOLO_5x5'", puuid);
    }

    // Add lol current season info by puuid
    add(puuid: string, queue_type: string, tier: string, rank: string, league_points: number, wins: number, losses: number): Promise<LolCurrentSeasonInfo> {
        return this.db.one("INSERT INTO lol_current_season_info (riot_puuid, queue_type, tier, rank, league_points, wins, losses) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [puuid, queue_type, tier, rank, league_points, wins, losses]);
    }

    // update lol current season info by puuid
    update(puuid: string, queue_type: string, tier: string, rank: string, league_points: number, wins: number, losses: number): Promise<LolCurrentSeasonInfo> {
        return this.db.one("UPDATE lol_current_season_info SET queue_type = $1, tier = $2, rank = $3, league_points = $4, wins = $5, losses = $6, revision_date = CURRENT_TIMESTAMP WHERE riot_puuid = $7 RETURNING *", [queue_type, tier, rank, league_points, wins, losses, puuid]);
    }
}