import { MembersRepository } from "./members";
import { LolBasicInfoRepository } from "./lolBasicInfo";
import { LolCurrentSeasonInfoRepository } from "./lolCurrentSeasonInfo";
import { LolMasteryInfoRepository } from "./lolMasteryInfo";
    
// Database Interface Extensions:
interface IExtensions {
    members: MembersRepository;
    lolBasicInfo: LolBasicInfoRepository;
    lolCurrentSeasonInfo: LolCurrentSeasonInfoRepository;
    lolMasteryInfo: LolMasteryInfoRepository;
}

export { IExtensions, MembersRepository, LolBasicInfoRepository, LolCurrentSeasonInfoRepository, LolMasteryInfoRepository };