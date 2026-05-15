import { useMemo } from 'react';

export default function Filters({ products, filters, onChange, onReset }) {
  const { country, league, team } = filters;

  const countries = useMemo(
    () => [...new Set(products.map((p) => p.country))].sort(),
    [products]
  );

  const leagues = useMemo(() => {
    if (country === 'all') return [];
    return [...new Set(products.filter((p) => p.country === country).map((p) => p.league))].sort();
  }, [products, country]);

  const teams = useMemo(() => {
    if (league === 'all') return [];
    return [
      ...new Set(
        products.filter((p) => p.country === country && p.league === league).map((p) => p.team)
      ),
    ].sort();
  }, [products, country, league]);

  function handleCountry(e) {
    onChange({ country: e.target.value, league: 'all', team: 'all' });
  }

  function handleLeague(e) {
    onChange({ country, league: e.target.value, team: 'all' });
  }

  function handleTeam(e) {
    onChange({ country, league, team: e.target.value });
  }

  const selectClass =
    'w-full bg-black border rounded-xl px-4 py-4 text-sm font-bold outline-none transition focus:border-[#25D366] disabled:opacity-30 text-white';
  const selectStyle = { borderColor: 'rgba(255,255,255,0.1)' };

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
          Filtros Inteligentes
        </h2>
        <button
          onClick={onReset}
          className="text-[10px] font-black uppercase tracking-widest transition hover:text-[#25D366]"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <i className="fa-solid fa-sync-alt mr-1" /> Limpar Filtros
        </button>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl border"
        style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        {/* País */}
        <div>
          <label className="block text-[9px] font-black uppercase mb-2 tracking-widest" style={{ color: '#6b7280' }}>
            01. Selecione o País
          </label>
          <select className={selectClass} style={selectStyle} value={country} onChange={handleCountry}>
            <option value="all">Todos os Países</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Liga */}
        <div>
          <label className="block text-[9px] font-black uppercase mb-2 tracking-widest" style={{ color: '#6b7280' }}>
            02. Selecione a Liga
          </label>
          <select
            className={selectClass}
            style={selectStyle}
            value={league}
            onChange={handleLeague}
            disabled={country === 'all'}
          >
            <option value="all">{country === 'all' ? 'Aguardando País...' : 'Todas as Ligas'}</option>
            {leagues.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Time */}
        <div>
          <label className="block text-[9px] font-black uppercase mb-2 tracking-widest" style={{ color: '#6b7280' }}>
            03. Selecione o Time
          </label>
          <select
            className={selectClass}
            style={selectStyle}
            value={team}
            onChange={handleTeam}
            disabled={league === 'all'}
          >
            <option value="all">{league === 'all' ? 'Aguardando Liga...' : 'Todos os Times'}</option>
            {teams.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
