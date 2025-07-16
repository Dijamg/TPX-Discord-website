import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TournamentService from '../Services/tournament';
import { DateTime } from 'luxon';

const TIMEZONES = [
  { label: 'Helsinki (Europe/Helsinki)', value: 'Europe/Helsinki' },
  { label: 'UTC', value: 'UTC' },
  { label: 'New York (America/New_York)', value: 'America/New_York' },
  { label: 'Tokyo (Asia/Tokyo)', value: 'Asia/Tokyo' },
];

const AddTournamentPage = ({fetchData}: {fetchData: () => void}) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [timezone, setTimezone] = useState('Europe/Helsinki');
  const [fileSelected, setFileSelected] = useState<File>();

  const cloudName = "dqwjh7xhr"
  const uploadPreset = "unsigned_preset"

  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Updates the selected image file
  const _fileSelectedHandler = (e: FileList | null) => {
    if (e != null) {
      setFileSelected(e[0]);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!fileSelected) return;

    const formData = new FormData();
    formData.append("file", fileSelected);
    formData.append("upload_preset", uploadPreset);

    try {
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();

        if(!data.secure_url) {
            alert("Error uploading image");
            return;
        }

        // Use luxon to convert local date+time+timezone to UTC ISO string
        const localDateTime = DateTime.fromISO(`${startDate}T${startTime}`, { zone: timezone });
        const startDateInUTC = localDateTime.toUTC().toISO();

        const tournament = await TournamentService.addTournament({
          theme: name,
          active: true,
          start_date: new Date(startDateInUTC!),
          img_url: data.secure_url,
        });

        // Update information of the site by fetching current data from db
        await fetchData();
        navigate('/');

      } catch (err: any) {
        alert("Error adding tournament: " + err.response?.data);
        console.error("Upload Error:", err.response?.data);
        return
      }
    } catch (error) {
      console.error(error);
    }
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
            src="/assets/navbar_banner.PNG"
            alt="TPX Banner"
            className="h-full w-auto m-0 p-0 cursor-pointer"
            onClick={handleBackClick}
          />
        </div>
      </nav>
      <div className="pt-32 w-full flex justify-center">
        <h2 className="text-3xl font-bold text-white">Add a tournament</h2>
      </div>
      <form className="mt-8 w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-md flex flex-col gap-6 ">
        {/* Name */}
        <div>
          <label className="block text-white mb-1" htmlFor="name">Name</label>
          <input id="name" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none" required />
        </div>
        {/* Image */}
        <div>
          <label className="block text-white mb-1" htmlFor="image">Image</label>
          <input id="image" type="file" accept="image/*" className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none" required onChange={e => _fileSelectedHandler(e.target.files)} />
        </div>
        {/* Start Date, Time, and Timezone */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-white mb-1" htmlFor="startDate">Start Date</label>
            <input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none" required min={today} />
          </div>
          <div className="flex-1">
            <label className="block text-white mb-1" htmlFor="startTime">Start Time</label>
            <input id="startTime" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none" required />
          </div>
          <div className="flex-1">
            <label className="block text-white mb-1" htmlFor="timezone">Timezone</label>
            <select
              id="timezone"
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            >
              {TIMEZONES.map(tz => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-400 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTournamentPage;
