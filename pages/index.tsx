// pages/index.js
import LanguageAndCountrySelector from "../components/LanguageAndCountrySelector";
import Header from "../components/Header";
import SeverList from "../components/ServerList";
import Image from "next/image";
import Head from "next/head"; 
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Upcoming Wipes - Latest Rust Server Wipes</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="stylesheet" href="./css/rSlider.css" />
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
        <Header />
        <SeverList />
      </NextUIProvider>
    </>
  );
}
