import { useState } from 'react';
import LanguageAndCountrySelector from "../components/LanguageAndCountrySelector";
import Header from "../components/Header";
import ServerList from "../components/ServerList";
import Image from "next/image";
import Head from "next/head";
import { NextUIProvider } from "@nextui-org/react";
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [serverType, setServerType] = useState('all');

  return (
    <>
      <Head>
        <title>Find & Compare Rust Servers by Wipe Times, Population & Rank | Upcoming Wipes</title>
        <meta name="description" content="Find your perfect Rust server with Upcoming Wipes (UPC). Instantly filter by population, wipe schedule, region, and more. Stay ahead of the competition with the freshest and upcoming wipes for your next thrilling Rust adventure." />
        <meta name="keywords" content="Rust server list, Rust server finder, Rust wipe time, Upcoming Rust wipes, Fresh Rust servers, Best modded rust servers, Vanilla Rust servers, Rust PvP servers, Rust PvE servers, Best Rust servers, Rust solo/duo/trio servers, Rust servers by wipe time, Rust server hosting, Rust server tracker, Rust servers North America, EU Rust servers, Asia Rust servers, Rust server browser, New Rust servers, Rust wipe schedule, Rust server rankings, Rust roleplay servers, Rust server status list, Rust servers, Rust console servers" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="icon" href="images/favicon.ico" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VM1G4M6SV5"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VM1G4M6SV5');
          `
        }} />

        <link
          href="https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
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
            <div className="container mx-auto flex justify-center items-center space-x-8">
              <Link href="/privacy-policy" className="footer-link group">
                <span className="relative z-10 group-hover:text-primary transition duration-300">Privacy Policy</span>
                <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 rounded transition duration-300"></span>
              </Link>
              <div className="w-2 h-2 bg-primary transform rotate-45"></div>
              <Link href="/terms-and-conditions" className="footer-link group">
                <span className="relative z-10 group-hover:text-primary transition duration-300">Terms and Conditions</span>
                <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 rounded transition duration-300"></span>
              </Link>
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          </footer>
        </div>
      </NextUIProvider>
    </>
  );
}