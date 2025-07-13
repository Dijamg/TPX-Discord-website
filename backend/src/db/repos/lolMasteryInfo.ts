// src/db/repos/lolBasicInfo.ts
import { IDatabase, IMain } from "pg-promise";
import { LolBasicInfo, LolCurrentSeasonInfo, LolMasteryInfo } from "../models";

    export class LolMasteryInfoRepository {
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

        //get all lol_mastery_info
    getAll(): Promise<LolMasteryInfo[]> {
        return this.db.any("SELECT * FROM lol_mastery_info");
    }

    //get lol_mastery_info by id
    findById(id: number): Promise<LolMasteryInfo | null> {
        return this.db.oneOrNone("SELECT * FROM lol_mastery_info WHERE id = $1", id);
    }

    // Tries to find lol mastery info of a member by riot_puuid;
    findByPuuid(puuid: string): Promise<LolMasteryInfo | null> {
        return this.db.oneOrNone("SELECT * FROM lol_mastery_info WHERE riot_puuid = $1", puuid);
    }

    // Tries to find lol mastery info of a member by riot_puuid;
    findTop5ByPuuid(puuid: string): Promise<LolMasteryInfo[]> {
        return this.db.any("SELECT * FROM lol_mastery_info WHERE r  iot_puuid = $1 ORDER BY champion_points DESC LIMIT 5", puuid);
    }

    // Add lol mastery info by puuid
    add(puuid: string, champion_name: string, champion_level: number, champion_points: number): Promise<LolMasteryInfo> {
        return this.db.one("INSERT INTO lol_mastery_info (riot_puuid, champion_name, champion_level, champion_points) VALUES ($1, $2, $3, $4) RETURNING *", [puuid, champion_name, champion_level, champion_points]);
    }

    // Delete lol mastery infos by puuid
    deleteByPuuid(puuid: string): Promise<null> {
        return this.db.none("DELETE FROM lol_mastery_info WHERE riot_puuid = $1", puuid);
    }
}