import React from 'react';
import { Trophy, Users, Server as ServerIcon, Map, Globe, Flag, UserPlus, Cpu } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface ServerDetailsProps {
    server: {
      rank: number;
      server_type: string;
      wipe_schedule?: string;
      max_population_last_wipe?: number;
      world_size?: number;
      address?: string;
      ip?: string;
      port?: number;
      team_ui_limit?: number;
      group_limit?: number;
      country?: string;
      region?: string;
      country_code?: string;
    };
  }

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText('connect ' + text);
      toast.success('Server IP copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy server IP to clipboard!');
    }
  };

const ServerDetails: React.FC<ServerDetailsProps> = ({ server }) => {
    const formatLimit = (limit?: number) => limit && limit > 100 ? "No Limit" : limit?.toString() || "Not specified";
    const formatValue = (value?: string | number) => 
  value !== undefined && value !== null && value !== "Unknown" ? value.toString() : "Unknown";

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Server Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="bg-black-700/80 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formatValue(server.rank) && <InfoItem icon={<Trophy />} label="Rank" value={`#${formatValue(server.rank)}`} />}
            {formatValue(server.server_type) && <InfoItem icon={<ServerIcon />} label="Server Type" value={formatValue(capitalizeFirstLetter(server.server_type))} />}
            {formatValue(server.wipe_schedule) && <InfoItem icon={<Users />} label="Wipe Schedule" value={formatValue(server.wipe_schedule)} />}
            {formatValue(server.max_population_last_wipe) && <InfoItem icon={<Users />} label="Avg Population" value={formatValue(server.max_population_last_wipe)} />}
            {formatValue(server.world_size) && <InfoItem icon={<Map />} label="Map Size" value={formatValue(server.world_size)} />}
          </div>
        </section>
        
        <div className="space-y-4">
          <section className="bg-black-700/80 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {formatValue(server.address) !== "Unknown" && (
  <InfoItem 
    icon={<Globe />} 
    label="Address" 
    value={formatValue(server.address)} 
    onClick={() => copyToClipboard(server.address!)}
    className="cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded p-1"
  />
)}

{formatValue(server.ip) !== "Unknown" && formatValue(server.port) !== "Unknown" && (
  <InfoItem 
    icon={<Cpu />} 
    label="IP" 
    value={`${server.ip}:${server.port}`}
    onClick={() => copyToClipboard(`${server.ip}:${server.port}`)}
    className="cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded p-1"
  />
)}
              {formatValue(server.country) && server.country_code && 
                <FlagInfoItem countryCode={server.country_code.toLowerCase()} label="Country" value={formatValue(server.country)} />
              }
              {formatValue(server.region) && <InfoItem icon={<Globe />} label="Region" value={formatValue(server.region)} />}
            </div>
          </section>
          
          <section className="bg-black-700/80 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formatLimit(server.team_ui_limit) && 
                <InfoItem icon={<UserPlus />} label="Team UI Limit" value={formatLimit(server.team_ui_limit)} />
              }
              {formatLimit(server.group_limit) && 
                <InfoItem icon={<Users />} label="Group Limit" value={formatLimit(server.group_limit)} />
              }
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
  onClick?: () => void;
  className?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, onClick, className }) => (
  <div className={`flex items-start ${className || ''}`} onClick={onClick}>
    <div className="flex-shrink-0 mt-1">
      {React.cloneElement(icon, { className: "text-primary", size: 18 })}
    </div>
    <div className="ml-3 min-w-0 flex-1">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-base text-white break-words">{value}</p>
    </div>
  </div>
);

interface FlagInfoItemProps {
    countryCode: string;
    label: string;
    value: string;
  }
  
  const FlagInfoItem: React.FC<FlagInfoItemProps> = ({ countryCode, label, value }) => (
    <div className="flex items-start">
      {countryCode ? (
        <div className="flex-shrink-0 mt-1 w-[18px] h-[13.5px] overflow-hidden">
          <Image
            src={`https://flagcdn.com/w20/${countryCode}.png`}
            alt={`${value} flag`}
            width={20}
            height={15}
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="ml-3 min-w-0 flex-1">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-semibold text-white break-words">{value}</p>
      </div>
    </div>
  );

export default ServerDetails;
