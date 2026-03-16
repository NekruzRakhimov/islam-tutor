import { useState } from 'react';

export default function DuaCard({ dua }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(dua.arabic).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="card mb-3 card-hover">
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-islamic-green-dark text-sm">{dua.title}</h3>
              {dua.count && (
                <span className="text-xs bg-islamic-gold/10 text-islamic-gold-dark px-2 py-0.5 rounded-full border border-islamic-gold/20 font-medium">
                  {dua.count}
                </span>
              )}
            </div>
            <p className="arabic-text text-lg text-gray-700 mt-1 leading-relaxed line-clamp-2">
              {dua.arabic}
            </p>
            {!expanded && (
              <p className="text-xs text-gray-500 mt-1 italic line-clamp-1">{dua.transliteration}</p>
            )}
          </div>
          <div className={`flex-shrink-0 text-gray-400 mt-1 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 p-4 space-y-3">
          {/* Full Arabic */}
          <div className="bg-islamic-cream rounded-xl p-4 border border-islamic-gold/20">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-islamic-gold font-semibold uppercase tracking-wide">Арабский текст</p>
              <button
                onClick={handleCopy}
                className="text-xs text-gray-400 hover:text-islamic-green flex items-center gap-1 transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Скопировано
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Копировать
                  </>
                )}
              </button>
            </div>
            <p className="arabic-text text-2xl leading-loose text-gray-900">{dua.arabic}</p>
          </div>

          {/* Transliteration */}
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Транслитерация</p>
            <p className="text-sm text-islamic-green italic font-medium leading-relaxed">{dua.transliteration}</p>
          </div>

          {/* Translation */}
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Перевод</p>
            <p className="text-sm text-gray-700 leading-relaxed">{dua.translation}</p>
          </div>

          {/* Benefit */}
          {dua.benefit && (
            <div className="flex items-start gap-2 bg-green-50 rounded-lg p-3 border border-green-100">
              <span className="flex-shrink-0 text-green-600">✨</span>
              <p className="text-sm text-green-700">{dua.benefit}</p>
            </div>
          )}

          {/* Source */}
          {dua.source && (
            <p className="text-xs text-gray-400 text-right">
              Источник: <span className="text-gray-500 font-medium">{dua.source}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
