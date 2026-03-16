import PrayerCard from '../components/PrayerCard';
import { prayers } from '../data/prayers';

export default function PrayersPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="geometric-bg text-white py-10 px-4 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          {[0, 1, 2, 3].map((i) => (
            <polygon
              key={i}
              points={`${200 + i * 15},10 ${390 - i * 10},100 ${200 + i * 15},190 ${10 + i * 10},100`}
              fill="none" stroke="#c9a84c" strokeWidth="1"
            />
          ))}
        </svg>
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <p className="arabic-text text-5xl text-islamic-gold font-bold mb-2">الصَّلَاة</p>
          <h1 className="text-3xl font-bold text-white">Намаз</h1>
          <p className="text-green-200 mt-2">Пять обязательных намазов · По мазхабу Ханафи</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Intro */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-6 border-l-4 border-islamic-green">
          <h2 className="font-bold text-islamic-green-dark mb-2">О намазе</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Намаз (Салят) — второй столп Ислама, обязательный для каждого мусульманина и мусульманки. Совершается 5 раз в сутки в установленное время, лицом к Каабе (кибла).
            Намаз является прямым общением раба с Аллаhом.
          </p>
        </div>

        {/* Conditions for prayer */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <h3 className="font-bold text-islamic-green-dark mb-3">Условия действительности намаза</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { label: 'Наличие вуду', icon: '💧' },
              { label: 'Чистота тела и одежды', icon: '✨' },
              { label: 'Правильное направление (кибла)', icon: '🧭' },
              { label: 'Закрытие аурата', icon: '👘' },
              { label: 'Наступление времени намаза', icon: '🕐' },
              { label: 'Намерение (ниййат)', icon: '💭' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
            <p className="text-xs text-amber-700">
              <strong>Аурат мужчины</strong> в намазе — от пупка до колен (включая колени). <strong>Аурат женщины</strong> — всё тело, кроме лица, кистей рук и стоп (по ханафи).
            </p>
          </div>
        </div>

        {/* Prayer cards */}
        <div className="mb-4">
          <h2 className="section-title mb-1">Пять ежедневных намазов</h2>
          <p className="text-sm text-gray-500 mb-4">Нажмите на намаз для просмотра деталей и пошагового руководства</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {prayers.map((prayer) => (
            <PrayerCard key={prayer.id} prayer={prayer} />
          ))}
        </div>

        {/* Rakaat legend */}
        <div className="mt-6 bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm">Условные обозначения</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { type: 'fard', label: 'Фарз', desc: 'Обязательный', color: 'bg-green-100 text-green-700 border-green-200' },
              { type: 'sunnah', label: 'Суннат', desc: 'Весьма желательный', color: 'bg-amber-100 text-amber-700 border-amber-200' },
              { type: 'witr', label: 'Витр', desc: 'Обязательный (по ханафи)', color: 'bg-purple-100 text-purple-700 border-purple-200' },
              { type: 'nafl', label: 'Нафль', desc: 'Добровольный', color: 'bg-blue-100 text-blue-700 border-blue-200' },
            ].map((item) => (
              <div key={item.type} className="flex items-start gap-2">
                <span className={`px-2 py-0.5 rounded-full border font-semibold ${item.color}`}>{item.label}</span>
                <span className="text-gray-500">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
