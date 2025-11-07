import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/90 text-white px-3 py-1 text-xs tracking-wide">
              ⚔️ Shadow Nexus Chess
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Elemental Battlefield. Strategic Mastery.
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Command your Vanguard Units across the 8×8 Elemental Grid. Choose your Clan, unleash cinematic Jutsu, and secure victory through total Elite Unit annihilation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#clans" className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-2.5 text-white font-semibold shadow hover:bg-indigo-700 transition">
                Explore Clans
              </a>
              <a href="#how" className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-2.5 text-gray-800 font-semibold bg-white hover:bg-gray-50 transition">
                How It Works
              </a>
            </div>
          </div>

          <div className="relative h-[55vh] sm:h-[60vh] lg:h-[70vh] rounded-xl ring-1 ring-black/5 shadow-xl bg-white/60 backdrop-blur">
            <Spline
              scene="https://prod.spline.design/UGnf9D1Hp3OG8vSG/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-indigo-50/80 to-transparent" />
    </section>
  );
}
