import { ChangeEvent } from 'react';
import Link from 'next/link';
import { serverTypes } from '../constants';

const Header = ({ setSearchQuery, serverType, setServerType }: HeaderProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleServerTypeChange = (type: string) => {
    if (type !== 'favourites' && type !== serverType) {
      setServerType(type);
    }
  };

  

  return (
    <header>
      <div className="container mb-6">
        <nav className="grid lg:grid-cols-[340px_auto] grid-cols-1 gap-4 max-sm:gap-9 max-lg:pt-6">
          <div className="space-y-10 max-lg:space-y-8 gap-6 w-full max-w-[193px] mx-auto">
            <Link href="/">
              <img src="./images/logo.svg" alt="Upcoming Wipes Logo" className="mx-auto" />
            </Link>

            <div className="flex justify-center items-center space-x-8 h-20">
              <Link
                href="https://discord.gg/QDnnJ7nqf2"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition ease-in-out duration-300"
              >
                <img src="./images/discord.svg" alt="Discord Logo" className="w-8 h-6 mx-auto" />
              </Link>
            </div>
          </div>

          <div className="space-y-5 z-0 relative">
            {/* Search Bar */}
            <div className="relative">
              <input
                className="bg-black-700 rounded-lg p-2.5 ps-[55px] text-white placeholder-gray-450 font-bold w-full focus:ring-primary"
                type="search"
                placeholder="Search by server name"
                onChange={handleSearchChange}
              />
              <div className="absolute top-[50%] translate-y-[-50%] left-4">
                <img src="./images/search-icon.svg" className="h-5 w-5" alt="Search Icon" />
              </div>
            </div>

            {/* Server Type Buttons */}
            <div className="text-white lg:flex hidden justify-between gap-[1px] overflow-x-auto">
              {serverTypes.map(({ type, label, iconInactive, iconActive }) => (
                <button
                  key={type}
                  onClick={() => handleServerTypeChange(type)}
                  className={`md:w-full flex items-center justify-center gap-2 px-4 py-3 first:rounded-s-lg last:rounded-e-lg ${
                    serverType === type
                      ? 'bg-primary'
                      : type === 'favourites'
                      ? 'bg-black-700 opacity-50 cursor-not-allowed'
                      : 'bg-black-700 hover:bg-gray-800'
                  }`}
                  disabled={type === 'favourites'}
                >
                  {iconInactive && iconActive && (
                    <img
                      src={serverType === type ? iconActive : iconInactive}
                      alt={`${label} Icon`}
                      className="w-5 h-5"
                    />
                  )}
                  <span className="font-bold text-white leading-4">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
