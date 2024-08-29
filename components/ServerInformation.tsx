import React, { useCallback, useEffect, useState } from 'react';
import { Trophy, Users, Server as ServerIcon, Map, Globe, Flag, UserPlus, Cpu, Bell, ChevronRight, Home, Link2, ChevronUp, ChevronDown } from 'lucide-react';
import { Slider } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import ServerControls from './ServerControls';
import ServerDetails from './ServerDetails';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Server {
  server_steam_id: string;
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

const ServerInformation: React.FC = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [server, setServer] = useState<Server | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { id } = router.query;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getNextForceWipe = (): string => {
    const now = new Date();
    let nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  
    // Find the first Thursday of the next month
    while (nextMonth.getDay() !== 4) { // 4 represents Thursday
      nextMonth.setDate(nextMonth.getDate() + 1);
    }
  
    // Set the time to 7:00 PM
    nextMonth.setHours(19, 0, 0, 0); // 19:00:00.000
  
    return formatDate(nextMonth.toISOString());
  };

  const truncateDescription = (description: string, maxLines: number = 4) => {
    const lines = description.split('\n');
    if (lines.length <= maxLines) return description;
    return lines.slice(0, maxLines).join('\n') + '...';
  };

  useEffect(() => {
    const fetchServerData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/servers/${id}`);
          if (!response.ok) throw new Error('Failed to fetch server data');
          const data = await response.json();
          setServer(data.data);
        } catch (error) {
          console.error('Error fetching server data:', error);
          toast.error('Failed to load server information');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchServerData();
  }, [id]);

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText('connect ' + text);
      toast.success('Server IP copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy server IP to clipboard!');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!server) {
    return <div>Server not found</div>;
  }

  const displayedDescription = isDescriptionExpanded ? server.description : truncateDescription(server.description);

  return (
<main className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <nav className="flex mb-6 mt-4 bg-black-700/80 p-3 rounded-lg" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-primary transition-colors duration-200">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <span className="ml-1 text-sm font-medium text-white md:ml-2">
                  {server.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-[auto_340px] gap-4">
          <div className="space-y-6">
          <div className="bg-black-700/80 rounded-lg p-6">
              <h1 className="text-2xl font-bold text-white mb-4">{server.name}</h1>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {displayedDescription}
              </div>
              {server.description.split('\n').length > 4 && (
                <div className="flex justify-center mt-2">
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-primary hover:text-primary-dark transition-colors duration-200 flex items-center"
                >
                  {isDescriptionExpanded ? (
                    <>
                      Read Less <ChevronUp size={16} className="ml-1" />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown size={16} className="ml-1" />
                    </>
                  )}
                </button>
              </div>
              )}
            </div>

            <ServerDetails server={server} />

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">Resource Rates</h2>
              <div className="bg-black-700/80 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <RateItem icon="/images/scrap-icon.png" label="Scrap" value={server.scrap_rate.toString()} />
                  <RateItem icon="/images/workbench-icon.png" label="Craft" value={server.craft_rate.toString()} />
                  <RateItem icon="/images/salvage-axe-icon.png" label="Gather" value={server.gather_rate.toString()} />
                  <RateItem icon="/images/tool-cupboard-icon.png" label="Upkeep" value={server.upkeep.toString()} />
                </div>
              </div>
            </div>

            {/* New Tags Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary mb-4">Server Tags</h2>
              <div className="bg-black-700/80 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {server.tags.map((tag) => (
                    <span key={tag} className="bg-black-800 px-3 py-1 rounded-full text-sm text-primary border border-primary shadow-glow">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ServerControls serverIP={server.ip} websiteURL={server.website_url} />

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">Wipe Schedule</h3>
              <div className="bg-black-700/80 rounded-lg p-4">
                <div className="space-y-4">
                <WipeInfo label="Last Wipe" date={formatDate(server.last_wipe)} />
              <WipeInfo label="Next Wipe" date={formatDate(server.next_wipe)} />
              <WipeInfo label="Next Force Wipe" date={getNextForceWipe()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </main>
  );
};

interface InfoItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center">
    {React.cloneElement(icon, { className: "text-primary mr-2", size: 18 })}
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  </div>
);

interface RateItemProps {
  icon: string;
  label: string;
  value: string;
}

const RateItem: React.FC<RateItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 place-content-center">
    <div className="flex-shrink-0">
      <Image
        src={icon}
        alt={label}
        width={32}
        height={32}
        className="inline-block"
      />
    </div>
    <div className="flex flex-col">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-semibold text-primary">{value}x</p>
    </div>
  </div>
);

interface WipeInfoProps {
  label: string;
  date: string;
}

const WipeInfo: React.FC<WipeInfoProps> = ({ label, date }) => (
  <div>
    <p className="text-sm text-primary">{label}</p>
    <p className="font-semibold text-white">{date}</p>
  </div>
);

export default ServerInformation;