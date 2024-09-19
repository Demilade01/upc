import React from 'react';
import Image from 'next/image';

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

export default FlagInfoItem;
