import {
  BoatProfile,
  MaintenanceEntry,
  MeasurementItem,
  MiscItem,
  ResourceItem,
  ToBuyItem,
  TodoItem,
  TravelEntry,
} from '../types';

export const INITIAL_BOAT_PROFILE: BoatProfile = {
  boatName: 'S/Y Freja',
  sailNumber: 'SWE 412',
  hullType: 'Clinker Wood (Larch/Oak)',
  buildYear: '1968',
  homePort: 'Saltsjöbaden',
  ownerName: 'Skipper',
};

export const INITIAL_TODOS: TodoItem[] = [
  {
    id: 'todo-1',
    title: 'Repair sail',
    completed: false,
    highPriority: true,
  },
  {
    id: 'todo-2',
    title: 'Splice halyard',
    completed: false,
  },
  {
    id: 'todo-3',
    title: 'Replace window sealant',
    completed: false,
    season: 'spring',
  },
  {
    id: 'todo-4',
    title: 'Sand rudder',
    completed: false,
  },
  {
    id: 'todo-5',
    title: 'Repair tiller',
    completed: false,
    season: 'winter',
  },
  {
    id: 'todo-6',
    title: 'Sand and paint hull',
    completed: false,
    season: 'spring',
  },
  {
    id: 'todo-7',
    title: 'Replace deck canvas',
    completed: false,
    season: 'spring',
  },
  {
    id: 'todo-8',
    title: 'Repair mast',
    completed: false,
    season: 'spring',
  },
  {
    id: 'todo-9',
    title: 'Remove fenders',
    completed: true,
  },
  {
    id: 'todo-10',
    title: 'Install electrical panel',
    completed: true,
  },
  {
    id: 'todo-11',
    title: 'Install lever on front hatch',
    completed: true,
    season: 'spring',
  },
  {
    id: 'todo-12',
    title: 'Refill fuel tank',
    completed: true,
    season: 'spring',
  },
  {
    id: 'todo-13',
    title: 'Install overhead light',
    completed: true,
  },
];

export const INITIAL_TOBUY: ToBuyItem[] = [
  {
    id: 'buy-1',
    title: 'White paint',
    completed: false,
    quantity: '2.5 L',
  },
  {
    id: 'buy-2',
    title: 'New fenders',
    completed: false,
    quantity: '4 pcs',
  },
  {
    id: 'buy-3',
    title: 'Grommets',
    completed: false,
  },
  {
    id: 'buy-4',
    title: 'Oars',
    completed: false,
    quantity: '1 pair',
  },
];

export const INITIAL_MEASUREMENTS: MeasurementItem[] = [
  {
    id: 'meas-1',
    label: 'Windows',
    dimensions: '96W x 10H',
    notes: 'Cabin port & starboard acrylic panes (cm)',
  },
  {
    id: 'meas-2',
    label: 'Shelf on side of cabin',
    dimensions: '170L x 19/21D',
    notes: 'Tapered forward depth (cm)',
  },
  {
    id: 'meas-3',
    label: 'Cabinet behind stove',
    dimensions: '44W x 38H',
    notes: 'Galley bulkhead locker opening (cm)',
  },
];

export const INITIAL_MAINTENANCE: MaintenanceEntry[] = [
  {
    id: 'maint-1',
    date: '2026-05-14',
    title: 'Mahogany coaming & toe rail varnish',
    category: 'Woodwork',
    notes: 'Lightly sanded with 240 grit and applied 3 coats of Epifanes clear gloss.',
  },
  {
    id: 'maint-2',
    date: '2026-04-26',
    title: 'Spring antifouling bottom coat',
    category: 'Hull',
    notes: 'Scraped loose flakes along clinker lands and rolled two coats of copper-free Baltic antifouling.',
  },
  {
    id: 'maint-3',
    date: '2026-04-11',
    title: 'Standing rigging & turnbuckle inspection',
    category: 'Rigging',
    notes: 'Checked swages, cotter pins, and lubricated bronze bottle screws with lanolin grease.',
  },
  {
    id: 'maint-4',
    date: '2025-10-18',
    title: 'Winterize outboard & drain bilge',
    category: 'Engine & Bilge',
    notes: 'Flushed cooling circuit, fogged cylinder, oiled oak floorboards before winter cover.',
  },
];

export const INITIAL_TRAVEL: TravelEntry[] = [
  {
    id: 'travel-1',
    date: '2026-08-09',
    route: 'Saltsjöbaden → Sandhamn',
    distanceNm: '22.4 nm',
    conditions: 'SW 12–16 kn, slight chop',
    notes: 'Clean beat through Baggensfjärden, reefed mainsail past Kanholmsfjärden.',
  },
  {
    id: 'travel-2',
    date: '2026-07-19',
    route: 'Sandhamn → Utö (Gruvbryggan)',
    distanceNm: '28.0 nm',
    conditions: 'NW 10 kn, clear sky',
    notes: 'Steady broad reach in the outer archipelago; anchored quietly for lunch at Nåtarö.',
  },
  {
    id: 'travel-3',
    date: '2026-06-06',
    route: 'Baggen Club Regatta Course',
    distanceNm: '11.5 nm',
    conditions: 'E 14 kn, gusts 18 kn',
    notes: 'Finished 3rd in Folkboat class; jib sheet fairlead adjustment improved pointing.',
  },
];

export const INITIAL_MISC: MiscItem[] = [
  {
    id: 'misc-1',
    label: 'Class & Design',
    value: 'Nordic Folkboat (Tord Sundén, 1942) · LOA 7.64 m · Draft 1.20 m',
  },
  {
    id: 'misc-2',
    label: 'Sail Area',
    value: '24.0 m² (Mainsail 16.5 m² + Jib 7.5 m²)',
  },
  {
    id: 'misc-3',
    label: 'Marina Berth',
    value: 'Pier C, Slip 14 — Key fob #208',
  },
  {
    id: 'misc-4',
    label: 'Winter Cradle & Cover',
    value: 'A-frame spruce ridge pole (8.2 m), breathable canvas tarp stored in Club Shed 2',
  },
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Nordic Folkboat International Association',
    language: 'Eng',
    url: 'https://www.folkboat.com',
  },
  {
    id: 'res-2',
    title: 'NFIA Class Rules',
    language: 'Eng',
    url: 'https://www.folkboat.com/class-rules',
  },
  {
    id: 'res-3',
    title: 'GBR Folkboat Association',
    language: 'Eng',
    url: 'https://www.folkboats.co.uk',
  },
  {
    id: 'res-4',
    title: 'Svenska Folkbåtsförbundet',
    language: 'Swe',
    url: 'https://www.folkbat.se',
  },
  {
    id: 'res-5',
    title: 'Tips - Reparationer',
    language: 'Swe',
    url: 'https://www.folkbat.se/tips-reparationer',
  },
  {
    id: 'res-6',
    title: 'Tips - Förbättringar',
    language: 'Swe',
    url: 'https://www.folkbat.se/tips-forbattringar',
  },
  {
    id: 'res-7',
    title: 'Tips - Underhåll',
    language: 'Swe',
    url: 'https://www.folkbat.se/tips-underhall',
  },
  {
    id: 'res-8',
    title: 'The WoodenBoat Forum',
    language: 'Eng',
    url: 'https://forum.woodenboat.com',
  },
  {
    id: 'res-9',
    title: 'Dansk Folkebådsklub',
    language: 'Dan',
    url: 'https://www.folkebaad.dk',
  },
  {
    id: 'res-10',
    title: 'Tips - Rigging, trim, and decor',
    language: 'Dan',
    url: 'https://www.folkebaad.dk/tips',
  },
  {
    id: 'res-11',
    title: '10 tips for wooden and fibreglass boats',
    language: 'Dan',
    url: 'https://www.folkebaad.dk/10-tips',
  },
  {
    id: 'res-12',
    title: 'Friends of the Nordic Folkboat - Facebook',
    language: 'Eng',
    url: 'https://www.facebook.com/groups/nordicfolkboat',
  },
  {
    id: 'res-13',
    title: 'Nordic Folkboat International Association - Facebook',
    language: 'Eng',
    url: 'https://www.facebook.com/nordicfolkboat',
  },
  {
    id: 'res-14',
    title: 'Svenska Folkbåtsförbundet - Facebook',
    language: 'Swe',
    url: 'https://www.facebook.com/folkbat',
  },
];
