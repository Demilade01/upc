import { useState } from 'react';
import LanguageAndCountrySelector from "../components/LanguageAndCountrySelector";
import Header from "../components/Header";
import ServerList from "../components/ServerList";
import Head from "next/head";
import { NextUIProvider } from "@nextui-org/react";
import Link from 'next/link';
import GoogleTagManager from '../components/GoogleTagManager';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [serverType, setServerType] = useState('all');

  return (
    <>
      <Head>
        <title>Find & Compare Rust Servers - Wipe Times, Population & Rank | UPC</title>
        <meta name="description" content="Discover the best Rust servers with Upcoming Wipes (UPC). Filter by population, wipe schedule, region, and more. Stay updated with the latest Rust wipe times for your next adventure." />
        <meta name="keywords" content="Rust servers, Rust wipe times, Rust server finder, Upcoming Rust wipes, Fresh Rust servers, Modded Rust servers, Vanilla Rust servers, Rust PvP, Rust PvE, Rust server tracker, Rust server hosting, Rust server rankings, Rust roleplay servers, Rust server status" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <GoogleTagManager />

      <NextUIProvider>
        <div className="flex flex-col min-h-screen">
          <LanguageAndCountrySelector />
          <Header
            setSearchQuery={setSearchQuery}
            serverType={serverType}
            setServerType={setServerType}
          />
          <main className="flex-grow">
            <ServerList
              searchQuery={searchQuery}
              serverType={serverType}
            />
          </main>
          <footer className="bg-black-800 text-white py-6 mt-8 relative">
            <div className="container mx-auto flex flex-col items-center space-y-4">
              <div className="flex justify-center items-center space-x-8">
                <Link href="/privacy-policy" className="footer-link group relative">
                  <span className="relative z-10 group-hover:text-primary transition duration-300">Privacy Policy</span>
                  <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 rounded transition duration-300"></span>
                </Link>
                <div className="w-2 h-2 bg-primary transform rotate-45"></div>
                <Link href="/terms-and-conditions" className="footer-link group relative">
                  <span className="relative z-10 group-hover:text-primary transition duration-300">Terms and Conditions</span>
                  <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 rounded transition duration-300"></span>
                </Link>
                <div className="w-2 h-2 bg-primary transform rotate-45"></div>
                <Link
                  href="https://www.paypal.com/donate/?hosted_button_id=T9VCYTHXMG2A6"
                  className="cursor-pointer block hover:opacity-75 transition ease-in-out duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/donate.svg" alt="Donate with PayPal" className="mx-auto mt-2" style={{ width: '80px' }} />
                </Link>
              </div>
              <div className="text-sm text-gray-400">
                © 2024 UPC. All rights reserved.
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          </footer>
        </div>
      </NextUIProvider>
    </>
  );
}
