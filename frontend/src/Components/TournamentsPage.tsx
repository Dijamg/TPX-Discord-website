import React from 'react'
import { Tournament, UpcomingClashTournament } from '../types'
import TournamentCard from './TournamentCard'
import ClashTournamentCard from './ClashTournamentCard'

const Tournaments = ({ tournaments, upcomingClashTournaments }: { tournaments: Tournament[], upcomingClashTournaments: UpcomingClashTournament[] }) => (
    <div className='tournaments-page bg-gray-900 text-white py-8 px-4' id='tournaments-page'>
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-2 text-center">Tournaments</h1>
            <div className="w-40 md:w-62 h-1 bg-purple-400 rounded mb-4"></div>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {upcomingClashTournaments.map((tournament) => (
                <ClashTournamentCard key={tournament.id} tournament={tournament} />
            ))}
            {tournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
        </div>
    </div>
)

export default Tournaments