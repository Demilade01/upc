import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="container">
        <nav className="grid lg:grid-cols-[340px_auto] grid-cols-1 gap-4 max-sm:gap-9 max-lg:pt-6">
          <div className="space-y-10 max-lg:space-y-8 gap-6 w-full max-w-[193px] mx-auto">
            <Link href="/">
              <span>
                <img src="./images/logo.png" alt="" className="mx-auto" />
              </span>
            </Link>

            <div className="flex justify-between">
              <Link href="/">
                <span className="hover:opacity-75 transition ease-in-out duration-300">
                  <img src="./images/discord.png" alt="Notifications" />
                </span>
              </Link>

              <Link href="/">
                <span className="relative hover:opacity-75">
                  <img src="./images/Union.png" alt="Ghost" />
                  <div className="absolute top-[-10px] right-[-10px] bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    3
                  </div>
                </span>
              </Link>

              <Link href="/">
                <span className="hover:opacity-75 transition ease-in-out duration-300">
                  <img src="./images/f7.png" alt="Gift" />
                </span>
              </Link>
            </div>
          </div>

          <div className="space-y-5 z-0 relative">
            <div className="relative">
              <input
                className="bg-black-700 rounded-lg border-none p-2.5 ps-[55px] text-white placeholder-gray-450 font-bold w-full focus:ring-primary"
                type="search"
                placeholder="Search by server name"
              />
              <div className="absolute top-[50%] translate-y-[-50%] left-4">
                <img src="./images/search-icon.png" alt="" />
              </div>
            </div>

            <div className="text-white lg:flex hidden justify-between gap-[1px] overflow-x-auto md:w-full">
            <Link
                href="#"
                className="flex items-center justify-center bg-primary md:w-full min-w-20 first:rounded-s-lg last:rounded-e-lg p-3"
              >
                <span className="font-bold text-white leading-4">All</span>
              </Link>
              <Link
                href="#"
                className="md:w-full bg-black-700 hover:bg-gray-800 flex items-center max-sm:flex-shrink-0 max-sm:w-1/2 gap-6 px-4 py-1.5 first:rounded-s-lg last:rounded-e-lg"
              >
                <img src="./images/verify.png" alt="" />
                <span className="font-bold text-white leading-4 mx-auto">Official</span>
              </Link>
              <Link
                href="#"
                className="md:w-full bg-black-700 hover:bg-gray-800 flex items-center max-sm:flex-shrink-0 max-sm:w-1/2 gap-6 px-4 py-1.5 first:rounded-s-lg last:rounded-e-lg"
              >
                <img src="./images/modded.png" alt="" />
                <span className="font-bold text-white leading-4 mx-auto">Modded</span>
              </Link>
              <Link
                href="#"
                className="md:w-full bg-black-700 hover:bg-gray-800 flex items-center max-sm:flex-shrink-0 max-sm:w-1/2 gap-6 px-4 py-1.5 first:rounded-s-lg last:rounded-e-lg"
              >
                <img src="./images/star.png" alt="" />
                <span className="font-bold text-white leading-4 mx-auto">Favourites</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
