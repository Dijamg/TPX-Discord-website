import React from 'react'
import { Tournament } from '../types'
import TournamentCard from './TournamentCard'

const Tournaments = () => (
    <div className='tournaments-page bg-gray-900 text-white py-8 px-4' id='tournaments-page'>
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-2 text-center">Tournaments</h1>
            <div className="w-40 md:w-62 h-1 bg-purple-400 rounded mb-4"></div>
        </div>
        
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 mt-8">
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />
        </div>
    </div>
)

export default Tournaments