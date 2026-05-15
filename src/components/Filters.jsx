import { useMemo } from 'react';

export default function Filters({ products, filters, onChange, onReset, sort, onSort }) {
  const { country, league, team } = filters;

  const countries = useMemo(() => {
    const all = [...new Set(products.map((p) => p.country))].sort();
    const idx = all.indexOf('Seleção');
    if (idx > 0) all.unshift(all.splice(idx, 1)[0]);
    return all;
  }, [products]);

  const isSelecao = country === 'Seleção';

  const leagues = useMemo(() => {
    if (country === 'all' || isSelecao) return [];
    return [...new Set(products.filter((p) => p.country === country).map((p) => p.league))].sort();
  }, [products, country, isSelecao]);

  const teams = useMemo(() => {
    if (isSelecao && country !== 'all') {
      return [...new Set(products.filter((p) => p.country === country).map((p) => p.team))].sort();
    }
    if (league === 'all') return [];
    return [
      ...new Set(
        products.filter((p) => p.country === country && p.league === league).map((p) => p.team)
      ),
    ].sort();
  }, [products, country, league, isSelecao]);

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
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSort(sort === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg transition hover:bg-white/10"
            style={{ color: sort !== 'default' ? '#25D366' : 'rgba(255,255,255,0.4)', border: `1px solid ${sort !== 'default' ? 'rgba(37,211,102,0.3)' : 'rgba(255,255,255,0.1)'}` }}
          >
            <i className={`fa-solid fa-arrow-${sort === 'desc' ? 'down' : 'up'}-wide-short`} />
            Preço {sort === 'desc' ? 'Maior' : 'Menor'}
          </button>
          <button
            onClick={onReset}
            className="text-[10px] font-black uppercase tracking-widest transition hover:text-[#25D366]"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            <i className="fa-solid fa-sync-alt mr-1" /> Limpar
          </button>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 gap-4 p-6 rounded-2xl border ${isSelecao ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}
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

        {/* Liga — escondida quando Seleção */}
        {!isSelecao && (
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
        )}

        {/* Time / Seleção */}
        <div>
          <label className="block text-[9px] font-black uppercase mb-2 tracking-widest" style={{ color: '#6b7280' }}>
            {isSelecao ? '02. Selecione a Seleção' : '03. Selecione o Time'}
          </label>
          <select
            className={selectClass}
            style={selectStyle}
            value={team}
            onChange={handleTeam}
            disabled={league === 'all' && !isSelecao}
          >
            <option value="all">
              {isSelecao
                ? 'Todas as Seleções'
                : league === 'all'
                ? 'Aguardando Liga...'
                : 'Todos os Times'}
            </option>
            {teams.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
