import React from 'react'
import Heropage from '../Components/Heropage'
import AboutPage from '../Components/AboutPage'
import MembersPage from '../Components/MembersPage'

const Frontpage = () => (
    <div>
        <Heropage/>
        <div className="w-full h-3 bg-purple-400" />
        <AboutPage/>
        <MembersPage/>
    </div>
)

export default Frontpage