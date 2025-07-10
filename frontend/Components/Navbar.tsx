import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShow(true);
      } else if (window.scrollY > lastScrollY.current) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      lastScrollY.current = window.scrollY;

      // Clear previous timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Set timeout to hide navbar after 2 seconds of inactivity (if not at top)
      if (window.scrollY > 50) {
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
      className={`top-0 w-full bg-gray-900 shadow z-50 transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ position: 'sticky' }}
    >
      <div className="flex justify-between items-center px-0 h-18 text-lg text-white">
        {/* Left: Home (Image) */}
        <div className="h-full flex items-center">
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
        {/* Right: Other links */}
        <div className="flex space-x-8 pr-8">
          {['about', 'members', 'tournaments'].map((section) => (
            <Link
              key={section}
              to={`${section}-page`}
              smooth={true}
              duration={500}
              offset={0}
              className="cursor-pointer hover:text-purple-400 capitalize transition"
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