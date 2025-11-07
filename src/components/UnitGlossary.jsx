export default function UnitGlossary() {
  const units = [
    { role: 'Commander', classic: 'Queen', desc: 'Maximum Strategic Mobility' },
    { role: 'War-Engine', classic: 'Rook', desc: 'Heavy Artillery / Linear Force' },
    { role: 'Interceptor', classic: 'Bishop', desc: 'Angular Force / Sector Control' },
    { role: 'Prime', classic: 'Knight', desc: 'Flying Jump / Disruptor' },
    { role: 'Director (Kage)', classic: 'King', desc: 'Core Process / Leader' },
    { role: 'Scout', classic: 'Pawn', desc: 'Ground Force, Forward Focus' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Vanguard Unit Glossary</h2>
            <p className="mt-2 text-gray-600">Classic movement, reimagined identities.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((u) => (
            <div key={u.role} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-sm text-gray-500">Classic: {u.classic}</div>
              <div className="mt-1 text-xl font-semibold text-gray-900">{u.role}</div>
              <p className="mt-2 text-gray-600">{u.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
