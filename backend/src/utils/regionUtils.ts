export const getMatchRegionFromPlatform = (region: string): string | null => {
    const regionMap = {
      // Americas
      NA1: "americas",
      BR1: "americas",
      LA1: "americas", // LAN
      LA2: "americas", // LAS
  
      // Europe
      EUW1: "europe",
      EUN1: "europe",
      TR1: "europe",
      RU: "europe",
  
      // Asia
      KR: "asia",
      JP1: "asia",
    };
  
    return regionMap[region.toUpperCase() as keyof typeof regionMap] || null;
  }