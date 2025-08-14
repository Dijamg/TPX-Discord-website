import React, { useContext } from 'react'
import { Member } from '../types'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import MemberService from '../Services/member'

const MembersCard = ({ member }: { member: Member }) => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  const handleClick = () => {
    navigate(`/members/${member.id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    
    const confirmed = window.confirm(`Are you sure you want to delete ${member.name}?`);
    
    if (confirmed) {
      try {
        await MemberService.deleteMember(member.id);
        // Refresh the page to update the member list
        window.location.reload();
      } catch (error) {
        console.error('Error deleting member:', error);
        alert('Failed to delete member. Please try again.');
      }
    }
  };

  return (
    <div
  onClick={handleClick}
  className="
    /* gradient fill + gradient border */
    [background:linear-gradient(theme(colors.slate.900),theme(colors.slate.900))_padding-box,
    linear-gradient(45deg,theme(colors.slate.800),theme(colors.slate.600/.8),theme(colors.slate.800))_border-box]
    relative overflow-hidden rounded-2xl border-2 border-slate-600/50

    /* noise overlay */
    before:content-[''] before:absolute before:inset-0 before:pointer-events-none
    before:bg-[url('/assets/noise.png')] before:bg-[length:352px_382px] before:opacity-40 before:rounded-[inherit]

    /* your existing card behavior */
    flex flex-col my-4 w-full cursor-pointer transition-transform duration-200
     hover:shadow-xl hover:border-purple-500/70
  "
>
      {/* Delete button in top right corner for admins */}
      {isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute right-0 text-red-500 hover:text-red-400 cursor-pointer font-bold text-6xl p-0 z-10 -mt-4 -mr-6"
          style={{
            top: '-1.25rem', // -20px, even higher than top-0
            lineHeight: '1',
            padding: 0,
            filter: 'none',
            opacity: 1,
            pointerEvents: 'auto',
            background: 'none',
            border: 'none',
          }}
          title="Delete member"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-24 h-24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      
      {/* Name and role above the image, aligned left */}
      <div className="p-4 text-left relative">
        <h4 className="mb-1 text-xl font-semibold text-purple-500">
          {member.name}
        </h4>
        <p className="text-sm font-semibold text-gray-400 uppercase">
          {member.role}
        </p>
      </div>
      
      <div className="m-3 overflow-hidden rounded-md h-72 flex justify-center items-center">
        <div className="relative w-full h-full">
          <img
            className="w-full h-full object-cover"
            src={member.img_url}
            alt="profile-picture"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/30 to-transparent" />
        </div>
      </div>
    </div>
  )
}

export default MembersCard