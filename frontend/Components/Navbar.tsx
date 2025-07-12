import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // On mobile, always show navbar
      if (window.innerWidth < 768) {
        setShow(true);
        return;
      }

      // Desktop
      if (window.scrollY < 50) {
        setShow(true);
      } else if (window.scrollY > lastScrollY.current) {
        setShow(false); // scrolling down
        setIsMenuOpen(false); // close mobile menu when navbar hides
      } else {
        setShow(true); // scrolling up
      }
      lastScrollY.current = window.scrollY;

      // Clear previous timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Set timeout to hide navbar after 2 seconds of inactivity (if not at top) - desktop only
      if (window.scrollY > 50 && window.innerWidth >= 768) {
        timeoutRef.current = setTimeout(() => {
          setShow(false);
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav
      className={`top-0 w-full bg-gray-900 shadow-md z-50 transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ position: 'fixed' }}
    >
      <div className="flex justify-between items-center px-0 h-18 text-xl text-white">
        {/* Left: Home (Image) - hidden on mobile, shown on md+ */}
        <div className="h-full flex items-center hidden md:flex">
          <Link
            to="home-page"
            smooth={true}
            duration={500}
            offset={0}
            className="cursor-pointer flex items-center h-full"
          >
            <img src="/assets/navbar_banner.png" alt="TPX Banner" className="h-full w-auto m-0 p-0" />
          </Link>
        </div>
        
        {/* Desktop: Navigation Links */}
        <div className="hidden md:flex space-x-8 pr-8">
          {['about', 'members', 'tournaments'].map((section) => (
            <Link
              key={section}
              to={`${section}-page`}
              smooth={true}
              duration={500}
              offset={0}
              className="cursor-pointer hover:text-purple-400 capitalize transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {section}
            </Link>
          ))}
        </div>
        
        {/* Mobile: Menu Button */}
        <div className="md:hidden h-full">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-purple-400 text-white hover:bg-purple-500 transition-colors h-full px-4 flex items-center"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile: Dropdown Menu */}
      <div className={`md:hidden bg-gray-900 transition-all duration-300 ${isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-2 space-y-2">
          <Link
            to="home-page"
            smooth={true}
            duration={500}
            offset={0}
            className="block cursor-pointer text-purple-400 hover:text-purple-300 capitalize transition py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {['about', 'members', 'tournaments'].map((section) => (
            <Link
              key={section}
              to={`${section}-page`}
              smooth={true}
              duration={500}
              offset={0}
              className="block cursor-pointer text-purple-400 hover:text-purple-300 capitalize transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {section}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;