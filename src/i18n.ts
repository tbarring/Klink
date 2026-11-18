import { Season } from './types';

export type Language = 'en' | 'sv';

export interface Translations {
  nav: {
    overview: string;
    todo: string;
    tobuy: string;
    myboat: string;
    resources: string;
    backToOverview: string;
    vessel: string;
    language: string;
  };
  search: {
    placeholder: string;
    clear: string;
    switchToList: string;
    switchToGrid: string;
    sortItems: string;
    filteringFor: string;
    newEntry: string;
  };
  sort: {
    custom: string;
    alpha: string;
    priority: string;
    season: string;
  };
  seasons: Record<Season, string>;
  todo: {
    title: string;
    titleSeason: (season: Season) => string;
    all: string;
    listItem: string;
    addSeasonPlaceholder: (season: Season) => string;
    noMatching: string;
    noActiveSeason: (season: Season) => string;
    allCompleted: string;
    activeDone: (active: number, done: number) => string;
    openFullList: string;
    clear: string;
    highPriority: string;
    dragToReorder: string;
  };
  tobuy: {
    title: string;
    listItem: string;
    itemPlaceholder: string;
    qtyPlaceholder: string;
    add: string;
    cancel: string;
    noMatching: string;
    listClear: string;
    neededBought: (needed: number, bought: number) => string;
    openFullList: string;
    clear: string;
  };
  options: {
    markPriority: string;
    removePriority: string;
    selectSeason: string;
    setReminder: string;
    deleteTask: string;
    back: string;
    clearSeason: string;
    reminderDate: string;
    save: string;
    clear: string;
  };
  myboat: {
    title: string;
    measurements: string;
    maintenance: string;
    travel: string;
    misc: string;
    noMatching: string;
    addMeasurement: string;
    partPlaceholder: string;
    dimPlaceholder: string;
    notesUnitPlaceholder: string;
    saveMeasurement: string;
    logMaintenance: string;
    workPlaceholder: string;
    maintNotesPlaceholder: string;
    saveEntry: string;
    logVoyage: string;
    routePlaceholder: string;
    distancePlaceholder: string;
    conditionsPlaceholder: string;
    travelNotesPlaceholder: string;
    saveVoyage: string;
    addNote: string;
    miscLabelPlaceholder: string;
    miscValuePlaceholder: string;
    saveNote: string;
    cancel: string;
    categories: Record<string, string>;
  };
  resources: {
    title: string;
    all: string;
    listItem: string;
    titlePlaceholder: string;
    urlPlaceholder: string;
    saveLink: string;
    cancel: string;
    noMatching: string;
    linksCount: (count: number) => string;
    viewAll: string;
  };
  modals: {
    addToKlink: string;
    tabs: {
      todo: string;
      tobuy: string;
      measurement: string;
      resource: string;
    };
    labels: {
      todo: string;
      tobuy: string;
      measurement: string;
      resource: string;
      seasonOptional: string;
      anySeason: string;
      highPriority: string;
      qtyOptional: string;
      dimensions: string;
      url: string;
      language: string;
    };
    placeholders: {
      todo: string;
      tobuy: string;
      measurement: string;
      resource: string;
      qty: string;
      dimensions: string;
    };
    saveItem: string;
    cancel: string;
    vesselProfile: string;
    boatName: string;
    sailNumber: string;
    hullConstruction: string;
    hullWood: string;
    hullGrp: string;
    buildYear: string;
    homePort: string;
    ownerSkipper: string;
    restoreDemo: string;
    confirmReset: string;
    saveVessel: string;
    share: string;
    downloadTxt: string;
    copyText: string;
    copied: string;
  };
  toasts: {
    taskRemoved: string;
    itemRemoved: string;
    noCompletedToClear: string;
    clearedCompleted: (count: number) => string;
    noPurchasedToClear: string;
    clearedPurchased: (count: number) => string;
    restoredDemo: string;
    undo: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      overview: 'Overview',
      todo: 'To Do List',
      tobuy: 'To Buy List',
      myboat: 'My Boat',
      resources: 'Resources',
      backToOverview: 'Back to overview',
      vessel: 'Vessel',
      language: 'Language',
    },
    search: {
      placeholder: 'Search your notes',
      clear: 'Clear search',
      switchToList: 'Switch to single-column list',
      switchToGrid: 'Switch to grid layout',
      sortItems: 'Sort items',
      filteringFor: 'Filtering across all sections for',
      newEntry: 'New entry',
    },
    sort: {
      custom: 'Custom order',
      alpha: 'Alphabetical (A–Z)',
      priority: 'High priority first',
      season: 'By season',
    },
    seasons: {
      spring: 'Spring',
      summer: 'Summer',
      autumn: 'Autumn',
      winter: 'Winter',
    },
    todo: {
      title: 'To Do List',
      titleSeason: (s) => `To Do List- ${TRANSLATIONS.en.seasons[s]}`,
      all: 'All',
      listItem: 'List item',
      addSeasonPlaceholder: (s) => `Add ${TRANSLATIONS.en.seasons[s].toLowerCase()} task...`,
      noMatching: 'No matching tasks found.',
      noActiveSeason: (s) => `No active tasks for ${TRANSLATIONS.en.seasons[s]}.`,
      allCompleted: 'All tasks completed.',
      activeDone: (active, done) => `${active} active · ${done} done`,
      openFullList: 'Open full list →',
      clear: 'Clear',
      highPriority: 'High priority',
      dragToReorder: 'Drag to reorder',
    },
    tobuy: {
      title: 'To Buy List',
      listItem: 'List item',
      itemPlaceholder: 'Supply or chandlery item',
      qtyPlaceholder: 'Qty (optional)',
      add: 'Add',
      cancel: 'Cancel',
      noMatching: 'No matching supplies found.',
      listClear: 'Shopping list is clear.',
      neededBought: (needed, bought) => `${needed} needed · ${bought} bought`,
      openFullList: 'Open full list →',
      clear: 'Clear',
    },
    options: {
      markPriority: 'Mark as high priority',
      removePriority: 'Remove high priority',
      selectSeason: 'Select season',
      setReminder: 'Set a reminder',
      deleteTask: 'Delete task',
      back: 'Back',
      clearSeason: 'Clear season',
      reminderDate: 'Reminder date',
      save: 'Save',
      clear: 'Clear',
    },
    myboat: {
      title: 'My Boat',
      measurements: 'Measurements',
      maintenance: 'Maintenance Log',
      travel: 'Travel log',
      misc: 'Miscellaneous',
      noMatching: 'No matching My Boat sections.',
      addMeasurement: 'Add measurement',
      partPlaceholder: 'Part (e.g. Forepeak bunk)',
      dimPlaceholder: 'Dimensions (e.g. 195L x 68W)',
      notesUnitPlaceholder: 'Notes or units (optional, e.g. cm)',
      saveMeasurement: 'Save measurement',
      logMaintenance: 'Log maintenance work',
      workPlaceholder: 'Work completed (e.g. Replaced jib sheets)',
      maintNotesPlaceholder: 'Products used, coat count, or inspection notes...',
      saveEntry: 'Save entry',
      logVoyage: 'Log voyage',
      routePlaceholder: 'Route (e.g. Saltsjöbaden → Möja)',
      distancePlaceholder: 'Distance (e.g. 14.5 nm)',
      conditionsPlaceholder: 'Wind / Sea (e.g. W 12 kn)',
      travelNotesPlaceholder: 'Logbook notes, crew, sail trim observations...',
      saveVoyage: 'Save voyage',
      addNote: 'Add note',
      miscLabelPlaceholder: 'Label (e.g. Insurance policy or Rigging shop)',
      miscValuePlaceholder: 'Details...',
      saveNote: 'Save note',
      cancel: 'Cancel',
      categories: {
        Woodwork: 'Woodwork',
        Hull: 'Hull',
        Rigging: 'Rigging',
        'Sails & Canvas': 'Sails & Canvas',
        'Engine & Bilge': 'Engine & Bilge',
        Electrical: 'Electrical',
      },
    },
    resources: {
      title: 'Resources',
      all: 'All',
      listItem: 'List item',
      titlePlaceholder: 'Resource title',
      urlPlaceholder: 'https://...',
      saveLink: 'Save link',
      cancel: 'Cancel',
      noMatching: 'No matching resources found.',
      linksCount: (count) => `${count} links`,
      viewAll: 'View all resources →',
    },
    modals: {
      addToKlink: 'Add to Klink',
      tabs: {
        todo: 'To Do',
        tobuy: 'To Buy',
        measurement: 'Measurement',
        resource: 'Resource',
      },
      labels: {
        todo: 'Task description',
        tobuy: 'Item name',
        measurement: 'Boat part or compartment',
        resource: 'Resource title',
        seasonOptional: 'Season (optional)',
        anySeason: 'Any season',
        highPriority: 'High priority (!)',
        qtyOptional: 'Quantity or size (optional)',
        dimensions: 'Dimensions',
        url: 'URL',
        language: 'Language',
      },
      placeholders: {
        todo: 'e.g. Varnish cockpit coaming',
        tobuy: 'e.g. Bronze shackles 6mm',
        measurement: 'e.g. Companionway hatch',
        resource: 'e.g. Nordic Folkboat Rigging Guide',
        qty: 'e.g. 2 liters',
        dimensions: 'e.g. 64W x 48H',
      },
      saveItem: 'Save item',
      cancel: 'Cancel',
      vesselProfile: 'Vessel Profile',
      boatName: 'Boat Name',
      sailNumber: 'Sail Number',
      hullConstruction: 'Hull Construction',
      hullWood: 'Clinker Wood (Larch/Oak)',
      hullGrp: 'Nordic GRP (Fibreglass)',
      buildYear: 'Build Year',
      homePort: 'Home Port',
      ownerSkipper: 'Owner / Skipper',
      restoreDemo: 'Restore default demo data',
      confirmReset: 'Confirm reset',
      saveVessel: 'Save vessel',
      share: 'Share',
      downloadTxt: 'Download .txt',
      copyText: 'Copy text',
      copied: 'Copied',
    },
    toasts: {
      taskRemoved: 'Task removed',
      itemRemoved: 'Item removed',
      noCompletedToClear: 'No completed tasks to clear',
      clearedCompleted: (count) =>
        `Cleared ${count} completed task${count > 1 ? 's' : ''}`,
      noPurchasedToClear: 'No purchased items to clear',
      clearedPurchased: (count) =>
        `Cleared ${count} purchased item${count > 1 ? 's' : ''}`,
      restoredDemo: 'Restored default Nordic Folkboat data',
      undo: 'Undo',
    },
  },
  sv: {
    nav: {
      overview: 'Översikt',
      todo: 'Att göra-lista',
      tobuy: 'Inköpslista',
      myboat: 'Min båt',
      resources: 'Resurser',
      backToOverview: 'Tillbaka till översikt',
      vessel: 'Båt',
      language: 'Språk',
    },
    search: {
      placeholder: 'Sök i dina anteckningar',
      clear: 'Rensa sökning',
      switchToList: 'Byt till enkelkolumn',
      switchToGrid: 'Byt till rutnät',
      sortItems: 'Sortera poster',
      filteringFor: 'Filtrerar alla avsnitt efter',
      newEntry: 'Ny post',
    },
    sort: {
      custom: 'Egen ordning',
      alpha: 'Alfabetisk (A–Ö)',
      priority: 'Hög prioritet först',
      season: 'Efter säsong',
    },
    seasons: {
      spring: 'Vår',
      summer: 'Sommar',
      autumn: 'Höst',
      winter: 'Vinter',
    },
    todo: {
      title: 'Att göra-lista',
      titleSeason: (s) => `Att göra-lista- ${TRANSLATIONS.sv.seasons[s]}`,
      all: 'Alla',
      listItem: 'Ny punkt',
      addSeasonPlaceholder: (s) => `Lägg till ${TRANSLATIONS.sv.seasons[s].toLowerCase()}uppgift...`,
      noMatching: 'Inga matchande uppgifter hittades.',
      noActiveSeason: (s) => `Inga aktiva uppgifter för ${TRANSLATIONS.sv.seasons[s].toLowerCase()}.`,
      allCompleted: 'Alla uppgifter klara.',
      activeDone: (active, done) => `${active} aktiva · ${done} klara`,
      openFullList: 'Öppna hela listan →',
      clear: 'Rensa',
      highPriority: 'Hög prioritet',
      dragToReorder: 'Dra för att ändra ordning',
    },
    tobuy: {
      title: 'Inköpslista',
      listItem: 'Ny punkt',
      itemPlaceholder: 'Material eller båttillbehör',
      qtyPlaceholder: 'Antal (valfritt)',
      add: 'Lägg till',
      cancel: 'Avbryt',
      noMatching: 'Inga matchande inköp hittades.',
      listClear: 'Inköpslistan är tom.',
      neededBought: (needed, bought) => `${needed} kvar · ${bought} köpta`,
      openFullList: 'Öppna hela listan →',
      clear: 'Rensa',
    },
    options: {
      markPriority: 'Markera som hög prioritet',
      removePriority: 'Ta bort hög prioritet',
      selectSeason: 'Välj säsong',
      setReminder: 'Ange påminnelse',
      deleteTask: 'Ta bort uppgift',
      back: 'Tillbaka',
      clearSeason: 'Rensa säsong',
      reminderDate: 'Påminnelsedatum',
      save: 'Spara',
      clear: 'Rensa',
    },
    myboat: {
      title: 'Min båt',
      measurements: 'Mått',
      maintenance: 'Underhållslogg',
      travel: 'Seglingslogg',
      misc: 'Övrigt',
      noMatching: 'Inga matchande avsnitt under Min båt.',
      addMeasurement: 'Lägg till mått',
      partPlaceholder: 'Del (t.ex. Förpikskoj)',
      dimPlaceholder: 'Mått (t.ex. 195L x 68B)',
      notesUnitPlaceholder: 'Anteckning eller enhet (valfritt, t.ex. cm)',
      saveMeasurement: 'Spara mått',
      logMaintenance: 'Logga underhållsarbete',
      workPlaceholder: 'Utfört arbete (t.ex. Bytt fockskot)',
      maintNotesPlaceholder: 'Produkter, antal strykningar eller besiktningsnotering...',
      saveEntry: 'Spara post',
      logVoyage: 'Logga segling',
      routePlaceholder: 'Rutt (t.ex. Saltsjöbaden → Möja)',
      distancePlaceholder: 'Distans (t.ex. 14,5 M)',
      conditionsPlaceholder: 'Vind / Sjö (t.ex. V 6 m/s)',
      travelNotesPlaceholder: 'Loggboksanteckningar, besättning, segeltrim...',
      saveVoyage: 'Spara segling',
      addNote: 'Lägg till anteckning',
      miscLabelPlaceholder: 'Rubrik (t.ex. Försäkring eller Riggverkstad)',
      miscValuePlaceholder: 'Detaljer...',
      saveNote: 'Spara anteckning',
      cancel: 'Avbryt',
      categories: {
        Woodwork: 'Träarbete',
        Hull: 'Skrov',
        Rigging: 'Rigg',
        'Sails & Canvas': 'Segel & Kapell',
        'Engine & Bilge': 'Motor & Läns',
        Electrical: 'El',
      },
    },
    resources: {
      title: 'Resurser',
      all: 'Alla',
      listItem: 'Ny punkt',
      titlePlaceholder: 'Länkrubrik',
      urlPlaceholder: 'https://...',
      saveLink: 'Spara länk',
      cancel: 'Avbryt',
      noMatching: 'Inga matchande resurser hittades.',
      linksCount: (count) => `${count} länkar`,
      viewAll: 'Visa alla resurser →',
    },
    modals: {
      addToKlink: 'Lägg till i Klink',
      tabs: {
        todo: 'Att göra',
        tobuy: 'Att köpa',
        measurement: 'Mått',
        resource: 'Resurs',
      },
      labels: {
        todo: 'Uppgiftsbeskrivning',
        tobuy: 'Artikelnamn',
        measurement: 'Båtdel eller utrymme',
        resource: 'Resursrubrik',
        seasonOptional: 'Säsong (valfritt)',
        anySeason: 'Valfri säsong',
        highPriority: 'Hög prioritet (!)',
        qtyOptional: 'Antal eller storlek (valfritt)',
        dimensions: 'Mått',
        url: 'Webbadress (URL)',
        language: 'Språk',
      },
      placeholders: {
        todo: 't.ex. Fernissa sittbrunnssarg',
        tobuy: 't.ex. Bronsschackel 6 mm',
        measurement: 't.ex. Rufflucka',
        resource: 't.ex. Rigg guide för Nordisk Folkbåt',
        qty: 't.ex. 2 liter',
        dimensions: 't.ex. 64B x 48H',
      },
      saveItem: 'Spara post',
      cancel: 'Avbryt',
      vesselProfile: 'Båtprofil',
      boatName: 'Båtnamn',
      sailNumber: 'Segelnummer',
      hullConstruction: 'Skrovmaterial',
      hullWood: 'Klinkbyggd trä (lärk/ek)',
      hullGrp: 'Plast (GRP)',
      buildYear: 'Byggår',
      homePort: 'Hemmahamn',
      ownerSkipper: 'Ägare / Skeppare',
      restoreDemo: 'Återställ standarddata',
      confirmReset: 'Bekräfta återställning',
      saveVessel: 'Spara båtprofil',
      share: 'Dela',
      downloadTxt: 'Ladda ner .txt',
      copyText: 'Kopiera text',
      copied: 'Kopierad',
    },
    toasts: {
      taskRemoved: 'Uppgift borttagen',
      itemRemoved: 'Artikel borttagen',
      noCompletedToClear: 'Inga klara uppgifter att rensa',
      clearedCompleted: (count) =>
        `Rensade ${count} klar${count > 1 ? 'a' : ''} uppgift${count > 1 ? 'er' : ''}`,
      noPurchasedToClear: 'Inga köpta artiklar att rensa',
      clearedPurchased: (count) =>
        `Rensade ${count} köpt${count > 1 ? 'a' : ''} artikel${count > 1 ? 'ar' : ''}`,
      restoredDemo: 'Standarddata för Nordisk Folkbåt återställd',
      undo: 'Ångra',
    },
  },
};

/* Swedish translations for preloaded seeded items so switching EN <-> SV translates the full demo dataset */
export const SV_SEED_TODOS: Record<string, string> = {
  'todo-1': 'Laga segel',
  'todo-2': 'Splitsa fall',
  'todo-3': 'Byt fönstertätning',
  'todo-4': 'Slipa roder',
  'todo-5': 'Laga rorkult',
  'todo-6': 'Slipa och måla skrov',
  'todo-7': 'Byt däcksduk',
  'todo-8': 'Laga mast',
  'todo-9': 'Ta av fendrar',
  'todo-10': 'Installera elpanel',
  'todo-11': 'Montera beslag på förluckan',
  'todo-12': 'Fyll på bränsletank',
  'todo-13': 'Installera taklampa',
};

export const SV_SEED_TOBUY: Record<string, { title: string; quantity?: string }> = {
  'buy-1': { title: 'Vit färg', quantity: '2,5 L' },
  'buy-2': { title: 'Nya fendrar', quantity: '4 st' },
  'buy-3': { title: 'Öljetter' },
  'buy-4': { title: 'Åror', quantity: '1 par' },
};

export const SV_SEED_MEASUREMENTS: Record<string, { label: string; notes?: string }> = {
  'meas-1': { label: 'Fönster', notes: 'Ruffens babord & styrbord akrylglas (cm)' },
  'meas-2': { label: 'Hylla på sidan av ruffen', notes: 'Avsmalnande förut (cm)' },
  'meas-3': { label: 'Skåp bakom spisen', notes: 'Öppning till pentryskåp (cm)' },
};

export const SV_SEED_MAINTENANCE: Record<
  string,
  { title: string; notes: string }
> = {
  'maint-1': {
    title: 'Fernissat sittbrunnssarg & relingslist i mahogny',
    notes: 'Lätt slipning med 240-papper och 3 strykningar Epifanes klarlack.',
  },
  'maint-2': {
    title: 'Vårens bottenmålning',
    notes: 'Skrapat lös färg längs borden och rollat två lager kopparfri Östersjöfärg.',
  },
  'maint-3': {
    title: 'Inspektion av stående rigg & vantskruvar',
    notes: 'Kontrollerat ändstycken, saxsprintar samt smort bronsvantskruvar med lanolinfett.',
  },
  'maint-4': {
    title: 'Vinterkonservering av utombordare & länspump',
    notes: 'Spolat kylkanal, konserverat cylinder och oljat durkar av ek före täckning.',
  },
};

export const SV_SEED_TRAVEL: Record<
  string,
  { conditions: string; notes: string }
> = {
  'travel-1': {
    conditions: 'SV 6–8 m/s, lätt sjö',
    notes: 'Fin kryss över Baggensfjärden, revade storseglet förbi Kanholmsfjärden.',
  },
  'travel-2': {
    conditions: 'NV 5 m/s, klar himmel',
    notes: 'Stabil slör i ytterskärgården; ankrade lugnt för lunch vid Nåtarö.',
  },
  'travel-3': {
    conditions: 'O 7 m/s, byar 9 m/s',
    notes: 'Tredjeplats i Folkbåtsklassen; justering av fockskotpunkt förbättrade höjdtagningen.',
  },
};

export const SV_SEED_MISC: Record<string, { label: string; value: string }> = {
  'misc-1': {
    label: 'Klass & konstruktion',
    value: 'Nordisk Folkbåt (Tord Sundén, 1942) · LÖA 7,64 m · Djupgående 1,20 m',
  },
  'misc-2': {
    label: 'Segelyta',
    value: '24,0 m² (Storsegel 16,5 m² + Fock 7,5 m²)',
  },
  'misc-3': {
    label: 'Båtplats',
    value: 'Brygga C, plats 14 — Nyckelbricka #208',
  },
  'misc-4': {
    label: 'Vintertäckning & stöttor',
    value: 'A-ställning med granås (8,2 m), andande presenning i klubbskjul 2',
  },
};
