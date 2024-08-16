import { useState } from 'react';
import LanguageAndCountrySelector from "../components/LanguageAndCountrySelector";
import Header from "../components/Header";
import ServerList from "../components/ServerList";
import Image from "next/image";
import Head from "next/head";
import { NextUIProvider } from "@nextui-org/react";

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
        <LanguageAndCountrySelector />
        <Header
          setSearchQuery={setSearchQuery}
          serverType={serverType}
          setServerType={setServerType}
        />
        <ServerList
          searchQuery={searchQuery}
          serverType={serverType}
        />
      </NextUIProvider>
    </>
  );
}