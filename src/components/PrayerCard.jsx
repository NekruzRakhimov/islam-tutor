import { Link } from 'react-router-dom';

export default function PrayerCard({ prayer }) {
  const sectionTypeLabel = {
    sunnah: { label: 'Суннат', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    fard: { label: 'Фарз', color: 'bg-green-100 text-green-700 border-green-200' },
    witr: { label: 'Витр', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    nafl: { label: 'Нафль', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  };

  return (
    <Link to={`/prayers/${prayer.id}`} className="block card card-hover">
      {/* Header gradient */}
      <div className={`bg-gradient-to-r ${prayer.color} p-5 relative overflow-hidden`}>
        {/* Decorative geometric pattern */}
        <svg
          className="absolute right-0 top-0 h-full opacity-10"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="80" cy="50" r="40" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="80" cy="50" r="30" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="80" cy="50" r="20" fill="none" stroke="white" strokeWidth="1" />
          {[0, 45, 90, 135].map((deg) => (
            <line
              key={deg}
              x1="80" y1="10" x2="80" y2="90"
              stroke="white" strokeWidth="0.5"
              transform={`rotate(${deg}, 80, 50)`}
            />
          ))}
        </svg>

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{prayer.icon}</span>
                <h3 className={`text-2xl font-bold ${prayer.textColor}`}>{prayer.name}</h3>
              </div>
              <p className={`arabic-text text-3xl font-bold ${prayer.textColor} opacity-90`}>
                {prayer.arabicName}
              </p>
            </div>
          </div>
          <p className={`text-sm mt-2 ${prayer.textColor} opacity-80`}>
            🕐 {prayer.time}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{prayer.description}</p>

        {/* Rakaat sections */}
        <div className="space-y-2">
          {prayer.sections.map((section, i) => {
            const style = sectionTypeLabel[section.type] || sectionTypeLabel.sunnah;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${style.color}`}>
                  {section.count} рак.
                </span>
                <span className="text-sm text-gray-700">{section.name}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Всего: <strong className="text-islamic-green">{Object.values(prayer.rakaats).reduce((a, b) => a + b, 0)} ракаатов</strong>
          </span>
          <span className="text-islamic-green text-sm font-medium flex items-center gap-1">
            Подробнее
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
