import Image from 'next/image';

const ResourceRates: React.FC<ResourceRatesProps> = ({ server }) => (
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
);

const RateItem: React.FC<RateItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 place-content-center">
    <div className="flex-shrink-0">
      <Image src={icon} alt={label} width={32} height={32} className="inline-block" />
    </div>
    <div className="flex flex-col">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-semibold text-primary">{value}x</p>
    </div>
  </div>
);

export default ResourceRates;
