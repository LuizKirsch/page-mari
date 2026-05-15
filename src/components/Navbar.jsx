import { useNavigate, useLocation } from 'react-router-dom';
import { STORE_NAME, WHATSAPP_NUMBER } from '../config';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/produto/');

  return (
    <nav className="fixed top-0 w-full z-[100] glass-header border-b py-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {isProductPage && (
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              <i className="fa-solid fa-arrow-left" /> Voltar
            </button>
          )}
          <span
            className="text-2xl font-black tracking-tighter uppercase italic cursor-pointer"
            onClick={() => navigate('/')}
          >
            {STORE_NAME}
          </span>
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-full text-[10px] font-black uppercase hover:scale-105 transition"
          style={{ background: '#25D366', color: '#000' }}
        >
          Suporte WhatsApp
        </a>
      </div>
    </nav>
  );
}
