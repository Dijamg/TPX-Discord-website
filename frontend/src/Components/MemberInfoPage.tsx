import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Member, AllProps } from '../types'

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

const MemberInfoPage = ({ allProps }: { allProps: AllProps }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const member = allProps.members.find(m => m.id === parseInt(id || '0'));

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate('/')
  }

  useEffect(() => {
    if (!member) {
      const timer = setTimeout(() => setNotFound(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [member]);

  if (!member) {
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        {/* Simple navbar bar - same styling as main navbar but no content */}
        <nav className="top-0 w-full bg-gray-900 shadow-md z-50" style={{ position: 'fixed', height: '4.5rem' }}>
          <div className="h-18 flex items-center">
            <img
              src="/assets/navbar_banner.PNG"
              alt="TPX Banner"
              className="h-full w-auto m-0 p-0 cursor-pointer"
              onClick={handleBackClick}
            />
          </div>
        </nav>
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              {notFound ? 'User not found' : 'Loading member info...'}
            </h1>
          </div>
        </div>
      </div>
    );
  } else if(member.riot_puuid === null){
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        {/* Simple navbar bar - same styling as main navbar but no content */}
        <nav className="top-0 w-full bg-gray-900 shadow-md z-50" style={{ position: 'fixed', height: '4.5rem' }}>
          <div className="h-18 flex items-center">
            <img
              src="/assets/navbar_banner.PNG"
              alt="TPX Banner"
              className="h-full w-auto m-0 p-0 cursor-pointer"
              onClick={handleBackClick}
            />
          </div>
        </nav>
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              User {member.name} has not linked their League of Legends account
            </h1>
            <p className="text-gray-400">
              This site currently only supports League of Legends.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const romanToNumber = (roman: string | undefined) => {
    if (!roman) {
      return 0;
    }
    if (roman === "I") {
      return 1;
    } else if (roman === "II") {
      return 2;
    } else if (roman === "III") {
      return 3;
    } else if (roman === "IV") {
      return 4;
    }
  }

  const getChampionIconUrl = (championName: string) => {
    return `https://ddragon.leagueoflegends.com/cdn/15.13.1/img/champion/${championName}.png`;
  }

  const summonerName = member.riot_game_name + "#" + member.riot_tag_line;
  const basicLolInfo = allProps.basicLolInfo.find(b => b.riot_puuid === member.riot_puuid);
  const currentSeasonLolInfo = allProps.currentSeasonLolInfo.find(c => c.riot_puuid === member.riot_puuid);
  const masteryInfo = allProps.masteryInfo.filter(m => m.riot_puuid === member.riot_puuid);
  const recentRankedHistory = allProps.lolMatchHistory.filter(r => r.riot_puuid === member.riot_puuid);

  const summonerIconUrl = `https://ddragon.leagueoflegends.com/cdn/15.13.1/img/profileicon/${basicLolInfo?.summoner_icon_id}.png`;
  const opggUrl = `https://op.gg/lol/summoners/${getOpggRegionFromPlatform(member.riot_region)}/${member.riot_game_name + "-" + member.riot_tag_line}`;
  const peakRankIconUrl = `https://opgg-static.akamaized.net/images/medals_mini/${basicLolInfo?.peak_rank}.png`;
  const unrankedIconUrl = `https://opgg-static.akamaized.net/images/medals/default.png`;
  const currentRankIconUrl = `https://opgg-static.akamaized.net/images/medals/${currentSeasonLolInfo?.tier.toLowerCase() + "_" + romanToNumber(currentSeasonLolInfo?.rank)}.png`;

  const getCurrentSeasonRankInfo = () => {
    if(currentSeasonLolInfo){
      return(
        <div className="shadow p-6 flex flex-col items-centers ">
          <h2 className="text-lg font-bold text-gray-400 mb-2 border-b-2 border-purple-400 w-full text-center pb-2">Current Rank</h2>
          <div className="w-full flex flex-col items-center pt-4">
            <img src={currentRankIconUrl} alt={currentSeasonLolInfo?.tier + "_" + currentSeasonLolInfo?.rank} className="w-28 h-28 mb-2" />
            <div className="flex flex-row w-full justify-between mt-2">
              {/* Left: Rank and LP */}
              <div className="flex flex-col items-start">
                <span className="text-2xl font-bold text-gray-400">{currentSeasonLolInfo?.tier} {currentSeasonLolInfo?.rank}</span>
                <span className="text-base text-gray-500 mt-1">{currentSeasonLolInfo?.league_points} LP</span>
              </div>
              {/* Right: Wins/Losses and Winrate */}
              <div className="flex flex-col items-end">
                <span className="text-base text-gray-400">{currentSeasonLolInfo?.wins}W {currentSeasonLolInfo?.losses}L</span>
                <span className="text-base text-gray-400 mt-1">Win rate {currentSeasonLolInfo && (currentSeasonLolInfo.wins + currentSeasonLolInfo.losses > 0) ? Math.round((currentSeasonLolInfo.wins / (currentSeasonLolInfo.wins + currentSeasonLolInfo.losses)) * 100) : 0}%</span>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className="shadow p-6 flex flex-col items-centers">
              <h2 className="text-lg font-bold text-gray-400 mb-2 border-b-2  border-purple-400 w-full text-center pb-2">Current Rank</h2>
              <div className="w-full flex flex-col items-center pt-4">
                <img src={unrankedIconUrl} alt="Unranked" className="w-28 h-28 mb-2" />
                <span className="text-3xl  text-gray-400 mb-1">Unranked</span>
                <span className="text-xl  text-gray-400">This player has not played this season</span>
              </div>
            </div>
      )
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Simple navbar bar - same styling as main navbar but no content */}
      <nav className="top-0 w-full bg-gray-900 shadow-md z-50" style={{ position: 'fixed', height: '4.5rem' }}>
        <div className="h-18 flex items-center">
          <img
            src="/assets/navbar_banner.PNG"
            alt="TPX Banner"
            className="h-full w-auto m-0 p-0 cursor-pointer"
            onClick={handleBackClick}
          />
        </div>
      </nav>

      {/* Purely cosmetic nav tabs for now */}
      <div className="pt-24 bg-gray-900" onClick={() => {
        console.log(masteryInfo);
        console.log(basicLolInfo?.peak_rank);
      }}>
        <ul className="ml-4 mr-4 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-700 dark:border-gray-700 dark:text-gray-400">
          <li className="me-2">
            <a
              href="#"
              aria-current="page"
              className="w-24 inline-block px-3 py-1.5 text-purple-400 bg-gray-900 font-bold text-lg active border-b border-purple-400 text-center hover:bg-gray-800"
            >
              LoL
            </a>
          </li>
        </ul>
      </div>

      {/* Summoner info row, left-aligned */}
      <div className="w-2/3 mx-auto mt-8">
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left bg-gray-900 bg-opacity-60 rounded px-4 py-2 border-b-2 border-purple-400">
          <img
            src={summonerIconUrl}
            alt="Summoner Icon"
            className="w-16 h-16 rounded mr-4"
          />
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <span className="text-3xl font-bold text-white">
                {summonerName}
              </span>
              <span className="ml-2 text-xl text-gray-400 opacity-80">({member.riot_region.slice(0, -1).toUpperCase()})</span>
              <a
                href={opggUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 text-blue-500 hover:text-purple-400 text-lg font-semibold transition-colors"
              >
                OP.GG
              </a>
            </div>
            <span className="text-sm italic text-gray-400">Level {basicLolInfo?.summoner_level}</span>
          </div>
        </div>
      </div>

      {/* Rank row: only left column with two stacked boxes */}
      <div className="w-2/3 mx-auto mt-8 bg-gray-900 ">
        <div className="flex flex-col md:flex-row ">
          {/* Left column: stacked boxes */}
          <div className="w-full md:w-1/3 ">
            {/* Current Rank box (large) */}
            {getCurrentSeasonRankInfo()}
            {/* Peak Rank box (smaller) */}
            <div className="shadow p-4 flex flex-col items-center">
              <h2 className="text-base font-bold text-gray-400 mb-2 border-b-2 border-purple-400 w-full text-center pb-2">Peak Rank</h2>
              <div className="w-full flex flex-col items-center py-2">
                {basicLolInfo?.peak_rank && (
                  <img src={peakRankIconUrl} alt={basicLolInfo.peak_rank} className="w-12 h-12 my-2" />
                )}
                <span className="text-lg font-semibold text-gray-400 capitalize">{basicLolInfo?.peak_rank?.replace('_', ' ') || 'N/A'}</span>
              </div>
            </div>
          </div>
          {/* Right column: 2/3 - Champion Masteries */}
          <div className="w-full md:w-2/3">
            <div className="w-full flex flex-col items-center md:items-start justify-center md:mt-0 md:self-start px-6 pt-6 ">
              <h2 className="text-lg font-bold text-gray-400 mb-2 border-b-2 border-purple-400 w-full text-center pb-2">Top Champion Masteries</h2>
              <div className="flex flex-row flex-wrap justify-center md:justify-center gap-6 p-4 w-full">
                {masteryInfo.slice(0, 5).map((mastery, idx) => (
                  <div key={idx} className="flex flex-col items-center w-20">
                    <img
                      src={getChampionIconUrl(mastery.champion_name)}
                      alt={mastery.champion_name}
                      className="w-18 h-18 rounded mb-1 border-2 border-purple-400 bg-gray-800"
                    />
                    <span className="text-sm font-semibold text-gray-300">Lvl {mastery.champion_level}</span>
                    <span className="text-xs text-gray-400">{mastery.champion_points.toLocaleString()} pts</span>
                  </div>
                ))}
              </div>
              {/* Total Mastery Score */}
              {basicLolInfo?.total_mastery_points !== undefined && (
                <div className="w-full flex flex-col items-center mt-2 mb-7">
                  <span className="text-2xl font-bold text-gray-400">Total Mastery Score</span>
                  <span className="text-2xl font-extrabold text-gray-200">{basicLolInfo.total_mastery_points.toLocaleString()}</span>
                </div>
              )}
            </div>
            {/* Recent Ranked History (Solo/Duo) */}
            <div className="w-full flex flex-col items-center md:items-start justify-center md:mt-0 md:self-start px-6 ">
              <h2 className="text-base font-bold text-gray-400 mb-2 border-b-2 border-purple-400 w-full text-center pb-2">Recent Ranked History (Solo/Duo)</h2>
              <div className="flex flex-row flex-wrap justify-center gap-12 p-4 w-full">
                {recentRankedHistory
                  .slice()
                  .sort((a, b) => new Date(a.match_date).getTime() - new Date(b.match_date).getTime())
                  .map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center w-20"
                    >
                      <img
                        src={getChampionIconUrl(entry.champion_name)}
                        alt={entry.champion_name}
                        className={`w-18 h-18 rounded mb-1 border-2 ${entry.win ? 'border-green-500' : 'border-red-500'} bg-gray-800`}
                        style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                      />
                      <div className="flex flex-row justify-center items-center text-lg font-bold">
                        <span className="text-gray-300">{entry.kills}</span>
                        <span className="text-gray-500"> / </span>
                        <span className="text-red-800">{entry.deaths}</span>
                        <span className="text-gray-500"> / </span>
                        <span className="text-gray-300">{entry.assists}</span>
                      </div>
                      <div className="text-sm text-gray-400 mt-1 whitespace-nowrap flex flex-row items-center justify-center">
                        {entry.total_minions_killed} CS - {entry.kill_participation_percent}% Kills P.
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {(() => {
                          const now = new Date();
                          const matchDate = new Date(entry.match_date);
                          const diffMs = now.getTime() - matchDate.getTime();
                          const diffMins = Math.floor(diffMs / 60000);
                          const diffHours = Math.floor(diffMins / 60);
                          const diffDays = Math.floor(diffHours / 24);
                          if (diffDays >= 1) {
                            return `${diffDays}d ago`;
                          } else if (diffHours >= 1) {
                            return `${diffHours}h ${diffMins % 60}m ago`;
                          } else {
                            return `${diffMins}m ago`;
                          }
                        })()}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default MemberInfoPage