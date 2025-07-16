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
      className="flex flex-col bg-gray-800 shadow-sm border border-gray-700 rounded-lg my-4 w-full cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl relative"
      onClick={handleClick}
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
      <div className="m-2 overflow-hidden rounded-md h-80 flex justify-center items-center">
        <img className="w-full h-full object-cover" src={member.img_url} alt="profile-picture" />
      </div>
      <div className="p-4 text-center relative">
        <h4 className="mb-1 text-xl font-semibold text-purple-400">
          {member.name}
        </h4>
        <p className="text-sm font-semibold text-gray-400 uppercase">
          {member.role}
        </p>
      </div>
    </div>
  )
}

export default MembersCard