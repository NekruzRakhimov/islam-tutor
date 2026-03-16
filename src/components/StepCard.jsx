import { useState } from 'react';

// Islamic geometric SVG pattern for placeholder images
function IslamicPattern({ label, color = '#1a6b3a' }) {
  return (
    <div
      className="w-full h-40 flex flex-col items-center justify-center relative overflow-hidden rounded-lg"
      style={{ backgroundColor: color + '15', border: `2px dashed ${color}40` }}
    >
      {/* SVG pattern background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Geometric star pattern */}
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <g key={`${row}-${col}`} transform={`translate(${col * 50 + 25}, ${row * 50 + 25})`}>
              <polygon
                points="0,-15 5,-5 15,-5 8,2 12,12 0,6 -12,12 -8,2 -15,-5 -5,-5"
                fill={color}
              />
            </g>
          ))
        )}
      </svg>
      <span className="text-3xl mb-2 z-10">🖼️</span>
      <span className="text-xs text-center px-4 z-10 text-gray-500 font-medium">{label}</span>
    </div>
  );
}

export default function StepCard({ step, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card card-hover mb-4">
      <div
        className="p-4 cursor-pointer flex items-start gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Step number */}
        <div className="step-number flex-shrink-0 mt-0.5">{index + 1}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-islamic-green-dark text-base">{step.title}</h3>
              <p className="arabic-text text-xl text-islamic-gold font-medium mt-0.5">
                {step.arabicTitle}
              </p>
            </div>
            {step.count && (
              <span className="text-xs bg-islamic-gold/10 text-islamic-gold-dark border border-islamic-gold/30 px-2 py-1 rounded-full whitespace-nowrap font-medium flex-shrink-0">
                {step.count}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mt-1 leading-relaxed">{step.description}</p>
        </div>

        {/* Expand icon */}
        <div className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4">
          {/* Image */}
          {step.image ? (
            <div className="mt-3">
              <img
                src={step.image}
                alt={step.imageDesc || step.title}
                className="w-full rounded-lg object-contain"
                loading="lazy"
              />
            </div>
          ) : step.imageDesc && (
            <div className="mt-3">
              <IslamicPattern label={step.imageDesc} />
            </div>
          )}

          {/* Dua/Arabic text */}
          {step.arabic && (
            <div className="mt-4 bg-islamic-cream rounded-xl p-4 border border-islamic-gold/20">
              <p className="arabic-text text-2xl text-gray-800 leading-loose">{step.arabic}</p>
              {step.transliteration && (
                <p className="text-sm text-islamic-green mt-2 font-medium italic">
                  {step.transliteration}
                </p>
              )}
              {step.translation && (
                <p className="text-sm text-gray-600 mt-1 border-t border-gray-200 pt-2">
                  {step.translation}
                </p>
              )}
            </div>
          )}

          {/* Dua field (for wudu steps) */}
          {step.dua && (
            <div className="mt-4 bg-islamic-cream rounded-xl p-4 border border-islamic-gold/20">
              <p className="text-xs text-islamic-gold font-semibold uppercase tracking-wide mb-2">Дуа</p>
              <p className="arabic-text text-2xl text-gray-800 leading-loose">{step.dua}</p>
              {step.duaTranslit && (
                <p className="text-sm text-islamic-green mt-2 font-medium italic">{step.duaTranslit}</p>
              )}
              {step.duaTranslation && (
                <p className="text-sm text-gray-600 mt-1 border-t border-gray-200 pt-2">{step.duaTranslation}</p>
              )}
            </div>
          )}

          {/* Tip */}
          {step.tip && (
            <div className="mt-3 flex items-start gap-2 bg-blue-50 rounded-lg p-3 border border-blue-100">
              <span className="text-blue-500 mt-0.5 flex-shrink-0">💡</span>
              <p className="text-sm text-blue-700">{step.tip}</p>
            </div>
          )}

          {/* Note */}
          {step.note && (
            <div className="mt-3 flex items-start gap-2 bg-amber-50 rounded-lg p-3 border border-amber-100">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">📌</span>
              <p className="text-sm text-amber-700">{step.note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
