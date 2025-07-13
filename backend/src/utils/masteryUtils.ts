import axios from 'axios';

let cachedChampionMap: Record<string, string> | null = null;

export const getChampionIdToNameMap = async (): Promise<Record<string, string>> => {
  if (cachedChampionMap) return cachedChampionMap;

  const versionRes = await axios.get<string[]>('https://ddragon.leagueoflegends.com/api/versions.json');
  const latestVersion = versionRes.data[0];

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
};