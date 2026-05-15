import { STORE_NAME, WHATSAPP_NUMBER } from '../config';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-[100] glass-header border-b py-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <span className="text-2xl font-black tracking-tighter uppercase italic">{STORE_NAME}</span>
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
