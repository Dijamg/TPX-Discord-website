import React from 'react'

const AboutPage = () => (
  <div className="about-page bg-gray-900 text-white py-12 px-4" id="about-page">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-8">
      {/* Left column: Image */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <img src="/assets/tpx_logo.webp" alt="TPX Logo" className="w-full max-w-full h-auto max-h-96 object-contain border-l-8 border-purple-400" />
      </div>
      {/* Right column: Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4">About us</h1>
        <p className="font-serif max-w-2xl mb-4 text-gray-300 text-lg">
          The Phantom Phoenix Organization, also known as TPX, is a Discord community which focuses on video games. This Discord was founded by a few members but it has grown rapidly over the last year and now there's close to 100 of us.
        </p>
        <p className="font-serif max-w-2xl text-gray-300 text-lg">
          This community grows constantly because a lot of members like it and continue to invite their friends here. We play a variety of games, but mainly multiplayer ones. Our community has hardcore gamers as well as casual players who just play once in while and prefer to do it with good company.
        </p>
      </div>
    </div>
    {/* New row: Games and image */}
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-8 py-8">
      {/* Left column: Games list */}
      <div className="w-full md:w-1/2 flex flex-col ">
        <h2 className="text-2xl font-bold mb-4">What do we do together?</h2>
        <ul className="font-serif list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Play League of Legends (flex queue/clash weekends)</li>
          <li>Attend different events, such as tournaments held by Aalto Gamers</li>
          <li>Grind CS2 ranked with hardcore players</li>
          <li>Raid and farm in Lost Ark</li>
          <li>Discuss TFT strategies</li>
          <li>Try out new games</li>
          <li>Hang out in voice chat</li>
        </ul>
      </div>
      {/* Right column: Image */}
      <div className="flex-shrink-0 flex flex-col items-center md:justify-start w-full md:w-1/2 h-full">
        <img
          src="/assets/tpxvsgg.png"
          alt="TPX vs GG"
          className="w-full max-w-full max-h-96 h-auto object-contain rounded-lg shadow-lg border-r-8 border-purple-400"
        />
        <figcaption className="mt-2 text-gray-400 text-sm text-center">
          Post game lobby after we won Aalto University Pre-Season tournament in 2020.
        </figcaption>
      </div>
    </div>
    <div className="max-w-6xl mx-auto">
      <div className="w-full h-1 bg-gray-700" />
    </div>
  </div>
)

export default AboutPage