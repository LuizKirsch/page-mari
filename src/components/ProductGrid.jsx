import { useMemo } from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, filters, onSelectProduct }) {
  const { country, league, team } = filters;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const okCountry = country === 'all' || p.country === country;
      const okLeague = league === 'all' || p.league === league;
      const okTeam = team === 'all' || p.team === team;
      return okCountry && okLeague && okTeam;
    });
  }, [products, country, league, team]);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filtered.map((p, i) => (
        <ProductCard key={`${p.name}-${i}`} product={p} onClick={() => onSelectProduct(p)} />
      ))}
    </div>
  );
}
