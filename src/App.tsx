import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpDown,
  ChevronLeft,
  LayoutGrid,
  List,
  Plus,
  Search,
  Share,
  Trash2,
  UserCircle2,
  X,
} from 'lucide-react';
import {
  INITIAL_BOAT_PROFILE,
  INITIAL_MAINTENANCE,
  INITIAL_MEASUREMENTS,
  INITIAL_MISC,
  INITIAL_RESOURCES,
  INITIAL_TOBUY,
  INITIAL_TODOS,
  INITIAL_TRAVEL,
} from './data/initialData';
import {
  BoatProfile,
  LayoutMode,
  MaintenanceEntry,
  MeasurementItem,
  MiscItem,
  ResourceItem,
  Season,
  SortMode,
  ToBuyItem,
  TodoItem,
  TravelEntry,
  ViewRoute,
} from './types';
import {
  Language,
  SV_SEED_MAINTENANCE,
  SV_SEED_MEASUREMENTS,
  SV_SEED_MISC,
  SV_SEED_TOBUY,
  SV_SEED_TODOS,
  SV_SEED_TRAVEL,
  TRANSLATIONS,
} from './i18n';
import { KlinkLogoPill, SeasonIcon } from './components/KlinkIcons';
import { TodoListView } from './components/TodoListView';
import { ToBuyListView } from './components/ToBuyListView';
import { MyBoatDetailView, MyBoatHomeCard, MyBoatTab } from './components/MyBoatSection';
import { ResourcesView } from './components/ResourcesView';
import { ProfileModal, QuickAddModal, ShareModal } from './components/Modals';

const STORAGE_KEY = 'klink_folkboat_app_v1';

interface StoredState {
  todos: TodoItem[];
  toBuy: ToBuyItem[];
  measurements: MeasurementItem[];
  maintenance: MaintenanceEntry[];
  travel: TravelEntry[];
  misc: MiscItem[];
  resources: ResourceItem[];
  boatProfile: BoatProfile;
  layoutMode: LayoutMode;
  sortMode: SortMode;
  language: Language;
}

function loadInitialState(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoredState>;
      return {
        todos: parsed.todos ?? INITIAL_TODOS,
        toBuy: parsed.toBuy ?? INITIAL_TOBUY,
        measurements: parsed.measurements ?? INITIAL_MEASUREMENTS,
        maintenance: parsed.maintenance ?? INITIAL_MAINTENANCE,
        travel: parsed.travel ?? INITIAL_TRAVEL,
        misc: parsed.misc ?? INITIAL_MISC,
        resources: parsed.resources ?? INITIAL_RESOURCES,
        boatProfile: parsed.boatProfile ?? INITIAL_BOAT_PROFILE,
        layoutMode: parsed.layoutMode ?? 'grid',
        sortMode: parsed.sortMode ?? 'custom',
        language: parsed.language ?? 'en',
      };
    }
  } catch {
    // Fall back to default data
  }
  return {
    todos: INITIAL_TODOS,
    toBuy: INITIAL_TOBUY,
    measurements: INITIAL_MEASUREMENTS,
    maintenance: INITIAL_MAINTENANCE,
    travel: INITIAL_TRAVEL,
    misc: INITIAL_MISC,
    resources: INITIAL_RESOURCES,
    boatProfile: INITIAL_BOAT_PROFILE,
    layoutMode: 'grid',
    sortMode: 'custom',
    language: 'en',
  };
}

function LanguageSwitch({
  lang,
  onChange,
}: {
  lang: Language;
  onChange: (next: Language) => void;
}) {
  return (
    <div
      className="inline-flex items-center rounded-full bg-white p-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] shrink-0"
      role="group"
      aria-label={TRANSLATIONS[lang].nav.language}
    >
      <button
        type="button"
        onClick={() => onChange('en')}
        aria-pressed={lang === 'en'}
        className={`px-2.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
          lang === 'en'
            ? 'bg-[#006994] text-white'
            : 'text-[#525855] hover:text-[#111413]'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange('sv')}
        aria-pressed={lang === 'sv'}
        className={`px-2.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
          lang === 'sv'
            ? 'bg-[#006994] text-white'
            : 'text-[#525855] hover:text-[#111413]'
        }`}
      >
        SV
      </button>
    </div>
  );
}

export default function App() {
  const initial = useMemo(() => loadInitialState(), []);

  const [todos, setTodos] = useState<TodoItem[]>(initial.todos);
  const [toBuy, setToBuy] = useState<ToBuyItem[]>(initial.toBuy);
  const [measurements, setMeasurements] = useState<MeasurementItem[]>(initial.measurements);
  const [maintenance, setMaintenance] = useState<MaintenanceEntry[]>(initial.maintenance);
  const [travel, setTravel] = useState<TravelEntry[]>(initial.travel);
  const [misc, setMisc] = useState<MiscItem[]>(initial.misc);
  const [resources, setResources] = useState<ResourceItem[]>(initial.resources);
  const [boatProfile, setBoatProfile] = useState<BoatProfile>(initial.boatProfile);

  const [layoutMode, setLayoutMode] = useState<LayoutMode>(initial.layoutMode);
  const [sortMode, setSortMode] = useState<SortMode>(initial.sortMode);
  const [lang, setLang] = useState<Language>(initial.language);
  const [route, setRoute] = useState<ViewRoute>({ view: 'home' });
  const [searchQuery, setSearchQuery] = useState('');

  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; undo?: () => void } | null>(null);

  const sortMenuRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    try {
      const payload: StoredState = {
        todos,
        toBuy,
        measurements,
        maintenance,
        travel,
        misc,
        resources,
        boatProfile,
        layoutMode,
        sortMode,
        language: lang,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota issues
    }
  }, [
    todos,
    toBuy,
    measurements,
    maintenance,
    travel,
    misc,
    resources,
    boatProfile,
    layoutMode,
    sortMode,
    lang,
  ]);

  useEffect(() => {
    if (!sortMenuOpen) return;
    const onOutside = (e: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target as Node)) {
        setSortMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [sortMenuOpen]);

  const showToast = (message: string, undo?: () => void) => {
    setToast({ message, undo });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const navigate = (next: ViewRoute) => {
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ---------------- TODO HANDLERS ---------------- */
  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleAddTodo = (title: string, season?: Season, highPriority?: boolean) => {
    const newItem: TodoItem = {
      id: `todo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title,
      completed: false,
      season,
      highPriority,
    };
    setTodos((prev) => [...prev, newItem]);
  };

  const handleDeleteTodo = (id: string) => {
    const snapshot = todos;
    setTodos((prev) => prev.filter((item) => item.id !== id));
    showToast(t.toasts.taskRemoved, () => setTodos(snapshot));
  };

  const handleToggleTodoPriority = (id: string) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, highPriority: !item.highPriority } : item
      )
    );
  };

  const handleSetTodoSeason = (id: string, season: Season | undefined) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? { ...item, season } : item)));
  };

  const handleSetTodoReminder = (id: string, reminder: string | undefined) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? { ...item, reminder } : item)));
  };

  const handleReorderTodos = (draggedId: string, targetId: string) => {
    setTodos((prev) => {
      const fromIndex = prev.findIndex((i) => i.id === draggedId);
      const toIndex = prev.findIndex((i) => i.id === targetId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
  };

  const handleClearCompletedTodos = (season?: Season) => {
    const snapshot = todos;
    const removedCount = todos.filter(
      (item) => item.completed && (!season || item.season === season)
    ).length;
    if (removedCount === 0) {
      showToast(t.toasts.noCompletedToClear);
      return;
    }
    setTodos((prev) =>
      prev.filter((item) => !(item.completed && (!season || item.season === season)))
    );
    showToast(t.toasts.clearedCompleted(removedCount), () => setTodos(snapshot));
  };

  /* ---------------- TO BUY HANDLERS ---------------- */
  const handleToggleToBuy = (id: string) => {
    setToBuy((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i))
    );
  };

  const handleAddToBuy = (title: string, quantity?: string) => {
    const newItem: ToBuyItem = {
      id: `buy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title,
      completed: false,
      quantity,
    };
    setToBuy((prev) => [...prev, newItem]);
  };

  const handleDeleteToBuy = (id: string) => {
    const snapshot = toBuy;
    setToBuy((prev) => prev.filter((i) => i.id !== id));
    showToast(t.toasts.itemRemoved, () => setToBuy(snapshot));
  };

  const handleToggleToBuyPriority = (id: string) => {
    setToBuy((prev) =>
      prev.map((i) => (i.id === id ? { ...i, highPriority: !i.highPriority } : i))
    );
  };

  const handleReorderToBuy = (draggedId: string, targetId: string) => {
    setToBuy((prev) => {
      const fromIndex = prev.findIndex((i) => i.id === draggedId);
      const toIndex = prev.findIndex((i) => i.id === targetId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
  };

  const handleClearPurchased = () => {
    const snapshot = toBuy;
    const count = toBuy.filter((i) => i.completed).length;
    if (count === 0) {
      showToast(t.toasts.noPurchasedToClear);
      return;
    }
    setToBuy((prev) => prev.filter((i) => !i.completed));
    showToast(t.toasts.clearedPurchased(count), () => setToBuy(snapshot));
  };

  /* ---------------- RESET HANDLER ---------------- */
  const handleResetAllData = () => {
    setTodos(INITIAL_TODOS);
    setToBuy(INITIAL_TOBUY);
    setMeasurements(INITIAL_MEASUREMENTS);
    setMaintenance(INITIAL_MAINTENANCE);
    setTravel(INITIAL_TRAVEL);
    setMisc(INITIAL_MISC);
    setResources(INITIAL_RESOURCES);
    setBoatProfile(INITIAL_BOAT_PROFILE);
    showToast(t.toasts.restoredDemo);
  };

  /* ---------------- SHARE EXPORT TEXT BUILDER ---------------- */
  const sharePayload = useMemo(() => {
    const header = `${boatProfile.boatName} (${boatProfile.sailNumber}) — Klink`;
    if (route.view === 'todo') {
      const items = todos.filter((item) => !route.season || item.season === route.season);
      const label = route.season ? t.todo.titleSeason(route.season) : t.todo.title;
      const lines = items.map((item) => {
        const title = lang === 'sv' && SV_SEED_TODOS[item.id] ? SV_SEED_TODOS[item.id] : item.title;
        return `${item.completed ? '[x]' : '[ ]'} ${title}${item.highPriority ? ' (!)' : ''}${
          item.season && !route.season ? ` [${t.seasons[item.season]}]` : ''
        }`;
      });
      return { title: label, content: `${header}\n${label}\n\n${lines.join('\n')}` };
    }
    if (route.view === 'tobuy') {
      const lines = toBuy.map((i) => {
        const title = lang === 'sv' && SV_SEED_TOBUY[i.id] ? SV_SEED_TOBUY[i.id].title : i.title;
        const qty = lang === 'sv' && SV_SEED_TOBUY[i.id]?.quantity ? SV_SEED_TOBUY[i.id].quantity : i.quantity;
        return `${i.completed ? '[x]' : '[ ]'} ${title}${qty ? ` (${qty})` : ''}`;
      });
      return { title: t.tobuy.title, content: `${header}\n${t.tobuy.title}\n\n${lines.join('\n')}` };
    }
    if (route.view === 'myboat') {
      if (route.tab === 'measurements') {
        const lines = measurements.map((m) => {
          const label = lang === 'sv' && SV_SEED_MEASUREMENTS[m.id] ? SV_SEED_MEASUREMENTS[m.id].label : m.label;
          return `${label}: ${m.dimensions}`;
        });
        return {
          title: t.myboat.measurements,
          content: `${header}\n${t.myboat.measurements}\n\n${lines.join('\n')}`,
        };
      }
      if (route.tab === 'maintenance') {
        const lines = maintenance.map((m) => {
          const sv = lang === 'sv' ? SV_SEED_MAINTENANCE[m.id] : undefined;
          const cat = t.myboat.categories[m.category] || m.category;
          return `${m.date} · ${cat} — ${sv ? sv.title : m.title}\n  ${sv ? sv.notes : m.notes}`;
        });
        return {
          title: t.myboat.maintenance,
          content: `${header}\n${t.myboat.maintenance}\n\n${lines.join('\n\n')}`,
        };
      }
      if (route.tab === 'travel') {
        const lines = travel.map((entry) => {
          const sv = lang === 'sv' ? SV_SEED_TRAVEL[entry.id] : undefined;
          return `${entry.date} · ${entry.route} (${entry.distanceNm}, ${
            sv ? sv.conditions : entry.conditions
          })\n  ${sv ? sv.notes : entry.notes}`;
        });
        return {
          title: t.myboat.travel,
          content: `${header}\n${t.myboat.travel}\n\n${lines.join('\n\n')}`,
        };
      }
      const lines = misc.map((m) => {
        const sv = lang === 'sv' ? SV_SEED_MISC[m.id] : undefined;
        return `${sv ? sv.label : m.label}: ${sv ? sv.value : m.value}`;
      });
      return {
        title: t.myboat.misc,
        content: `${header}\n${t.myboat.misc}\n\n${lines.join('\n')}`,
      };
    }
    if (route.view === 'resources') {
      const lines = resources.map((r) => `• ${r.title} (${r.language}) — ${r.url}`);
      return {
        title: t.resources.title,
        content: `${header}\n${t.resources.title}\n\n${lines.join('\n')}`,
      };
    }
    return { title: 'Klink', content: header };
  }, [route, lang, t, boatProfile, todos, toBuy, measurements, maintenance, travel, misc, resources]);

  const showTrashInDetailHeader =
    (route.view === 'todo' && !route.season) || route.view === 'tobuy';

  const handleDetailHeaderTrash = () => {
    if (route.view === 'todo') {
      handleClearCompletedTodos(route.season);
    } else if (route.view === 'tobuy') {
      handleClearPurchased();
    }
  };

  const sortLabels: Record<SortMode, string> = {
    custom: t.sort.custom,
    alpha: t.sort.alpha,
    priority: t.sort.priority,
    season: t.sort.season,
  };

  return (
    <div className="min-h-screen bg-[#E9EBE9] text-[#111413] flex flex-col">
      {/* TOP HEADER BAR */}
      {route.view === 'home' ? (
        <header className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-4 md:pt-6 pb-2">
          {/* Mobile Home Header: Centered Klink Logo Pill + EN/SV switch on right */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center md:hidden">
            <div />
            <KlinkLogoPill onClick={() => navigate({ view: 'home' })} />
            <div className="flex justify-end">
              <LanguageSwitch lang={lang} onChange={setLang} />
            </div>
          </div>

          {/* Desktop Home Header: Clean 3-zone single row */}
          <div className="hidden md:flex items-center justify-between gap-8">
            <KlinkLogoPill onClick={() => navigate({ view: 'home' })} />

            <nav
              className="flex items-center gap-6 text-sm font-medium text-[#3F4441]"
              aria-label="Primary sections"
            >
              <button
                type="button"
                onClick={() => navigate({ view: 'home' })}
                className="text-[#006994] border-b-2 border-[#006994] pb-1 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.nav.overview}
              </button>
              <button
                type="button"
                onClick={() => navigate({ view: 'todo' })}
                className="hover:text-[#006994] pb-1 border-b-2 border-transparent transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.nav.todo}
              </button>
              <button
                type="button"
                onClick={() => navigate({ view: 'tobuy' })}
                className="hover:text-[#006994] pb-1 border-b-2 border-transparent transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.nav.tobuy}
              </button>
              <button
                type="button"
                onClick={() => navigate({ view: 'myboat', tab: 'measurements' })}
                className="hover:text-[#006994] pb-1 border-b-2 border-transparent transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.nav.myboat}
              </button>
              <button
                type="button"
                onClick={() => navigate({ view: 'resources' })}
                className="hover:text-[#006994] pb-1 border-b-2 border-transparent transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.nav.resources}
              </button>
            </nav>

            <div className="flex items-center gap-2.5 shrink-0">
              <LanguageSwitch lang={lang} onChange={setLang} />
              <button
                type="button"
                onClick={() => setProfileOpen(true)}
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow text-sm font-medium text-[#111413] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <UserCircle2 className="w-5 h-5 text-[#006994]" aria-hidden="true" />
                <span>{boatProfile.boatName}</span>
                <span className="text-[#525855] font-mono-tabular text-xs">
                  {boatProfile.sailNumber}
                </span>
              </button>
            </div>
          </div>
        </header>
      ) : (
        /* Detail View Top Bar: [<] --- [Klink] --- [EN/SV + Trash | Share] */
        <header className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-4 md:pt-6 pb-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate({ view: 'home' })}
              aria-label={t.nav.backToOverview}
              className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-white shadow-[0_3px_10px_rgba(0,0,0,0.12)] flex items-center justify-center hover:bg-[#F5F6F5] active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-6 h-6 text-[#111413]" />
            </button>

            <KlinkLogoPill onClick={() => navigate({ view: 'home' })} />

            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:block">
                <LanguageSwitch lang={lang} onChange={setLang} />
              </div>

              {showTrashInDetailHeader ? (
                <div className="inline-flex items-center rounded-full bg-white shadow-[0_3px_10px_rgba(0,0,0,0.12)] p-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleDetailHeaderTrash}
                    title={t.todo.clear}
                    aria-label={t.todo.clear}
                    className="w-10 h-9 rounded-full flex items-center justify-center hover:bg-black/5 text-[#111413] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShareOpen(true)}
                    title={t.modals.share}
                    aria-label={t.modals.share}
                    className="w-10 h-9 rounded-full flex items-center justify-center hover:bg-black/5 text-[#111413] transition-colors cursor-pointer"
                  >
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShareOpen(true)}
                  title={t.modals.share}
                  aria-label={t.modals.share}
                  className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-white shadow-[0_3px_10px_rgba(0,0,0,0.12)] flex items-center justify-center hover:bg-[#F5F6F5] active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <Share className="w-5 h-5 text-[#111413]" />
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-24 md:pb-12 pt-3 md:pt-5">
        {route.view === 'home' && (
          <>
            {/* Search & Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5 md:mb-7">
              <div className="relative flex-1 flex items-center bg-white rounded-full shadow-[0_3px_10px_rgba(0,0,0,0.10)] px-3 min-h-[48px] md:min-h-[46px]">
                <button
                  type="button"
                  onClick={() => setProfileOpen(true)}
                  aria-label={t.modals.vesselProfile}
                  title={t.modals.vesselProfile}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 text-[#111413] shrink-0 cursor-pointer"
                >
                  <UserCircle2 className="w-6 h-6" />
                </button>

                <label htmlFor="klink-search" className="sr-only">
                  {t.search.placeholder}
                </label>
                <input
                  id="klink-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search.placeholder}
                  className="flex-1 min-w-0 px-2 py-2 text-[16px] text-[#111413] placeholder:text-[#2D312E] bg-transparent focus:outline-none"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label={t.search.clear}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 text-[#525855] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setLayoutMode((m) => (m === 'grid' ? 'list' : 'grid'))}
                  aria-label={
                    layoutMode === 'grid' ? t.search.switchToList : t.search.switchToGrid
                  }
                  title={layoutMode === 'grid' ? t.search.switchToList : t.search.switchToGrid}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 text-[#111413] shrink-0 cursor-pointer"
                >
                  {layoutMode === 'grid' ? (
                    <LayoutGrid className="w-5 h-5" />
                  ) : (
                    <List className="w-5 h-5" />
                  )}
                </button>

                <div className="relative" ref={sortMenuRef}>
                  <button
                    type="button"
                    onClick={() => setSortMenuOpen((o) => !o)}
                    aria-label={t.search.sortItems}
                    aria-expanded={sortMenuOpen}
                    title={sortLabels[sortMode]}
                    className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 shrink-0 cursor-pointer ${
                      sortMode !== 'custom' ? 'text-[#006994]' : 'text-[#111413]'
                    }`}
                  >
                    <ArrowUpDown className="w-5 h-5" />
                  </button>

                  {sortMenuOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 top-full mt-2 z-40 w-52 bg-white border-2 border-[#111413] shadow-xl py-1"
                    >
                      {(Object.keys(sortLabels) as SortMode[]).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setSortMode(mode);
                            setSortMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#F3F4F3] cursor-pointer ${
                            sortMode === mode ? 'font-semibold text-[#006994]' : 'text-[#111413]'
                          }`}
                        >
                          {sortLabels[mode]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Quick Add button */}
              <button
                type="button"
                onClick={() => setQuickAddOpen(true)}
                className="hidden md:inline-flex items-center gap-2 px-5 h-[46px] rounded-full bg-[#006994] text-white text-sm font-medium shadow-[0_3px_10px_rgba(0,105,148,0.25)] hover:bg-[#005578] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t.search.newEntry}</span>
              </button>
            </div>

            {searchQuery.trim() && (
              <div className="mb-4 flex items-center gap-2 text-sm text-[#3F4441]">
                <Search className="w-4 h-4" aria-hidden="true" />
                <span>
                  {t.search.filteringFor} “<strong>{searchQuery}</strong>”
                </span>
              </div>
            )}

            {/* Home Cards Grid */}
            <div
              className={
                layoutMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start'
                  : 'flex flex-col gap-4 md:gap-6 max-w-4xl mx-auto'
              }
            >
              <TodoListView
                todos={todos}
                lang={lang}
                isPreview
                sortMode={sortMode}
                searchQuery={searchQuery}
                onOpenDetail={(season) => navigate({ view: 'todo', season })}
                onToggleTodo={handleToggleTodo}
                onAddTodo={(title, season) => handleAddTodo(title, season)}
                onDeleteTodo={handleDeleteTodo}
                onTogglePriority={handleToggleTodoPriority}
                onSetSeason={handleSetTodoSeason}
                onSetReminder={handleSetTodoReminder}
                onReorderTodos={handleReorderTodos}
                onClearCompleted={handleClearCompletedTodos}
              />

              <ToBuyListView
                items={toBuy}
                lang={lang}
                isPreview
                sortMode={sortMode}
                searchQuery={searchQuery}
                onOpenDetail={() => navigate({ view: 'tobuy' })}
                onToggleItem={handleToggleToBuy}
                onAddItem={handleAddToBuy}
                onDeleteItem={handleDeleteToBuy}
                onTogglePriority={handleToggleToBuyPriority}
                onReorderItems={handleReorderToBuy}
                onClearPurchased={handleClearPurchased}
              />

              <MyBoatHomeCard
                lang={lang}
                searchQuery={searchQuery}
                measurementsCount={measurements.length}
                maintenanceCount={maintenance.length}
                travelCount={travel.length}
                miscCount={misc.length}
                onSelectTab={(tab: MyBoatTab) => navigate({ view: 'myboat', tab })}
              />

              <ResourcesView
                resources={resources}
                lang={lang}
                isPreview
                searchQuery={searchQuery}
                onOpenDetail={() => navigate({ view: 'resources' })}
                onAddResource={(item) =>
                  setResources((prev) => [
                    ...prev,
                    { ...item, id: `res-${Date.now()}` },
                  ])
                }
                onDeleteResource={(id) =>
                  setResources((prev) => prev.filter((r) => r.id !== id))
                }
              />
            </div>
          </>
        )}

        {/* DETAIL VIEWS WITH DESKTOP SIDE RAIL + FULL-FIDELITY CARD */}
        {route.view !== 'home' && (
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-6 items-start">
            {/* Desktop Left Navigation Rail */}
            <aside
              aria-label="Section navigation"
              className="hidden lg:flex flex-col gap-5 bg-white/75 backdrop-blur-sm rounded-[24px] border border-black/10 p-5 sticky top-6"
            >
              <div>
                <div className="text-xs font-medium text-[#525855] mb-1">{t.nav.vessel}</div>
                <button
                  type="button"
                  onClick={() => setProfileOpen(true)}
                  className="w-full text-left group cursor-pointer"
                >
                  <div className="text-base font-semibold text-[#111413] group-hover:text-[#006994] transition-colors">
                    {boatProfile.boatName}
                  </div>
                  <div className="text-xs text-[#525855] font-mono-tabular">
                    {boatProfile.sailNumber} · {boatProfile.homePort}
                  </div>
                </button>
              </div>

              <hr className="border-black/10" />

              <nav className="flex flex-col gap-1 text-sm">
                <button
                  type="button"
                  onClick={() => navigate({ view: 'todo' })}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                    route.view === 'todo' && !route.season
                      ? 'bg-[#006994] text-white font-medium'
                      : 'text-[#111413] hover:bg-black/5'
                  }`}
                >
                  <span>{t.nav.todo}</span>
                  <span className="font-mono-tabular text-xs opacity-80">
                    {todos.filter((item) => !item.completed).length}
                  </span>
                </button>

                <div className="pl-3 flex flex-col gap-0.5">
                  {(['spring', 'summer', 'autumn', 'winter'] as Season[]).map((season) => {
                    const count = todos.filter(
                      (item) => !item.completed && item.season === season
                    ).length;
                    const active = route.view === 'todo' && route.season === season;
                    return (
                      <button
                        key={season}
                        type="button"
                        onClick={() => navigate({ view: 'todo', season })}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#006994]/15 text-[#006994] font-semibold'
                            : 'text-[#525855] hover:bg-black/5 hover:text-[#111413]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <SeasonIcon season={season} className="w-3.5 h-3.5" />
                          <span>{t.seasons[season]}</span>
                        </span>
                        <span className="font-mono-tabular">{count}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => navigate({ view: 'tobuy' })}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer mt-1 ${
                    route.view === 'tobuy'
                      ? 'bg-[#28A99E] text-white font-medium'
                      : 'text-[#111413] hover:bg-black/5'
                  }`}
                >
                  <span>{t.nav.tobuy}</span>
                  <span className="font-mono-tabular text-xs opacity-80">
                    {toBuy.filter((i) => !i.completed).length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate({ view: 'myboat', tab: 'measurements' })}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer mt-1 ${
                    route.view === 'myboat'
                      ? 'bg-[#F2D66A] text-[#111413] font-semibold'
                      : 'text-[#111413] hover:bg-black/5'
                  }`}
                >
                  <span>{t.nav.myboat}</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate({ view: 'resources' })}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer mt-1 ${
                    route.view === 'resources'
                      ? 'bg-[#8C522A] text-white font-medium'
                      : 'text-[#111413] hover:bg-black/5'
                  }`}
                >
                  <span>{t.nav.resources}</span>
                  <span className="font-mono-tabular text-xs opacity-80">
                    {resources.length}
                  </span>
                </button>
              </nav>
            </aside>

            {/* Primary Detail Card */}
            <div className="max-w-3xl lg:max-w-none mx-auto w-full">
              {route.view === 'todo' && (
                <TodoListView
                  todos={todos}
                  lang={lang}
                  activeSeason={route.season}
                  sortMode={sortMode}
                  onOpenDetail={(season) => navigate({ view: 'todo', season })}
                  onToggleTodo={handleToggleTodo}
                  onAddTodo={(title, season) => handleAddTodo(title, season)}
                  onDeleteTodo={handleDeleteTodo}
                  onTogglePriority={handleToggleTodoPriority}
                  onSetSeason={handleSetTodoSeason}
                  onSetReminder={handleSetTodoReminder}
                  onReorderTodos={handleReorderTodos}
                  onClearCompleted={handleClearCompletedTodos}
                />
              )}

              {route.view === 'tobuy' && (
                <ToBuyListView
                  items={toBuy}
                  lang={lang}
                  sortMode={sortMode}
                  onOpenDetail={() => navigate({ view: 'tobuy' })}
                  onToggleItem={handleToggleToBuy}
                  onAddItem={handleAddToBuy}
                  onDeleteItem={handleDeleteToBuy}
                  onTogglePriority={handleToggleToBuyPriority}
                  onReorderItems={handleReorderToBuy}
                  onClearPurchased={handleClearPurchased}
                />
              )}

              {route.view === 'myboat' && (
                <MyBoatDetailView
                  lang={lang}
                  activeTab={route.tab}
                  onSelectTab={(tab) => navigate({ view: 'myboat', tab })}
                  measurements={measurements}
                  maintenance={maintenance}
                  travel={travel}
                  misc={misc}
                  onAddMeasurement={(item) =>
                    setMeasurements((prev) => [
                      ...prev,
                      { ...item, id: `meas-${Date.now()}` },
                    ])
                  }
                  onDeleteMeasurement={(id) =>
                    setMeasurements((prev) => prev.filter((m) => m.id !== id))
                  }
                  onAddMaintenance={(entry) =>
                    setMaintenance((prev) => [
                      { ...entry, id: `maint-${Date.now()}` },
                      ...prev,
                    ])
                  }
                  onDeleteMaintenance={(id) =>
                    setMaintenance((prev) => prev.filter((m) => m.id !== id))
                  }
                  onAddTravel={(entry) =>
                    setTravel((prev) => [
                      { ...entry, id: `travel-${Date.now()}` },
                      ...prev,
                    ])
                  }
                  onDeleteTravel={(id) =>
                    setTravel((prev) => prev.filter((entry) => entry.id !== id))
                  }
                  onAddMisc={(item) =>
                    setMisc((prev) => [...prev, { ...item, id: `misc-${Date.now()}` }])
                  }
                  onDeleteMisc={(id) =>
                    setMisc((prev) => prev.filter((m) => m.id !== id))
                  }
                />
              )}

              {route.view === 'resources' && (
                <ResourcesView
                  resources={resources}
                  lang={lang}
                  onOpenDetail={() => navigate({ view: 'resources' })}
                  onAddResource={(item) =>
                    setResources((prev) => [
                      ...prev,
                      { ...item, id: `res-${Date.now()}` },
                    ])
                  }
                  onDeleteResource={(id) =>
                    setResources((prev) => prev.filter((r) => r.id !== id))
                  }
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* FLOATING + ACTION BUTTON (Mobile Home) */}
      {route.view === 'home' && (
        <button
          type="button"
          onClick={() => setQuickAddOpen(true)}
          aria-label={t.modals.addToKlink}
          className="md:hidden fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-white border border-black/15 shadow-[0_6px_18px_rgba(0,0,0,0.20)] flex items-center justify-center text-[#6A7B6A] hover:text-[#006994] active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-8 h-8 stroke-[2.2]" />
        </button>
      )}

      {/* UNDO / CONFIRMATION TOAST */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#111413] text-white text-sm shadow-xl"
        >
          <span>{toast.message}</span>
          {toast.undo && (
            <button
              type="button"
              onClick={() => {
                toast.undo?.();
                setToast(null);
              }}
              className="text-[#F2D66A] font-medium hover:underline cursor-pointer"
            >
              {t.toasts.undo}
            </button>
          )}
        </div>
      )}

      {/* MODALS */}
      <QuickAddModal
        isOpen={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
        lang={lang}
        onAddTodo={handleAddTodo}
        onAddToBuy={handleAddToBuy}
        onAddMeasurement={(label, dimensions, notes) =>
          setMeasurements((prev) => [
            ...prev,
            { id: `meas-${Date.now()}`, label, dimensions, notes },
          ])
        }
        onAddResource={(title, url, language) =>
          setResources((prev) => [
            ...prev,
            { id: `res-${Date.now()}`, title, url, language },
          ])
        }
      />

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        lang={lang}
        onChangeLang={setLang}
        profile={boatProfile}
        onSaveProfile={setBoatProfile}
        onResetAllData={handleResetAllData}
      />

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        lang={lang}
        title={sharePayload.title}
        content={sharePayload.content}
      />
    </div>
  );
}
