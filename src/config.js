// =====================================================
// CONFIGURAÇÃO DA LOJA — edite apenas este arquivo
// =====================================================

// 1. No Google Sheets: Arquivo > Compartilhar > Publicar na Web
// 2. Escolha "Valores separados por vírgulas (.csv)" e clique em Publicar
// 3. Cole o link gerado abaixo:
export const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1XcQtNUjqW3DS8X3jDYExNAdyCXlXNzM4kObKCYu-dME/gviz/tq?tqx=out:csv';

// Número do WhatsApp da loja (com código do país, sem + ou espaços)
export const WHATSAPP_NUMBER = '5500000000000';

// Nome da loja exibido no topo
export const STORE_NAME = 'NOME DA LOJA';

// URL da imagem do hero (banner principal)
export const HERO_IMAGE = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000';

// Dados de fallback usados quando SHEET_CSV_URL está vazio (para desenvolvimento)
export const FALLBACK_PRODUCTS = [
  {
    name: 'Flamengo Home 24/25',
    country: 'Brasil',
    league: 'Brasileirão',
    team: 'Flamengo',
    price: '289,90',
    image: 'https://placehold.co/600x800/111/fff?text=FLAMENGO',
    sizes: ['P', 'M', 'G'],
  },
  {
    name: 'Real Madrid Dragon',
    country: 'Espanha',
    league: 'La Liga',
    team: 'Real Madrid',
    price: '319,90',
    image: 'https://placehold.co/600x800/111/fff?text=REAL+MADRID',
    sizes: ['M', 'G', 'GG'],
  },
  {
    name: 'Brasil 94 Retrô',
    country: 'Brasil',
    league: 'Seleções',
    team: 'Brasil',
    price: '349,90',
    image: 'https://placehold.co/600x800/111/fff?text=BRASIL+94',
    sizes: ['P', 'G'],
  },
  {
    name: 'Manchester City Away',
    country: 'Inglaterra',
    league: 'Premier League',
    team: 'Manchester City',
    price: '309,90',
    image: 'https://placehold.co/600x800/111/fff?text=MAN+CITY',
    sizes: ['P', 'M', 'G', 'GG'],
  },
];
