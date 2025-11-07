export default function HowItWorks() {
  const items = [
    {
      title: 'Vanguard Roster',
      text:
        'Classic chess protocols with martial rebranding: Commander, War-Engine, Interceptor, Prime, Director, and Scouts.',
    },
    {
      title: 'Active Clan Protocols',
      text:
        'Each movement, capture, and threat triggers cinematic Jutsu FX aligned with your chosen Clan.',
    },
    {
      title: 'Power Ascension',
      text:
        'Scouts reaching the final rank undergo mandatory Ascension, transforming into a Clan-specific elite form.',
    },
    {
      title: 'Victory Conditions',
      text:
        'System Collapse via Director sealing or total Elite Unit annihilation across Commander, War-Engine, Interceptor, and Prime.',
    },
  ];

  return (
    <section id="how" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">How Shadow Nexus Chess Works</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          The Elemental Battlefield Grid mirrors an 8×8 chessboard. Movement Protocols remain identical to classic rules, enhanced by Clan identity, FX, and win conditions.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{it.title}</h3>
              <p className="mt-2 text-gray-600">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
