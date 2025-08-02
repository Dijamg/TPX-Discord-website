// src/db/repos/lolBasicInfo.ts
import { IDatabase, IMain } from "pg-promise";
import { LolBasicInfo, LolCurrentSeasonInfo, LolMasteryInfo, LolMatchHistory } from "../models";

    export class LolMatchHistoryRepository {
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

        //get all lol_match_history
    getAll(): Promise<LolMatchHistory[]> {
        return this.db.any("SELECT * FROM lol_match_history");
    }

    //get lol_match_history by id
    findById(id: number): Promise<LolMatchHistory | null> {
        return this.db.oneOrNone("SELECT * FROM lol_match_history WHERE id = $1", id);
    }

    // Tries to find lol match history of a member by riot_puuid;
    findByPuuid(puuid: string): Promise<LolMatchHistory[]> {
        return this.db.any("SELECT * FROM lol_match_history WHERE riot_puuid = $1 ORDER BY match_date DESC", puuid);
    }

    // Add lol match history by puuid
    add(puuid: string, match_id: string, queue: number,  champion_name: string, win: boolean, kills: number, deaths: number, assists: number, total_minions_killed: number, match_duration: number, match_date: Date, kill_participation_percent: number, cs_per_minute: number, champion_icon_url: string): Promise<LolMatchHistory> {
        return this.db.one("INSERT INTO lol_match_history (riot_puuid, match_id, champion_name, win, kills, deaths, assists, total_minions_killed, match_duration, match_date, kill_participation_percent, cs_per_minute, queue, champion_icon_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *", [puuid, match_id, champion_name, win, kills, deaths, assists, total_minions_killed, match_duration, match_date, kill_participation_percent, cs_per_minute, queue, champion_icon_url]);
    }

    // Delete lol match history by puuid
    deleteByPuuid(puuid: string): Promise<null> {
        return this.db.none("DELETE FROM lol_match_history WHERE riot_puuid = $1", puuid);
    }

    // Delete lol match history by match id
    deleteByMatchId(match_id: string): Promise<null> {
        return this.db.none("DELETE FROM lol_match_history WHERE match_id = $1", match_id);
    }


    // Trim to 5 matches by deleting older matches
    trimTo5(puuid: string): Promise<null> {
        return this.db.none("DELETE FROM lol_match_history WHERE riot_puuid = $1 AND id NOT IN (SELECT id FROM lol_match_history WHERE riot_puuid = $1 ORDER BY match_date DESC LIMIT 5)", puuid);
    }
}