import React, { useEffect, useRef, useState } from 'react';
import { Snowflake, Trash2, Check, X } from 'lucide-react';
import { Season } from '../types';
import { Language, TRANSLATIONS } from '../i18n';
import { BellPlusIcon, SeasonIcon } from './KlinkIcons';

interface TaskOptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  highPriority?: boolean;
  season?: Season;
  reminder?: string;
  onTogglePriority?: () => void;
  onSelectSeason?: (season: Season | undefined) => void;
  onSetReminder?: (date: string | undefined) => void;
  onDelete: () => void;
  hideSeasonAndReminder?: boolean;
}

const SEASON_KEYS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

export function TaskOptionsMenu({
  isOpen,
  onClose,
  lang,
  highPriority = false,
  season,
  reminder,
  onTogglePriority,
  onSelectSeason,
  onSetReminder,
  onDelete,
  hideSeasonAndReminder = false,
}: TaskOptionsMenuProps) {
  const t = TRANSLATIONS[lang];
  const menuRef = useRef<HTMLDivElement>(null);
  const [subMode, setSubMode] = useState<'main' | 'season' | 'reminder'>('main');
  const [reminderDraft, setReminderDraft] = useState(reminder || '');

  useEffect(() => {
    if (isOpen) {
      setSubMode('main');
      setReminderDraft(reminder || new Date().toISOString().slice(0, 10));
    }
  }, [isOpen, reminder]);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Task options"
      className="absolute right-0 top-full mt-1 z-50 w-64 bg-white border-2 border-[#111413] shadow-[0_10px_28px_rgba(0,0,0,0.18)] py-1.5 text-[15px] text-[#111413]"
      onClick={(e) => e.stopPropagation()}
    >
      {subMode === 'main' && (
        <div className="flex flex-col">
          {onTogglePriority && (
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onTogglePriority();
                onClose();
              }}
              className="flex items-center gap-3.5 px-4 py-2.5 text-left hover:bg-[#F3F4F3] transition-colors min-h-[44px] cursor-pointer"
            >
              <span className="w-5 text-center font-bold text-lg leading-none" aria-hidden="true">
                !
              </span>
              <span className="whitespace-nowrap">
                {highPriority ? t.options.removePriority : t.options.markPriority}
              </span>
            </button>
          )}

          {!hideSeasonAndReminder && onSelectSeason && (
            <button
              type="button"
              role="menuitem"
              onClick={() => setSubMode('season')}
              className="flex items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-[#F3F4F3] transition-colors min-h-[44px] cursor-pointer"
            >
              <span className="flex items-center gap-3.5">
                <Snowflake className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">{t.options.selectSeason}</span>
              </span>
              {season && (
                <span className="text-xs text-[#006994] font-medium">
                  {t.seasons[season]}
                </span>
              )}
            </button>
          )}

          {!hideSeasonAndReminder && onSetReminder && (
            <button
              type="button"
              role="menuitem"
              onClick={() => setSubMode('reminder')}
              className="flex items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-[#F3F4F3] transition-colors min-h-[44px] cursor-pointer"
            >
              <span className="flex items-center gap-3.5">
                <BellPlusIcon className="w-5 h-5 shrink-0" />
                <span className="whitespace-nowrap">{t.options.setReminder}</span>
              </span>
              {reminder && (
                <span className="text-xs text-[#006994] font-mono-tabular">{reminder.slice(5)}</span>
              )}
            </button>
          )}

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="flex items-center gap-3.5 px-4 py-2.5 text-left hover:bg-red-50 hover:text-red-700 transition-colors min-h-[44px] cursor-pointer"
          >
            <Trash2 className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">{t.options.deleteTask}</span>
          </button>
        </div>
      )}

      {subMode === 'season' && onSelectSeason && (
        <div className="p-2">
          <div className="flex items-center justify-between px-2 pb-1.5 mb-1 border-b border-black/10">
            <span className="text-xs font-semibold text-[#525855]">{t.options.selectSeason}</span>
            <button
              type="button"
              onClick={() => setSubMode('main')}
              className="text-xs text-[#006994] hover:underline cursor-pointer"
            >
              {t.options.back}
            </button>
          </div>
          <div className="flex flex-col gap-0.5">
            {SEASON_KEYS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  onSelectSeason(s);
                  onClose();
                }}
                className={`flex items-center justify-between px-3 py-2 rounded text-left hover:bg-[#F3F4F3] transition-colors min-h-[40px] cursor-pointer ${
                  season === s ? 'bg-[#006994]/10 text-[#006994] font-medium' : ''
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <SeasonIcon season={s} className="w-4 h-4" />
                  <span>{t.seasons[s]}</span>
                </span>
                {season === s && <Check className="w-4 h-4" />}
              </button>
            ))}
            {season && (
              <button
                type="button"
                onClick={() => {
                  onSelectSeason(undefined);
                  onClose();
                }}
                className="flex items-center gap-2 px-3 py-2 rounded text-left text-xs text-[#525855] hover:bg-[#F3F4F3] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t.options.clearSeason}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {subMode === 'reminder' && onSetReminder && (
        <div className="p-3">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/10">
            <span className="text-xs font-semibold text-[#525855]">{t.options.reminderDate}</span>
            <button
              type="button"
              onClick={() => setSubMode('main')}
              className="text-xs text-[#006994] hover:underline cursor-pointer"
            >
              {t.options.back}
            </button>
          </div>
          <input
            type="date"
            value={reminderDraft}
            onChange={(e) => setReminderDraft(e.target.value)}
            className="w-full border border-black/25 rounded px-2.5 py-2 text-sm mb-2.5 font-mono-tabular"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onSetReminder(reminderDraft || undefined);
                onClose();
              }}
              className="flex-1 bg-[#006994] text-white text-xs font-medium py-2 px-3 rounded hover:bg-[#005578] cursor-pointer"
            >
              {t.options.save}
            </button>
            {reminder && (
              <button
                type="button"
                onClick={() => {
                  onSetReminder(undefined);
                  onClose();
                }}
                className="text-xs text-red-700 hover:bg-red-50 py-2 px-2.5 rounded cursor-pointer"
              >
                {t.options.clear}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
