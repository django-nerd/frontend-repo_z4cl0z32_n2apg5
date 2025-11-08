import { useState, useMemo, useRef, useEffect } from 'react';
import { Chess } from 'chess.js';
import NinjaPiece from './NinjaPiece';

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

function useChess() {
  const gameRef = useRef(null);
  const [fen, setFen] = useState('');
  const [history, setHistory] = useState([]);
  const [turn, setTurn] = useState('w');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    gameRef.current = new Chess();
    setFen(gameRef.current.fen());
    setTurn(gameRef.current.turn());
  }, []);

  const reset = () => {
    gameRef.current = new Chess();
    setFen(gameRef.current.fen());
    setHistory([]);
    setTurn('w');
    setWinner(null);
  };

  const getBoard = () => gameRef.current?.board?.() || [];
  const movesFrom = (square) => gameRef.current?.moves({ square, verbose: true }) || [];

  const move = (moveObj) => {
    if (!gameRef.current) return false;
    const m = gameRef.current.move(moveObj);
    if (m) {
      setFen(gameRef.current.fen());
      setHistory([...gameRef.current.history({ verbose: true })]);
      setTurn(gameRef.current.turn());
      if (gameRef.current.isCheckmate()) setWinner(m.color === 'w' ? 'white' : 'black');
      else if (gameRef.current.isStalemate()) setWinner('draw');
      else if (gameRef.current.isDraw()) setWinner('draw');
    }
    return !!m;
  };

  return { fen, history, turn, winner, reset, getBoard, movesFrom, move };
}

function PlayBoard({ theme = 'blazeborn' }) {
  const clanTheme = CLANS.find(c => c.id === theme) || CLANS[0];
  const { getBoard, movesFrom, move, turn, winner, reset, history } = useChess();
  const [selected, setSelected] = useState(null);
  const [targets, setTargets] = useState([]);
  const [promo, setPromo] = useState(null); // { from, to, color }

  const board = getBoard();

  const onSquareClick = (fileIdx, rankIdx) => {
    const file = 'abcdefgh'[fileIdx];
    const rank = 8 - rankIdx;
    const sq = `${file}${rank}`;

    // If selecting own piece
    const piece = board[rankIdx]?.[fileIdx];
    const color = turn === 'w' ? 'w' : 'b';
    if (piece && piece.color === color) {
      setSelected(sq);
      setTargets(movesFrom(sq));
      return;
    }

    // Attempt move if we have a selection
    if (selected) {
      const legal = targets.find(t => t.to === sq);
      if (!legal) {
        // deselect if clicking elsewhere
        setSelected(null);
        setTargets([]);
        return;
      }
      // Handle promotion
      if (legal.flags.includes('p')) {
        setPromo({ from: legal.from, to: legal.to, color: color });
        return;
      }
      move({ from: legal.from, to: legal.to });
      setSelected(null);
      setTargets([]);
    }
  };

  const confirmPromotion = (piece) => {
    if (!promo) return;
    move({ from: promo.from, to: promo.to, promotion: piece });
    setPromo(null);
    setSelected(null);
    setTargets([]);
  };

  const squareBg = (i, j) => ((i + j) % 2 === 0 ? 'bg-zinc-100' : 'bg-zinc-300');
  const isTarget = (sq) => targets.some(t => t.to === sq);

  return (
    <div id="play" className="mt-12 grid gap-6 lg:grid-cols-2">
      <div className={`rounded-xl border bg-white p-4 shadow-sm ring-1 ${clanTheme ? clanTheme.accent : 'ring-black/10'}`}>
        <div className="flex items-center justify-between px-2 pb-3">
          <div className="text-sm text-gray-600">Turn: <span className="font-semibold capitalize">{turn === 'w' ? 'White (Light)' : 'Black (Dark)'}</span></div>
          <button onClick={reset} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Reset</button>
        </div>
        <div className="aspect-square">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full overflow-hidden rounded-lg ring-1 ring-black/5">
            {board.map((rank, rankIdx) => (
              rank.map((sq, fileIdx) => {
                const file = 'abcdefgh'[fileIdx];
                const rankNum = 8 - rankIdx;
                const algebraic = `${file}${rankNum}`;
                const selectedCls = selected === algebraic ? 'outline outline-2 outline-indigo-600' : '';
                const targetCls = isTarget(algebraic) ? 'after:content-[\'\'] after:absolute after:w-3 after:h-3 after:rounded-full after:bg-indigo-600/60 after:ring-2 after:ring-white/80 after:translate-x-[-50%] after:translate-y-[-50%] after:left-1/2 after:top-1/2' : '';
                return (
                  <button
                    key={`${algebraic}`}
                    onClick={() => onSquareClick(fileIdx, rankIdx)}
                    className={`relative flex items-center justify-center ${squareBg(fileIdx, rankIdx)} ${selectedCls} ${targetCls}`}
                  >
                    {sq && (
                      <NinjaPiece piece={sq} clan={clanTheme.id} />
                    )}
                  </button>
                );
              })
            ))}
          </div>
        </div>

        {winner && (
          <div className="mt-3 rounded-md bg-indigo-50 px-3 py-2 text-sm text-indigo-700">
            {winner === 'draw' ? 'Draw by rule.' : `${winner.charAt(0).toUpperCase() + winner.slice(1)} wins!`}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">Move Log</h3>
        <p className="mt-1 text-sm text-gray-500">Exact mechanics of chess. Pieces are now clan-forged 3D Ninjas with per-clan gradients.</p>
        <ol className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-800">
          {history.map((m, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <span className="text-gray-500 w-8">{Math.floor(idx/2)+1}.</span>
              <span className="truncate">{m.san}</span>
            </li>
          ))}
        </ol>
        <div className="mt-4 rounded-lg border border-gray-200">
          <div className={`rounded-t-lg h-2 bg-gradient-to-r ${clanTheme.color}`} />
          <div className="p-3 text-sm text-gray-700">Active Clan Skin: <span className="font-medium">{clanTheme.name}</span>. Movement rules, threats, castling, en passant, promotion all follow classical chess.</div>
        </div>
      </div>

      {promo && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-6">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h4 className="text-lg font-semibold text-gray-900">Choose Promotion</h4>
            <p className="mt-1 text-sm text-gray-600">Select the ascended form for your Scout.</p>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {['q','r','b','n'].map(p => (
                <button key={p} onClick={() => confirmPromotion(p)} className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50">
                  <div className="flex items-center justify-center">
                    <NinjaPiece piece={{ type: p, color: promo.color }} clan={clanTheme.id} />
                  </div>
                  <div className="mt-1 text-xs text-gray-600 uppercase text-center">{p}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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

        <div className="mt-12">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Play Now</h3>
          <p className="mt-1 text-gray-600">Exact chess mechanics with your selected clan as the visual theme.</p>
          <PlayBoard theme={selected} />
        </div>
      </div>
    </section>
  );
}
