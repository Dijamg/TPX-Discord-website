import pgPromise, { IInitOptions, IDatabase, IMain } from "pg-promise";
import {
    IExtensions,
    MembersRepository,
} from "./repos/index";

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

const initOptions: IInitOptions<IExtensions> = {
    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj: ExtendedProtocol, dc: any) {
        // Database Context (dc) is mainly needed for extending multiple databases with different access API.

        // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
        // which should be as fast as possible.
        obj.members = new MembersRepository(obj, pgp);

    },
};

const pgp: IMain = pgPromise(initOptions);

let db: ExtendedProtocol;
if (!process.env.DATABASE_URL)
    throw new Error("Environment variable DATABASE_URL not found");
db = pgp(process.env.DATABASE_URL);

export default db;