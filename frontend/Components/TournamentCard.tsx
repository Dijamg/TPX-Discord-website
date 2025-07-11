import React from 'react'


const TournamentCard = () => {
    return(
        <div className="w-64 h-64 bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center">
            <img 
                src="/assets/clash.png" 
                alt="Clash" 
                className="w-full h-full object-contain"
            />
        </div>
    )
}

export default TournamentCard