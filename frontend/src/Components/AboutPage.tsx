import React from 'react'
import Reveal from './Reveal'

const AboutPage = () => (
  <div className="about-page bg-[#0A192F] text-white py-8 px-4" id="about-page">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-8">
      {/* Left column: Image */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <Reveal delayMs={200}>
          <img src="/assets/tpx_logo.webp" alt="TPX Logo" className="w-full max-w-full h-auto max-h-96 object-contain border-l-8 border-purple-500" />
        </Reveal>
      </div>
      {/* Right column: Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <Reveal delayMs={400}>
          <h2 className="text-xl font-bold mb-4 text-gray-200">The Phantom Phoenix Organization</h2>
          <h3 className="text-lg font-bold mb-4 text-gray-200">A fast growing gaming community for all kinds of gamers</h3>
          <p className="max-w-2xl mb-4 text-gray-400 text-lg">
            The Phantom Phoenix Organization, also known as TPX, is a Discord community which focuses on video games. This Discord was founded by a few members but it has grown rapidly over the last year and now there's close to 100 of us.
          </p>
          <p className="max-w-2xl text-gray-400 text-lg">
            This community grows constantly because a lot of members like it and continue to invite their friends here. We play a variety of games, but mainly multiplayer ones. Our community has hardcore gamers as well as casual players who just play once in while and prefer to do it with good company.
          </p>
        </Reveal>
      </div>
    </div>
    {/* New row: Games and image */}
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-8 py-8">
      {/* Left column: Games list */}
      <div className="w-full md:w-1/2 flex flex-col ">
        <Reveal delayMs={600}>
          <h2 className="text-xl font-bold mb-4 text-gray-200">Activities</h2>
          <h3 className="text-lg font-bold mb-4 text-gray-200">We do a lot of things together!</h3>
          <ul className="text-gray-400 text-lg space-y-2">
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-2.5 w-2.5 flex-shrink-0 text-purple-500" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,0 10,5 0,10" />
              </svg>
              Play League of Legends (flex queue/clash weekends)
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-2.5 w-2.5 flex-shrink-0 text-purple-500" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,0 10,5 0,10" />
              </svg>
              Attend different events, such as tournaments held by Aalto Gamers
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-2.5 w-2.5 flex-shrink-0 text-purple-500" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,0 10,5 0,10" />
              </svg>
              Grind CS2 ranked with hardcore players
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-2.5 w-2.5 flex-shrink-0 text-purple-500" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,0 10,5 0,10" />
              </svg>
              Raid and farm in Lost Ark
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-2.5 w-2.5 flex-shrink-0 text-purple-500" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,0 10,5 0,10" />
              </svg>
              Discuss TFT strategies
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-2.5 w-2.5 flex-shrink-0 text-purple-500" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,0 10,5 0,10" />
              </svg>
              Try out new games
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-2.5 w-2.5 flex-shrink-0 text-purple-500" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="0,0 10,5 0,10" />
              </svg>
              Hang out in voice chat
            </li>
          </ul>
          <div className="mt-12 text-gray-400 text-xl">
            Interested? Join{' '}
            <a
              href="#"
              className="text-purple-500 text-xl hover:text-purple-400 transition"
              style={{ textDecoration: 'none' }}
              onClick={e => e.preventDefault()}
            >
              here
            </a>
            !
          </div>
        </Reveal>
      </div>
      {/* Right column: Image */}
      <div className="flex-shrink-0 flex flex-col items-center md:justify-start w-full md:w-1/2 h-full">
        <Reveal delayMs={800}>
          <img
            src="/assets/tpxvsgg.png"
            alt="TPX vs GG"
            className="w-full max-w-full max-h-96 h-auto object-contain rounded-lg shadow-lg border-r-8 border-purple-500"
          />
          <figcaption className="mt-2 text-gray-400 text-base text-center">
            Post game lobby after we won Aalto University Pre-Season tournament in 2020.
          </figcaption>
        </Reveal>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-32">
      <div className="w-full h-1 bg-gray-700" />
    </div>
  </div>
)

export default AboutPage