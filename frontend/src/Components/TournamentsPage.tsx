import React, { useContext } from 'react'
import { Tournament, UpcomingClashTournament } from '../types'
import TournamentCard from './TournamentCard'
import ClashTournamentCard from './ClashTournamentCard'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Tournaments = ({ tournaments, upcomingClashTournaments }: { tournaments: Tournament[], upcomingClashTournaments: UpcomingClashTournament[] }) => {
    const { isAdmin } = useContext(AuthContext)
    const navigate = useNavigate()

    const sortedActiveTournaments = [...upcomingClashTournaments, ...tournaments.filter((tournament) => tournament.active)].sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    const sortedInactiveTournaments = tournaments.filter((tournament) => !tournament.active).sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())

    const handleAddTournament = () => {
        navigate('/add-tournament')
    }

    const OutputTournaments = () => {
        let keyIndex = 0
        return(
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {sortedActiveTournaments.map((tournament) => {
                    if('theme_id' in tournament) {
                        return <ClashTournamentCard key={keyIndex++} tournament={tournament as UpcomingClashTournament} />
                    } else {
                        return <TournamentCard key={keyIndex++} tournament={tournament as Tournament} />
                    }
                })}
                {sortedInactiveTournaments.map((tournament) => (
                    <TournamentCard key={keyIndex++} tournament={tournament} />
                ))}
            </div>
        )
    }

    return (
        <div className='tournaments-page bg-gray-900 text-white py-8 px-4' id='tournaments-page'>
            <div className="flex flex-col items-center">
                <div className="relative w-full max-w-6xl">
                    <h1 className="text-3xl font-bold mb-2 text-center">Tournaments</h1>
                    {isAdmin && (
                        <button
                            onClick={handleAddTournament}
                            className="absolute right-0 top-0 text-purple-400 hover:text-purple-300 hover:cursor-pointer font-bold text-6xl transition-colors duration-200 m-0 p-0"
                            title="Add new tournament"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    )}
                </div>
                <div className="w-40 md:w-62 h-1 bg-purple-400 rounded mb-4"></div>
            </div>
            
          
                <OutputTournaments />

        </div>
    )
}

export default Tournaments