import React from 'react';
import { Trophy, Users, Server as ServerIcon, Map, Globe, Flag, UserPlus, Cpu } from 'lucide-react';
import Image from 'next/image';

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

const ServerDetails: React.FC<ServerDetailsProps> = ({ server }) => {
    const formatLimit = (limit?: number) => limit && limit > 100 ? "No Limit" : limit?.toString() || "Not specified";
    const formatValue = (value?: string | number) => value !== undefined && value !== null ? value.toString() : "Not specified";

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Server Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="bg-black-700/80 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem icon={<Trophy />} label="Rank" value={`#${formatValue(server.rank)}`} />
            <InfoItem icon={<ServerIcon />} label="Server Type" value={formatValue(server.server_type)} />
            <InfoItem icon={<Users />} label="Wipe Schedule" value={formatValue(server.wipe_schedule)} />
            <InfoItem icon={<Users />} label="Avg Population" value={formatValue(server.max_population_last_wipe)} />
            <InfoItem icon={<Map />} label="Map Size" value={formatValue(server.world_size)} />
          </div>
        </section>
        
        <div className="space-y-4">
          <section className="bg-black-700/80 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem icon={<Globe />} label="Address" value={formatValue(server.address)} />
              <InfoItem icon={<Cpu />} label="IP" value={formatValue(server.ip && server.port ? `${server.ip}:${server.port}` : undefined)} />
              <FlagInfoItem countryCode={server.country_code?.toLowerCase() || ''} label="Country" value={formatValue(server.country)} />
              <InfoItem icon={<Globe />} label="Region" value={formatValue(server.region)} />
            </div>
          </section>
          
          <section className="bg-black-700/80 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem icon={<UserPlus />} label="Team UI Limit" value={formatLimit(server.team_ui_limit)} />
              <InfoItem icon={<Users />} label="Group Limit" value={formatLimit(server.group_limit)} />
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
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center">
    {React.cloneElement(icon, { className: "text-primary mr-2", size: 18 })}
    <div className="ml-2">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  </div>
);

interface FlagInfoItemProps {
    countryCode: string;
    label: string;
    value: string;
  }
  
  const FlagInfoItem: React.FC<FlagInfoItemProps> = ({ countryCode, label, value }) => (
    <div className="flex items-center">
      {countryCode ? (
        <div className="w-[18px] h-[13.5px] mr-2 overflow-hidden">
          <Image
            src={`https://flagcdn.com/w20/${countryCode}.png`}
            alt={`${value} flag`}
            width={20}
            height={15}
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="ml-2">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-semibold text-white">{value}</p>
      </div>
    </div>
  );

export default ServerDetails;
