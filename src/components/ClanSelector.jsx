import { useState, useMemo } from 'react';

const CLANS = [
  { id: 'blazeborn', name: 'Blazeborn', color: 'from-orange-500 to-red-600', accent: 'ring-orange-400', desc: 'Fire-forged offensive mastery.' },
  { id: 'stormlash', name: 'Stormlash', color: 'from-sky-400 to-indigo-600', accent: 'ring-sky-400', desc: 'Lightning-fast tactical strikes.' },
  { id: 'gale', name: 'Gale Vipers', color: 'from-green-400 to-emerald-600', accent: 'ring-emerald-400', desc: 'Windborne precision and flow.' },
  { id: 'tideborn', name: 'Tideborn', color: 'from-cyan-400 to-blue-600', accent: 'ring-cyan-400', desc: 'Water-shaped control and pressure.' },
  { id: 'umbral', name: 'Umbral', color: 'from-zinc-700 to-black', accent: 'ring-zinc-500', desc: 'Shadowcraft deception and collapse.' }
];

const CLAN_DETAILS = {
  blazeborn: {
    elites: {
      'The Director (Kage)': 'Kage of the Blazeborn',
      'The Commander (Queen)': 'Blazeborn Commander',
      'The War-Engine (Rook)': 'Blazeborn War-Engine',
      'The Interceptor (Bishop)': 'Blazeborn Interceptor',
      'The Prime (Knight)': 'Blazeborn Prime',
    },
    scout: {
      type: 'Fire Scouts',
      ascension: 'Divine Fire Transcendence',
      narrative: "Latent energy awakens into an unstoppable form of pure combustion.",
    },
  },
  stormlash: {
    elites: {
      'The Director (Kage)': 'Kage of the Stormlash',
      'The Commander (Queen)': 'Stormlash Commander',
      'The War-Engine (Rook)': 'Stormlash War-Engine',
      'The Interceptor (Bishop)': 'Stormlash Interceptor',
      'The Prime (Knight)': 'Stormlash Prime',
    },
    scout: {
      type: 'Bolt Scouts',
      ascension: 'Lightning Overload Release',
      narrative: 'Explosive electrical power and hyper-velocity channeled from the clan\'s core.',
    },
  },
  gale: {
    elites: {
      'The Director (Kage)': 'Kage of the Vipers',
      'The Commander (Queen)': 'Gale Viper Commander',
      'The War-Engine (Rook)': 'Gale Viper War-Engine',
      'The Interceptor (Bishop)': 'Gale Viper Interceptor',
      'The Prime (Knight)': 'Gale Viper Prime',
    },
    scout: {
      type: 'Wind Scouts',
      ascension: 'Tempest Force Release',
      narrative: 'Forbidden technique unleashing sudden, overwhelming kinetic force.',
    },
  },
  tideborn: {
    elites: {
      'The Director (Kage)': 'Kage of the Tideborn',
      'The Commander (Queen)': 'Tideborn Commander',
      'The War-Engine (Rook)': 'Tideborn War-Engine',
      'The Interceptor (Bishop)': 'Tideborn Interceptor',
      'The Prime (Knight)': 'Tideborn Prime',
    },
    scout: {
      type: 'Current Scouts',
      ascension: 'Deep Flow Incarnation',
      narrative: 'Transforms into a crushing force of deep-water pressure and fluid motion.',
    },
  },
  umbral: {
    elites: {
      'The Director (Kage)': 'Kage of the Umbral',
      'The Commander (Queen)': 'Umbral Commander',
      'The War-Engine (Rook)': 'Umbral War-Engine',
      'The Interceptor (Bishop)': 'Umbral Interceptor',
      'The Prime (Knight)': 'Umbral Prime',
    },
    scout: {
      type: 'Shadow Scouts',
      ascension: 'Shadow Nexus Manifestation',
      narrative: 'A sentient form of void and unlight manifests at the final rank.',
    },
  },
};

export default function ClanSelector({ value, onChange }) {
  const [selected, setSelected] = useState(value || 'blazeborn');

  const info = useMemo(() => CLAN_DETAILS[selected], [selected]);

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
            <p className="mt-2 text-gray-600">United Clan Deployment: build your 16-unit army from one elemental lineage.</p>
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

        {/* Chapter 3: Clan Architect (Customization) */}
        {info && (
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Elite Force Selection</h3>
              <p className="mt-1 text-sm text-gray-500">Characters drawn from the selected clan for each elite rank.</p>
              <ul className="mt-4 space-y-2">
                {Object.entries(info.elites).map(([rank, name]) => (
                  <li key={rank} className="flex items-start justify-between gap-4">
                    <span className="text-gray-700">{rank}</span>
                    <span className="font-medium text-gray-900">{name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Scout Unit & Ascension</h3>
              <div className="mt-2 text-sm text-gray-700"><span className="font-medium">Type:</span> {info.scout.type}</div>
              <div className="mt-1 text-sm text-gray-700"><span className="font-medium">Power Ascension:</span> {info.scout.ascension}</div>
              <p className="mt-2 text-gray-600">{info.scout.narrative}</p>
              <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-3 text-xs text-gray-600">
                All eight Scouts must be from a single clan. Upon reaching the final rank, Power Ascension is mandatory and the icon updates accordingly.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
