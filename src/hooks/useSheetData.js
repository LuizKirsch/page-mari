import { useState, useEffect } from 'react';
import { SHEET_CSV_URL, FALLBACK_PRODUCTS } from '../config';

// Parser de linha CSV que respeita campos entre aspas
function splitLine(line) {
  const cols = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      cols.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  cols.push(current.trim());
  return cols;
}

function parseCSV(csvText) {
  // Remove \r para compatibilidade com Windows e Google Sheets
  const lines = csvText.trim().replace(/\r/g, '').split('\n');
  if (lines.length < 2) return [];

  const clean = (v) => (v ?? '').replace(/^"|"$/g, '').trim();
  const hasSize = (v) => { const s = clean(v); return s !== '' && s !== '0'; };

  return lines.slice(1).reduce((acc, line) => {
    if (!line.trim()) return acc;
    const cols = splitLine(line);
    const ativo = clean(cols[11]);
    if (ativo === '0' || ativo.toLowerCase() === 'false') return acc;
    acc.push({
      name: clean(cols[0]),
      country: clean(cols[1]),
      league: clean(cols[2]),
      team: clean(cols[3]),
      price: clean(cols[4]),
      promoPrice: clean(cols[5]) || null,
      image: clean(cols[6]),
      sizes: [
        hasSize(cols[7]) && 'P',
        hasSize(cols[8]) && 'M',
        hasSize(cols[9]) && 'G',
        hasSize(cols[10]) && 'GG',
      ].filter(Boolean),
    });
    return acc;
  }, []);
}

export function useSheetData() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        if (!SHEET_CSV_URL) {
          console.warn('SHEET_CSV_URL não configurado. Usando dados de exemplo.');
          setProducts(FALLBACK_PRODUCTS);
          return;
        }

        const res = await fetch(SHEET_CSV_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        console.log('[CSV] primeiras linhas:', text.slice(0, 300));
        const parsed = parseCSV(text);
        console.log('[CSV] produtos parseados:', parsed);
        setProducts(parsed);
      } catch (err) {
        console.error('Erro ao carregar planilha:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { products, loading, error };
}
