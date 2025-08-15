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
    <div
      className={`
        /* gradient fill + gradient border */
        [background:linear-gradient(theme(colors.slate.900),theme(colors.slate.900))_padding-box,
        linear-gradient(45deg,theme(colors.slate.800),theme(colors.slate.600/.8),theme(colors.slate.800))_border-box]
        relative overflow-hidden rounded-2xl border-2 border-slate-600/50

        /* noise overlay */
        before:content-[''] before:absolute before:inset-0 before:pointer-events-none
        before:bg-[url('/assets/noise.png')] before:bg-[length:352px_382px] before:opacity-40 before:rounded-[inherit]

        /* card behavior */
        flex flex-col my-4 w-full transition-all duration-200
        ${isInactive
          ? 'opacity-50 grayscale cursor-default'
          : 'hover:shadow-xl hover:border-purple-500/70'
        }
      `}
    >
      {/* Delete button in top right corner for admins */}
      {isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 text-red-500 hover:text-red-400 cursor-pointer font-bold z-10"
          title="Delete tournament"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Tournament name and date above the image, aligned left */}
      <div className="p-4 text-left relative">
        <h4 className="mb-1 text-xl font-semibold text-purple-500 truncate">
          {tournament.theme}
        </h4>
        {tournament.start_date && (
          <h2 className="text-sm font-semibold text-gray-400 uppercase">
            {getHelsinkiDate(new Date(tournament.start_date).toISOString())}
          </h2>
        )}
      </div>

      {/* Tournament image with gradient overlay */}
      <div className="m-3 overflow-hidden rounded-md h-48 flex justify-center items-center">
        <div className="relative w-full h-full">
          <img
            src={tournament.img_url || '/assets/trophy.png'}
            alt={tournament.theme}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default TournamentCard