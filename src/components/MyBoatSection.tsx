import React, { useState } from 'react';
import {
  ChevronRight,
  Globe,
  HelpCircle,
  Plus,
  Trash2,
  Wrench,
} from 'lucide-react';
import {
  MaintenanceEntry,
  MeasurementItem,
  MiscItem,
  TravelEntry,
} from '../types';
import {
  Language,
  SV_SEED_MAINTENANCE,
  SV_SEED_MEASUREMENTS,
  SV_SEED_MISC,
  SV_SEED_TRAVEL,
  TRANSLATIONS,
} from '../i18n';
import { CrossedToolsIcon, SailboatWaveIcon } from './KlinkIcons';

export type MyBoatTab = 'measurements' | 'maintenance' | 'travel' | 'misc';

interface MyBoatCardProps {
  lang: Language;
  searchQuery?: string;
  measurementsCount: number;
  maintenanceCount: number;
  travelCount: number;
  miscCount: number;
  onSelectTab: (tab: MyBoatTab) => void;
}

export function MyBoatHomeCard({
  lang,
  searchQuery = '',
  measurementsCount,
  maintenanceCount,
  travelCount,
  miscCount,
  onSelectTab,
}: MyBoatCardProps) {
  const t = TRANSLATIONS[lang];

  const rows: {
    id: MyBoatTab;
    label: string;
    icon: React.ReactNode;
    count: number;
  }[] = [
    {
      id: 'measurements',
      label: t.myboat.measurements,
      icon: <CrossedToolsIcon className="w-5 h-5" />,
      count: measurementsCount,
    },
    {
      id: 'maintenance',
      label: t.myboat.maintenance,
      icon: <Wrench className="w-5 h-5" aria-hidden="true" />,
      count: maintenanceCount,
    },
    {
      id: 'travel',
      label: t.myboat.travel,
      icon: <Globe className="w-5 h-5" aria-hidden="true" />,
      count: travelCount,
    },
    {
      id: 'misc',
      label: t.myboat.misc,
      icon: <HelpCircle className="w-5 h-5" aria-hidden="true" />,
      count: miscCount,
    },
  ];

  const q = searchQuery.trim().toLowerCase();
  const visibleRows = q
    ? rows.filter((r) => r.label.toLowerCase().includes(q))
    : rows;

  return (
    <section
      aria-label={t.myboat.title}
      className="bg-white border-[4px] border-[#F2D66A] rounded-[28px] shadow-[0_4px_14px_rgba(0,0,0,0.08)] p-4 md:p-6 flex flex-col"
    >
      <button
        type="button"
        onClick={() => onSelectTab('measurements')}
        className="flex items-center gap-2.5 text-left mb-3 group cursor-pointer min-h-[40px]"
      >
        <SailboatWaveIcon className="w-6 h-6 text-[#111413] shrink-0" />
        <h2 className="text-[20px] md:text-[24px] font-medium tracking-tight text-[#111413] group-hover:text-[#996515] transition-colors">
          {t.myboat.title}
        </h2>
      </button>

      <ul className="space-y-1">
        {visibleRows.map((row) => (
          <li key={row.id}>
            <button
              type="button"
              onClick={() => onSelectTab(row.id)}
              className="w-full flex items-center justify-between gap-3 px-2 py-2.5 min-h-[46px] rounded-xl text-left text-[#111413] hover:bg-[#F2D66A]/15 transition-colors cursor-pointer group"
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className="text-[#111413] shrink-0">{row.icon}</span>
                <span className="text-[16px] font-normal truncate">{row.label}</span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-[#525855] font-mono-tabular opacity-0 group-hover:opacity-100 transition-opacity">
                  {row.count}
                </span>
                <ChevronRight
                  className="w-5 h-5 text-[#111413] group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {visibleRows.length === 0 && (
        <p className="py-3 text-sm text-[#525855]">{t.myboat.noMatching}</p>
      )}
    </section>
  );
}

interface MyBoatDetailViewProps {
  lang: Language;
  activeTab: MyBoatTab;
  onSelectTab: (tab: MyBoatTab) => void;
  searchQuery?: string;
  measurements: MeasurementItem[];
  maintenance: MaintenanceEntry[];
  travel: TravelEntry[];
  misc: MiscItem[];
  onAddMeasurement: (item: Omit<MeasurementItem, 'id'>) => void;
  onDeleteMeasurement: (id: string) => void;
  onAddMaintenance: (entry: Omit<MaintenanceEntry, 'id'>) => void;
  onDeleteMaintenance: (id: string) => void;
  onAddTravel: (entry: Omit<TravelEntry, 'id'>) => void;
  onDeleteTravel: (id: string) => void;
  onAddMisc: (item: Omit<MiscItem, 'id'>) => void;
  onDeleteMisc: (id: string) => void;
}

export function MyBoatDetailView({
  lang,
  activeTab,
  onSelectTab,
  searchQuery = '',
  measurements,
  maintenance,
  travel,
  misc,
  onAddMeasurement,
  onDeleteMeasurement,
  onAddMaintenance,
  onDeleteMaintenance,
  onAddTravel,
  onDeleteTravel,
  onAddMisc,
  onDeleteMisc,
}: MyBoatDetailViewProps) {
  const t = TRANSLATIONS[lang];
  const [isAdding, setIsAdding] = useState(false);

  // Measurement form state
  const [measLabel, setMeasLabel] = useState('');
  const [measDim, setMeasDim] = useState('');
  const [measNotes, setMeasNotes] = useState('');

  // Maintenance form state
  const [maintDate, setMaintDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [maintTitle, setMaintTitle] = useState('');
  const [maintCategory, setMaintCategory] = useState('Woodwork');
  const [maintNotes, setMaintNotes] = useState('');

  // Travel form state
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [travelRoute, setTravelRoute] = useState('');
  const [travelDistance, setTravelDistance] = useState('');
  const [travelConditions, setTravelConditions] = useState('');
  const [travelNotes, setTravelNotes] = useState('');

  // Misc form state
  const [miscLabel, setMiscLabel] = useState('');
  const [miscValue, setMiscValue] = useState('');

  const q = searchQuery.trim().toLowerCase();

  const tabMeta: Record<MyBoatTab, { label: string; icon: React.ReactNode }> = {
    measurements: {
      label: t.myboat.measurements,
      icon: <CrossedToolsIcon className="w-5 h-5" />,
    },
    maintenance: {
      label: t.myboat.maintenance,
      icon: <Wrench className="w-5 h-5" aria-hidden="true" />,
    },
    travel: {
      label: t.myboat.travel,
      icon: <Globe className="w-5 h-5" aria-hidden="true" />,
    },
    misc: {
      label: t.myboat.misc,
      icon: <HelpCircle className="w-5 h-5" aria-hidden="true" />,
    },
  };

  const resetForms = () => {
    setIsAdding(false);
    setMeasLabel('');
    setMeasDim('');
    setMeasNotes('');
    setMaintTitle('');
    setMaintNotes('');
    setTravelRoute('');
    setTravelDistance('');
    setTravelConditions('');
    setTravelNotes('');
    setMiscLabel('');
    setMiscValue('');
  };

  const handleTabSwitch = (tab: MyBoatTab) => {
    resetForms();
    onSelectTab(tab);
  };

  return (
    <section
      aria-label={`${t.myboat.title} - ${tabMeta[activeTab].label}`}
      className="bg-white border-[4px] border-[#F2D66A] rounded-[28px] shadow-[0_4px_14px_rgba(0,0,0,0.08)] p-5 sm:p-6 md:p-8"
    >
      {/* Breadcrumb Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-[#111413]">
          <SailboatWaveIcon className="w-6 h-6 shrink-0" />
          <span className="text-[20px] md:text-[24px] font-medium tracking-tight">
            {t.myboat.title}
          </span>
          <ChevronRight className="w-5 h-5 text-[#111413]" aria-hidden="true" />
          <span className="flex items-center gap-2 text-[17px] md:text-[20px] font-normal">
            {tabMeta[activeTab].icon}
            <span>{tabMeta[activeTab].label}</span>
          </span>
        </div>

        {/* Sub-tab quick switcher */}
        <div className="flex items-center gap-1 flex-wrap" role="tablist" aria-label={t.myboat.title}>
          {(Object.keys(tabMeta) as MyBoatTab[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              onClick={() => handleTabSwitch(key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === key
                  ? 'bg-[#F2D66A] text-[#111413] font-semibold'
                  : 'text-[#525855] hover:bg-black/5 hover:text-[#111413]'
              }`}
            >
              {tabMeta[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: MEASUREMENTS */}
      {activeTab === 'measurements' && (
        <div className="pl-2 sm:pl-6 space-y-6">
          {measurements
            .map((m) => {
              const sv = lang === 'sv' ? SV_SEED_MEASUREMENTS[m.id] : undefined;
              return {
                ...m,
                displayLabel: sv ? sv.label : m.label,
                displayNotes: sv?.notes ?? m.notes,
              };
            })
            .filter(
              (m) =>
                !q ||
                `${m.displayLabel} ${m.label} ${m.dimensions} ${m.displayNotes || ''}`
                  .toLowerCase()
                  .includes(q)
            )
            .map((m) => (
              <div
                key={m.id}
                className="group flex items-start justify-between gap-4 py-1 border-b border-black/[0.06] last:border-b-0 pb-4"
              >
                <div className="space-y-1">
                  <div className="text-[18px] text-[#111413] font-normal">{m.displayLabel}</div>
                  <div className="text-[18px] text-[#111413] font-mono-tabular">
                    {m.dimensions}
                  </div>
                  {m.displayNotes && (
                    <div className="text-xs text-[#525855]">{m.displayNotes}</div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteMeasurement(m.id)}
                  aria-label={m.displayLabel}
                  className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-700 text-[#525855] transition-opacity cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

          {isAdding ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!measLabel.trim() || !measDim.trim()) return;
                onAddMeasurement({
                  label: measLabel.trim(),
                  dimensions: measDim.trim(),
                  notes: measNotes.trim() || undefined,
                });
                resetForms();
              }}
              className="p-4 rounded-2xl bg-[#F8F8F7] border border-black/10 space-y-3 max-w-lg"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  autoFocus
                  required
                  value={measLabel}
                  onChange={(e) => setMeasLabel(e.target.value)}
                  placeholder={t.myboat.partPlaceholder}
                  className="px-3 py-2 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-[#006994]"
                />
                <input
                  type="text"
                  required
                  value={measDim}
                  onChange={(e) => setMeasDim(e.target.value)}
                  placeholder={t.myboat.dimPlaceholder}
                  className="px-3 py-2 rounded-lg bg-white border border-black/15 text-sm font-mono-tabular focus:outline-none focus:border-[#006994]"
                />
              </div>
              <input
                type="text"
                value={measNotes}
                onChange={(e) => setMeasNotes(e.target.value)}
                placeholder={t.myboat.notesUnitPlaceholder}
                className="w-full px-3 py-2 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-[#006994]"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#111413] text-white text-xs font-medium hover:bg-black/80 cursor-pointer"
                >
                  {t.myboat.saveMeasurement}
                </button>
                <button
                  type="button"
                  onClick={resetForms}
                  className="px-3 py-2 text-xs text-[#525855] hover:text-[#111413] cursor-pointer"
                >
                  {t.myboat.cancel}
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2.5 py-2 px-3 min-h-[44px] rounded-xl text-[16px] text-[#111413] hover:bg-black/[0.04] transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5" aria-hidden="true" />
              <span>{t.myboat.addMeasurement}</span>
            </button>
          )}
        </div>
      )}

      {/* TAB 2: MAINTENANCE LOG */}
      {activeTab === 'maintenance' && (
        <div className="space-y-4">
          {maintenance
            .map((entry) => {
              const sv = lang === 'sv' ? SV_SEED_MAINTENANCE[entry.id] : undefined;
              return {
                ...entry,
                displayTitle: sv ? sv.title : entry.title,
                displayNotes: sv ? sv.notes : entry.notes,
                displayCategory: t.myboat.categories[entry.category] || entry.category,
              };
            })
            .filter(
              (entry) =>
                !q ||
                `${entry.displayTitle} ${entry.title} ${entry.displayCategory} ${entry.displayNotes} ${entry.date}`
                  .toLowerCase()
                  .includes(q)
            )
            .map((entry) => (
              <article
                key={entry.id}
                className="group flex items-start justify-between gap-4 py-3.5 border-b border-black/10 last:border-b-0"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#525855]">
                    <span className="font-mono-tabular">{entry.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-[#996515]">{entry.displayCategory}</span>
                  </div>
                  <h3 className="text-[17px] font-medium text-[#111413]">{entry.displayTitle}</h3>
                  {entry.displayNotes && (
                    <p className="text-sm text-[#525855] leading-relaxed max-w-2xl">
                      {entry.displayNotes}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteMaintenance(entry.id)}
                  aria-label={entry.displayTitle}
                  className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-700 text-[#525855] shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </article>
            ))}

          {isAdding ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!maintTitle.trim()) return;
                onAddMaintenance({
                  date: maintDate,
                  title: maintTitle.trim(),
                  category: maintCategory,
                  notes: maintNotes.trim(),
                });
                resetForms();
              }}
              className="p-4 rounded-2xl bg-[#F8F8F7] border border-black/10 space-y-3 max-w-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="date"
                  value={maintDate}
                  onChange={(e) => setMaintDate(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white border border-black/15 text-sm font-mono-tabular"
                />
                <select
                  value={maintCategory}
                  onChange={(e) => setMaintCategory(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white border border-black/15 text-sm"
                >
                  {Object.entries(t.myboat.categories).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                autoFocus
                required
                value={maintTitle}
                onChange={(e) => setMaintTitle(e.target.value)}
                placeholder={t.myboat.workPlaceholder}
                className="w-full px-3 py-2 rounded-lg bg-white border border-black/15 text-sm"
              />
              <textarea
                rows={2}
                value={maintNotes}
                onChange={(e) => setMaintNotes(e.target.value)}
                placeholder={t.myboat.maintNotesPlaceholder}
                className="w-full px-3 py-2 rounded-lg bg-white border border-black/15 text-sm"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#111413] text-white text-xs font-medium hover:bg-black/80 cursor-pointer"
                >
                  {t.myboat.saveEntry}
                </button>
                <button
                  type="button"
                  onClick={resetForms}
                  className="px-3 py-2 text-xs text-[#525855] hover:text-[#111413] cursor-pointer"
                >
                  {t.myboat.cancel}
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2.5 py-2 px-3 min-h-[44px] rounded-xl text-[16px] text-[#111413] hover:bg-black/[0.04] transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5" aria-hidden="true" />
              <span>{t.myboat.logMaintenance}</span>
            </button>
          )}
        </div>
      )}

      {/* TAB 3: TRAVEL LOG */}
      {activeTab === 'travel' && (
        <div className="space-y-4">
          {travel
            .map((entry) => {
              const sv = lang === 'sv' ? SV_SEED_TRAVEL[entry.id] : undefined;
              return {
                ...entry,
                displayConditions: sv ? sv.conditions : entry.conditions,
                displayNotes: sv ? sv.notes : entry.notes,
              };
            })
            .filter(
              (entry) =>
                !q ||
                `${entry.route} ${entry.displayConditions} ${entry.displayNotes} ${entry.date}`
                  .toLowerCase()
                  .includes(q)
            )
            .map((entry) => (
              <article
                key={entry.id}
                className="group flex items-start justify-between gap-4 py-3.5 border-b border-black/10 last:border-b-0"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#525855]">
                    <span className="font-mono-tabular">{entry.date}</span>
                    {entry.distanceNm && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular font-medium text-[#006994]">
                          {entry.distanceNm}
                        </span>
                      </>
                    )}
                    {entry.displayConditions && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{entry.displayConditions}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-[17px] font-medium text-[#111413]">{entry.route}</h3>
                  {entry.displayNotes && (
                    <p className="text-sm text-[#525855] leading-relaxed max-w-2xl">
                      {entry.displayNotes}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteTravel(entry.id)}
                  aria-label={entry.route}
                  className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-700 text-[#525855] shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </article>
            ))}

          {isAdding ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!travelRoute.trim()) return;
                onAddTravel({
                  date: travelDate,
                  route: travelRoute.trim(),
                  distanceNm: travelDistance.trim() || '—',
                  conditions: travelConditions.trim() || '—',
                  notes: travelNotes.trim(),
                });
                resetForms();
              }}
              className="p-4 rounded-2xl bg-[#F8F8F7] border border-black/10 space-y-3 max-w-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white border border-black/15 text-sm font-mono-tabular"
                />
                <input
                  type="text"
                  value={travelDistance}
                  onChange={(e) => setTravelDistance(e.target.value)}
                  placeholder={t.myboat.distancePlaceholder}
                  className="px-3 py-2 rounded-lg bg-white border border-black/15 text-sm font-mono-tabular"
                />
                <input
                  type="text"
                  value={travelConditions}
                  onChange={(e) => setTravelConditions(e.target.value)}
                  placeholder={t.myboat.conditionsPlaceholder}
                  className="px-3 py-2 rounded-lg bg-white border border-black/15 text-sm"
                />
              </div>
              <input
                type="text"
                autoFocus
                required
                value={travelRoute}
                onChange={(e) => setTravelRoute(e.target.value)}
                placeholder={t.myboat.routePlaceholder}
                className="w-full px-3 py-2 rounded-lg bg-white border border-black/15 text-sm"
              />
              <textarea
                rows={2}
                value={travelNotes}
                onChange={(e) => setTravelNotes(e.target.value)}
                placeholder={t.myboat.travelNotesPlaceholder}
                className="w-full px-3 py-2 rounded-lg bg-white border border-black/15 text-sm"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#111413] text-white text-xs font-medium hover:bg-black/80 cursor-pointer"
                >
                  {t.myboat.saveVoyage}
                </button>
                <button
                  type="button"
                  onClick={resetForms}
                  className="px-3 py-2 text-xs text-[#525855] hover:text-[#111413] cursor-pointer"
                >
                  {t.myboat.cancel}
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2.5 py-2 px-3 min-h-[44px] rounded-xl text-[16px] text-[#111413] hover:bg-black/[0.04] transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5" aria-hidden="true" />
              <span>{t.myboat.logVoyage}</span>
            </button>
          )}
        </div>
      )}

      {/* TAB 4: MISCELLANEOUS */}
      {activeTab === 'misc' && (
        <div className="space-y-5">
          {misc
            .map((item) => {
              const sv = lang === 'sv' ? SV_SEED_MISC[item.id] : undefined;
              return {
                ...item,
                displayLabel: sv ? sv.label : item.label,
                displayValue: sv ? sv.value : item.value,
              };
            })
            .filter(
              (item) =>
                !q ||
                `${item.displayLabel} ${item.displayValue} ${item.label} ${item.value}`
                  .toLowerCase()
                  .includes(q)
            )
            .map((item) => (
              <div
                key={item.id}
                className="group flex items-start justify-between gap-4 py-2 border-b border-black/[0.06] last:border-b-0"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-medium text-[#525855]">{item.displayLabel}</div>
                  <div className="text-[16px] text-[#111413] leading-relaxed">
                    {item.displayValue}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteMisc(item.id)}
                  aria-label={item.displayLabel}
                  className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-700 text-[#525855] shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

          {isAdding ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!miscLabel.trim() || !miscValue.trim()) return;
                onAddMisc({
                  label: miscLabel.trim(),
                  value: miscValue.trim(),
                });
                resetForms();
              }}
              className="p-4 rounded-2xl bg-[#F8F8F7] border border-black/10 space-y-3 max-w-lg"
            >
              <input
                type="text"
                autoFocus
                required
                value={miscLabel}
                onChange={(e) => setMiscLabel(e.target.value)}
                placeholder={t.myboat.miscLabelPlaceholder}
                className="w-full px-3 py-2 rounded-lg bg-white border border-black/15 text-sm"
              />
              <textarea
                rows={2}
                required
                value={miscValue}
                onChange={(e) => setMiscValue(e.target.value)}
                placeholder={t.myboat.miscValuePlaceholder}
                className="w-full px-3 py-2 rounded-lg bg-white border border-black/15 text-sm"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#111413] text-white text-xs font-medium hover:bg-black/80 cursor-pointer"
                >
                  {t.myboat.saveNote}
                </button>
                <button
                  type="button"
                  onClick={resetForms}
                  className="px-3 py-2 text-xs text-[#525855] hover:text-[#111413] cursor-pointer"
                >
                  {t.myboat.cancel}
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2.5 py-2 px-3 min-h-[44px] rounded-xl text-[16px] text-[#111413] hover:bg-black/[0.04] transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5" aria-hidden="true" />
              <span>{t.myboat.addNote}</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
