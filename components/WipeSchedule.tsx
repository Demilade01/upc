import { formatDate } from '../hooks/datehelpers';

interface WipeScheduleProps {
  lastWipe: string;
  nextWipe: string;
  forceWipe: string;
}

const WipeSchedule: React.FC<WipeScheduleProps> = ({ lastWipe, nextWipe, forceWipe }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-white mb-4">Wipe Schedule</h2>
    <div className="bg-black-700/80 rounded-lg p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <WipeItem label="Last Wipe" date={formatDate(lastWipe)} />
        <WipeItem label="Next Wipe" date={formatDate(nextWipe)} />
        <WipeItem label="Force Wipe" date={formatDate(forceWipe)} />
      </div>
    </div>
  </div>
);

interface WipeItemProps {
  label: string;
  date: string;
}

const WipeItem: React.FC<WipeItemProps> = ({ label, date }) => (
  <div className="flex flex-col items-center space-y-2">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-semibold text-primary">{date}</p>
  </div>
);

export default WipeSchedule;
