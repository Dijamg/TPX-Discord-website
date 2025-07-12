import { MembersRepository } from "./members";
import { LolBasicInfoRepository } from "./lolBasicInfo";

// Database Interface Extensions:
interface IExtensions {
    members: MembersRepository;
    lolBasicInfo: LolBasicInfoRepository;
}

export { IExtensions, MembersRepository, LolBasicInfoRepository };