import { HERO_IMAGE } from '../config';

export default function Hero() {
  return (
    <header className="relative flex items-center justify-center overflow-hidden" style={{ height: '60vh' }}>
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Hero"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(100%)', opacity: 0.4 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}
        />
      </div>
      <div className="relative z-10 text-center px-4">
        <h1
          className="font-black italic uppercase leading-none tracking-tighter mb-4"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          ESTILO GLOBAL.<br />
          <span style={{ color: '#25D366' }}>ESTOQUE REAL.</span>
        </h1>
        {/* <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Atualizado via Nuvem
        </p> */}
      </div>
    </header>
  );
}
