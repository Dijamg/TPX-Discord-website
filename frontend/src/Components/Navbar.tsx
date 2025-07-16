import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-scroll';
import { useAuth } from '../hooks/useAuth';
import { useCookies } from '../hooks/useCookies';

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { token, logout } = useAuth();
  const { getItem } = useCookies();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const username = getItem("USERNAME");
    if (username) {
      setUsername(username);
    }
  }, []);
  
  const getLoginOrLogout = () => {
    if (!token) {
      return (
        <a
          href="/login"
          className="flex items-center justify-center ml-2 p-1 group transition"
          style={{ textDecoration: 'none' }}
          aria-label="Login"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 transition-colors duration-200" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" className="stroke-white group-hover:stroke-purple-400" />
          </svg>
        </a>
      );
    } else {
      return (
        <div className="relative flex items-center ml-2">
          {/* Logout icon (clickable, toggles dropdown) */}
          <button
            type="button"
            className="flex items-center justify-center p-1 focus:outline-none group"
            aria-label="Logout menu"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-red-800 group-hover:stroke-red-500 hover:cursor-pointer" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15h-6m0 0l3-3m-3 3l3 3 " />
            </svg>
          </button>
          {/* Dropdown on click */}
          {dropdownOpen && (
            <div
              className="fixed bg-gray-900  shadow-lg z-50 py-2 text-white"
              style={{
                top: '4.5rem',
                right: 0,
                width: '16rem',
              }}
            >
              <div className="px-4 py-2 w-75% border-b border-purple-400 text-sm font-medium">
                Logged in as <span className="font-bold">{username}</span>
              </div>
              <button
                onClick={() => { logout(); window.location.reload(); }}
                className="w-full text-left px-4 py-2 text-red-800 hover:text-purple-400 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      );
    }
  }

  const getLoginOrLogoutMobile = () => {
    if(!token) {
      return (
        <a
          href="/login"
          className="block cursor-pointer text-purple-400 capitalize transition"
          aria-label="Login"
        >
          Login
        </a>
      );
    } else {
      return (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            logout();
            window.location.reload();
          }}
          className="block cursor-pointer text-purple-400 capitalize transition"
          aria-label="Logout"
        >
          Logout from {username}
        </button>
      );
    }
  }

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
          {getLoginOrLogout()}
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
            className="block cursor-pointer text-purple-400 capitalize transition py-2"
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
              className="block cursor-pointer text-purple-400 capitalize transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {section}
            </Link>
          ))}
          {getLoginOrLogoutMobile()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;