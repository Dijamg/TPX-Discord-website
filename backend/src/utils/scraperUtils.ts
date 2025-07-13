const RANK_ORDER = [
    'iron 4', 'iron 3', 'iron 2', 'iron 1',
    'bronze 4', 'bronze 3', 'bronze 2', 'bronze 1',
    'silver 4', 'silver 3', 'silver 2', 'silver 1',
    'gold 4', 'gold 3', 'gold 2', 'gold 1',
    'platinum 4', 'platinum 3', 'platinum 2', 'platinum 1',
    'emerald 4', 'emerald 3', 'emerald 2', 'emerald 1',
    'diamond 4', 'diamond 3', 'diamond 2', 'diamond 1',
    'master', 'grandmaster', 'challenger'
  ];

  export const getHighestRank = (ranks: string[]): string | null => {
    if (!ranks || ranks.length === 0) return null;

    const cleanedRanks = ranks.map(rank => rank.toLowerCase().trim());

    // Find rank with highest index
    let highestRank = cleanedRanks[0];
    for (const rank of cleanedRanks) {
        if (
        RANK_ORDER.indexOf(rank) > RANK_ORDER.indexOf(highestRank)
        ) {
        highestRank = rank;
        }
    }

    return highestRank.split(' ')[0];
  }