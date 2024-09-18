import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbProps {
  name: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ name }) => (
  <nav className="flex mb-6 mt-4 bg-black-700/80 p-3 rounded-lg" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-3">
      <li className="inline-flex items-center">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-primary transition-colors duration-200">
          <Home className="w-4 h-4 mr-2" />
          Home
        </Link>
      </li>
      <li aria-current="page">
        <div className="flex items-center">
          <ChevronRight className="w-5 h-5 text-gray-400" />
          <span className="ml-1 text-sm font-medium text-white md:ml-2">{name}</span>
        </div>
      </li>
    </ol>
  </nav>
);

export default Breadcrumb;
