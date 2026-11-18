import React, { useEffect, useState } from 'react';
import { Check, Copy, Download, RotateCcw, X } from 'lucide-react';
import { BoatProfile, Season } from '../types';
import { Language, TRANSLATIONS } from '../i18n';
import { SailboatWaveIcon } from './KlinkIcons';

/* ---------------- QUICK ADD MODAL ---------------- */

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddTodo: (title: string, season?: Season, highPriority?: boolean) => void;
  onAddToBuy: (title: string, quantity?: string) => void;
  onAddMeasurement: (label: string, dimensions: string, notes?: string) => void;
  onAddResource: (title: string, url: string, language: string) => void;
}

export function QuickAddModal({
  isOpen,
  onClose,
  lang,
  onAddTodo,
  onAddToBuy,
  onAddMeasurement,
  onAddResource,
}: QuickAddModalProps) {
  const t = TRANSLATIONS[lang];
  const [kind, setKind] = useState<'todo' | 'tobuy' | 'measurement' | 'resource'>('todo');
  const [title, setTitle] = useState('');
  const [extra, setExtra] = useState('');
  const [season, setSeason] = useState<Season | ''>('');
  const [highPriority, setHighPriority] = useState(false);
  const [language, setLanguage] = useState('Eng');

  useEffect(() => {
    if (!isOpen) return;
    setTitle('');
    setExtra('');
    setSeason('');
    setHighPriority(false);
  }, [isOpen, kind]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    if (kind === 'todo') {
      onAddTodo(trimmed, season || undefined, highPriority);
    } else if (kind === 'tobuy') {
      onAddToBuy(trimmed, extra.trim() || undefined);
    } else if (kind === 'measurement') {
      if (!extra.trim()) return;
      onAddMeasurement(trimmed, extra.trim());
    } else if (kind === 'resource') {
      let cleanUrl = extra.trim() || 'https://www.folkboat.com';
      if (!/^https?:\/\//i.test(cleanUrl)) cleanUrl = `https://${cleanUrl}`;
      onAddResource(trimmed, cleanUrl, language);
    }
    onClose();
  };

  const tabs: { id: 'todo' | 'tobuy' | 'measurement' | 'resource'; label: string }[] = [
    { id: 'todo', label: t.modals.tabs.todo },
    { id: 'tobuy', label: t.modals.tabs.tobuy },
    { id: 'measurement', label: t.modals.tabs.measurement },
    { id: 'resource', label: t.modals.tabs.resource },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.modals.addToKlink}
    >
      <div
        className="w-full sm:max-w-lg bg-white rounded-t-[28px] sm:rounded-[28px] border-t-[4px] sm:border-[4px] border-[#006994] shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium text-[#111413]">{t.modals.addToKlink}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.modals.cancel}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-black/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#EFF1EF] rounded-xl mb-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setKind(tab.id)}
              className={`py-2 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                kind === tab.id
                  ? 'bg-white text-[#111413] shadow-sm'
                  : 'text-[#525855] hover:text-[#111413]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#525855] mb-1.5">
              {t.modals.labels[kind]}
            </label>
            <input
              type="text"
              autoFocus
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.modals.placeholders[kind]}
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/20 text-[15px] focus:outline-none focus:border-[#006994]"
            />
          </div>

          {kind === 'todo' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#525855] mb-1.5">
                  {t.modals.labels.seasonOptional}
                </label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value as Season | '')}
                  className="w-full px-3 py-2.5 rounded-xl border border-black/20 text-sm bg-white"
                >
                  <option value="">{t.modals.labels.anySeason}</option>
                  <option value="spring">{t.seasons.spring}</option>
                  <option value="summer">{t.seasons.summer}</option>
                  <option value="autumn">{t.seasons.autumn}</option>
                  <option value="winter">{t.seasons.winter}</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl border border-black/15 cursor-pointer hover:bg-black/[0.02]">
                  <input
                    type="checkbox"
                    checked={highPriority}
                    onChange={(e) => setHighPriority(e.target.checked)}
                    className="klink-checkbox"
                  />
                  <span className="text-sm font-medium text-[#111413]">
                    {t.modals.labels.highPriority}
                  </span>
                </label>
              </div>
            </div>
          )}

          {kind === 'tobuy' && (
            <div>
              <label className="block text-xs font-medium text-[#525855] mb-1.5">
                {t.modals.labels.qtyOptional}
              </label>
              <input
                type="text"
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder={t.modals.placeholders.qty}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/20 text-sm font-mono-tabular focus:outline-none focus:border-[#28A99E]"
              />
            </div>
          )}

          {kind === 'measurement' && (
            <div>
              <label className="block text-xs font-medium text-[#525855] mb-1.5">
                {t.modals.labels.dimensions}
              </label>
              <input
                type="text"
                required
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder={t.modals.placeholders.dimensions}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/20 text-sm font-mono-tabular focus:outline-none focus:border-[#996515]"
              />
            </div>
          )}

          {kind === 'resource' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#525855] mb-1.5">
                  {t.modals.labels.url}
                </label>
                <input
                  type="text"
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/20 text-sm font-mono-tabular focus:outline-none focus:border-[#8C522A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#525855] mb-1.5">
                  {t.modals.labels.language}
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-black/20 text-sm bg-white"
                >
                  <option value="Eng">Eng</option>
                  <option value="Swe">Swe</option>
                  <option value="Dan">Dan</option>
                  <option value="Deu">Deu</option>
                  <option value="Fin">Fin</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm text-[#525855] hover:bg-black/5 cursor-pointer"
            >
              {t.modals.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#006994] text-white text-sm font-medium hover:bg-[#005578] cursor-pointer"
            >
              {t.modals.saveItem}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- BOAT PROFILE MODAL ---------------- */

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  profile: BoatProfile;
  onSaveProfile: (profile: BoatProfile) => void;
  onResetAllData: () => void;
}

export function ProfileModal({
  isOpen,
  onClose,
  lang,
  onChangeLang,
  profile,
  onSaveProfile,
  onResetAllData,
}: ProfileModalProps) {
  const t = TRANSLATIONS[lang];
  const [draft, setDraft] = useState<BoatProfile>(profile);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDraft(profile);
      setConfirmReset(false);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.modals.vesselProfile}
    >
      <div
        className="w-full sm:max-w-lg bg-white rounded-t-[28px] sm:rounded-[28px] border-t-[4px] sm:border-[4px] border-[#F2D66A] shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <SailboatWaveIcon className="w-6 h-6 text-[#111413]" />
            <h3 className="text-xl font-medium text-[#111413]">{t.modals.vesselProfile}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.modals.cancel}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-black/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language selector inside Vessel Profile */}
        <div className="mb-4 p-3 rounded-2xl bg-[#F4F5F4] flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-[#525855]">{t.nav.language}</span>
          <div className="inline-flex items-center gap-1 p-1 bg-white rounded-xl border border-black/10">
            <button
              type="button"
              onClick={() => onChangeLang('en')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#006994] text-white'
                  : 'text-[#525855] hover:text-[#111413]'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onChangeLang('sv')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                lang === 'sv'
                  ? 'bg-[#006994] text-white'
                  : 'text-[#525855] hover:text-[#111413]'
              }`}
            >
              Svenska
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSaveProfile(draft);
            onClose();
          }}
          className="space-y-3.5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#525855] mb-1">
                {t.modals.boatName}
              </label>
              <input
                type="text"
                value={draft.boatName}
                onChange={(e) => setDraft({ ...draft, boatName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-black/20 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#525855] mb-1">
                {t.modals.sailNumber}
              </label>
              <input
                type="text"
                value={draft.sailNumber}
                onChange={(e) => setDraft({ ...draft, sailNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-black/20 text-sm font-mono-tabular"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#525855] mb-1">
                {t.modals.hullConstruction}
              </label>
              <select
                value={draft.hullType}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    hullType: e.target.value as BoatProfile['hullType'],
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-black/20 text-sm bg-white"
              >
                <option value="Clinker Wood (Larch/Oak)">{t.modals.hullWood}</option>
                <option value="Nordic GRP (Fibreglass)">{t.modals.hullGrp}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#525855] mb-1">
                {t.modals.buildYear}
              </label>
              <input
                type="text"
                value={draft.buildYear}
                onChange={(e) => setDraft({ ...draft, buildYear: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-black/20 text-sm font-mono-tabular"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#525855] mb-1">
                {t.modals.homePort}
              </label>
              <input
                type="text"
                value={draft.homePort}
                onChange={(e) => setDraft({ ...draft, homePort: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-black/20 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#525855] mb-1">
                {t.modals.ownerSkipper}
              </label>
              <input
                type="text"
                value={draft.ownerName}
                onChange={(e) => setDraft({ ...draft, ownerName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-black/20 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-black/10">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1.5 text-xs text-[#525855] hover:text-red-700 cursor-pointer py-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.modals.restoreDemo}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onResetAllData();
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 cursor-pointer"
                >
                  {t.modals.confirmReset}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="text-xs text-[#525855] cursor-pointer"
                >
                  {t.modals.cancel}
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm text-[#525855] hover:bg-black/5 cursor-pointer"
              >
                {t.modals.cancel}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#006994] text-white text-sm font-medium hover:bg-[#005578] cursor-pointer"
              >
                {t.modals.saveVessel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- SHARE / EXPORT MODAL ---------------- */

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  title: string;
  content: string;
}

export function ShareModal({ isOpen, onClose, lang, title, content }: ShareModalProps) {
  const t = TRANSLATIONS[lang];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) setCopied(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${t.modals.share} ${title}`}
    >
      <div
        className="w-full sm:max-w-lg bg-white rounded-t-[28px] sm:rounded-[28px] border-t-[4px] sm:border-[4px] border-[#006994] shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-medium text-[#111413]">
            {t.modals.share} {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.modals.cancel}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-black/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <pre className="w-full max-h-64 overflow-y-auto p-4 rounded-2xl bg-[#F4F5F4] border border-black/10 text-xs font-mono-tabular text-[#111413] whitespace-pre-wrap leading-relaxed mb-4">
          {content}
        </pre>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/15 text-sm font-medium text-[#111413] hover:bg-black/5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t.modals.downloadTxt}</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006994] text-white text-sm font-medium hover:bg-[#005578] cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.modals.copied : t.modals.copyText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
