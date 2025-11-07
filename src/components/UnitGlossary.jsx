export default function UnitGlossary() {
  const units = [
    { classic: 'Queen', role: 'The Commander', protocol: 'Max distance, straight/diagonal movement.', icon: 'Centralized eight-pointed star (omnidirectional mobility).' },
    { classic: 'Rook', role: 'The War-Engine', protocol: 'Max distance, straight line (ranks/files).', icon: 'Robust shield-like cross / tower (linear force).' },
    { classic: 'Bishop', role: 'The Interceptor', protocol: 'Max distance, diagonal movement.', icon: 'Slender X or diamond/prism (angular force).' },
    { classic: 'Knight', role: 'The Prime', protocol: 'L-jump (2-and-1), can jump over units.', icon: 'Bold asymmetrical L with small wing (flying jump).' },
    { classic: 'King', role: 'The Director (Kage)', protocol: 'One step any direction.', icon: 'Armored shield or geometric crown (core process).' },
    { classic: 'Pawn', role: 'The Scout', protocol: '1 step forward, capture 1 step diagonally, 2-step flicker on first move.', icon: 'Pointed arrowhead or stylized vanguard helmet.' },
  ];

  const ascensions = [
    { clan: 'Blazeborn (Fire)', name: 'Divine Fire Transcendence', visual: 'Stylized Phoenix / Radiant Sun-Burst.' },
    { clan: 'Stormlash (Lightning)', name: 'Lightning Overload Release', visual: 'Jagged, hyper-energized bolt striking ground.' },
    { clan: 'Gale Vipers (Wind)', name: 'Tempest Force Release', visual: 'Swirling cyclone / sharp sickle of wind.' },
    { clan: 'Tideborn (Water)', name: 'Deep Flow Incarnation', visual: 'Heavy ocean wave / geometric trident.' },
    { clan: 'Umbral (Shadow)', name: 'Shadow Nexus Manifestation', visual: 'Flowing curved katana in swirling mist.' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Chapter 2: Vanguard Roster & Protocol Mapping</h2>
            <p className="mt-2 text-gray-600">Classic piece → Strategic Role → Movement Protocol → Iconic motif.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
            {units.map((u) => (
              <div key={u.role} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-sm text-gray-500">Classic: {u.classic}</div>
                <div className="mt-1 text-xl font-semibold text-gray-900">{u.role}</div>
                <p className="mt-2 text-gray-700"><span className="font-medium">Protocol:</span> {u.protocol}</p>
                <p className="mt-1 text-gray-700"><span className="font-medium">Refined Icon:</span> {u.icon}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Power Ascension Visuals</h3>
            <p className="mt-1 text-sm text-gray-500">Scout promotions replace the standard Scout icon on the board.</p>
            <ul className="mt-3 space-y-3">
              {ascensions.map((a) => (
                <li key={a.clan} className="rounded-lg bg-gray-50 border border-gray-200 p-3">
                  <div className="text-sm font-medium text-gray-900">{a.clan}</div>
                  <div className="text-sm text-gray-700">{a.name}</div>
                  <div className="text-xs text-gray-500">Visual: {a.visual}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
