import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Member, AllProps } from '../types'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import LolAccountInfoService from '../Services/lolAccount'
import MemberInfoPageContent from './MemberInfoPageContent';


const MemberInfoPage = ({ allProps }: { allProps: AllProps }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const member = allProps.members.find(m => m.id === parseInt(id || '0'));
  const lolAccounts = allProps.lolAccount.filter(l => l.member_id === member?.member_uuid);
  const { isAdmin } = useContext(AuthContext);

  const [notFound, setNotFound] = useState(false);
  const [activeAccountIdx, setActiveAccountIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate('/');
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    
    const confirmed = window.confirm(`Are you sure you want to delete ${lolAccounts[activeAccountIdx].riot_game_name}?`);
    
    if (confirmed) {
      try {
        await LolAccountInfoService.deleteAccount(lolAccounts[activeAccountIdx].id);
        // Refresh the page to update the account list
        window.location.reload();
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (!member) {
      const timer = setTimeout(() => setNotFound(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [member]);

  if (!member) {
    return (
      <div className="bg-gray-900 text-white min-h-screen">
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
  }

  const summonerName = lolAccounts[activeAccountIdx]?.riot_game_name + "#" + lolAccounts[activeAccountIdx]?.riot_tag_line;
  const basicLolInfo = allProps.basicLolInfo.find(b => b.riot_puuid === lolAccounts[activeAccountIdx]?.riot_puuid);
  const currentSeasonLolInfo = allProps.currentSeasonLolInfo.find(c => c.riot_puuid === lolAccounts[activeAccountIdx]?.riot_puuid);
  const masteryInfo = allProps.masteryInfo.filter(m => m.riot_puuid === lolAccounts[activeAccountIdx]?.riot_puuid);
  const recentRankedHistory = allProps.lolMatchHistory.filter(r => r.riot_puuid === lolAccounts[activeAccountIdx]?.riot_puuid);

  const getOpggRegionFromPlatform = (platform: string): string | null => {
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
    return opggMap[platform?.toUpperCase() as keyof typeof opggMap] || null;
  };

  // Helper: romanToNumber
  const romanToNumber = (roman: string | undefined) => {
    if (!roman) return 0;
    if (roman === "I") return 1;
    if (roman === "II") return 2;
    if (roman === "III") return 3;
    if (roman === "IV") return 4;
    return 0;
  };

  const getChampionIconUrl = (championName: string) => {
    return `https://ddragon.leagueoflegends.com/cdn/15.13.1/img/champion/${championName}.png`;
  };


  const summonerIconUrl = `https://ddragon.leagueoflegends.com/cdn/15.13.1/img/profileicon/${basicLolInfo?.summoner_icon_id}.png`;
  const opggUrl = `https://op.gg/lol/summoners/${getOpggRegionFromPlatform(lolAccounts[activeAccountIdx]?.riot_region || '')}/${lolAccounts[activeAccountIdx]?.riot_game_name + "-" + lolAccounts[activeAccountIdx]?.riot_tag_line}`;
  const peakRankIconUrl = `https://opgg-static.akamaized.net/images/medals_mini/${basicLolInfo?.peak_rank}.png`;
  const unrankedIconUrl = `https://opgg-static.akamaized.net/images/medals/default.png`;
  const currentRankIconUrl = `https://opgg-static.akamaized.net/images/medals_new/${currentSeasonLolInfo?.tier?.toLowerCase()}.png`;

  const getCurrentSeasonRankInfo = () => {
    if (currentSeasonLolInfo) {
      return (
        <div className="shadow p-6 flex flex-col items-centers ">
          <h2 className="text-lg font-bold text-gray-400 mb-2 border-b-2 border-purple-400 w-full text-center pb-2">Current Rank</h2>
          <div className="w-full flex flex-col items-center pt-4">
            <img src={currentRankIconUrl} alt={currentSeasonLolInfo?.tier} className="w-28 h-28 mb-2" />
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
      );
    } else {
      return (
        <div className="shadow p-6 flex flex-col items-centers">
          <h2 className="text-lg font-bold text-gray-400 mb-2 border-b-2  border-purple-400 w-full text-center pb-2">Current Rank</h2>
          <div className="w-full flex flex-col items-center pt-4">
            <img src={unrankedIconUrl} alt="Unranked" className="w-28 h-28 mb-2" />
            <span className="text-3xl  text-gray-400 mb-1">Unranked</span>
            <span className="text-xl  text-gray-400">This player has not played this season</span>
          </div>
        </div>
      );
    }
  };


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
      <div className="pt-24 bg-gray-900">
        <ul className="ml-4 mr-4 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-700 dark:border-gray-700 dark:text-gray-400">
          {/* Mobile: Single centered tab with arrows */}
          <div className="w-full flex justify-center items-center md:hidden py-2">
            {lolAccounts.length > 1 && (
              <button
                onClick={() => setActiveAccountIdx((prev) => (prev > 0 ? prev - 1 : lolAccounts.length - 1))}
                className="px-2 text-2xl text-purple-400 focus:outline-none"
                aria-label="Previous Account"
                disabled={lolAccounts.length === 0}
              >
                <span style={{fontSize: '2rem', fontWeight: 'bold', display: 'inline-block', verticalAlign: 'middle'}}>&#x25C0;</span>
              </button>
            )}
            <span className="mx-4 font-bold text-lg text-purple-400">
              {lolAccounts.length > 0 ? `Account ${activeAccountIdx + 1}/${lolAccounts.length}` : 'No Accounts'}
            </span>
            {lolAccounts.length > 1 && (
              <button
                onClick={() => setActiveAccountIdx((prev) => (prev < lolAccounts.length - 1 ? prev + 1 : 0))}
                className="px-2 text-2xl text-purple-400 focus:outline-none"
                aria-label="Next Account"
                disabled={lolAccounts.length === 0}
              >
                <span style={{fontSize: '2rem', fontWeight: 'bold', display: 'inline-block', verticalAlign: 'middle'}}>&#x25B6;</span>
              </button>
            )}
            {isAdmin && lolAccounts.length > 0 && (
              <span
                className="text-red-500 cursor-pointer text-base align-middle ml-2"
                title="Delete this account"
                onClick={handleDelete}
              >
                ×
              </span>
            )}
            {isAdmin && (
              <button
                onClick={() => navigate(`/members/${member.id}/add-lol-account`)}
                className="ml-4 w-12 inline-block px-3 py-1.5 font-bold text-2xl text-center border-b text-purple-400 bg-gray-900 hover:bg-gray-800 border-transparent cursor-pointer"
                style={{ lineHeight: '1.2' }}
              >
                +
              </button>
            )}
          </div>
          {/* Desktop tab bar */}
          <div className="hidden md:flex w-full">
            {lolAccounts.map((account, idx) => (
              <li className="me-2" key={idx} style={{ position: 'relative' }}>
                <button
                  onClick={() => setActiveAccountIdx(idx)}
                  aria-current={activeAccountIdx === idx}
                  className={`w-36 inline-block px-3 py-1.5 font-bold text-lg text-center border-b ${activeAccountIdx === idx ? 'text-purple-400 bg-gray-900 active border-purple-400' : 'text-gray-400 bg-gray-900 hover:bg-gray-800 border-transparent'}`}
                  style={{ position: 'relative', paddingRight: isAdmin && activeAccountIdx === idx ? '1.5rem' : undefined }}
                >
                  {`Account ${idx + 1}`}
                  {isAdmin && activeAccountIdx === idx && (
                    <span
                      className="text-red-500 cursor-pointer text-base align-middle"
                      title="Delete this account"
                      style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)' }}
                      onClick={handleDelete}
                    >
                      ×
                    </span>
                  )}
                </button>
              </li>
            ))}
            {/* Add LoL Account Tab */}
            {isAdmin && (
              <li className="me-2">
                <button
                  onClick={() => navigate(`/members/${member.id}/add-lol-account`)}
                  className="w-12 inline-block px-3 py-1.5 font-bold text-2xl text-center border-b text-purple-400 bg-gray-900 hover:bg-gray-800 border-transparent cursor-pointer"
                  style={{ lineHeight: '1.2' }}
                >
                  +
                </button>
              </li>
            )}
          </div>
        </ul>

        {/* Page content */}
        {/* If there are no accounts, show only the tab bar and a message */}
        {lolAccounts.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-4">
                User {member.name} has currently no linked League of Legends accounts
              </h1>
              <p className="text-gray-400">
                This site currently only supports League of Legends.
              </p>
            </div>
          </div>
        ) : null}

        {/* If there are accounts, render MemberInfoPageContent */}
        {lolAccounts.length > 0 && (
          <MemberInfoPageContent
            lolAccounts={lolAccounts}
            activeAccountIdx={activeAccountIdx}
            basicLolInfo={basicLolInfo}
            masteryInfo={masteryInfo}
            recentRankedHistory={recentRankedHistory}
            getOpggRegionFromPlatform={getOpggRegionFromPlatform}
            summonerIconUrl={summonerIconUrl}
            opggUrl={opggUrl}
            peakRankIconUrl={peakRankIconUrl}
            getCurrentSeasonRankInfo={getCurrentSeasonRankInfo}
            getChampionIconUrl={getChampionIconUrl}
          />
        )}
        
      </div>
    </div>
  );
}

export default MemberInfoPage