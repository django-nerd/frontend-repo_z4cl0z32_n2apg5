import { useState } from 'react';
import HeroSection from './components/HeroSection';
import ClanSelector from './components/ClanSelector';
import HowItWorks from './components/HowItWorks';
import UnitGlossary from './components/UnitGlossary';

function App() {
  const [clan, setClan] = useState('blazeborn');

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <HeroSection />
      <ClanSelector value={clan} onChange={setClan} />
      <HowItWorks />
      <UnitGlossary />
      <footer className="py-10 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Shadow Nexus Chess</p>
          <div className="text-sm text-gray-500">Clan selected: <span className="font-semibold capitalize">{clan}</span></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
