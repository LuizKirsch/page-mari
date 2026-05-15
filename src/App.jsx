import { useState } from 'react';
import './index.css';
import { useSheetData } from './hooks/useSheetData';
import { WHATSAPP_NUMBER } from './config';
import LoadingOverlay from './components/LoadingOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filters from './components/Filters';
import ProductGrid from './components/ProductGrid';
import ProductPage from './components/ProductPage';

const DEFAULT_FILTERS = { country: 'all', league: 'all', team: 'all' };

export default function App() {
  const { products, loading, error } = useSheetData();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleFilterChange(next) {
    setFilters((prev) => ({ ...prev, ...next }));
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return (
    <>
      {loading && <LoadingOverlay />}

      <Navbar />

      {selectedProduct ? (
        <ProductPage product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      ) : (
        <>
          <Hero />

          <main id="shop" className="max-w-7xl mx-auto px-6 py-20">
            {error && (
              <div
                className="mb-8 px-4 py-3 rounded-xl text-xs font-bold border"
                style={{ background: 'rgba(255,80,80,0.08)', borderColor: 'rgba(255,80,80,0.2)', color: '#ff5050' }}
              >
                Erro ao carregar planilha: {error}. Exibindo dados de exemplo.
              </div>
            )}

            <Filters
              products={products}
              filters={filters}
              onChange={handleFilterChange}
              onReset={resetFilters}
            />

            <ProductGrid
              products={products}
              filters={filters}
              onSelectProduct={setSelectedProduct}
            />
          </main>
        </>
      )}

      {/* Botão flutuante WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl hover:scale-110 transition-all"
        style={{ background: '#25D366', color: '#000' }}
      >
        <i className="fa-brands fa-whatsapp" />
      </a>
    </>
  );
}
