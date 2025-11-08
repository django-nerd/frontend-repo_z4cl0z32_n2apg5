import React from 'react';

// Clan gradients for piece body
const CLAN_GRADIENTS = {
  blazeborn: {
    light: 'from-orange-200 via-amber-200 to-yellow-200',
    dark: 'from-rose-700 via-orange-700 to-amber-700',
    rim: 'ring-orange-400/70',
  },
  stormlash: {
    light: 'from-sky-200 via-cyan-200 to-indigo-200',
    dark: 'from-indigo-700 via-sky-700 to-blue-700',
    rim: 'ring-sky-400/70',
  },
  gale: {
    light: 'from-emerald-200 via-green-200 to-lime-200',
    dark: 'from-emerald-700 via-green-700 to-lime-700',
    rim: 'ring-emerald-400/70',
  },
  tideborn: {
    light: 'from-cyan-200 via-teal-200 to-blue-200',
    dark: 'from-cyan-700 via-teal-700 to-blue-700',
    rim: 'ring-cyan-400/70',
  },
  umbral: {
    light: 'from-zinc-200 via-gray-200 to-slate-200',
    dark: 'from-zinc-800 via-gray-800 to-slate-800',
    rim: 'ring-zinc-400/70',
  },
};

const PIECE_BADGE = {
  k: 'K',
  q: 'C', // Commander
  r: 'W', // War-Engine
  b: 'I', // Interceptor
  n: 'P', // Prime
  p: 'S', // Scout
};

export default function NinjaPiece({ piece, clan = 'umbral', size = 'text-3xl' }) {
  if (!piece) return null;
  const clanGrad = CLAN_GRADIENTS[clan] || CLAN_GRADIENTS.umbral;
  const isLight = piece.color === 'w';
  const grad = isLight ? clanGrad.light : clanGrad.dark;
  const rim = clanGrad.rim;

  // Faux-3D token with gloss and shadow; ninja face at center + small badge letter
  return (
    <div className={`relative select-none`}
      aria-label={`Ninja ${piece.type} ${piece.color === 'w' ? 'light' : 'dark'}`}>
      <div className={`relative grid place-items-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br ${grad} shadow-[inset_0_6px_12px_rgba(255,255,255,0.6),inset_0_-10px_18px_rgba(0,0,0,0.25),0_6px_12px_rgba(0,0,0,0.25)] ring-2 ${rim}`}>
        <span className={`${size} leading-none`} role="img" aria-hidden>
          🥷
        </span>
        {/* Badge */}
        <span className={`absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 grid h-5 w-5 place-items-center rounded-full text-[10px] font-extrabold ${isLight ? 'bg-black text-white' : 'bg-white text-black'} shadow ring-1 ring-black/20`}>
          {PIECE_BADGE[piece.type?.toLowerCase?.()] || '?'}
        </span>
        {/* Gloss highlight */}
        <span className="pointer-events-none absolute -top-1 left-1 h-1/2 w-2/3 rounded-tl-[999px] rounded-br-[999px] bg-white/30 blur-[1px] opacity-70" />
      </div>
    </div>
  );
}
