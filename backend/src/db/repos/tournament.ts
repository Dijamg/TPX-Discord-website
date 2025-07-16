import { IDatabase, IMain } from "pg-promise";
import { Member, Tournament, UpcomingClashTournament } from "../models";

export class TournamentRepository { 
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

    // Returns all upcoming clash tournaments
    GetAllUpcomingClashTournaments(): Promise<UpcomingClashTournament[]> {
        return this.db.any("SELECT * FROM upcoming_clash_tournaments");
    }

    // Returns all tournaments
    GetAllTournaments(): Promise<Tournament[]> {
        return this.db.any("SELECT * FROM tournaments");
    }

    // Returns a tournament by id
    getTournamentById(id: number): Promise<Tournament | null> {
        return this.db.oneOrNone("SELECT * FROM tournaments WHERE id = $1", id);
    }

    // Returns an upcoming clash tournament by id
    getUpcomingClashTournamentById(id: number): Promise<UpcomingClashTournament | null> {
        return this.db.oneOrNone("SELECT * FROM upcoming_clash_tournaments WHERE id = $1", id);
    }

    // Deletes an upcoming clash tournament by id
    deleteUpcomingClashTournament(id: number): Promise<null> {
        return this.db.oneOrNone("DELETE FROM upcoming_clash_tournaments WHERE id = $1 RETURNING *", id);
    }

    // Adds an upcoming clash tournament
    addUpcomingClashTournament(theme_id: string, name_key: string, name_key_secondary: string, start_date: Date): Promise<null> {
        return this.db.none("INSERT INTO upcoming_clash_tournaments (theme_id, name_key, name_key_secondary, start_date) VALUES ($1, $2, $3, $4)", [theme_id, name_key, name_key_secondary, start_date]);
    }

    // Adds a tournament
    addTournament(tournament: Omit<Tournament, 'id' | 'revision_date'>): Promise<Tournament> {
        return this.db.one("INSERT INTO tournaments (theme, img_url, start_date) VALUES ($1, $2, $3) RETURNING *", [tournament.theme, tournament.img_url, tournament.start_date]);
    }

    // Deletes a tournament by id
    deleteTournament(id: number): Promise<null> {
        return this.db.oneOrNone("DELETE FROM tournaments WHERE id = $1 RETURNING *", id);
    }

    // Update tournament active status
    updateTournamentActiveStatus(id: number, active: boolean): Promise<null> {
        return this.db.none("UPDATE tournaments SET active = $1 WHERE id = $2", [active, id]);
    }
}