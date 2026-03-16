export default function GenderSelector({ gender, setGender }) {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <button
        onClick={() => setGender('male')}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-200 ${
          gender === 'male'
            ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-105'
            : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400'
        }`}
      >
        <span className="text-lg">👨</span>
        <span>Для братьев</span>
      </button>
      <button
        onClick={() => setGender('female')}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-200 ${
          gender === 'female'
            ? 'bg-pink-500 border-pink-500 text-white shadow-lg scale-105'
            : 'bg-white border-gray-200 text-gray-600 hover:border-pink-400'
        }`}
      >
        <span className="text-lg">👩</span>
        <span>Для сестёр</span>
      </button>
    </div>
  );
}
