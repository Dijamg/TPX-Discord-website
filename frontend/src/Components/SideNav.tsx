import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const StyledSideElement = ({ orientation, children, isVisible }: { orientation: 'left' | 'right', children: React.ReactNode, isVisible: boolean }) => (
  <div className={`
    w-10 
    fixed 
    bottom-0 
    z-10 
    text-slate-300
    ${orientation === 'left' ? 'left-10' : 'right-10'}
    max-lg:${orientation === 'left' ? 'left-5' : 'right-5'}
    max-md:hidden
    transition-opacity duration-500 ease-in-out
    ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
  `}>
    {children}
  </div>
)

const StyledSocialList = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center">
    <ul className="
      flex 
      flex-col 
      items-center 
      m-0 
      p-0 
      list-none
    ">
      {children}
    </ul>
    
    {/* Line after the list */}
    <div className="w-px h-[90px] mx-auto bg-slate-300"></div>
  </div>
)

const SideNav = () => {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // If we're on the main page (frontpage), show SideNav when scrolling past hero
      if (location.pathname === '/') {
        if (scrollPosition > windowHeight * 0.8) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }

    // If we're not on the main page, always show SideNav
    if (location.pathname !== '/') {
      setIsVisible(true)
    } else {
      // On main page, check scroll position
      handleScroll()
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [location.pathname])

  return (
    <div className="flex flex-col gap-4">
      <StyledSideElement orientation="left" isVisible={isVisible}>
        <StyledSocialList>
          {/* Discord Icon */}
          <li className="p-2.5 hover:-translate-y-1 focus:-translate-y-1 transition-transform mb-5">
            <span
              className="transition-colors duration-200 text-purple-500 hover:text-purple-400 cursor-pointer"
              aria-label="Discord"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.073.035c-.211.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.164-.393-.405-.874-.617-1.249a.07.07 0 00-.073-.035c-1.67.285-3.282.822-4.885 1.515a.064.064 0 00-.03.027C.533 9.045-.32 13.579.099 18.057a.07.07 0 00.028.048c2.052 1.507 4.041 2.422 5.992 3.029a.07.07 0 00.076-.027c.461-.63.873-1.295 1.226-1.994a.07.07 0 00-.038-.098c-.652-.247-1.27-.549-1.872-.892a.07.07 0 01-.007-.117c.125-.094.25-.192.371-.291a.07.07 0 01.071-.01c3.927 1.793 8.18 1.793 12.061 0a.07.07 0 01.072.009c.122.099.246.198.372.292a.07.07 0 01-.006.117 12.298 12.298 0 01-1.873.891.07.07 0 00-.038.099c.36.698.772 1.362 1.225 1.993a.07.07 0 00.076.028c1.961-.607 3.95-1.522 6.002-3.029a.07.07 0 00.028-.048c.5-5.177-.838-9.673-3.548-13.661a.061.061 0 00-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.946 2.419-2.156 2.419Z" />
              </svg>
            </span>
          </li>
          {/* GitHub Icon */}
          <li className="p-2.5 hover:-translate-y-1 focus:-translate-y-1 transition-transform mb-5">
            <a
              href="https://github.com/Dijamg/TPX-Discord-website" 
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 text-purple-500 hover:text-purple-400"
              aria-label="GitHub"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" />
              </svg>
            </a>
          </li>
        </StyledSocialList>
      </StyledSideElement>
    </div>
  )
}

export default SideNav