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

  export const getOpggRegionFromPlatform = (platform: string): string | null => {
    const opggMap = {
      NA1: "na",
      BR1: "br",
      LA1: "lan",
      LA2: "las",
  
      EUN1: "eune",
      EUW1: "euw",
      TR1: "tr",
      RU: "ru",
  
      KR: "kr", 
      JP1: "jp",
  
      OC1: "oce",
    };
  
    return opggMap[platform.toUpperCase() as keyof typeof opggMap] || null;
  };