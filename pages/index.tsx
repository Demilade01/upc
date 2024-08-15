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
        <title>Upcoming Wipes - Latest Rust Server Wipes</title>
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