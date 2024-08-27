"use client";
import React, { useState } from 'react';
import {
  Trophy,
  Users,
  Server as ServerIcon,
  Map,
  Globe,
  Flag,
  UserPlus,
  Cpu,
  Hammer,
  Leaf,
  Home,
  Link,
  Bell,
} from 'lucide-react';
import { motion } from 'framer-motion';

const dummyServer = {
  id: '123',
  name: 'RustReborn.gg EU|Redwars | AimTrain | Creative | Arena | FFA',
  rank: 42,
  type: 'Modded',
  avgPopulation: 250,
  maxPlayers: 500,
  mapSize: '4500',
  address: 'rustreborneu.com',
  ip: '192.168.1.1:28015',
  teamUI: 'Enabled',
  groupLimit: 8,
  country: 'Germany',
  region: 'Europe',
  componentRate: '2x',
  scrapRate: '2x',
  craftRate: '2x',
  gatherRate: '2x',
  upkeepRate: '0.5x',
  lastWipe: '14/04/2023 17:00',
  nextWipe: '15/04/2023 10:00',
  nextFullWipe: '03/05/2023 15:00',
  description: 'Welcome to RustReborn.gg EU! Experience Rust like never before with unique plugins, active admins, and a community so friendly even a bear would give you a hug!',
  tags: ['PvP', 'No BP Wipe', '2x Resources', 'Monthly', 'Beginners Welcome'],
  website: 'https://rustreborneu.com',
};

const TestServer = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-white min-h-screen p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="rounded-lg p-6 mb-8 shadow-lg bg-gray-900 border border-gray-800"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h1 className="text-3xl font-bold mb-4 md:mb-0 text-primary">{dummyServer.name}</h1>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => {/* Implement connect logic */ }}
                className="bg-primary hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
                Connect Now!
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsNotificationEnabled(!isNotificationEnabled)}
                className={`${isNotificationEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center`}
              >
                <Bell className="mr-2" size={18} />
                {isNotificationEnabled ? 'Notifications On' : 'Enable Notifications'}
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href={dummyServer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
              >
                <Link className="mr-2" size={18} /> Visit Website
              </motion.a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <InfoItem
              icon={<Trophy className="text-yellow-500" size={24} />}
              label="Server Rank"
              value={`#${dummyServer.rank} (Climbing like a zerg!)`}
            />
            <InfoItem
              icon={<ServerIcon className="text-blue-500" size={24} />}
              label="Server Type"
              value={dummyServer.type}
            />
            <InfoItem
              icon={<Users className="text-green-500" size={24} />}
              label="Population"
              value={`${dummyServer.avgPopulation}/${dummyServer.maxPlayers}`}
            />
            <InfoItem
              icon={<Map className="text-purple-500" size={24} />}
              label="Map Size"
              value={`${dummyServer.mapSize} (Big enough to get lost!)`}
            />
            <InfoItem
              icon={<Globe className="text-indigo-500" size={24} />}
              label="Server Address"
              value={dummyServer.address}
            />
            <InfoItem
              icon={<Cpu className="text-pink-500" size={24} />}
              label="IP Address"
              value={dummyServer.ip}
            />
            <InfoItem
              icon={<UserPlus className="text-teal-500" size={24} />}
              label="Team UI"
              value={dummyServer.teamUI}
            />
            <InfoItem
              icon={<Users className="text-orange-500" size={24} />}
              label="Group Limit"
              value={`${dummyServer.groupLimit} (Squad up!)`}
            />
            <InfoItem
              icon={<Flag className="text-red-500" size={24} />}
              label="Country"
              value={dummyServer.country}
            />
            <InfoItem
              icon={<Globe className="text-blue-500" size={24} />}
              label="Region"
              value={dummyServer.region}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <RateItem label="Component Rate" value={dummyServer.componentRate} />
            <RateItem label="Scrap Rate" value={dummyServer.scrapRate} />
            <RateItem label="Craft Rate" value={dummyServer.craftRate} />
            <RateItem label="Gather Rate" value={dummyServer.gatherRate} />
            <RateItem label="Upkeep Rate" value={dummyServer.upkeepRate} />
          </div>

          <div className="border-t border-gray-800 pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Wipe Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <WipeInfo label="Last Wipe" date={dummyServer.lastWipe} />
              <WipeInfo label="Next Wipe" date={dummyServer.nextWipe} />
              <WipeInfo label="Next Full Wipe" date={dummyServer.nextFullWipe} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-900 rounded-lg p-6 mb-8 shadow-lg border border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">Server Description</h2>
          <p className="text-gray-300 leading-relaxed">{dummyServer.description}</p>
        </motion.div>

        <motion.div
          className="bg-gray-900 rounded-lg p-6 mb-8 shadow-lg border border-gray-800"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">Wipe Calendar</h2>
          <div className="grid grid-cols-7 gap-2">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
              <div
                key={day}
                className="text-center font-medium border-b border-gray-700 pb-2 text-gray-400"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className={`text-center p-2 ${i === 7 ? 'bg-primary text-white' : 'hover:bg-gray-800'
                  } cursor-pointer rounded transition duration-300 ease-in-out`}
              >
                {i + 1}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">Server Tags</h2>
          <div className="flex flex-wrap gap-2">
            {dummyServer.tags.map(tag => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1 }}
                className="bg-gray-800 text-primary px-3 py-1 rounded-full text-sm border border-primary"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-center bg-gray-800 p-3 rounded-lg shadow-md"
  >
    {icon}
    <div className="ml-3">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </motion.div>
);

const RateItem = ({ label, value }: { label: string; value: string | number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: 0.1 }}
    className="bg-gray-800 p-3 rounded-lg text-center shadow-md"
  >
    <h3 className="font-medium text-sm text-gray-400 mb-1">{label}</h3>
    <p className="text-xl font-bold text-primary">{value}</p>
  </motion.div>
);

const WipeInfo = ({ label, date }: { label: string; date: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    className="bg-gray-800 p-4 rounded-lg shadow-md"
  >
    <h3 className="font-medium text-gray-400 mb-2">{label}</h3>
    <p className="text-lg font-semibold">{date}</p>
  </motion.div>
);

export default TestServer;
