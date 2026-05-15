export default function LoadingOverlay() {
  return (
    <div
      style={{ background: 'black', position: 'fixed', inset: 0, zIndex: 200 }}
      className="flex items-center justify-center"
    >
      <div className="text-center">
        <div
          className="spinner w-12 h-12 border-4 rounded-full mx-auto mb-4"
          style={{ borderColor: '#25D366', borderTopColor: 'transparent' }}
        />
        <p className="text-[10px] font-black uppercase tracking-widest">
          Sincronizando Estoque...
        </p>
      </div>
    </div>
  );
}
