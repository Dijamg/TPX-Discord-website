import axios from 'axios';

let cachedChampionMap: Record<string, string> | null = null;
let latestVersion: string | null = null;

export const updateLatestVersion = async (): Promise<string> => {
  const versionRes = await axios.get<string[]>('https://ddragon.leagueoflegends.com/api/versions.json');
  latestVersion = versionRes.data[0];
  await updateChampionMap();
  return latestVersion;
};


export const getChampionIconUrl = (championName: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${championName}.png`;
}

export const getProfileIconUrl = (profileIconId: number) => {
  return `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/profileicon/${profileIconId}.png`;
}

export const updateChampionMap = async (): Promise<Record<string, string>> => {
  const champDataRes = await axios.get<{
    data: Record<string, {
      key: string;
      id: string;
    }>
  }>(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`);
  const champions = champDataRes.data.data;
  const map: Record<string, string> = {};

  Object.values(champions).forEach((champ: any) => {
    map[champ.key] = champ.id;  
  });

  cachedChampionMap = map;
  return map;
}

export const getChampionIdToNameMap = async (): Promise<Record<string, string>> => {
  if (cachedChampionMap) return cachedChampionMap;

  const champions = await updateChampionMap();

  cachedChampionMap = champions;
  return champions;
};
