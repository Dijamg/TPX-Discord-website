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
    add(member: Omit<Member, 'id' | 'revision_date' | 'member_uuid'>): Promise<Member> {
        return this.db.one("INSERT INTO members (name, role, img_url, description) VALUES ($1, $2, $3, $4) RETURNING *", [member.name, member.role, member.img_url, member.description]);
    }

    // Tries to find a member from id;
    findById(id: number): Promise<Member | null> {
        return this.db.oneOrNone("SELECT * FROM members WHERE id = $1", +id);
    }

    // Tries to find a member from member_uuid;
    findByMemberUuid(memberUuid: string): Promise<Member | null> {
        return this.db.oneOrNone("SELECT * FROM members WHERE member_uuid = $1", memberUuid);
    }

    // Returns all members
    GetAll(): Promise<Member[]> {
        return this.db.any("SELECT * FROM members");
    }


    // deletes a member
    delete(id: number): Promise<Member | null> {
        return this.db.oneOrNone("DELETE FROM members WHERE id = $1 RETURNING *", +id);
    }

    // Finds a member by lol_account_info

    // Finds a member by name
    findByName(name: string): Promise<Member | null> {
        return this.db.oneOrNone("SELECT * FROM members WHERE name = $1", name);
    }

}