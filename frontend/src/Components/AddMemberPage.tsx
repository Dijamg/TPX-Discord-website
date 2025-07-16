import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberService from '../Services/member';

const MEMBER_ROLES = ['Member', 'Moderator', 'Owner', 'Founder', 'Co-Owner'];
const REGIONS = [
  'NA1', 'BR1', 'LA1', 'LA2', // Americas
  'EUW1', 'EUN1', 'TR1', 'RU', // Europe
  'KR', 'JP1' // Asia
];

const AddMemberPage = ({fetchData}: {fetchData: () => void}) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('');
  const [region, setRegion] = useState('');
  const [riotName, setRiotName] = useState('');
  const [riotTagline, setRiotTagline] = useState('');
  const [addRiot, setAddRiot] = useState(false);

  const [fileSelected, setFileSelected] = useState<File>()

  const cloudName = "dqwjh7xhr"
  const uploadPreset = "unsigned_preset"

  //Updates the selected image file.
  const _fileSelectedHandler = (e: FileList | null) => {
    if( e != null){
        setFileSelected(e[0])
    }
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(!fileSelected) return;

    const formData = new FormData();
    formData.append("file", fileSelected);
    formData.append("upload_preset", uploadPreset);

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


        if(!role) return;

        const member =  await MemberService.add({
            name: name,
            role: role,
            img_url: data.secure_url,
            riot_game_name: riotName,
            riot_tag_line: riotTagline,
            riot_region: region,
            description: description
          });

          // Update information of the site by fetching current data from db
          await fetchData();
          navigate('/');

      } catch (err: any) {
        alert("Error adding member: " + err.response.data);
        console.error("Upload Error:", err.response.data);
        return
      }
    };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900">
      {/* Simple navbar bar - same styling as LoginPage navbar but no content */}
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
        <h2 className="text-3xl font-bold text-white">Add a member</h2>
      </div>
      <form className="mt-8 w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-md flex flex-col gap-6 " onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-white mb-1" htmlFor="name">Name</label>
          <input id="name" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none" required />
        </div>
        {/* Role */}
        <div>
          <label className="block text-white mb-1" htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            required
          >
            <option value="">Select role</option>
            {MEMBER_ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        {/* Image */}
        <div>
          <label className="block text-white mb-1" htmlFor="image">Image</label>
          <input id="image" type="file" accept="image/*" className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none" required onChange={e => _fileSelectedHandler(e.target.files)} />
        </div>
        {/* Add Riot Account Toggle */}
        <div className="flex items-center gap-2">
          <input
            id="addRiot"
            type="checkbox"
            checked={addRiot}
            onChange={() => setAddRiot(v => !v)}
            className="form-checkbox h-5 w-5 text-purple-400"
          />
          <label htmlFor="addRiot" className="text-white select-none cursor-pointer">Add Riot account</label>
        </div>
        {/* Riot Fields (conditionally rendered) */}
        {addRiot && (
          <>
            <div>
              <label className="block text-white mb-1" htmlFor="riotName">Riot Name</label>
              <input
                id="riotName"
                type="text"
                value={riotName}
                onChange={e => setRiotName(e.target.value)}
                required={addRiot}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white mb-1" htmlFor="riotTagline">Riot Tagline</label>
              <input
                id="riotTagline"
                type="text"
                value={riotTagline}
                onChange={e => setRiotTagline(e.target.value)}
                required={addRiot}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white mb-1" htmlFor="region">Region</label>
              <select
                id="region"
                value={region}
                onChange={e => setRegion(e.target.value)}
                required={addRiot}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
              >
                <option value="">Select region</option>
                {REGIONS.map((reg) => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>
          </>
        )}
        {/* Description */}
        <div>
          <label className="block text-white mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-400 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMemberPage;
