import React from 'react';

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

export default InfoItem;
