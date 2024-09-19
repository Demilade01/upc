import React from 'react';
import { Trophy, Users, Server as ServerIcon, Map, Globe, Flag, UserPlus, Cpu } from 'lucide-react';
import { toast } from 'react-toastify';
import InfoItem from './InfoItem';
import FlagInfoItem from './FlagInfoItem';
import { formatValue, formatLimit, capitalizeFirstLetter, copyToClipboard } from '../utils/formatHelpers';



const ServerDetails: React.FC<ServerDetailsProps> = ({ server }) => {
  const serverInfoItems = [
    { label: 'Rank', value: `#${formatValue(server.rank)}`, icon: <Trophy /> },
    { label: 'Server Type', value: formatValue(capitalizeFirstLetter(server.server_type)), icon: <ServerIcon /> },
    { label: 'Wipe Schedule', value: formatValue(server.wipe_schedule), icon: <Users /> },
    { label: 'Avg Population', value: formatValue(server.max_population_last_wipe), icon: <Users /> },
    { label: 'Map Size', value: formatValue(server.world_size), icon: <Map /> }
  ];

  const serverAddressItems = [
    { label: 'Address', value: formatValue(server.address), icon: <Globe />, clickValue: server.address },
    { label: 'IP', value: `${server.ip}:${server.port}`, icon: <Cpu />, clickValue: `${server.ip}:${server.port}` }
  ];

  const limitItems = [
    { label: 'Team UI Limit', value: formatLimit(server.team_ui_limit), icon: <UserPlus /> },
    { label: 'Group Limit', value: formatLimit(server.group_limit), icon: <Users /> }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Server Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Info Section */}
        <section className="bg-black-700/80 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serverInfoItems.map(item => item.value !== 'Unknown' && (
              <InfoItem key={item.label} icon={item.icon} label={item.label} value={item.value} />
            ))}
          </div>
        </section>

        <div className="space-y-4">
          {/* Address & IP Section */}
          <section className="bg-black-700/80 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serverAddressItems.map(item => item.value !== 'Unknown' && (
                <InfoItem 
                  key={item.label} 
                  icon={item.icon} 
                  label={item.label} 
                  value={item.value} 
                  onClick={() => copyToClipboard(item.clickValue!, toast)} 
                  className="cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded p-1"
                />
              ))}
              {server.country && server.country_code && (
                <FlagInfoItem 
                  countryCode={server.country_code.toLowerCase()} 
                  label="Country" 
                  value={formatValue(server.country)} 
                />
              )}
              {server.region && <InfoItem icon={<Globe />} label="Region" value={formatValue(server.region)} />}
            </div>
          </section>

          {/* Team & Group Limit Section */}
          <section className="bg-black-700/80 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {limitItems.map(item => (
                <InfoItem key={item.label} icon={item.icon} label={item.label} value={item.value} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ServerDetails;
