import React, { useState } from 'react';
import { ChevronRight, Home, ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { formatDate, useForceWipe } from '../hooks/datehelpers';
import ServerControls from './ServerControls';
import ServerDetails from './ServerDetails';
import NoServersMessage from './NoServersMessage';
import LoadingComponent from './LoadingComponent';
import ResourceRates from './ResourceRates';
import ServerTags from './ServerTags';
import WipeSchedule from './WipeSchedule';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DescriptionToggle from './DescriptionToggle';
import Breadcrumb from './BreadCrumb';

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

interface ServerInformationProps {
  server: Server | null;
  loading: boolean;
}

const ServerInformation: React.FC<ServerInformationProps> = ({ server, loading }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const router = useRouter();
  const { calculateNextForceWipeDate } = useForceWipe();

  const toggleDescription = () => {
    setIsDescriptionExpanded(prev => !prev);
  };

  const renderContent = () => {
    if (loading) return <LoadingComponent />;
    if (!server) return <NoServersMessage />;

    const truncatedDescription = isDescriptionExpanded ? server.description : truncateText(server.description, 4);

    return (
      <div className="grid lg:grid-cols-[auto_340px] gap-4">
        <div className="space-y-6">
          <div className="bg-black-700/80 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-white mb-4">{server.name}</h1>
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">{truncatedDescription}</div>
            {server.description.split('\n').length > 4 && (
              <DescriptionToggle isExpanded={isDescriptionExpanded} onToggle={toggleDescription} />
            )}
          </div>
          <ServerDetails server={server} />
          <ResourceRates server={server} />
          <ServerTags tags={server.tags} />
        </div>
        <div className="space-y-6">
          <ServerControls serverIP={server.ip} websiteURL={server.website_url} />
          <WipeSchedule
            lastWipe={server.last_wipe}
            nextWipe={server.next_wipe}
            forceWipe={calculateNextForceWipeDate()}
          />
        </div>
      </div>
    );
  };

  return (
    <main className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <Breadcrumb name={server?.name || 'Server'} />
        {renderContent()}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </main>
  );
};

export default ServerInformation;
function truncateText(description: string, arg1: number) {
  throw new Error('Function not implemented.');
}

