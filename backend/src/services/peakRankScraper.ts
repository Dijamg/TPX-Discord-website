import axios from "axios";
import * as cheerio from 'cheerio';
import { getHighestRank } from "../utils/scraperUtils";
import { getOpggRegionFromPlatform } from "../utils/regionUtils";

export const getPeakRank = async (summonerName: string, riot_region: string): Promise<string | null> => {

  const region = getOpggRegionFromPlatform(riot_region);

  const opggUrl = `https://op.gg/lol/summoners/${region}/${summonerName}`;
  try {
    const ranks: string[] = [];
    const res = await axios.get(opggUrl);
    const $ = cheerio.load(res.data as string);

    // Find the specific table with the Ranked Solo/Duo caption
    const soloDuoTable = $('table').filter((_, el) => {
        return $(el).find('caption').text().trim() === 'Ranked Solo/Duo';
      });

    // Extract the rank name from all matching row/spans
    soloDuoTable
      .find('tr span.text-xs.lowercase.first-letter\\:uppercase')
      .each((_, element) => {
        const rank = $(element).text().trim();
        if (rank) {
          ranks.push(rank);
        }
      });

    const highestRank = getHighestRank(ranks);

    return highestRank

  } catch (err) {
    console.error(`Error scraping peak rank:`, err);
    return null;
  }
}