import { useState, useEffect } from 'react';
import Head from "next/head";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleTagManager from '../../components/GoogleTagManager';
import ServerInformation from '../../components/ServerInformation';

interface Server {
  _id: string;
  address: string;
  ip: string;
  port: number;
  name: string;
  rank: number;
  tags: string[];
  website_url: string;
  world_size: number;
  description: string;
  group_limit: number;
  team_ui_limit: number;
  component_rate: number;
  craft_rate: number;
  gather_rate: number;
  scrap_rate: number;
  upkeep: number;
  country_code: string;
  region: string;
  country: string;
  wipe_schedule: string;
  last_wipe: string;
  next_wipe: string;
  max_population_last_wipe: number;
  server_type: string;
}

export default function ServerPage() {
  const [server, setServer] = useState<Server | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchServerData = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await fetch(`/api/servers/${id}`);
          if (!response.ok) throw new Error('Failed to fetch server data');
          const data = await response.json();
          setServer(data.data);
        } catch (error) {
          console.error('Error fetching server data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchServerData();
  }, [id]);

  return (
    <>
      <Head>
        {server && (
          <>
            <title>{`${server.name} | Rust Server & Wipe Schedules - Upcoming Wipes`}</title>
            <meta name="description" content={`Explore detailed information about ${server.name} on Upcoming Wipes. Check wipe schedules, population, server type, and more for the best Rust experience.`} />
            <meta name="keywords" content={`Rust server details, ${server.name}, ${server.name} force wipe, ${server.name} wipe time, Rust server ${server.region}, Rust wipe schedule, Rust server population, Rust PvP servers, Rust PvE servers, Best Rust servers, ${server.server_type}, ${server.country}, Rust server tracker, Rust servers by wipe time, Rust roleplay servers, Rust modded servers, Vanilla Rust servers`} />
            <meta property="og:title" content={`${server.name} | Rust Server & Wipe Schedules - Upcoming Wipes `} />
            <meta property="og:description" content={`Explore detailed information about ${server.name} on Upcoming Wipes. Check wipe schedules, population, server type, and more for the best Rust experience.`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://upcomingwipes.com/server/${server._id}`} />
            <link rel="canonical" href={`https://upcomingwipes.com/server/${server._id}`} />
          </>
        )}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="icon" href="../images/favicon.ico" />
      </Head>

      <GoogleTagManager />

      <NextUIProvider>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <ServerInformation server={server} loading={loading} />
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
                  <img src="../images/donate.svg" alt="PayPal Donate" className="mx-auto mt-2" style={{ width: '80px' }} />
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