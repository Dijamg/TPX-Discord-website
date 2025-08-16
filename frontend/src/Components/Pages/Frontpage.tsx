import React from 'react'
import Heropage from './Heropage'
import AboutPage from './AboutPage'
import MembersPage from './MembersPage'
import TournamentsPage from './TournamentsPage'
import { AllProps, Member } from '../../types'
import Navbar from '../Navbar'

const Frontpage = ({ allProps, refreshKey }: { allProps: AllProps, refreshKey: number }) => (
    <div>
        <Navbar/>
        <Heropage/>
        <div className="w-full h-3 bg-purple-500" />
        <AboutPage/>
        <MembersPage members={allProps.members}/>
        <TournamentsPage tournaments={allProps.tournaments} upcomingClashTournaments={allProps.upcomingClashTournaments}/>
    </div>
)

export default Frontpage