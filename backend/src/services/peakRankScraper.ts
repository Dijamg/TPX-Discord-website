import axios from "axios";
import * as cheerio from 'cheerio';
import { getHighestRank } from "../utils/scraperUtils";

export const getPeakRank = async (summonerName: string): Promise<string | null> => {
  try {
    const ranks: string[] = [];
    const res = await axios.get(`https://op.gg/lol/summoners/euw/${summonerName}`);
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
    console.log("SCRAPED HIGHEST RANK: ");
    console.log(highestRank);


    return highestRank

  } catch (err) {

    console.error(`Error scraping peak rank:`, err);
    return null;
  }
}