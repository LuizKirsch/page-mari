import { useLocation, useNavigate } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../config';

export default function ProductPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  if (!product) {
    return (
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-12 text-center">
        <p className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Produto não encontrado.
        </p>
        <button
          onClick={() => navigate('/')}
          className="text-xs font-black uppercase tracking-widest hover:text-white transition"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <i className="fa-solid fa-arrow-left mr-2" /> Voltar ao Catálogo
        </button>
      </main>
    );
  }

  const { name, country, league, team, price, promoPrice, novo, image, sizes = [] } = product;

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
    <main className="max-w-5xl mx-auto px-6 pt-28 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Imagem */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#111' }}>
          <img
            src={image}
            alt={name}
            className="w-full object-cover"
            style={{ aspectRatio: '4/5' }}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/600x750/111/666?text=Imagem+Indisponivel';
            }}
          />
        </div>

        {/* Detalhes */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex gap-2 flex-wrap">
              <span
                className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
              >
                {country} • {league}
              </span>
              {promoPrice && (
                <span
                  className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: 'rgba(255,68,68,0.15)', color: '#ff4444', border: '1px solid rgba(255,68,68,0.3)' }}
                >
                  Promo
                </span>
              )}
              {novo && (
                <span
                  className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: 'rgba(37,211,102,0.15)', color: '#25D366', border: '1px solid rgba(37,211,102,0.3)' }}
                >
                  Novo
                </span>
              )}
            </div>
            <h1 className="mt-4 font-black uppercase italic leading-none tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              {name}
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{team}</p>
          </div>

          {/* Tamanhos */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Tamanhos Disponíveis
            </p>
            <div className="flex gap-2 flex-wrap">
              {['P', 'M', 'G', 'GG'].map((s) => {
                const available = sizes.includes(s);
                return (
                  <span
                    key={s}
                    className="text-xs font-black px-4 py-2 rounded-lg uppercase"
                    style={{
                      background: available ? 'rgba(37,211,102,0.15)' : 'rgba(255,255,255,0.04)',
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
          </div>

          {/* Preço e botão */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {promoPrice ? (
              <div className="flex flex-col">
                <span className="text-sm line-through" style={{ color: 'rgba(255,255,255,0.35)' }}>{price}</span>
                <span className="font-black italic" style={{ fontSize: '2rem', color: '#ff4444' }}>{promoPrice}</span>
              </div>
            ) : (
              <p className="font-black italic" style={{ fontSize: '2rem' }}>{price}</p>
            )}
            <button
              onClick={buyOnWhatsApp}
              className="w-full py-4 rounded-xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
              style={{ background: '#25D366', color: '#000' }}
            >
              <i className="fa-brands fa-whatsapp text-lg" /> Pedir via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
