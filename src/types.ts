export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  highPriority?: boolean;
  season?: Season;
  reminder?: string; // ISO date string YYYY-MM-DD
}

export interface ToBuyItem {
  id: string;
  title: string;
  completed: boolean;
  highPriority?: boolean;
  quantity?: string;
}

export interface MeasurementItem {
  id: string;
  label: string;
  dimensions: string;
  notes?: string;
}

export interface MaintenanceEntry {
  id: string;
  date: string;
  title: string;
  category: string;
  notes: string;
}

export interface TravelEntry {
  id: string;
  date: string;
  route: string;
  distanceNm: string;
  conditions: string;
  notes: string;
}

export interface MiscItem {
  id: string;
  label: string;
  value: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  language: string;
  url: string;
}

export interface BoatProfile {
  boatName: string;
  sailNumber: string;
  hullType: 'Clinker Wood (Larch/Oak)' | 'Nordic GRP (Fibreglass)';
  buildYear: string;
  homePort: string;
  ownerName: string;
}

export type ViewRoute =
  | { view: 'home' }
  | { view: 'todo'; season?: Season }
  | { view: 'tobuy' }
  | { view: 'myboat'; tab: 'measurements' | 'maintenance' | 'travel' | 'misc' }
  | { view: 'resources' };

export type SortMode = 'custom' | 'alpha' | 'priority' | 'season';
export type LayoutMode = 'grid' | 'list';
