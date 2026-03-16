import { useParams, Link } from 'react-router-dom';
import { prayers, prayerSteps } from '../data/prayers';
import { useState } from 'react';

function PositionBadge({ position }) {
  const styles = {
    'Стоя (Кийам)': 'bg-blue-100 text-blue-700',
    'Поклон (Руку)': 'bg-orange-100 text-orange-700',
    'Земной поклон (Саджда)': 'bg-red-100 text-red-700',
    'Сидя (Джальса)': 'bg-yellow-100 text-yellow-700',
    'Сидя (Таший)': 'bg-purple-100 text-purple-700',
    'Сидя': 'bg-purple-100 text-purple-700',
    'Поклон и земной поклон': 'bg-orange-100 text-orange-700',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[position] || 'bg-gray-100 text-gray-600'}`}>
      {position}
    </span>
  );
}

function PrayerStep({ step, stepNum }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card mb-3 card-hover">
      <div className="p-4 cursor-pointer flex gap-3 items-start" onClick={() => setOpen(!open)}>
        <div className="step-number flex-shrink-0 mt-0.5">{stepNum}</div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="font-bold text-islamic-green-dark text-sm">{step.name}</h4>
            <PositionBadge position={step.position} />
          </div>
          <p className="arabic-text text-base text-gray-600">{step.arabicName}</p>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{step.description}</p>
        </div>
        <div className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {open && (
        <div className="border-t border-gray-100 p-4 space-y-3">
          {/* Image */}
          {step.image && (
            <img
              src={step.image}
              alt={step.name}
              className="w-full rounded-lg object-cover max-h-56"
              loading="lazy"
            />
          )}
          {/* Arabic + transliteration */}
          <div className="bg-islamic-cream rounded-xl p-4 border border-islamic-gold/20">
            <p className="text-xs text-islamic-gold font-semibold uppercase tracking-wide mb-2">Читается:</p>
            <p className="arabic-text text-2xl text-gray-900 leading-loose">{step.arabic}</p>
            <p className="text-sm text-islamic-green italic mt-2 font-medium">{step.transliteration}</p>
            <p className="text-sm text-gray-500 mt-1 pt-2 border-t border-gray-200">{step.translation}</p>
          </div>
          {step.note && (
            <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-3 border border-amber-100">
              <span className="text-amber-500 flex-shrink-0">📌</span>
              <p className="text-sm text-amber-700">{step.note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PrayerDetailPage({ gender }) {
  const { id } = useParams();
  const prayer = prayers.find((p) => p.id === id);
  const [activeSection, setActiveSection] = useState('guide');

  if (!prayer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl mb-4">🕌</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Намаз не найден</h2>
        <Link to="/prayers" className="btn-primary mt-4">← К списку намазов</Link>
      </div>
    );
  }

  const rakaatData = prayerSteps.twoRakaatFard;

  // Get fard count from prayer
  const fardCount = prayer.rakaats.fard || 2;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={`bg-gradient-to-r ${prayer.color} py-10 px-4 relative overflow-hidden`}>
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="100" r="90" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="200" cy="100" r="60" fill="none" stroke="white" strokeWidth="1.5" />
          <circle cx="200" cy="100" r="30" fill="none" stroke="white" strokeWidth="1" />
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <line key={deg} x1="200" y1="10" x2="200" y2="190" stroke="white" strokeWidth="0.5"
              transform={`rotate(${deg}, 200, 100)`} />
          ))}
        </svg>
        <div className="max-w-3xl mx-auto relative z-10">
          <Link
            to="/prayers"
            className={`inline-flex items-center gap-1 text-sm ${prayer.textColor} opacity-70 hover:opacity-100 mb-4`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Все намазы
          </Link>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">{prayer.icon}</span>
            <div>
              <h1 className={`text-3xl font-bold ${prayer.textColor}`}>{prayer.name}</h1>
              <p className={`arabic-text text-3xl ${prayer.textColor} opacity-90`}>{prayer.arabicName}</p>
            </div>
          </div>
          <p className={`text-sm ${prayer.textColor} opacity-80`}>🕐 {prayer.timeDetail}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
          {[
            { id: 'guide', label: 'Как совершать', icon: '📖' },
            { id: 'rakaats', label: 'Ракааты', icon: '🔢' },
            { id: 'info', label: 'О намазе', icon: 'ℹ️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs sm:text-sm font-semibold transition-colors ${
                activeSection === tab.id
                  ? 'bg-islamic-green text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Guide tab — step by step */}
        {activeSection === 'guide' && (
          <div>
            {/* Gender note */}
            <div className={`mb-4 rounded-xl p-4 border ${
              gender === 'female'
                ? 'bg-pink-50 border-pink-100 text-pink-800'
                : 'bg-blue-50 border-blue-100 text-blue-800'
            }`}>
              <p className="text-sm">
                <strong>{gender === 'female' ? '👩 Для сестёр:' : '👨 Для братьев:'}</strong>{' '}
                {gender === 'female'
                  ? 'Женщины складывают руки на груди (а не под пупком), не расставляют локти в саджда, расставление ног минимальное.'
                  : 'Мужчины складывают руки под пупком, расставляют локти в руку и саджда.'}
              </p>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Ниже представлено пошаговое руководство для <strong>{fardCount}-ракаатного фарз-намаза</strong>.
              Нажмите на каждый шаг для просмотра полного текста.
            </p>

            {rakaatData.map((rakaat) => (
              <div key={rakaat.rakaat} className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-islamic-green text-white font-bold text-sm flex items-center justify-center">
                    {rakaat.rakaat}
                  </div>
                  <h3 className="font-bold text-islamic-green-dark">{rakaat.rakaat}-й Ракаат</h3>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                {rakaat.steps.map((step, i) => (
                  <PrayerStep key={step.id} step={step} stepNum={i + 1} />
                ))}
              </div>
            ))}

            {fardCount === 3 && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                <p className="text-sm text-blue-700">
                  <strong>3-й ракаат (Магриб):</strong> В третьем ракаате после Фатихи дополнительная сура не читается. После двух саджда садятся для финального ташаhhуда.
                </p>
              </div>
            )}

            {fardCount === 4 && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
                <p className="text-sm text-amber-700">
                  <strong>3-й и 4-й ракааты:</strong> В 3-м и 4-м ракаатах после тихой Фатихи дополнительные суры не читаются. Между 2-м и 3-м ракаатами — промежуточное сидение (джальса) с Аттахийяту.
                </p>
              </div>
            )}

            {/* Witr note for Isha */}
            {id === 'isha' && (
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-4">
                <p className="text-sm text-purple-700 font-semibold mb-1">О Витр-намазе (ваджиб по ханафи)</p>
                <p className="text-sm text-purple-700">
                  Витр состоит из 3 ракаатов. В третьем ракаате после Фатихи и суры, до руку, читается дуа Кунут:
                </p>
                <div className="mt-2 bg-white/70 rounded-lg p-3 border border-purple-200">
                  <p className="arabic-text text-xl text-gray-800">اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ...</p>
                  <p className="text-xs text-purple-600 mt-1 italic">
                    Аллаhумма инна настаинука ва насташфирука ва нуминубика ва натаваккалю алайка ва нуснисалляика...
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rakaats tab */}
        {activeSection === 'rakaats' && (
          <div>
            <h2 className="section-title mb-4">Ракааты намаза {prayer.name}</h2>
            <div className="space-y-3">
              {prayer.sections.map((section, i) => {
                const typeInfo = {
                  fard: { color: 'bg-green-500', label: 'Фарз', desc: 'Обязательный — пропуск является грехом' },
                  sunnah: { color: 'bg-amber-500', label: 'Суннат', desc: 'Очень желательный — регулярное выполнение является сунной Пророка ﷺ' },
                  witr: { color: 'bg-purple-500', label: 'Витр', desc: 'Ваджиб по ханафи — оставление без уважительной причины является грехом' },
                  nafl: { color: 'bg-blue-400', label: 'Нафль', desc: 'Добровольный — выполнение приносит дополнительное вознаграждение' },
                }[section.type] || { color: 'bg-gray-400', label: 'Прочее', desc: '' };

                return (
                  <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden flex">
                    <div className={`w-2 ${typeInfo.color} flex-shrink-0`} />
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${typeInfo.color}`}>
                              {typeInfo.label}
                            </span>
                            <span className="font-semibold text-gray-800">{section.name}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{typeInfo.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-6 bg-islamic-green/10 rounded-xl p-4 border border-islamic-green/20">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-islamic-green-dark">Итого ракаатов:</span>
                <span className="text-2xl font-bold text-islamic-green">
                  {Object.values(prayer.rakaats).reduce((a, b) => a + b, 0)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Фарз: {prayer.rakaats.fard} ракаата обязательно</p>
            </div>
          </div>
        )}

        {/* Info tab */}
        {activeSection === 'info' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-islamic-green-dark text-lg mb-1">{prayer.name}</h3>
              <p className="arabic-text text-2xl text-islamic-gold mb-3">{prayer.arabicName}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{prayer.description}</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-700 mb-2">🕐 Время намаза</h4>
              <p className="text-sm text-gray-600">{prayer.timeDetail}</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-700 mb-2">✨ Достоинство</h4>
              <blockquote className="text-sm text-gray-600 italic border-l-3 border-islamic-gold pl-3">
                {prayer.virtues}
              </blockquote>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
