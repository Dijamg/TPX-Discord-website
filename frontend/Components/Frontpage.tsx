import React from 'react'
import Heropage from '../Components/Heropage'
import AboutPage from '../Components/AboutPage'
import MembersPage from '../Components/MembersPage'
import TournamentsPage from '../Components/TournamentsPage'
import { Member } from '../types'
import Navbar from './Navbar'

const Frontpage = ({ members }: { members: Member[] }) => (
    <div>
        <Navbar/>
        <Heropage/>
        <div className="w-full h-3 bg-purple-400" />
        <AboutPage/>
        <MembersPage members={members}/>
        <TournamentsPage/>
    </div>
)

export default Frontpage