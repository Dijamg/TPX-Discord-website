import React from 'react'
import { Member } from '../types'
import MembersCard from './MembersCard'

const Members = ({ members }: { members: Member[] }) => (
    <div className='members-page bg-gray-900 text-white py-8 px-4' id='members-page'>
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-2 text-center">Core members</h1>
            <div className="w-40 md:w-62 h-1 bg-purple-400 rounded mb-4"></div>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {members.map((member) => (
                <MembersCard key={`member-${member.id}`} member={member} />
            ))}
        </div>
        <div className="max-w-6xl mx-auto mt-32">
            <div className="w-full h-1 bg-gray-700" />
        </div>
    </div>
)

export default Members