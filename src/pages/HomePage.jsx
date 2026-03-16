import { Link } from 'react-router-dom';

// Islamic geometric pattern SVG
function GeometricPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      {/* Star pattern */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => (
          <g key={`${row}-${col}`} transform={`translate(${col * 60 + (row % 2) * 30}, ${row * 60})`}>
            <polygon
              points="0,-20 7.3,-10 20,-10 11.8,0 15.4,13.1 0,7 -15.4,13.1 -11.8,0 -20,-10 -7.3,-10"
              fill="#c9a84c"
            />
            <polygon
              points="0,-12 4.4,-6 12,-6 7.1,0 9.2,7.9 0,4.2 -9.2,7.9 -7.1,0 -12,-6 -4.4,-6"
              fill="#1a6b3a"
            />
          </g>
        ))
      )}
    </svg>
  );
}

const navCards = [
  {
    path: '/wudu',
    title: 'Вуду (Омовение)',
    arabicTitle: 'الوُضُوء',
    description: 'Пошаговое руководство по совершению малого омовения по ханафи мазхабу. Отдельно для братьев и сестёр.',
    icon: '💧',
    color: 'from-blue-500 to-cyan-600',
    bgLight: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    path: '/prayers',
    title: 'Намаз',
    arabicTitle: 'الصَّلَاة',
    description: 'Все 5 обязательных намазов: время, количество ракаатов и пошаговое руководство по совершению.',
    icon: '🤲',
    color: 'from-islamic-green to-emerald-600',
    bgLight: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    path: '/duas',
    title: 'Дуа и Азкары',
    arabicTitle: 'الدُّعَاء',
    description: 'Коллекция дуа на все случаи жизни: утренние и вечерние азкары, дуа после намаза, при еде, сне и многое другое.',
    icon: '📿',
    color: 'from-purple-600 to-indigo-700',
    bgLight: 'bg-purple-50',
    border: 'border-purple-100',
  },
];

const quickFacts = [
  { label: 'Намазов в день', value: '5', icon: '🕌' },
  { label: 'Шагов вуду', value: '11', icon: '💧' },
  { label: 'Категорий дуа', value: '8', icon: '📿' },
  { label: 'Мазхаб', value: 'Ханафи', icon: '📚' },
];

export default function HomePage({ gender }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative geometric-bg text-white overflow-hidden">
        <GeometricPattern />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="mb-4">
            <p className="arabic-text text-4xl md:text-5xl text-islamic-gold leading-loose font-bold" style={{ fontFamily: 'Georgia, serif' }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
          <div className="pattern-divider w-48 mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Исламский Обучающий Портал
          </h1>
          <p className="text-green-100 text-lg mb-2">
            По мазхабу Ханафи • На русском языке
          </p>
          <p className="arabic-text text-2xl text-islamic-gold mt-4">
            السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
          </p>
          <p className="text-green-200 text-sm mt-1">Ас-саляму алейкум ва рахматуллаhи ва баракатуh</p>

          {/* Gender indicator */}
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2">
            <span className="text-lg">{gender === 'male' ? '👨' : '👩'}</span>
            <span className="text-sm font-medium">
              Режим: {gender === 'male' ? 'Для братьев' : 'Для сестёр'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="grid grid-cols-4 gap-2">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="text-center py-2">
                <div className="text-xl mb-0.5">{fact.icon}</div>
                <div className="font-bold text-islamic-green text-lg">{fact.value}</div>
                <div className="text-xs text-gray-500">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Cards */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h2 className="section-title text-2xl">Разделы</h2>
          <div className="pattern-divider w-32 mx-auto mt-2" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {navCards.map((card) => (
            <Link key={card.path} to={card.path} className="card card-hover group">
              <div className={`bg-gradient-to-br ${card.color} p-6 relative overflow-hidden`}>
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <p className="arabic-text text-2xl text-white/80 mt-1">{card.arabicTitle}</p>
                <svg
                  className="absolute right-2 bottom-2 w-16 h-16 opacity-10"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="2" />
                  <polygon points="50,10 60,35 90,35 68,57 75,85 50,70 25,85 32,57 10,35 40,35" fill="white" />
                </svg>
              </div>
              <div className={`p-4 ${card.bgLight} border-t ${card.border}`}>
                <p className="text-sm text-gray-700 leading-relaxed">{card.description}</p>
                <div className="flex items-center gap-1 mt-3 text-sm font-semibold text-islamic-green group-hover:gap-2 transition-all">
                  <span>Изучить</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Hadith section */}
      <div className="bg-islamic-green-dark text-white py-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-islamic-gold text-sm font-semibold uppercase tracking-widest mb-4">Хадис дня</p>
          <blockquote className="text-lg text-white leading-relaxed mb-4">
            «Ислам основан на пяти столпах: свидетельстве, что нет бога, кроме Аллаhа, и что Мухаммад — Посланник Аллаhа; совершении молитвы; выплате закята; паломничестве; и соблюдении поста в Рамадане.»
          </blockquote>
          <p className="text-green-300 text-sm">— аль-Бухари и Муслим</p>
        </div>
      </div>

      {/* Daily prayers reminder */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-islamic-green to-emerald-600 px-6 py-4">
            <h2 className="text-white text-xl font-bold">Пять Намазов</h2>
            <p className="text-green-200 text-sm mt-0.5">Краткое напоминание о времени и количестве ракаатов</p>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { name: 'Фаджр', arabic: 'الفجر', icon: '🌅', time: 'Рассвет', total: '4 рак.' },
              { name: 'Зухр', arabic: 'الظهر', icon: '☀️', time: 'Полдень', total: '12 рак.' },
              { name: 'Аср', arabic: 'العصر', icon: '🌤️', time: 'Послеполудень', total: '8 рак.' },
              { name: 'Магриб', arabic: 'المغرب', icon: '🌇', time: 'Закат', total: '7 рак.' },
              { name: 'Иша', arabic: 'العشاء', icon: '🌙', time: 'Ночь', total: '15 рак.' },
            ].map((p) => (
              <div key={p.name} className="flex items-center px-6 py-3 hover:bg-gray-50">
                <span className="text-xl mr-3">{p.icon}</span>
                <div className="flex-1">
                  <span className="font-semibold text-gray-800">{p.name}</span>
                  <span className="arabic-text text-sm text-gray-500 ml-2">{p.arabic}</span>
                </div>
                <span className="text-sm text-gray-500 mr-4">{p.time}</span>
                <span className="text-sm font-semibold text-islamic-green bg-green-50 px-3 py-1 rounded-full">{p.total}</span>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50">
            <Link
              to="/prayers"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <span>Подробнее о намазе</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-islamic-green-dark text-center text-green-300 text-xs py-6 px-4">
        <p className="arabic-text text-islamic-gold text-lg mb-2">جَزَاكُمُ اللَّهُ خَيْرًا</p>
        <p>Джазакумуллаhу хайран — Да воздаст вам Аллаh благом</p>
        <p className="mt-2 opacity-60">Исламский Обучающий Портал • По мазхабу Ханафи</p>
      </footer>
    </div>
  );
}
