import type { VercelRequest, VercelResponse } from '@vercel/node';

// Dados dos presentes (mesmo do frontend)
const gifts = [
  { id: 1, name: "Licença para Roncar (Finais de Semana)", price: 75 },
  { id: 2, name: "Bagels em Nova York", price: 60 },
  { id: 3, name: "Edredom Fofinho", price: 280 },
  { id: 4, name: "Fritadeira Elétrica (Airfryer)", price: 320 },
  { id: 5, name: "Curso de 'Como dobrar lençol de elástico'", price: 95 },
  { id: 6, name: "Mixer de Mão", price: 140 },
  { id: 7, name: "Negociador de Canal de TV", price: 200 },
  { id: 8, name: "Toalhas de Banho Gigantes", price: 200 },
  { id: 9, name: "Spotify sem anúncios na lua de mel", price: 50 },
  { id: 10, name: "Passeio de Gôndola em Veneza", price: 420 },
  { id: 11, name: "Pílulas de 'Sim, querida'", price: 50 },
  { id: 12, name: "Croissant aos pés da Torre Eiffel", price: 80 },
  { id: 13, name: "Vale 'Hoje a Louça é Sua'", price: 100 },
  { id: 14, name: "Passe livre para jogar videogame", price: 80 },
  { id: 15, name: "Vinícola no Vale dos Vinhedos", price: 350 },
  { id: 16, name: "Kit Churrasco Completo", price: 450 },
  { id: 17, name: "Manual de Sobrevivência ao 'Vamos Conversar'", price: 120 },
  { id: 18, name: "Café Expresso em Roma", price: 45 },
  { id: 19, name: "Escudo Anti-Sogra", price: 500 },
  { id: 20, name: "Jogo de Panelas Antiaderentes", price: 380 },
  { id: 21, name: "Noite de Pizza em Nápoles", price: 180 },
  { id: 22, name: "Robô Aspirador", price: 600 },
  { id: 23, name: "Vale 1 semana de cama arrumada", price: 70 },
  { id: 24, name: "Fondue Suíço nos Alpes", price: 250 },
  { id: 25, name: "Almofadas Novas para o Sofá", price: 180 },
  { id: 26, name: "Gelato Italiano Autêntico", price: 55 },
  { id: 27, name: "Detector de Mentiras Caseiro", price: 150 },
  { id: 28, name: "Cerveja Artesanal na Bélgica", price: 90 },
  { id: 29, name: "Cafeteira Expresso", price: 400 },
  { id: 30, name: "Passeio de Barco em Amsterdã", price: 200 },
  { id: 31, name: "Streaming de Filmes por 1 ano", price: 150 },
  { id: 32, name: "Vinho e Tapas em Barcelona", price: 170 },
  { id: 33, name: "Chaleira Elétrica", price: 120 },
  { id: 34, name: "Piquenique em Central Park", price: 130 },
  { id: 35, name: "Manual de 'Desculpas Criativas'", price: 85 },
  { id: 36, name: "Visita a Museu em Paris", price: 100 },
  { id: 37, name: "Conjunto de Facas Profissionais", price: 350 },
  { id: 38, name: "Show da Broadway em NYC", price: 500 },
  { id: 39, name: "Cobertor de Casal Extra Macio", price: 220 },
  { id: 40, name: "Passeio de Bike em Copenhague", price: 110 },
  { id: 41, name: "Vale 'Massagem nos Pés'", price: 60 },
  { id: 42, name: "Chocolate Belga Tradicional", price: 75 },
  { id: 43, name: "Processador de Alimentos", price: 280 },
  { id: 44, name: "Jantar Romântico em Lisboa", price: 220 },
  { id: 45, name: "Umidificador de Ar", price: 150 },
  { id: 46, name: "Fish and Chips em Londres", price: 65 },
  { id: 47, name: "Licença para Escolher o Filme", price: 40 },
  { id: 48, name: "High Tea no Reino Unido", price: 120 },
  { id: 49, name: "Jogo de Lençóis 400 fios", price: 320 },
  { id: 50, name: "Passeio de Tuk-Tuk em Lisboa", price: 90 },
  { id: 51, name: "Alarme Anti-Ronco", price: 180 },
  { id: 52, name: "Crepe em Montmartre", price: 50 },
  { id: 53, name: "Liquidificador Potente", price: 200 },
  { id: 54, name: "Degustação de Queijos na França", price: 140 },
  { id: 55, name: "Travesseiros de Pluma", price: 250 },
  { id: 56, name: "Churros com Chocolate em Madrid", price: 45 },
  { id: 57, name: "Vale 'Café na Cama'", price: 35 },
  { id: 58, name: "Passeio de Segway em Lisboa", price: 85 },
  { id: 59, name: "Panela de Pressão Elétrica", price: 350 },
  { id: 60, name: "Mercado de Flores em Amsterdã", price: 70 },
  { id: 61, name: "Caixa de Ferramentas Completa", price: 280 },
  { id: 62, name: "Paella Valenciana Autêntica", price: 160 },
  { id: 63, name: "Permissão para Deixar Toalha Molhada", price: 55 },
  { id: 64, name: "Passeio de Balão na Capadócia", price: 600 },
  { id: 65, name: "Conjunto de Potes Herméticos", price: 150 },
  { id: 66, name: "Waffle Belga Original", price: 40 },
  { id: 67, name: "Abajur de Cabeceira", price: 180 },
  { id: 68, name: "Tour de Street Food em Bangkok", price: 100 },
  { id: 69, name: "Vale 'Eu Estava Errado'", price: 200 },
  { id: 70, name: "Massagem Thai Tradicional", price: 120 },
  { id: 71, name: "Sanduicheira Grill", price: 130 },
  { id: 72, name: "Hot Dog em Nova York", price: 30 },
  { id: 73, name: "Espelho de Parede Decorativo", price: 220 },
  { id: 74, name: "Sushi em Tóquio", price: 180 },
  { id: 75, name: "Manual de 'Como Fingir que Está Ouvindo'", price: 90 },
  { id: 76, name: "Banho em Onsen no Japão", price: 150 },
  { id: 77, name: "Ferro de Passar a Vapor", price: 180 },
  { id: 78, name: "Ramen Autêntico em Tóquio", price: 70 },
  { id: 79, name: "Cortinas Blackout", price: 280 },
  { id: 80, name: "Falafel em Tel Aviv", price: 45 },
  { id: 81, name: "Voucher 'Sem Reclamação por 24h'", price: 100 },
  { id: 82, name: "Passeio no Deserto de Dubai", price: 300 },
  { id: 83, name: "Tábua de Corte de Madeira", price: 120 },
  { id: 84, name: "Mezze no Líbano", price: 110 },
  { id: 85, name: "Organizador de Closet", price: 200 },
  { id: 86, name: "Curry Indiano Autêntico", price: 80 },
  { id: 87, name: "Permissão para Termostato", price: 150 },
  { id: 88, name: "Safari de Fotos na África do Sul", price: 450 },
  { id: 89, name: "Jogo Americano e Porta-Copos", price: 90 },
  { id: 90, name: "Braai (Churrasco) Sul-Africano", price: 130 },
  { id: 91, name: "Purificador de Água", price: 350 },
  { id: 92, name: "Tacos Mexicanos de Rua", price: 50 },
  { id: 93, name: "Kit de Temperos Gourmet", price: 150 },
  { id: 94, name: "Mole Oaxaqueño no México", price: 95 },
  { id: 95, name: "Vale 'Dia do Videogame Liberado'", price: 70 },
  { id: 96, name: "Ceviche Peruano Fresco", price: 85 },
  { id: 97, name: "Balde de Gelo Premium", price: 120 },
  { id: 98, name: "Tango Show em Buenos Aires", price: 180 },
  { id: 99, name: "Cabides de Veludo (50 pçs)", price: 100 },
  { id: 100, name: "Asado Argentino Completo", price: 200 },
];

// Calcula parcelas sem juros baseado no valor
// Até R$100: 2x | R$100-300: 3x | R$300-500: 4x | +200 = +1 parcela
function calculateFreeInstallments(price: number): number {
  if (price <= 100) return 2;
  // A cada R$200 acima de R$100, adiciona 1 parcela
  const extraInstallments = Math.ceil((price - 100) / 200);
  const installments = 2 + extraInstallments;
  // Limita a 12 parcelas (máximo do MP)
  return Math.min(installments, 12);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { giftId } = req.body;

  if (!giftId) {
    return res.status(400).json({ error: 'giftId is required' });
  }

  const gift = gifts.find(g => g.id === Number(giftId));

  if (!gift) {
    return res.status(404).json({ error: 'Gift not found' });
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(500).json({ error: 'Access token not configured' });
  }

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            title: `Presente: ${gift.name}`,
            quantity: 1,
            unit_price: gift.price,
            currency_id: 'BRL',
          }
        ],
        payment_methods: {
          // Máximo de parcelas permitidas (dinâmico baseado no valor)
          installments: 12,
          // Parcelas sem juros baseado no valor do presente
          default_installments: calculateFreeInstallments(gift.price)
        },
        back_urls: {
          success: 'https://casamento-portal.vercel.app/pagamento-sucesso',
          failure: 'https://casamento-portal.vercel.app/pagamento-erro',
          pending: 'https://casamento-portal.vercel.app/pagamento-pendente'
        },
        auto_return: 'approved',
        external_reference: `gift-${gift.id}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('MP Error:', data);
      return res.status(500).json({ error: 'Failed to create preference', details: data });
    }

    return res.status(200).json({ 
      checkoutUrl: data.init_point,
      preferenceId: data.id 
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
