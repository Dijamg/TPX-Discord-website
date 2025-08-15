import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberService from '../Services/member';
import axios from 'axios';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    setErrorMsg(null);

    if (!fileSelected || !role || !name) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileSelected);
    formData.append("upload_preset", uploadPreset);

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      const data = res.data;

      if (!data.secure_url) {
        setErrorMsg("Error uploading image");
        setIsSubmitting(false);
        return;
      }

      await MemberService.add({
        name: name,
        role: role,
        img_url: data.secure_url,
        description: description
      });

      // Update information of the site by fetching current data from db
      await fetchData();
      navigate('/');
    } catch (err: any) {
      setErrorMsg("Error adding member: " + err.response?.data);
      console.error("Upload Error:", err.response?.data);
      //remove image from cloudinary to be implemented later
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0A192F]">
      {/* Simple navbar bar - same styling as LoginPage navbar but no content */}
      <nav
        className="top-0 w-full bg-[#0A192F] shadow-md z-50"
        style={{ position: 'fixed', height: '4.5rem' }}
      >
        <div className="h-18 flex items-center px-4">
          <button
            onClick={handleBackClick}
            className="flex items-center justify-center w-12 h-12 text-purple-500 hover:text-purple-400 hover:scale-110 transition-all duration-200 cursor-pointer"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          </button>
        </div>
      </nav>
      <div className="pt-32 w-full flex justify-center">
        <h2 className="text-3xl font-bold text-white">Add a member</h2>
      </div>
      <form className="mt-8 w-full max-w-lg bg-[#122F50] p-8 rounded-lg shadow-md flex flex-col gap-6 " onSubmit={handleSubmit}>
        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 text-center text-red-400 font-semibold">{errorMsg}</div>
        )}
        {/* Name */}
        <div>
          <label className="block text-white mb-1" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input id="name" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded bg-[#1E3A56] text-white focus:outline-none" required />
        </div>
        {/* Role */}
        <div>
          <label className="block text-white mb-1" htmlFor="role">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#1E3A56] text-white focus:outline-none"
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
          <label className="block text-white mb-1" htmlFor="image">
            Image <span className="text-red-500">*</span>
          </label>
          <input id="image" type="file" accept="image/*" className="w-full px-3 py-2 rounded bg-[#1E3A56] text-white focus:outline-none" required onChange={e => _fileSelectedHandler(e.target.files)} />
        </div>
        {/* Description */}
        <div>
          <label className="block text-white mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded bg-[#1E3A56] text-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className={`mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddMemberPage;
