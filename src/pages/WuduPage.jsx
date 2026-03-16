import { useState } from 'react';
import StepCard from '../components/StepCard';
import GenderSelector from '../components/GenderSelector';
import { wuduIntro, wuduStepsMale, wuduStepsFemale } from '../data/wudu';

export default function WuduPage({ gender, setGender }) {
  const [activeTab, setActiveTab] = useState('steps');
  const steps = gender === 'female' ? wuduStepsFemale : wuduStepsMale;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="geometric-bg text-white py-10 px-4 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 55 + 27} cy={row * 55 + 27} r="20" fill="none" stroke="#c9a84c" strokeWidth="1" />
            ))
          )}
        </svg>
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <p className="arabic-text text-5xl text-islamic-gold font-bold mb-2">الوُضُوء</p>
          <h1 className="text-3xl font-bold text-white">Омовение (Вуду)</h1>
          <p className="text-green-200 mt-2">По мазхабу Ханафи · Пошаговое руководство</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Gender Selector */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <p className="text-center text-sm text-gray-500 mb-3">Выберите для кого:</p>
          <GenderSelector gender={gender} setGender={setGender} />
          <p className="text-center text-xs text-gray-400 mt-2">
            {gender === 'male'
              ? 'Показаны правила для мужчин'
              : 'Показаны правила для женщин (с учётом хиджаба и косметики)'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
          {[
            { id: 'steps', label: 'Шаги', icon: '📋' },
            { id: 'info', label: 'Условия', icon: 'ℹ️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-islamic-green text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Steps Tab */}
        {activeTab === 'steps' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-islamic-gold/50" />
              <p className="text-sm text-islamic-gold font-semibold">
                {gender === 'male' ? '👨 Для братьев' : '👩 Для сестёр'}
              </p>
              <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-islamic-gold/50" />
            </div>

            {steps.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}

            {/* Completion card */}
            <div className="mt-6 bg-gradient-to-r from-islamic-green to-emerald-600 rounded-xl p-5 text-white text-center">
              <p className="text-2xl mb-2">🌿</p>
              <h3 className="font-bold text-lg">Вуду завершено!</h3>
              <p className="text-green-100 text-sm mt-1">
                Теперь вы можете совершать намаз, держать Коран и совершать другие поклонения, требующие вуду.
              </p>
              <p className="arabic-text text-xl text-islamic-gold mt-3">اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ</p>
            </div>
          </div>
        )}

        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            {/* Description */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h2 className="font-bold text-islamic-green-dark text-lg mb-2">{wuduIntro.title}</h2>
              <p className="arabic-text text-2xl text-islamic-gold mb-3">{wuduIntro.arabicTitle}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{wuduIntro.description}</p>
            </div>

            {/* Obligatory acts */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-islamic-green-dark mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                Обязательные действия (Фарз)
              </h3>
              <ul className="space-y-2">
                {wuduIntro.obligatory.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sunnah acts */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-islamic-green-dark mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                Желательные действия (Суннат)
              </h3>
              <ul className="space-y-2">
                {wuduIntro.sunnah.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nullifiers */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-islamic-green-dark mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-500 inline-block"></span>
                Что нарушает вуду
              </h3>
              <ul className="space-y-2">
                {wuduIntro.nullifiers.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-gray-400 mt-0.5 flex-shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Note */}
            <div className="bg-islamic-gold/10 border border-islamic-gold/30 rounded-xl p-4">
              <p className="text-sm text-amber-800">
                <strong>Важно:</strong> Если вы не уверены в какой-либо детали, обратитесь к местному алиму или надёжному источнику по фикху ханафи.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
