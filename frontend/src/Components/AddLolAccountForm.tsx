import React, { useState } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';
import LolAccountInfoService from '../Services/lolAccount';
import { AllProps } from '../types';

const REGIONS = [
  'NA1', 'BR1', 'LA1', 'LA2', // Americas
  'EUW1', 'EUN1', 'TR1', 'RU', // Europe
  'KR', 'JP1' // Asia
];

const AddLolAccountForm = ({ allProps, fetchData }: { allProps: AllProps, fetchData: () => void }) => {
  const [riotName, setRiotName] = useState('');
  const [riotTagline, setRiotTagline] = useState('');
  const [region, setRegion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const member = allProps.members.find(m => m.id === parseInt(id || '0'));
  const memberUuid = member?.member_uuid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!riotName || !riotTagline || !region) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    if (!memberUuid) {
      setErrorMsg("Member not found");
      return;
    }

    try {
      setIsSubmitting(true);

      await LolAccountInfoService.add({
        member_id: memberUuid,
        riot_game_name: riotName,
        riot_tag_line: riotTagline,
        riot_region: region
      });

      // Update information of the site by fetching current data from db
      await fetchData();
      navigate(`/members/${id}`);
    } catch (err: any) {
      setErrorMsg("Error adding lol account: " + err.response?.data);
      console.error("Upload Error:", err.response?.data);
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
  };

  const handleBackClick = () => {
    navigate(`/members/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900">
      {/* Simple navbar bar - same styling as AddMemberPage navbar but no content */}
      <nav
        className="top-0 w-full bg-gray-900 shadow-md z-50"
        style={{ position: 'fixed', height: '4.5rem' }}
      >
        <div className="h-18 flex items-center">
          <img
            src="/public/assets/navbar_banner.PNG"
            alt="TPX Banner"
            className="h-full w-auto m-0 p-0 cursor-pointer"
            onClick={handleBackClick}
          />
        </div>
      </nav>
      <div className="pt-32 w-full flex justify-center">
        <h2 className="text-3xl font-bold text-white">Add League of Legends account</h2>
      </div>
      <form className="mt-8 w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Riot Name */}
        <div>
          <label className="block text-white mb-1" htmlFor="riotName">
            Riot Name <span className="text-red-500">*</span>
          </label>
          <input
            id="riotName"
            type="text"
            value={riotName}
            onChange={e => setRiotName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
        </div>
        {/* Riot Tagline */}
        <div>
          <label className="block text-white mb-1" htmlFor="riotTagline">
            Riot Tagline <span className="text-red-500">*</span>
          </label>
          <input
            id="riotTagline"
            type="text"
            value={riotTagline}
            onChange={e => setRiotTagline(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
        </div>
        {/* Region */}
        <div>
          <label className="block text-white mb-1" htmlFor="region">
            Region <span className="text-red-500">*</span>
          </label>
          <select
            id="region"
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            required
          >
            <option value="">Select region</option>
            {REGIONS.map((reg) => (
              <option key={reg} value={reg}>{reg}</option>
            ))}
          </select>
        </div>
        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 text-center text-red-400 font-semibold">{errorMsg}</div>
        )}
        <button
          type="submit"
          className={`mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-400 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddLolAccountForm;
