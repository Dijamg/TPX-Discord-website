import React from 'react'
import Heropage from '../Components/Heropage'
import AboutPage from '../Components/AboutPage'
import MembersPage from '../Components/MembersPage'
import TournamentsPage from '../Components/TournamentsPage'
import { AllProps, Member } from '../types'
import Navbar from './Navbar'

const Frontpage = ({ allProps, refreshKey }: { allProps: AllProps, refreshKey: number }) => (
    <div>
        <Navbar/>
        <Heropage/>
        <div className="w-full h-3 bg-purple-400" />
        <AboutPage/>
        <MembersPage members={allProps.members}/>
        <TournamentsPage tournaments={allProps.tournaments} upcomingClashTournaments={allProps.upcomingClashTournaments}/>
    </div>
)

export default Frontpage