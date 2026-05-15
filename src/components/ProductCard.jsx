import { WHATSAPP_NUMBER } from '../config';

export default function ProductCard({ product }) {
  const { name, country, league, team, price, image, sizes = [] } = product;

  function buyOnWhatsApp() {
    const sizesInfo = sizes.length > 0
      ? `Tamanhos disponíveis: *${sizes.join(', ')}*`
      : 'Sem tamanhos informados';
    const msg = encodeURIComponent(
      `Olá! Vi o modelo *${name}* no catálogo.\n${sizesInfo}\nGostaria de fazer um pedido.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  }

  return (
    <div
      className="product-card group rounded-2xl p-4 border"
      style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.05)' }}
    >
      <div
        className="rounded-xl overflow-hidden mb-4 relative"
        style={{ aspectRatio: '4/5', background: '#111' }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-all duration-500"
          style={{ filter: 'grayscale(100%)', opacity: 0.6 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'grayscale(0%)';
            e.currentTarget.style.opacity = 1;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'grayscale(100%)';
            e.currentTarget.style.opacity = 0.6;
          }}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x500/111/666?text=Imagem+Indisponivel';
          }}
        />
        <div
          className="absolute top-3 left-3 text-black text-[8px] font-black px-2 py-1 rounded italic uppercase"
          style={{ background: '#fff' }}
        >
          {country}
        </div>
      </div>

      <h3 className="font-bold text-sm mb-1 uppercase tracking-tight truncate">{name}</h3>
      <p className="text-xs mb-3" style={{ color: '#6b7280' }}>
        {league} • {team}
      </p>

      {/* Tamanhos disponíveis */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {['P', 'M', 'G', 'GG'].map((s) => {
          const available = sizes.includes(s);
          return (
            <span
              key={s}
              className="text-[9px] font-black px-2 py-1 rounded uppercase"
              style={{
                background: available ? 'rgba(37,211,102,0.15)' : 'rgba(255,255,255,0.05)',
                color: available ? '#25D366' : 'rgba(255,255,255,0.2)',
                border: `1px solid ${available ? 'rgba(37,211,102,0.3)' : 'rgba(255,255,255,0.08)'}`,
                textDecoration: available ? 'none' : 'line-through',
              }}
            >
              {s}
            </span>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-lg font-black italic"> {price}</p>
        <button
          onClick={buyOnWhatsApp}
          className="flex-1 py-2 rounded-lg font-black uppercase text-[9px] tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all"
          style={{ background: '#25D366', color: '#000' }}
        >
          <i className="fa-brands fa-whatsapp" /> WhatsApp
        </button>
      </div>
    </div>
  );
}
