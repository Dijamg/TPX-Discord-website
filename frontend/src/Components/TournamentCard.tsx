import React from 'react'
import { Tournament } from '../types'

const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const isInactive = !tournament.active;
  return (
    <div
      className={`flex flex-col bg-gray-800 shadow-sm border border-gray-700 rounded-lg my-4 w-full  hover:shadow-xl ${
        isInactive
          ? 'opacity-50 grayscale cursor-default'
          : 'cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl'
      }`}
    >
      <div className="m-2 overflow-hidden rounded-md h-48 flex justify-center items-center bg-gray-900">
        <img
          src={tournament.img_url || '/assets/trophy.png'}
          alt={tournament.theme}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h4 className="mb-1 text-xl font-semibold text-purple-400 truncate">{tournament.theme}</h4>
      </div>
    </div>
  )
}

export default TournamentCard