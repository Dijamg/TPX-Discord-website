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

    // Creates a new member
    add(member: Omit<Member, 'id' | 'revision_date' | 'riot_puuid'>): Promise<Member> {
        return this.db.one("INSERT INTO members (name, role, img_url, riot_game_name, riot_tag_line, riot_region, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [member.name, member.role, member.img_url, member.riot_game_name, member.riot_tag_line, member.riot_region, member.description]);
    }

    // Tries to find a member from id;
    findById(id: number): Promise<Member | null> {
        return this.db.oneOrNone("SELECT * FROM members WHERE id = $1", +id);
    }

    // Returns all members
    GetAll(): Promise<Member[]> {
        return this.db.any("SELECT * FROM members");
    }

    // Returns all members with no riotUuid but have a riotGameName and riotTagLine
    GetAllWithNoRiotPuuid(): Promise<Member[]> {
        return this.db.any("SELECT * FROM members WHERE riot_puuid IS NULL AND riot_game_name IS NOT NULL AND riot_tag_line IS NOT NULL");
    }

    // Returns all members with riot_uuid but no lol_basic_info
    GetAllWithRiotPuuidButNoLolBasicInfo(): Promise<Member[]> {
        return this.db.any("SELECT * FROM members WHERE riot_puuid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM lol_basic_info WHERE lol_basic_info.riot_puuid = members.riot_puuid)");
    }

    // Returns all members with riot_uuid, riot_game_name and riot_tag_line.
    GetAllWithRiotPuuid(): Promise<Member[]> {
        return this.db.any("SELECT * FROM members WHERE riot_puuid IS NOT NULL");
    }

    // Updates a member's puuid
    updatePuuid(id: number, puuid: string): Promise<Member | null> {
        return this.db.oneOrNone("UPDATE members SET riot_puuid = $1, revision_date = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *", [puuid, id]);
    }

    // deletes a member
    delete(id: number): Promise<Member | null> {
        return this.db.oneOrNone("DELETE FROM members WHERE id = $1 RETURNING *", +id);
    }
}