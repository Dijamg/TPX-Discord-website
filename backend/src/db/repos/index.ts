import { MembersRepository } from "./members";
import { LolBasicInfoRepository } from "./lolBasicInfo";
import { LolCurrentSeasonInfoRepository } from "./lolCurrentSeasonInfo";
import { LolMasteryInfoRepository } from "./lolMasteryInfo";
import { TournamentRepository } from "./tournament";
// Database Interface Extensions:
interface IExtensions {
    members: MembersRepository;
    lolBasicInfo: LolBasicInfoRepository;
    lolCurrentSeasonInfo: LolCurrentSeasonInfoRepository;
    lolMasteryInfo: LolMasteryInfoRepository;
    tournament: TournamentRepository;
}

export { IExtensions, MembersRepository, LolBasicInfoRepository, LolCurrentSeasonInfoRepository, LolMasteryInfoRepository, TournamentRepository };