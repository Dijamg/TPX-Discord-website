import React from 'react'
import { UpcomingClashTournament } from '../types'

const ClashTournamentCard = ({ tournament }: { tournament: UpcomingClashTournament }) => {
    const StringToTitleCase = (str: string) => {
        return str.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }
  return (
    <div
      className={`flex flex-col bg-gray-800 shadow-sm border border-gray-700 rounded-lg my-4 w-full cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl`}
    >
      <div className="m-2 overflow-hidden rounded-md h-48 flex justify-center items-center bg-gray-900">
        <img
          src={'/assets/clash.png'}
          alt={tournament.name_key}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h4 className="mb-1 text-xl font-semibold text-purple-400 truncate">{StringToTitleCase(tournament.name_key)}</h4>
        <h3 className="text-xl text-gray-400 truncate">{StringToTitleCase(tournament.name_key_secondary)}</h3>
      </div>
    </div>
  )
}

export default ClashTournamentCard