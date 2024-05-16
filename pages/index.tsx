// pages/index.js
import useSWR from 'swr';
import { useState } from 'react';
import LanguageAndCountrySelector from '../components/LanguageAndCountrySelector';
import Header from '../components/Header';
import SeverList from '../components/ServerList';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Document</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/rSlider.css" />
        <link rel="stylesheet" href="/css/app.css" />
      </Head>

      <LanguageAndCountrySelector />
      <Header />
      <SeverList />

      <script src="../components/rSlider.js"></script>
      <script src="./js/app.js"></script>
    </>
  );
}
