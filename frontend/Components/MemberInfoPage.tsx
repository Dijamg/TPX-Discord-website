import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Member, AllProps } from '../types'

const MemberInfoPage = ({ allProps }: { allProps: AllProps }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const member = allProps.members.find(m => m.id === parseInt(id || '0'));

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!member) {
      const timer = setTimeout(() => setNotFound(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [member]);

  if (!member) {
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        {notFound ? 'User not found' : 'Loading member info...'}
      </div>
    );
  }

  const summonerName = member.riot_game_name + "#" + member.riot_tag_line;
  const basicLolInfo = allProps.basicLolInfo.find(b => b.riot_puuid === member.riot_puuid);
  const summonerIconUrl = `https://ddragon.leagueoflegends.com/cdn/15.13.1/img/profileicon/${basicLolInfo?.summoner_icon_id}.png`;
  const opggUrl = `https://op.gg/lol/summoners/euw/${member.riot_game_name + "-" + member.riot_tag_line}`;
  const rankIconUrl = `https://opgg-static.akamaized.net/images/medals_mini/${basicLolInfo?.peak_rank}.png`;
  const unrankedIconUrl = "https://opgg-static.akamaized.net/images/medals/default.png";

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Simple navbar bar - same styling as main navbar but no content */}
      <nav className="top-0 w-full bg-gray-900 shadow-md z-50" style={{ position: 'fixed', height: '4.5rem' }}>
        <div className="h-18 flex items-center px-4">
          <button
            onClick={handleBackClick}
            className="w-24 inline-flex items-center border border-purple-400 px-3 py-1.5 rounded-md text-purple-400 hover:bg-gray-800 hover:border-purple-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18">
              </path>
            </svg>
            <span className="ml-1 font-bold text-lg">Back</span>
          </button>
        </div>
      </nav>

      {/* Purely cosmetic nav tabs for now */}
      <div className="pt-24 bg-gray-900">
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
        <div className="flex items-center bg-gray-900 bg-opacity-60 rounded px-4 py-2 border-b-2 border-purple-400">
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
              <span className="ml-2 text-xl text-gray-400 opacity-80">(EUW)</span>
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
            <div className="shadow p-6 flex flex-col items-centers mb-4">
              <h2 className="text-lg font-bold text-gray-400 mb-2 border-b-2  border-purple-400 w-full text-center pb-2">Current Rank</h2>
              <div className="w-full flex flex-col items-center py-6">
                <img src={unrankedIconUrl} alt="Unranked" className="w-28 h-28 mb-2" />
                <span className="text-3xl font-light text-gray-400 mb-2">Unranked</span>
              </div>
            </div>
            {/* Peak Rank box (smaller) */}
            <div className="shadow p-4 flex flex-col items-center border--2 border-purple-400">
              <h2 className="text-base font-bold text-gray-400 mb-2 border-b-2 border-purple-400 w-full text-center pb-2">Peak Rank</h2>
              <div className="w-full flex flex-col items-center py-2">
                <img src={rankIconUrl} alt={basicLolInfo?.peak_rank} className="w-12 h-12 mb-2" />
                <span className="text-lg font-semibold text-gray-400 capitalize">{basicLolInfo?.peak_rank?.replace('_', ' ') || 'N/A'}</span>
              </div>
            </div>
          </div>
          {/* Right column: 2/3 (empty for now) */}
          <div className="w-full md:w-2/3"></div>
        </div>
      </div>
    </div>
  )
}

export default MemberInfoPage