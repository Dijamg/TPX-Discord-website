import React from 'react'
import { UpcomingClashTournament } from '../types'

const ClashTournamentCard = ({ tournament }: { tournament: UpcomingClashTournament }) => {
    const StringToTitleCase = (str: string) => {
        return str.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }

    // Format date to Helsinki time, human-friendly
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

  return (
    <div
      className="
        /* gradient fill + gradient border */
        [background:linear-gradient(theme(colors.slate.900),theme(colors.slate.900))_padding-box,
        linear-gradient(45deg,theme(colors.slate.800),theme(colors.slate.600/.8),theme(colors.slate.800))_border-box]
        relative overflow-hidden rounded-2xl border-2 border-slate-600/50

        /* noise overlay */
        before:content-[''] before:absolute before:inset-0 before:pointer-events-none
        before:bg-[url('/assets/noise.png')] before:bg-[length:352px_382px] before:opacity-40 before:rounded-[inherit]

        /* card behavior */
        flex flex-col my-4 w-full transition-all duration-200
        hover:shadow-xl hover:border-purple-500/70
      "
    >
      {/* Clash tournament name and date above the image, aligned left */}
      <div className="p-4 text-left relative">
        <h4 className="mb-1 text-xl font-semibold text-purple-500 truncate">
          {StringToTitleCase(tournament.name_key)} ({StringToTitleCase(tournament.name_key_secondary)})
        </h4>
        <h2 className="text-sm font-semibold text-gray-400 uppercase">
          {getHelsinkiDate(new Date(tournament.start_date).toISOString())}
        </h2>
      </div>

      {/* Clash tournament image with gradient overlay */}
      <div className="m-3 overflow-hidden rounded-md h-48 flex justify-center items-center">
        <div className="relative w-full h-full">
          <img
            src={'/assets/clash.png'}
            alt={tournament.name_key}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/30 to-transparent" />
        </div>
      </div>
    </div>
  ) 
}

export default ClashTournamentCard