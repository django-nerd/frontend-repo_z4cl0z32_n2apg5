export default function HowItWorks() {
  const threatItems = [
    {
      title: 'Threat (Under Attack): Kage Alert',
      points: [
        'Move the Director out of the attack path.',
        'Block the Protocol with another Unit.',
        'Seal the Attacker (capture the threatening Unit).',
      ],
      note: 'System Warning: When the Director is directly threatened by an enemy Unit’s Protocol.'
    },
    {
      title: 'Director Sealing (Checkmate)',
      points: [
        'Director is under Threat with no legal escape, block, or capture.',
        'System Collapse triggers and the game ends instantly.'
      ],
      note: 'Win by sealing the Director when all defensive responses fail.'
    },
    {
      title: 'Victory: Total Elite Unit Annihilation',
      points: [
        'Capture all five of the opponent’s unique Elite Units: Commander, War-Engine, Interceptor, Prime.',
        'The opponent’s Director collapses due to lack of military support.'
      ],
      note: 'An alternative win condition to Director Sealing.'
    },
  ];

  const strategy = [
    {
      label: '4.1 System Boot-Up',
      text: 'Secure the Director and seize central nodes: advance Scouts to control the center, deploy Prime and Interceptors for flanks, execute Twin Guard Protocol (Castling) swiftly.'
    },
    {
      label: '4.2 Power Contention',
      text: 'Expand your unit reach while restricting enemy pathways: open Files for War-Engines, hunt high-influence nodes for Commander/Interceptor, practice prophylaxis before every move.'
    },
    {
      label: '4.3 Deterministic Collapse',
      text: 'Engineer a forced victory sequence: map vulnerabilities, launch a forcing combo (Shadow Trap Pin / Disruptor Feint), and execute the sealing sequence to an inevitable Director Sealing.'
    },
  ];

  return (
    <section id="how" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Threat, Sealing, and Strategy</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          The Elemental Grid mirrors classic chess rules. Threats, blocks, captures, and sealing operate identically—reframed with cinematic, clan-driven identity.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {threatItems.map((box) => (
            <div key={box.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{box.title}</h3>
              {box.note && <p className="mt-1 text-sm text-gray-500">{box.note}</p>}
              <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1">
                {box.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900">Chapter 4: Command Architecture</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {strategy.map((s) => (
              <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-medium text-indigo-600">{s.label}</div>
                <p className="mt-1 text-gray-700">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
