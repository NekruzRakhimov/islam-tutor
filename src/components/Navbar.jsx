import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Главная', icon: '🏠' },
  { path: '/wudu', label: 'Вуду', icon: '💧' },
  { path: '/prayers', label: 'Намаз', icon: '🤲' },
  { path: '/duas', label: 'Дуа', icon: '📿' },
];

export default function Navbar({ gender, setGender }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-islamic-green shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-islamic-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>☪</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg leading-tight">Исламский Портал</div>
              <div className="text-islamic-gold-light text-xs">По мазхабу Ханафи</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-white/20 text-white'
                    : 'text-green-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Gender Selector + Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Gender Toggle */}
            <div className="flex items-center bg-white/10 rounded-full p-1 gap-1">
              <button
                onClick={() => setGender('male')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                  gender === 'male'
                    ? 'bg-blue-500 text-white shadow'
                    : 'text-green-100 hover:text-white'
                }`}
              >
                Братья
              </button>
              <button
                onClick={() => setGender('female')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                  gender === 'female'
                    ? 'bg-pink-500 text-white shadow'
                    : 'text-green-100 hover:text-white'
                }`}
              >
                Сёстры
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-islamic-green-dark border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'bg-white/20 text-white'
                  : 'text-green-100 hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
