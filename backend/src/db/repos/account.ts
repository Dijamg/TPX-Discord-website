import { IDatabase, IMain } from "pg-promise";
import { Account } from "../models";

export class AccountRepository { 
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

    // add an account
    add(username: string, password: string, is_admin: boolean): Promise<Account> {
        return this.db.one("INSERT INTO accounts (username, password, is_admin) VALUES ($1, $2, $3) RETURNING *", [username, password, is_admin]);
    }

    // get an account by username
    getByUsername(username: string): Promise<Account | null> {
        return this.db.oneOrNone("SELECT * FROM accounts WHERE username = $1", username);
    }

    // get an account by id
    getById(id: number): Promise<Account | null> {
        return this.db.oneOrNone("SELECT * FROM accounts WHERE id = $1", id);
    }

    // get all accounts
    getAll(): Promise<Account[]> {
        return this.db.any("SELECT * FROM accounts");
    }
    
}