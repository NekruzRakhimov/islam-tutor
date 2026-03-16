import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import WuduPage from './pages/WuduPage';
import PrayersPage from './pages/PrayersPage';
import PrayerDetailPage from './pages/PrayerDetailPage';
import DuasPage from './pages/DuasPage';

function App() {
  const [gender, setGender] = useState('male');

  return (
    <Router>
      <div className="min-h-screen bg-islamic-cream">
        <Navbar gender={gender} setGender={setGender} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage gender={gender} />} />
            <Route path="/wudu" element={<WuduPage gender={gender} setGender={setGender} />} />
            <Route path="/prayers" element={<PrayersPage />} />
            <Route path="/prayers/:id" element={<PrayerDetailPage gender={gender} />} />
            <Route path="/duas" element={<DuasPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
