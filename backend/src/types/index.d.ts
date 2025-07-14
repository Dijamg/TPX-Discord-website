export type Member = {
  id: number;
  name: string;
  role: string;
  imgUrl: string | null;
  riotGameName: string | null;
  riotTagLine: string | null;
  riotUuid: string | null;
  lostArkName: string | null;
  description: string;
  riotRegion: string;
}; 

export type BasicSummonerInfo = {
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export type CurrentSeasonInfo = {
  leagueId: string;
  puuid: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

export type RiotAccountResponse = {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export type MasteryInfo = {
  puuid: string;
  championId: number;
  championLevel: number;
  championPoints: number;
  championName: string;
}

export type UpcomingClashTournament = {
  id: number;
  themeId: string;
  nameKey: string;
  nameKeySecondary: string;
  schedule: ClashSchedule[];
}

export type ClashSchedule = {
  startTime: Date;
  registrationTime: Date;
}

export type LolMatchDto = {
  metadata: LolMetadataDto;
  info: LolInfoDto;
}

export type LolMetadataDto = {
  dataVersion: string;
  matchId: string;
  participants: string[];
}

export type LolInfoDto = { 
  gameEndTimestamp: number;
  gameDuration: number;
  participants: LolParticipantDto[];
}

export type LolParticipantDto = {
  puuid: string;
  teamId: number;
  championName: string;
  championId: number;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
}

export type LolMatchHistory = {
  matchId: string;
  puuid: string;
  championName: string;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  killParticipationPercent: number;
  totalMinionsKilled: number;
  csPerMinute: number;
  matchDuration: number;
  matchDate: Date;
}

export type Credentials = {
  username: string;
  password: string;
}

export type JwtToken = {
  accountId: number;
  username: string;
};
