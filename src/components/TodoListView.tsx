import React, { useState } from 'react';
import { ClipboardCheck, GripVertical, MoreVertical, Plus, Bell } from 'lucide-react';
import { Season, SortMode, TodoItem } from '../types';
import { Language, SV_SEED_TODOS, TRANSLATIONS } from '../i18n';
import { BroomIcon, SeasonIcon } from './KlinkIcons';
import { TaskOptionsMenu } from './TaskOptionsMenu';

interface TodoListViewProps {
  todos: TodoItem[];
  lang: Language;
  isPreview?: boolean;
  activeSeason?: Season;
  sortMode?: SortMode;
  searchQuery?: string;
  onOpenDetail: (season?: Season) => void;
  onToggleTodo: (id: string) => void;
  onAddTodo: (title: string, season?: Season) => void;
  onDeleteTodo: (id: string) => void;
  onTogglePriority: (id: string) => void;
  onSetSeason: (id: string, season: Season | undefined) => void;
  onSetReminder: (id: string, date: string | undefined) => void;
  onReorderTodos: (draggedId: string, targetId: string) => void;
  onClearCompleted: (season?: Season) => void;
}

const SEASON_ORDER: Record<Season, number> = {
  spring: 1,
  summer: 2,
  autumn: 3,
  winter: 4,
};

export function TodoListView({
  todos,
  lang,
  isPreview = false,
  activeSeason,
  sortMode = 'custom',
  searchQuery = '',
  onOpenDetail,
  onToggleTodo,
  onAddTodo,
  onDeleteTodo,
  onTogglePriority,
  onSetSeason,
  onSetReminder,
  onReorderTodos,
  onClearCompleted,
}: TodoListViewProps) {
  const t = TRANSLATIONS[lang];
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const getTitle = (item: TodoItem) =>
    lang === 'sv' && SV_SEED_TODOS[item.id] ? SV_SEED_TODOS[item.id] : item.title;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  let filtered = todos.filter((item) => {
    if (activeSeason && item.season !== activeSeason) return false;
    if (normalizedQuery) {
      const displayTitle = getTitle(item).toLowerCase();
      const rawTitle = item.title.toLowerCase();
      if (!displayTitle.includes(normalizedQuery) && !rawTitle.includes(normalizedQuery)) {
        return false;
      }
    }
    return true;
  });

  if (sortMode === 'alpha') {
    filtered = [...filtered].sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
  } else if (sortMode === 'priority') {
    filtered = [...filtered].sort(
      (a, b) => Number(Boolean(b.highPriority)) - Number(Boolean(a.highPriority))
    );
  } else if (sortMode === 'season') {
    filtered = [...filtered].sort((a, b) => {
      const sa = a.season ? SEASON_ORDER[a.season] : 99;
      const sb = b.season ? SEASON_ORDER[b.season] : 99;
      return sa - sb;
    });
  }

  const activeItems = filtered.filter((i) => !i.completed);
  const completedItems = filtered.filter((i) => i.completed);

  const visibleActiveItems =
    isPreview && !normalizedQuery ? activeItems.slice(0, 4) : activeItems;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) {
      setIsAdding(false);
      return;
    }
    onAddTodo(trimmed, activeSeason);
    setNewTitle('');
    setIsAdding(false);
  };

  const handleDrop = (targetId: string) => {
    if (draggedId && draggedId !== targetId) {
      onReorderTodos(draggedId, targetId);
    }
    setDraggedId(null);
  };

  return (
    <section
      aria-label={activeSeason ? t.todo.titleSeason(activeSeason) : t.todo.title}
      className={`bg-white border-[4px] border-[#006994] rounded-[28px] shadow-[0_4px_14px_rgba(0,0,0,0.08)] flex flex-col ${
        isPreview ? 'p-4 md:p-6' : 'p-4 sm:p-6 md:p-7'
      }`}
    >
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <button
          type="button"
          onClick={() => onOpenDetail(activeSeason)}
          className="flex items-center gap-2.5 text-left group cursor-pointer min-h-[40px]"
        >
          <ClipboardCheck className="w-6 h-6 text-[#111413] shrink-0" aria-hidden="true" />
          <h2 className="text-[20px] md:text-[24px] font-medium tracking-tight text-[#111413] group-hover:text-[#006994] transition-colors">
            {activeSeason ? t.todo.titleSeason(activeSeason) : t.todo.title}
          </h2>
          {activeSeason && (
            <SeasonIcon season={activeSeason} className="w-6 h-6 text-[#111413] shrink-0" />
          )}
        </button>

        {!isPreview && (
          <div className="flex items-center gap-1 flex-wrap" role="tablist" aria-label="Filter by season">
            <button
              type="button"
              role="tab"
              aria-selected={!activeSeason}
              onClick={() => onOpenDetail(undefined)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                !activeSeason
                  ? 'bg-[#006994] text-white'
                  : 'text-[#525855] hover:bg-black/5 hover:text-[#111413]'
              }`}
            >
              {t.todo.all}
            </button>
            {(['spring', 'summer', 'autumn', 'winter'] as Season[]).map((season) => (
              <button
                key={season}
                type="button"
                role="tab"
                aria-selected={activeSeason === season}
                onClick={() => onOpenDetail(season)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeSeason === season
                    ? 'bg-[#006994] text-white'
                    : 'text-[#525855] hover:bg-black/5 hover:text-[#111413]'
                }`}
              >
                <SeasonIcon season={season} className="w-3.5 h-3.5" />
                <span>{t.seasons[season]}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Active Items */}
      <ul className="divide-y divide-transparent space-y-0.5">
        {visibleActiveItems.map((item) => {
          const displayTitle = getTitle(item);
          return (
            <li
              key={item.id}
              draggable={sortMode === 'custom'}
              onDragStart={() => setDraggedId(item.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(item.id)}
              className={`relative flex items-center justify-between gap-2 min-h-[44px] py-1 rounded-lg transition-colors ${
                draggedId === item.id ? 'opacity-50 bg-[#006994]/5' : 'hover:bg-black/[0.025]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span
                  className="text-[#222] opacity-80 cursor-grab active:cursor-grabbing shrink-0 hidden sm:inline-flex"
                  title={t.todo.dragToReorder}
                  aria-hidden="true"
                >
                  <GripVertical className="w-4 h-4" />
                </span>
                <span
                  className="text-[#222] opacity-80 shrink-0 sm:hidden inline-flex"
                  aria-hidden="true"
                >
                  <GripVertical className="w-4 h-4" />
                </span>

                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggleTodo(item.id)}
                  aria-label={displayTitle}
                  className="klink-checkbox"
                />

                <div className="min-w-0 flex-1">
                  <span className="text-[16px] text-[#111413] leading-snug block truncate">
                    {displayTitle}
                  </span>
                  {item.reminder && (
                    <span className="inline-flex items-center gap-1 text-[12px] text-[#006994] font-mono-tabular">
                      <Bell className="w-3 h-3" aria-hidden="true" />
                      <span>{item.reminder}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {item.highPriority && (
                  <span
                    title={t.todo.highPriority}
                    aria-label={t.todo.highPriority}
                    className="w-6 text-center font-bold text-[19px] leading-none text-[#111413] select-none"
                  >
                    !
                  </span>
                )}
                {item.season && !activeSeason && (
                  <button
                    type="button"
                    onClick={() => onOpenDetail(item.season)}
                    title={t.seasons[item.season]}
                    aria-label={t.seasons[item.season]}
                    className="p-1.5 rounded-md hover:bg-black/5 text-[#111413] cursor-pointer"
                  >
                    <SeasonIcon season={item.season} className="w-5 h-5" />
                  </button>
                )}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                    aria-label={displayTitle}
                    aria-expanded={openMenuId === item.id}
                    className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-black/5 text-[#111413] cursor-pointer"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  <TaskOptionsMenu
                    isOpen={openMenuId === item.id}
                    onClose={() => setOpenMenuId(null)}
                    lang={lang}
                    highPriority={item.highPriority}
                    season={item.season}
                    reminder={item.reminder}
                    onTogglePriority={() => onTogglePriority(item.id)}
                    onSelectSeason={(s) => onSetSeason(item.id, s)}
                    onSetReminder={(d) => onSetReminder(item.id, d)}
                    onDelete={() => onDeleteTodo(item.id)}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {visibleActiveItems.length === 0 && (
        <p className="py-3 text-sm text-[#525855]">
          {normalizedQuery
            ? t.todo.noMatching
            : activeSeason
              ? t.todo.noActiveSeason(activeSeason)
              : t.todo.allCompleted}
        </p>
      )}

      {/* + List item inline add (Detail view) */}
      {!isPreview && (
        <div className="mt-1">
          {isAdding ? (
            <form onSubmit={handleAddSubmit} className="flex items-center gap-2 py-1.5 pl-6">
              <Plus className="w-5 h-5 text-[#525855] shrink-0" aria-hidden="true" />
              <input
                type="text"
                autoFocus
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={handleAddSubmit}
                placeholder={
                  activeSeason
                    ? t.todo.addSeasonPlaceholder(activeSeason)
                    : t.todo.listItem
                }
                className="flex-1 text-[16px] text-[#111413] placeholder:text-[#757A77] bg-transparent border-b border-[#006994] py-1 focus:outline-none"
              />
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-3 pl-6 pr-3 py-2 min-h-[44px] w-full text-left text-[16px] text-[#222] hover:bg-black/[0.025] rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5 text-[#111413]" aria-hidden="true" />
              <span>{t.todo.listItem}</span>
            </button>
          )}
        </div>
      )}

      {/* Home Preview Footer Link */}
      {isPreview && (activeItems.length > 4 || completedItems.length > 0) && (
        <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between text-xs text-[#525855]">
          <span className="font-mono-tabular">
            {t.todo.activeDone(activeItems.length, completedItems.length)}
          </span>
          <button
            type="button"
            onClick={() => onOpenDetail(undefined)}
            className="font-medium text-[#006994] hover:underline cursor-pointer py-1 px-2"
          >
            {t.todo.openFullList}
          </button>
        </div>
      )}

      {/* Completed Items Section (Detail View) */}
      {!isPreview && completedItems.length > 0 && (
        <>
          <hr className="border-t border-black/20 my-4" />
          <ul className="space-y-0.5 pl-4 sm:pl-6">
            {completedItems.map((item) => {
              const displayTitle = getTitle(item);
              return (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-2 min-h-[42px] py-1"
                >
                  <label className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => onToggleTodo(item.id)}
                      aria-label={displayTitle}
                      className="klink-checkbox"
                    />
                    <span className="text-[16px] text-[#222] line-through truncate">
                      {displayTitle}
                    </span>
                  </label>
                  {item.season && !activeSeason && (
                    <SeasonIcon
                      season={item.season}
                      className="w-4 h-4 text-[#525855] shrink-0 mr-2"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => onClearCompleted(activeSeason)}
              className="inline-flex items-center gap-2 px-3 py-2 min-h-[40px] rounded-lg text-[16px] text-[#111413] hover:bg-black/5 transition-colors cursor-pointer"
            >
              <span>{t.todo.clear}</span>
              <BroomIcon className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
