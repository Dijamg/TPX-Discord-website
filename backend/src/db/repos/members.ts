import { IDatabase, IMain } from "pg-promise";
import { Member } from "../models";

export class MembersRepository {
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

    // Tries to find a member from id;
    findById(id: number): Promise<Member | null> {
        return this.db.oneOrNone("SELECT * FROM members WHERE id = $1", +id);
    }

    // Returns all members
    GetAll(): Promise<Member[]> {
        return this.db.any("SELECT * FROM members");
    }

    // Returns all members with no riotUuid but have a riotGameName and riotTagLine
    GetAllWithNoRiotUuid(): Promise<Member[]> {
        return this.db.any("SELECT * FROM members WHERE riot_uuid IS NULL AND riot_game_name IS NOT NULL AND riot_tag_line IS NOT NULL");
    }

    // Updates a member's puuid
    updatePuuid(id: number, puuid: string): Promise<Member | null> {
        return this.db.oneOrNone("UPDATE members SET riot_uuid = $1 WHERE id = $2 RETURNING *", [puuid, id]);
    }
}