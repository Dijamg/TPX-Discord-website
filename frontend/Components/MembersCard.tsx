import React from 'react'
import { Member } from '../types'

const MembersCard = ({ member }: { member: Member }) => {
    return(
        <div className="flex flex-col bg-gray-800 shadow-sm border border-gray-700 rounded-lg my-4 w-full cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl">
  <div className="m-2 overflow-hidden rounded-md h-80 flex justify-center items-center">
    <img className="w-full h-full object-cover" src={member.imgurl} alt="profile-picture" />
  </div>
  <div className="p-4 text-center">
    <h4 className="mb-1 text-xl font-semibold text-purple-400">
        {member.name}
    </h4>
    <p
      className="text-sm font-semibold text-gray-400 uppercase">
      {member.role}
    </p>
  </div>
</div>
    )
}

export default MembersCard