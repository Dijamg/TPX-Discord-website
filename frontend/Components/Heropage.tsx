import React from 'react'
import { Link } from 'react-scroll'
import Navbar from './Navbar'

const Heropage = () => (
  <div
    className="hero h-screen bg-[url('/assets/tpx_homepage.png')] bg-cover bg-center relative"
    id="home-page"
  >
    <Navbar/>
    <Link
      to="about-page"
      smooth={true}
      offset={0}
      duration={500}
      className="absolute left-1/2 bottom-12 -translate-x-1/2 flex justify-center items-center w-32 h-32 cursor-pointer animate-bounce"
    >
      <svg
        className="w-28 h-28 text-white opacity-80"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </Link>
  </div>
)

export default Heropage