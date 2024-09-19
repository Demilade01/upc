// Filters
interface Filters {
  maximumPopulation: number[];
  nextWipe: string[];
  mapSize: number[];
  regions: string[];
  groupLimit: string[];
  teamUILimit: string[];
  rank: number[];
}

// Header
interface HeaderProps {
  setSearchQuery: (query: string) => void;
  serverType: string;
  setServerType: (type: string) => void;
}


// ServerDetails Props
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

// ServerProps
interface Server {
  _id: string;
  address: string;
  ip: string;
  port: number;
  name: string;
  rank: number;
  tags: string[];
  website_url: string;
  world_size: number;
  description: string;
  group_limit: number;
  team_ui_limit: number;
  component_rate: number;
  craft_rate: number;
  gather_rate: number;
  scrap_rate: number;
  upkeep: number;
  country_code: string;
  region: string;
  country: string;
  wipe_schedule: string;
  last_wipe: string;
  next_wipe: string;
  max_population_last_wipe: number;
  server_type: string;
}

// ServerInformationProps
interface ServerInformationProps {
  server: Server | null;
  loading: boolean;
}

// ServerlistProps
interface ServerListProps {
  searchQuery?: string;
  serverType?: string;
}

// SliderState
interface SliderState {
  minValue: number;
  maxValue: number;
  defaultValue: number[];
  marks: { value: number; label: string }[];
  step: number;
}



// InfoItemProps
interface InfoItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
  onClick?: () => void;
  className?: string;
}

// PaginationProps
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}


// ResourceRatesProps
interface ResourceRatesProps {
  server: {
    scrap_rate: number;
    craft_rate: number;
    gather_rate: number;
    upkeep: number;
  };
}

// RateItemsProps
interface RateItemProps {
  icon: string;
  label: string;
  value: string;
}

// ServerControlsProps
interface ServerControlsProps {
  serverIP: string;
  websiteURL: string;
}



