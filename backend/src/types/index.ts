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


