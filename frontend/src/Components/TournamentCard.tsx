import React, { useContext } from 'react'
import { Tournament } from '../types'
import TournamentService from '../Services/tournament'
import { AuthContext } from '../context/authContext'

const getHelsinkiDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Helsinki',
      hour12: false
    });
  } catch {
    return dateString;
  }
};

const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const isInactive = !tournament.active;
  const { isAdmin } = useContext(AuthContext);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm(`Are you sure you want to delete ${tournament.theme}?`);
    if (confirmed) {
      try {
        await TournamentService.deleteTournament(tournament.id);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting tournament:', error);
        alert('Failed to delete tournament. Please try again.');
      }
    }
  };

  return (
    <div className="relative w-full my-4">
      {/* Delete button is outside of the opacity container */}
      {isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute right-0 text-red-500 hover:text-red-400 cursor-pointer font-bold text-6xl p-0 z-10 -mt-4 -mr-6"
          style={{
            top: '-1.25rem',
            lineHeight: '1',
            padding: 0,
            filter: 'none',
            opacity: 1,
            pointerEvents: 'auto',
            background: 'none',
            border: 'none',
          }}
          title="Delete tournament"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-24 h-24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
  
      {/* Tournament card content */}
      <div
        className={`flex flex-col bg-gray-800 shadow-sm border border-gray-700 rounded-lg w-full hover:shadow-xl ${
          isInactive
            ? 'opacity-50 grayscale cursor-default'
            : 'cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl'
        }`}
      >
        <div className="m-2 overflow-hidden rounded-md h-48 flex justify-center items-center bg-gray-900 relative">
          <img
            src={tournament.img_url || '/assets/trophy.png'}
            alt={tournament.theme}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 text-center relative">
          <h4 className="mb-1 text-xl font-semibold text-purple-400 truncate inline-block">
            {tournament.theme}
          </h4>
          {tournament.start_date && (
            <h2 className="text-gray-400 truncate">
              {getHelsinkiDate(new Date(tournament.start_date).toISOString())}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default TournamentCard