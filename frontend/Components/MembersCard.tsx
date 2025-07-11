import React from 'react'
import { Member } from '../types'

const MembersCard = ({ member }: { member: Member }) => {
    return(
        <div className="flex flex-col bg-gray-800 shadow-sm border border-gray-700 rounded-lg my-4 w-full cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl">
  <div className="m-2 overflow-hidden rounded-md h-80 flex justify-center items-center">
    <img className="w-full h-full object-cover" src="https://64.media.tumblr.com/35faaf5d0b71158a23f9c5eb1834c0a3/1d83e820693ffc1d-f3/s400x600/d3dd8219807e2594f15b64facbc0355b69d7fd5d.jpg" alt="profile-picture" />
  </div>
  <div className="p-4 text-center">
    <h4 className="mb-1 text-xl font-semibold text-purple-400">
      Best Zed Iraq
    </h4>
    <p
      className="text-sm font-semibold text-gray-400 uppercase">
      Moderator 
    </p>
  </div>
</div>
    )
}

export default MembersCard