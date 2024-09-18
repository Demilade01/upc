import engLogo from '../public/images/eng.png';

// Header
export const serverTypes = [
  { type: 'all', label: 'All', iconInactive: null, iconActive: null },
  { type: 'official', label: 'Official', iconInactive: './images/official_inactive.svg', iconActive: './images/official_active.svg' },
  { type: 'modded', label: 'Modded', iconInactive: './images/modded_inactive.svg', iconActive: './images/modded_active.svg' },
  { type: 'community', label: 'Community', iconInactive: './images/community_inactive.svg', iconActive: './images/community_active.svg' },
  { type: 'favourites', label: 'Favourites', iconInactive: './images/favourites_inactive.svg', iconActive: './images/favourites_active.svg' },
];

// Language and Country

export const country = [
  { key: "1", value: "Portugal" },
  { key: "2", value: "England" },
  { key: "3", value: "London" },
];

export const CountryContent = [
  { id: 1, name: "Portugal" },
  { id: 2, name: "England" },
  { id: 3, name: "London" },
];

export const LangContent = [
  { id: 1,img: engLogo , name: "ENG" },
  { id: 2,img: engLogo , name: "FRC" },
  { id: 3,img: engLogo , name: "SPA" },
];