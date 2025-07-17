import { IDatabase, IMain } from "pg-promise";
import { LolAccountInfo } from "../models";

export class LolAccountInfoRepository {
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

    // Creates a new lol_account_info
    add(accountInfo: Omit<LolAccountInfo, 'id' | 'revision_date' | 'riot_puuid'>): Promise<LolAccountInfo> {
        return this.db.one("INSERT INTO lol_account_info (member_id, riot_game_name, riot_tag_line, riot_region) VALUES ($1, $2, $3, $4) RETURNING *", [accountInfo.member_id, accountInfo.riot_game_name, accountInfo.riot_tag_line, accountInfo.riot_region]);
    }

    // Tries to find a lol_account_info from id;
    findById(id: number): Promise<LolAccountInfo | null> {
        return this.db.oneOrNone("SELECT * FROM lol_account_info WHERE id = $1", +id);
    }

    // Returns all lol_account_info
    GetAll(): Promise<LolAccountInfo[]> {
        return this.db.any("SELECT * FROM lol_account_info");
    }

    // Returns all lol_account_info with no riot_puuid but have a riot_game_name and riot_tag_line
    GetAllWithNoRiotPuuid(): Promise<LolAccountInfo[]> {
        return this.db.any("SELECT * FROM lol_account_info WHERE riot_puuid IS NULL AND riot_game_name IS NOT NULL AND riot_tag_line IS NOT NULL");
    }

    // Returns all lol_account_info with riot_puuid but no lol_basic_info
    GetAllWithRiotPuuidButNoLolBasicInfo(): Promise<LolAccountInfo[]> {
        return this.db.any("SELECT * FROM lol_account_info WHERE riot_puuid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM lol_basic_info WHERE lol_basic_info.riot_puuid = lol_account_info.riot_puuid)");
    }

    // Returns all lol_account_info with riot_puuid, riot_game_name and riot_tag_line.
    GetAllWithRiotPuuid(): Promise<LolAccountInfo[]> {
        return this.db.any("SELECT * FROM lol_account_info WHERE riot_puuid IS NOT NULL");
    }

    // deletes a lol_account_info
    delete(id: number): Promise<LolAccountInfo | null> {
        return this.db.oneOrNone("DELETE FROM lol_account_info WHERE id = $1 RETURNING *", +id);
    }

    // Finds a lol_account_info by riot_puuid
    findByRiotPuuid(riotPuuid: string): Promise<LolAccountInfo | null> {
        return this.db.oneOrNone("SELECT * FROM lol_account_info WHERE riot_puuid = $1", riotPuuid);
    }

    // Finds a lol_account_info by member_id    
    findByMemberId(memberId: number): Promise<LolAccountInfo | null> {
        return this.db.oneOrNone("SELECT * FROM lol_account_info WHERE member_id = $1", memberId);
    }

    // Updates a lol_account_info's riot_puuid
    updateRiotPuuid(id: number, riotPuuid: string): Promise<LolAccountInfo | null> {
        return this.db.oneOrNone("UPDATE lol_account_info SET riot_puuid = $1 WHERE id = $2 RETURNING *", [riotPuuid, id]);
    }

    // Finds a lol_account_info by riot_game_name and riot_tag_line
    findByRiotData(riotGameName: string, riotTagLine: string): Promise<LolAccountInfo | null> {
        return this.db.oneOrNone("SELECT * FROM lol_account_info WHERE riot_game_name = $1 AND riot_tag_line = $2", [riotGameName, riotTagLine]);
    }

}