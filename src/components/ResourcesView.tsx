import React, { useState } from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import { ResourceItem } from '../types';
import { Language, TRANSLATIONS } from '../i18n';

interface ResourcesViewProps {
  resources: ResourceItem[];
  lang: Language;
  isPreview?: boolean;
  searchQuery?: string;
  onOpenDetail: () => void;
  onAddResource: (item: Omit<ResourceItem, 'id'>) => void;
  onDeleteResource: (id: string) => void;
}

export function ResourcesView({
  resources,
  lang,
  isPreview = false,
  searchQuery = '',
  onOpenDetail,
  onAddResource,
  onDeleteResource,
}: ResourcesViewProps) {
  const t = TRANSLATIONS[lang];
  const [langFilter, setLangFilter] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('Eng');

  const q = searchQuery.trim().toLowerCase();

  const filtered = resources.filter((r) => {
    if (!isPreview && langFilter !== 'all' && r.language.toLowerCase() !== langFilter) {
      return false;
    }
    if (q) {
      return `${r.title} ${r.language}`.toLowerCase().includes(q);
    }
    return true;
  });

  const visible = isPreview && !q ? filtered.slice(0, 4) : filtered;
  const languages = Array.from(new Set(resources.map((r) => r.language)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setIsAdding(false);
      return;
    }
    let cleanUrl = url.trim() || 'https://www.folkboat.com';
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = `https://${cleanUrl}`;
    }
    onAddResource({
      title: cleanTitle,
      url: cleanUrl,
      language: language.trim() || 'Eng',
    });
    setTitle('');
    setUrl('');
    setLanguage('Eng');
    setIsAdding(false);
  };

  return (
    <section
      aria-label={t.resources.title}
      className={`bg-white border-[4px] border-[#8C522A] rounded-[28px] shadow-[0_4px_14px_rgba(0,0,0,0.08)] flex flex-col ${
        isPreview ? 'p-4 md:p-6' : 'p-5 sm:p-6 md:p-8'
      }`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={onOpenDetail}
          className="flex items-center gap-2.5 text-left group cursor-pointer min-h-[40px]"
        >
          <Users className="w-6 h-6 text-[#111413] shrink-0" aria-hidden="true" />
          <h2 className="text-[20px] md:text-[24px] font-medium tracking-tight text-[#111413] group-hover:text-[#8C522A] transition-colors">
            {t.resources.title}
          </h2>
        </button>

        {!isPreview && languages.length > 1 && (
          <div className="flex items-center gap-1" role="tablist" aria-label={t.modals.labels.language}>
            <button
              type="button"
              role="tab"
              aria-selected={langFilter === 'all'}
              onClick={() => setLangFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                langFilter === 'all'
                  ? 'bg-[#8C522A] text-white'
                  : 'text-[#525855] hover:bg-black/5 hover:text-[#111413]'
              }`}
            >
              {t.resources.all}
            </button>
            {languages.map((itemLang) => (
              <button
                key={itemLang}
                type="button"
                role="tab"
                aria-selected={langFilter === itemLang.toLowerCase()}
                onClick={() => setLangFilter(itemLang.toLowerCase())}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  langFilter === itemLang.toLowerCase()
                    ? 'bg-[#8C522A] text-white'
                    : 'text-[#525855] hover:bg-black/5 hover:text-[#111413]'
                }`}
              >
                {itemLang}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Resource Links List */}
      <ul className="space-y-3 pl-1 sm:pl-3">
        {visible.map((item) => (
          <li
            key={item.id}
            className="group flex items-start justify-between gap-3 min-h-[32px]"
          >
            <div className="text-[16px] leading-snug text-[#111413]">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-[#111413]/75 hover:text-[#006994] hover:decoration-[#006994] transition-colors"
              >
                {item.title}
              </a>{' '}
              <span className="text-[#111413]">({item.language})</span>
            </div>

            {!isPreview && (
              <button
                type="button"
                onClick={() => onDeleteResource(item.id)}
                aria-label={item.title}
                className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-700 text-[#525855] shrink-0 transition-opacity cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="py-3 text-sm text-[#525855]">{t.resources.noMatching}</p>
      )}

      {/* + List item (Detail view) */}
      {!isPreview && (
        <div className="mt-4">
          {isAdding ? (
            <form
              onSubmit={handleSubmit}
              className="p-4 rounded-2xl bg-[#F8F8F7] border border-black/10 space-y-3 max-w-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  autoFocus
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.resources.titlePlaceholder}
                  className="sm:col-span-3 px-3 py-2 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-[#8C522A]"
                />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  aria-label={t.modals.labels.language}
                  className="px-3 py-2 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-[#8C522A]"
                >
                  <option value="Eng">Eng</option>
                  <option value="Swe">Swe</option>
                  <option value="Dan">Dan</option>
                  <option value="Deu">Deu</option>
                  <option value="Fin">Fin</option>
                </select>
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t.resources.urlPlaceholder}
                className="w-full px-3 py-2 rounded-lg bg-white border border-black/15 text-sm font-mono-tabular focus:outline-none focus:border-[#8C522A]"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#8C522A] text-white text-xs font-medium hover:bg-[#734221] cursor-pointer"
                >
                  {t.resources.saveLink}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-2 text-xs text-[#525855] hover:text-[#111413] cursor-pointer"
                >
                  {t.resources.cancel}
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-3 pl-2 pr-3 py-2 min-h-[44px] text-left text-[16px] text-[#111413] hover:bg-black/[0.03] rounded-xl transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5" aria-hidden="true" />
              <span>{t.resources.listItem}</span>
            </button>
          )}
        </div>
      )}

      {/* Home Preview Footer */}
      {isPreview && filtered.length > 4 && (
        <div className="mt-4 pt-2.5 border-t border-black/10 flex items-center justify-between text-xs text-[#525855]">
          <span className="font-mono-tabular">{t.resources.linksCount(filtered.length)}</span>
          <button
            type="button"
            onClick={onOpenDetail}
            className="font-medium text-[#006994] hover:underline cursor-pointer py-1 px-2"
          >
            {t.resources.viewAll}
          </button>
        </div>
      )}
    </section>
  );
}
