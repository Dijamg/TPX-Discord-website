import db from "../db";
import { Account } from "../db/models";
import bcrypt from "bcrypt";
import { Credentials } from "../types";

export async function add(username: string, password: string, is_admin: boolean): Promise<Account> {
    const existingUser = await db.account.getByUsername(username);

    if (existingUser) {
        throw new Error("This username is already taken");
    }
    
    password = await bcrypt.hash(password, 10);

    return await db.account.add(username, password, is_admin);
}
  
export async function authenticate(credentials: Credentials): Promise<Account> {
    const accountFound = await db.account.getByUsername(credentials.username);

    if (!accountFound) {
        throw new Error("Invalid username or password");
    }

    const match = await bcrypt.compare(credentials.password, accountFound.password);

    if (match) {
        return accountFound;
    } else {
        throw new Error("Invalid username or password");
    }
}

export async function getById(id: number): Promise<Account> {
    const accountFound = await db.account.getById(id);

    if (!accountFound) {
        throw new Error("Account not found");
    }

    return accountFound;
}

export async function getAll(): Promise<Account[]> {
    return await db.account.getAll();
}