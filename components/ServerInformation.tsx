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


const ServerInformation: React.FC<ServerInformationProps> = ({ server, loading }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const router = useRouter();
  const { calculateNextForceWipeDate } = useForceWipe();

  const toggleDescription = () => {
    setIsDescriptionExpanded(prev => !prev);
  };

  function truncateText(description: string, length: number): string {
    if (description.length <= length) {
      return description; // No truncation needed if the description is within the length
    }
    return description.slice(0, length) + '...'; // Truncate and add ellipsis
  }
  

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
function truncateText(_description: string, _arg1: number) {
  throw new Error('Function not implemented.');
}

