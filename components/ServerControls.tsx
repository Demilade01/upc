import React, { useState } from 'react';
import { Star, Link2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ServerControls: React.FC<ServerControlsProps> = ({ serverIP, websiteURL }) => {
  const [isFavourited, setIsFavourited] = useState(false);

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText('connect ' + text);
      toast.success('Server IP copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy server IP to clipboard!');
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => copyToClipboard(serverIP)}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded transition duration-300"
      >
        Connect Now
      </button>
      <button
        disabled={!isFavourited}
        className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded transition duration-300 flex items-center justify-center"
        onClick={() => setIsFavourited(true)}
      >
        <Star className="mr-2" size={18} />
        {isFavourited ? 'Added to Favourites' : 'Add to Favourites'}
      </button>
      <a
        href={websiteURL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition duration-300 flex items-center justify-center"
      >
        <Link2 className="mr-2" size={18} /> Server Website
      </a>
    </div>
  );
};

export default ServerControls;