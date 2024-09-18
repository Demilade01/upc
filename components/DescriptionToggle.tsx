import { ChevronDown, ChevronUp } from 'lucide-react';

interface DescriptionToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const DescriptionToggle: React.FC<DescriptionToggleProps> = ({ isExpanded, onToggle }) => (
  <div className="flex justify-center mt-2">
    <button onClick={onToggle} className="text-primary hover:text-primary-dark transition-colors duration-200 flex items-center">
      {isExpanded ? (
        <>
          Read Less <ChevronUp size={16} className="ml-1" />
        </>
      ) : (
        <>
          Read More <ChevronDown size={16} className="ml-1" />
        </>
      )}
    </button>
  </div>
);

export default DescriptionToggle;
