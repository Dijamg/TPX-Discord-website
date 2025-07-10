import { MembersRepository } from "./members";

// Database Interface Extensions:
interface IExtensions {
    members: MembersRepository;
}

export { IExtensions, MembersRepository };