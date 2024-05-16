import { useState, useEffect, SetStateAction } from 'react';
import Link from 'next/link';

const LanguageAndCountrySelector = () => {
  const [isCountryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Portugal');
  const [selectedLanguage, setSelectedLanguage] = useState('ENG');

  // Toggle dropdown visibility
  const toggleDropdown = (type: string) => {
    if (type === 'country') {
      setCountryDropdownOpen(!isCountryDropdownOpen);
      setLanguageDropdownOpen(false); // Close other dropdown
    } else {
      setLanguageDropdownOpen(!isLanguageDropdownOpen);
      setCountryDropdownOpen(false); // Close other dropdown
    }
  };

  // Select item and close dropdown
  const selectItem = (type: string, value: SetStateAction<string>) => {
    if (type === 'country') {
      setSelectedCountry(value);
      setCountryDropdownOpen(false);
    } else {
      setSelectedLanguage(value);
      setLanguageDropdownOpen(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleWindowClick = (event) => {
      if (!event.target.closest('.dropdown-button')) {
        setCountryDropdownOpen(false);
        setLanguageDropdownOpen(false);
      }
    };

    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <div className="top-cta">
      <div className="container">
        <div className="flex justify-end items-center py-5 space-x-5 relative z-[1] max-lg:hidden">
          {/* Country Dropdown */}
          <div className="relative inline-block text-left">
            <span className="inline-block text-white text-sm">Country:</span>
            <div className="inline-block">
              <button
                className="dropdown-button text-white bg-black-700 hover:bg-gray-800 font-medium rounded-lg text-xs px-4 py-2"
                onClick={() => toggleDropdown('country')}
              >
                <span>{selectedCountry}</span>
                <svg
                  className="w-4 h-4 inline-block ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isCountryDropdownOpen && (
                <div className="dropdown-menu absolute right-0 w-full max-w-[105px] mt-2 origin-top-right bg-black-700/95 rounded-lg text-white divide-y divide-black overflow-hidden">
                  <Link href="#">
                    <span className="block px-4 py-2 text-sm hover:bg-primary" onClick={() => selectItem('country', 'Portugal')}>Portugal</span>
                  </Link>
                  <Link href="#">
                    <span className="block px-4 py-2 text-sm hover:bg-primary" onClick={() => selectItem('country', 'England')}>England</span>
                  </Link>
                  <Link href="#">
                    <span className="block px-4 py-2 text-sm hover:bg-primary" onClick={() => selectItem('country', 'London')}>London</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="relative inline-block text-left">
            <span className="inline-block text-white text-sm">Language:</span>
            <div className="inline-block">
              <button
                className="dropdown-button text-white bg-black-700 hover:bg-gray-800 font-medium rounded-lg text-xs px-4 py-2"
                onClick={() => toggleDropdown('language')}
              >
                <span>{selectedLanguage}</span>
                <svg
                  className="w-4 h-4 inline-block ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isLanguageDropdownOpen && (
                <div className="dropdown-menu absolute right-0 w-full max-w-[90px] mt-2 origin-top-right bg-black-700/95 rounded-lg text-white divide-y divide-black overflow-hidden">
                  <Link href="#">
                    <span className="block px-4 py-2 text-sm hover:bg-primary" onClick={() => selectItem('language', 'Portugal')}>Portugal</span>
                  </Link>
                  <Link href="#">
                    <span className="block px-4 py-2 text-sm hover:bg-primary" onClick={() => selectItem('language', 'England')}>England</span>
                  </Link>
                  <Link href="#">
                    <span className="block px-4 py-2 text-sm hover:bg-primary" onClick={() => selectItem('language', 'London')}>London</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageAndCountrySelector;
