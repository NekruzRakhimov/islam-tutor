import { useState } from 'react';
import DuaCard from '../components/DuaCard';
import { duaCategories, duas } from '../data/duas';

export default function DuasPage() {
  const [activeCategory, setActiveCategory] = useState('morning');
  const [searchQuery, setSearchQuery] = useState('');

  const currentDuas = duas[activeCategory] || [];
  const filteredDuas = searchQuery
    ? Object.values(duas).flat().filter(
        (d) =>
          d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.translation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.transliteration?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentDuas;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="geometric-bg text-white py-10 px-4 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 5 }).map((_, i) => (
            <polygon
              key={i}
              points={`200,${10 + i * 5} ${390 - i * 5},100 200,${190 - i * 5} ${10 + i * 5},100`}
              fill="none" stroke="#c9a84c" strokeWidth="0.8"
            />
          ))}
        </svg>
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <p className="arabic-text text-5xl text-islamic-gold font-bold mb-2">الدُّعَاء</p>
          <h1 className="text-3xl font-bold text-white">Дуа и Азкары</h1>
          <p className="text-green-200 mt-2">Дуа на каждый день · Проверенные источники</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Поиск дуа..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-islamic-green/30 focus:border-islamic-green text-sm"
          />
          <svg
            className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>

        {/* Search results */}
        {searchQuery ? (
          <div>
            <p className="text-sm text-gray-500 mb-4">
              {filteredDuas.length > 0
                ? `Найдено: ${filteredDuas.length} дуа`
                : 'Ничего не найдено'}
            </p>
            {filteredDuas.map((dua) => (
              <DuaCard key={dua.id} dua={dua} />
            ))}
          </div>
        ) : (
          <>
            {/* Category tabs — horizontal scroll */}
            <div className="overflow-x-auto pb-2 mb-6 -mx-4 px-4">
              <div className="flex gap-2 min-w-max">
                {duaCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                      activeCategory === cat.id
                        ? 'bg-islamic-green border-islamic-green text-white shadow-md'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-islamic-green/50'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active category header */}
            {(() => {
              const cat = duaCategories.find((c) => c.id === activeCategory);
              return cat ? (
                <div className={`bg-gradient-to-r ${cat.color} rounded-xl p-4 mb-5 text-white`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <h2 className="font-bold text-lg">{cat.name}</h2>
                      <p className="arabic-text text-xl opacity-80">{cat.arabicName}</p>
                      <p className="text-sm opacity-70 mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}

            {/* Duas list */}
            {currentDuas.length > 0 ? (
              currentDuas.map((dua) => (
                <DuaCard key={dua.id} dua={dua} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">📿</p>
                <p className="text-gray-500">Дуа для этой категории скоро появятся</p>
              </div>
            )}
          </>
        )}

        {/* Important note */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-700 leading-relaxed">
            <strong>Примечание:</strong> Все дуа приведены с транслитерацией для тех, кто ещё не умеет читать арабский. Рекомендуется как можно скорее научиться читать Коран на арабском языке, так как это несёт дополнительную награду.
          </p>
        </div>
      </div>
    </div>
  );
}
