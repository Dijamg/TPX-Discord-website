import { MembersRepository } from "./members";
import { LolBasicInfoRepository } from "./lolBasicInfo";
import { LolCurrentSeasonInfoRepository } from "./lolCurrentSeasonInfo";
import { LolMasteryInfoRepository } from "./lolMasteryInfo";
import { LolMatchHistoryRepository } from "./lolMatchHistory";
import { TournamentRepository } from "./tournament";
import { AccountRepository } from "./account";
import { LolAccountInfoRepository } from "./lolAccountInfo";
// Database Interface Extensions:
interface IExtensions {
    members: MembersRepository;
    lolBasicInfo: LolBasicInfoRepository;
    lolCurrentSeasonInfo: LolCurrentSeasonInfoRepository;
    lolMasteryInfo: LolMasteryInfoRepository;
    lolMatchHistory: LolMatchHistoryRepository;
    tournament: TournamentRepository;
    account: AccountRepository;
    lolAccountInfo: LolAccountInfoRepository;
}

export { IExtensions, MembersRepository, LolBasicInfoRepository, LolCurrentSeasonInfoRepository, LolMasteryInfoRepository, LolMatchHistoryRepository, TournamentRepository, AccountRepository, LolAccountInfoRepository };