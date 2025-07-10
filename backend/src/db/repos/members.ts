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
}