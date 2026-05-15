import { useMemo } from 'react';
import ProductCard from './ProductCard';

function parsePrice(str) {
  if (!str) return 0;
  return parseFloat(
    String(str)
      .replace(/[^\d,.]/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
  ) || 0;
}

export default function ProductGrid({ products, filters, sort }) {
  const { country, league, team } = filters;

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      const okCountry = country === 'all' || p.country === country;
      const okLeague = league === 'all' || p.league === league;
      const okTeam = team === 'all' || p.team === team;
      return okCountry && okLeague && okTeam;
    });

    if (sort === 'asc' || sort === 'desc') {
      list.sort((a, b) => {
        const pa = parsePrice(a.promoPrice || a.price);
        const pb = parsePrice(b.promoPrice || b.price);
        return sort === 'asc' ? pa - pb : pb - pa;
      });
    }

    return list;
  }, [products, country, league, team, sort]);

  if (filtered.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="uppercase text-[10px] font-black tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Nenhuma Camiseta Encontrada.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-[10px] font-black uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
        {filtered.length} {filtered.length === 1 ? 'camiseta encontrada' : 'camisetas encontradas'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((p, i) => (
          <ProductCard key={`${p.name}-${i}`} product={p} />
        ))}
      </div>
    </>
  );
}
