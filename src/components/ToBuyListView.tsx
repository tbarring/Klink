import React, { useState } from 'react';
import { MoreVertical, Plus, ShoppingCart } from 'lucide-react';
import { SortMode, ToBuyItem } from '../types';
import { Language, SV_SEED_TOBUY, TRANSLATIONS } from '../i18n';
import { BroomIcon } from './KlinkIcons';
import { TaskOptionsMenu } from './TaskOptionsMenu';

interface ToBuyListViewProps {
  items: ToBuyItem[];
  lang: Language;
  isPreview?: boolean;
  sortMode?: SortMode;
  searchQuery?: string;
  onOpenDetail: () => void;
  onToggleItem: (id: string) => void;
  onAddItem: (title: string, quantity?: string) => void;
  onDeleteItem: (id: string) => void;
  onTogglePriority: (id: string) => void;
  onReorderItems: (draggedId: string, targetId: string) => void;
  onClearPurchased: () => void;
}

export function ToBuyListView({
  items,
  lang,
  isPreview = false,
  sortMode = 'custom',
  searchQuery = '',
  onOpenDetail,
  onToggleItem,
  onAddItem,
  onDeleteItem,
  onTogglePriority,
  onReorderItems,
  onClearPurchased,
}: ToBuyListViewProps) {
  const t = TRANSLATIONS[lang];
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newQty, setNewQty] = useState('');
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const getTitle = (item: ToBuyItem) =>
    lang === 'sv' && SV_SEED_TOBUY[item.id] ? SV_SEED_TOBUY[item.id].title : item.title;

  const getQuantity = (item: ToBuyItem) =>
    lang === 'sv' && SV_SEED_TOBUY[item.id]?.quantity
      ? SV_SEED_TOBUY[item.id].quantity
      : item.quantity;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  let filtered = items.filter((item) => {
    if (normalizedQuery) {
      const hay = `${getTitle(item)} ${item.title} ${getQuantity(item) || ''}`.toLowerCase();
      return hay.includes(normalizedQuery);
    }
    return true;
  });

  if (sortMode === 'alpha') {
    filtered = [...filtered].sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
  } else if (sortMode === 'priority') {
    filtered = [...filtered].sort(
      (a, b) => Number(Boolean(b.highPriority)) - Number(Boolean(a.highPriority))
    );
  }

  const activeItems = filtered.filter((i) => !i.completed);
  const purchasedItems = filtered.filter((i) => i.completed);
  const visibleActive = isPreview && !normalizedQuery ? activeItems.slice(0, 4) : activeItems;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) {
      setIsAdding(false);
      return;
    }
    onAddItem(trimmed, newQty.trim() || undefined);
    setNewTitle('');
    setNewQty('');
    setIsAdding(false);
  };

  return (
    <section
      aria-label={t.tobuy.title}
      className={`bg-white border-[4px] border-[#28A99E] rounded-[28px] shadow-[0_4px_14px_rgba(0,0,0,0.08)] flex flex-col ${
        isPreview ? 'p-4 md:p-6' : 'p-4 sm:p-6 md:p-7'
      }`}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <button
          type="button"
          onClick={onOpenDetail}
          className="flex items-center gap-2.5 text-left group cursor-pointer min-h-[40px]"
        >
          <ShoppingCart className="w-6 h-6 text-[#111413] shrink-0" aria-hidden="true" />
          <h2 className="text-[20px] md:text-[24px] font-medium tracking-tight text-[#111413] group-hover:text-[#006994] transition-colors">
            {t.tobuy.title}
          </h2>
        </button>
      </div>

      {/* Active Items */}
      <ul className="space-y-0.5">
        {visibleActive.map((item) => {
          const displayTitle = getTitle(item);
          const displayQty = getQuantity(item);
          return (
            <li
              key={item.id}
              draggable={sortMode === 'custom'}
              onDragStart={() => setDraggedId(item.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (draggedId && draggedId !== item.id) {
                  onReorderItems(draggedId, item.id);
                }
                setDraggedId(null);
              }}
              className={`relative flex items-center justify-between gap-2 min-h-[44px] py-1 rounded-lg transition-colors ${
                draggedId === item.id ? 'opacity-50 bg-[#28A99E]/5' : 'hover:bg-black/[0.025]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span
                  className="text-[#222] opacity-80 cursor-grab active:cursor-grabbing shrink-0 inline-flex"
                  aria-hidden="true"
                >
                  <MoreVertical className="w-4 h-4" />
                </span>

                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggleItem(item.id)}
                  aria-label={displayTitle}
                  className="klink-checkbox"
                />

                <div className="flex items-baseline gap-2 min-w-0 flex-1">
                  <span className="text-[16px] text-[#111413] truncate">{displayTitle}</span>
                  {!isPreview && displayQty && (
                    <span className="text-xs text-[#525855] font-mono-tabular shrink-0">
                      · {displayQty}
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
                    onTogglePriority={() => onTogglePriority(item.id)}
                    onDelete={() => onDeleteItem(item.id)}
                    hideSeasonAndReminder
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {visibleActive.length === 0 && (
        <p className="py-3 text-sm text-[#525855]">
          {normalizedQuery ? t.tobuy.noMatching : t.tobuy.listClear}
        </p>
      )}

      {/* + List item */}
      {!isPreview && (
        <div className="mt-1">
          {isAdding ? (
            <form
              onSubmit={handleAddSubmit}
              className="flex flex-wrap items-center gap-2 py-1.5 pl-6"
            >
              <Plus className="w-5 h-5 text-[#525855] shrink-0" aria-hidden="true" />
              <input
                type="text"
                autoFocus
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={t.tobuy.itemPlaceholder}
                className="flex-1 min-w-[160px] text-[16px] text-[#111413] placeholder:text-[#757A77] bg-transparent border-b border-[#28A99E] py-1 focus:outline-none"
              />
              <input
                type="text"
                value={newQty}
                onChange={(e) => setNewQty(e.target.value)}
                placeholder={t.tobuy.qtyPlaceholder}
                className="w-32 text-sm font-mono-tabular text-[#111413] placeholder:text-[#757A77] bg-transparent border-b border-black/20 py-1 focus:outline-none focus:border-[#28A99E]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-[#28A99E] text-white text-xs font-medium hover:bg-[#208c83] cursor-pointer"
              >
                {t.tobuy.add}
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-2 py-1.5 text-xs text-[#525855] hover:text-[#111413] cursor-pointer"
              >
                {t.tobuy.cancel}
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-3 pl-6 pr-3 py-2 min-h-[44px] w-full text-left text-[16px] text-[#222] hover:bg-black/[0.025] rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5 text-[#111413]" aria-hidden="true" />
              <span>{t.tobuy.listItem}</span>
            </button>
          )}
        </div>
      )}

      {/* Home Preview Footer */}
      {isPreview && (activeItems.length > 4 || purchasedItems.length > 0) && (
        <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between text-xs text-[#525855]">
          <span className="font-mono-tabular">
            {t.tobuy.neededBought(activeItems.length, purchasedItems.length)}
          </span>
          <button
            type="button"
            onClick={onOpenDetail}
            className="font-medium text-[#006994] hover:underline cursor-pointer py-1 px-2"
          >
            {t.tobuy.openFullList}
          </button>
        </div>
      )}

      {/* Purchased Items */}
      {!isPreview && purchasedItems.length > 0 && (
        <>
          <hr className="border-t border-black/20 my-4" />
          <ul className="space-y-0.5 pl-4 sm:pl-6">
            {purchasedItems.map((item) => {
              const displayTitle = getTitle(item);
              return (
                <li key={item.id} className="flex items-center justify-between min-h-[42px] py-1">
                  <label className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => onToggleItem(item.id)}
                      aria-label={displayTitle}
                      className="klink-checkbox"
                    />
                    <span className="text-[16px] text-[#222] line-through truncate">
                      {displayTitle}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClearPurchased}
              className="inline-flex items-center gap-2 px-3 py-2 min-h-[40px] rounded-lg text-[16px] text-[#111413] hover:bg-black/5 transition-colors cursor-pointer"
            >
              <span>{t.tobuy.clear}</span>
              <BroomIcon className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
