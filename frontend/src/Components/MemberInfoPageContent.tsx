import React, { useState } from 'react';
import { LolMatchHistory } from '../types'

const MemberInfoPageContent = ({
  lolAccounts,
  activeAccountIdx,
  basicLolInfo,
  masteryInfo,
  recentSoloqHistory,
  recentNormalHistory,
  recentFlexHistory,
  recentAramHistory,
  getOpggRegionFromPlatform,
  summonerIconUrl,
  opggUrl,
  peakRankIconUrl,
  getCurrentSeasonRankInfo,
}: any) => {
  const [historyType, setHistoryType] = useState<'soloq' | 'normal' | 'flex' | 'aram'>('soloq');
  const summonerName = lolAccounts[activeAccountIdx]?.riot_game_name + "#" + lolAccounts[activeAccountIdx]?.riot_tag_line;

  const getHistoryTitle = (history: string) => {
    if(history == 'soloq'){
      return "Recent Ranked History (Solo/Duo)"
    } else if(history == 'flex'){
      return "Recent Ranked History (Flex)"
    } else if(history == 'aram'){
      return "Recent ARAM History"
    } else {
      return "Recent Normal History (Draft Pick)"
    }
  }

  const getMatchHistory = (history: string) => {
    let historyArray = []
    if(history == 'soloq'){
      historyArray = recentSoloqHistory
    } else if(history == 'flex'){
      historyArray = recentFlexHistory
    } else if(history == 'aram'){
      historyArray = recentAramHistory
    } else {
      historyArray = recentNormalHistory
    }

    if(historyArray.length === 0){
      return <div className='text-lg font-bold text-gray-400 w-full text-center pb-2 sm:mb-0'>No data</div>
    } else {
      return (
        <>
          {historyArray
            .slice()
            .sort((a: any, b: any) => new Date(a.match_date).getTime() - new Date(b.match_date).getTime())
            .map((entry: any, idx: number) => (
              <div
                key={idx}
                className="flex flex-col items-center w-20"
              >
                <img
                  src={entry.champion_icon_url}
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
        </>
      )
    }
  }


  return (
    <>
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
              <span className="ml-2 text-xl text-gray-400 opacity-80">({getOpggRegionFromPlatform(lolAccounts[activeAccountIdx]?.riot_region || '')?.toUpperCase()})</span>
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
              <h2 className="text-base font-bold text-gray-400 mb-2 border-b-2 border-purple-400 w-full text-center pb-2">End of Season peak rank</h2>
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
                {masteryInfo.slice(0, 5).map((mastery: any, idx: number) => (
                  <div key={idx} className="flex flex-col items-center w-20">
                    <img
                      src={mastery.champion_icon_url}
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
            {/* Recent match history*/}
            <div className="w-full flex flex-col items-center md:items-start justify-center md:mt-0 md:self-start px-6 ">
              <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-center mb-2 relative">
                {/* Dropdown above title on mobile, right of title on sm+ */}
                <div className="flex justify-center sm:absolute sm:right-0 sm:top-0 mb-2 sm:mb-0 z-10">
                  <div className="relative">
                    <select
                      className="bg-gray-900 text-gray-400 rounded px-2 py-1 pr-7 focus:outline-none appearance-none text-center"
                      style={{ border: 'none', WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                      value={historyType}
                      onChange={e => setHistoryType(e.target.value as 'soloq' | 'flex' | 'normal' | 'aram')}
                    >
                      <option value="soloq" style={{ textAlign: 'center' }}>Ranked Solo/Duo</option>
                      <option value="flex" style={{ textAlign: 'center' }}>Ranked Flex</option>
                      <option value="normal" style={{ textAlign: 'center' }}>Normal (Draft Pick)</option>
                      <option value="aram" style={{ textAlign: 'center' }}>ARAM</option>
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </div>
                </div>
                <h2 className="text-base font-bold text-gray-400 border-b-2 border-purple-400 w-full text-center pb-2 sm:mb-0">{getHistoryTitle(historyType)}</h2>
              </div>
              <div className="flex flex-row flex-wrap justify-center gap-12 p-4 w-full">
                {getMatchHistory(historyType)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberInfoPageContent;