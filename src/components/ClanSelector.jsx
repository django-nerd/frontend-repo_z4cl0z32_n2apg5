import { useState } from 'react';

const CLANS = [
  {
    id: 'blazeborn',
    name: 'Blazeborn',
    color: 'from-orange-500 to-red-600',
    accent: 'ring-orange-400',
    desc: 'Fire-forged offensive mastery.'
  },
  {
    id: 'stormlash',
    name: 'Stormlash',
    color: 'from-sky-400 to-indigo-600',
    accent: 'ring-sky-400',
    desc: 'Lightning-fast tactical strikes.'
  },
  {
    id: 'gale',
    name: 'Gale Vipers',
    color: 'from-green-400 to-emerald-600',
    accent: 'ring-emerald-400',
    desc: 'Windborne precision and flow.'
  },
  {
    id: 'tideborn',
    name: 'Tideborn',
    color: 'from-cyan-400 to-blue-600',
    accent: 'ring-cyan-400',
    desc: 'Water-shaped control and pressure.'
  },
  {
    id: 'umbral',
    name: 'Umbral',
    color: 'from-zinc-700 to-black',
    accent: 'ring-zinc-500',
    desc: 'Shadowcraft deception and collapse.'
  }
];

export default function ClanSelector({ value, onChange }) {
  const [selected, setSelected] = useState(value || 'blazeborn');

  const handleSelect = (id) => {
    setSelected(id);
    onChange?.(id);
  };

  return (
    <section id="clans" className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Choose Your Clan</h2>
            <p className="mt-2 text-gray-600">Set the identity of your United Clan Deployment.</p>
          </div>
          <div className="text-sm text-gray-700">
            Selected: <span className="font-semibold capitalize">{selected}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {CLANS.map((c) => {
            const isActive = selected === c.id;
            return (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className={`group relative overflow-hidden rounded-xl p-4 text-left ring-1 bg-white hover:shadow-lg transition ${isActive ? 'ring-2 ' + c.accent : 'ring-black/10'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-10 group-hover:opacity-20 transition`} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{c.name}</h3>
                    <span className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
