import type { VercelRequest, VercelResponse } from '@vercel/node';

// Dados dos presentes (sincronizados com o frontend)
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
  { id: 15, name: "Treinamento Ninja para sair da Cama", price: 110 },
  { id: 16, name: "Cadeira de Escritório", price: 550 },
  { id: 17, name: "Curso de 'Ouvir sem dar solução'", price: 90 },
  { id: 18, name: "Curso de como usar a máquina de lavar", price: 50 },
  { id: 19, name: "Passeio de camelo no Egito", price: 250 },
  { id: 20, name: "Controle remoto universal", price: 85 },
  { id: 21, name: "Alvará de Soltura para Bar com Amigos", price: 150 },
  { id: 22, name: "Aula de culinária básica", price: 180 },
  { id: 23, name: "Micro-ondas", price: 350 },
  { id: 24, name: "Ingressos para o cinema (filme dele)", price: 70 },
  { id: 25, name: "Kit Desarmamento de Bomba (TPM)", price: 180 },
  { id: 26, name: "Panela de Pressão Elétrica", price: 360 },
  { id: 27, name: "Fundo para multas de trânsito", price: 100 },
  { id: 28, name: "Lava-Louças", price: 1100 },
  { id: 29, name: "Taxa de Proteção contra Spoilers", price: 120 },
  { id: 30, name: "Liquidificador Potente", price: 180 },
  { id: 31, name: "Purificador de Água", price: 480 },
  { id: 32, name: "Fogão 5 bocas", price: 600 },
  { id: 33, name: "Abajur Moderno", price: 180 },
  { id: 34, name: "Kit Ressaca Pós-Festa", price: 50 },
  { id: 35, name: "Detector de Sarcasmo", price: 350 },
  { id: 36, name: "Vinho no Vale do Napa", price: 320 },
  { id: 37, name: "Churrasqueira Elétrica", price: 320 },
  { id: 38, name: "Safari na África do Sul", price: 850 },
  { id: 39, name: "Café infinito", price: 99 },
  { id: 40, name: "Vale 'Jantar sem celular'", price: 130 },
  { id: 41, name: "Adega Climatizada", price: 650 },
  { id: 42, name: "Diploma de 'Você Estava Certo(a)'", price: 1000 },
  { id: 43, name: "Pizza em Nápoles", price: 120 },
  { id: 44, name: "Tapete Peludo", price: 250 },
  { id: 45, name: "Rastreador de Toalha Molhada", price: 150 },
  { id: 46, name: "Geladeira Moderna", price: 800 },
  { id: 47, name: "Kit Anti-Gelo nos Pés", price: 75 },
  { id: 48, name: "Personal Stylist para Pijamas", price: 120 },
  { id: 49, name: "Botão de 'Mudo'", price: 50 },
  { id: 50, name: "Robô Aspirador", price: 700 },
  { id: 51, name: "Aurora Boreal na Islândia", price: 900 },
  { id: 52, name: "Café da manhã flutuante em Bali", price: 280 },
  { id: 53, name: "Curso de Orientação no Shopping", price: 55 },
  { id: 54, name: "Smart TV 55\"", price: 1200 },
  { id: 55, name: "Travesseiros Nasa", price: 160 },
  { id: 56, name: "Jogo de Panelas", price: 400 },
  { id: 57, name: "Adicional de Insalubridade por Ronco", price: 300 },
  { id: 58, name: "Mesa de Centro", price: 300 },
  { id: 59, name: "Taxa de silêncio para a sogra", price: 200 },
  { id: 60, name: "Ventilador Turbo", price: 180 },
  { id: 61, name: "Batedeira Planetária", price: 450 },
  { id: 62, name: "Tradutor de Suspiros", price: 250 },
  { id: 63, name: "Veto Presidencial para Visita de Parentes", price: 800 },
  { id: 64, name: "Mergulho nas Maldivas", price: 600 },
  { id: 65, name: "Troféu 'Você Estava Certo(a)'", price: 80 },
  { id: 66, name: "Aula de Tango em Buenos Aires", price: 180 },
  { id: 67, name: "Freio de Mão para DR", price: 500 },
  { id: 68, name: "Faqueiro Inox", price: 300 },
  { id: 69, name: "Manual 'Como elogiar a comida da sogra'", price: 85 },
  { id: 70, name: "Mapa do tesouro (dinheiro escondido)", price: 200 },
  { id: 71, name: "Aparelho de Jantar", price: 450 },
  { id: 72, name: "Tour pelos canais de Amsterdã", price: 190 },
  { id: 73, name: "Bússola para Homem que Não Pede Informação", price: 60 },
  { id: 74, name: "Curso de Leitura de Mente Nível 1", price: 2500 },
  { id: 75, name: "Gelato em Roma", price: 50 },
  { id: 76, name: "Ferro de Passar a Vapor", price: 150 },
  { id: 77, name: "Massagem Tailandesa em Bangkok", price: 150 },
  { id: 78, name: "Show da Broadway em NY", price: 550 },
  { id: 79, name: "Kit Sobrevivência para Shopping", price: 120 },
  { id: 80, name: "Netflix vitalício", price: 300 },
  { id: 81, name: "Jogo de Cama King Size", price: 350 },
  { id: 82, name: "Saldo para o iFood do fim de semana", price: 150 },
  { id: 83, name: "Kit Sobrevivência à TPM", price: 110 },
  { id: 84, name: "Paciência (Vendida separadamente)", price: 99.9 },
  { id: 85, name: "Conjunto de Tupperware", price: 220 },
  { id: 86, name: "Torradeira", price: 120 },
  { id: 87, name: "Veto Presidencial para Visitas Surpresa", price: 100 },
  { id: 88, name: "Fundo para o 'Eu avisei'", price: 50 },
  { id: 89, name: "Aspirador de Pó Vertical", price: 250 },
  { id: 90, name: "Taxa de Reembolso por Piada Ruim", price: 50 },
  { id: 91, name: "Suplemento de Paciência para TPM", price: 150 },
  { id: 92, name: "Cafeteira Expresso", price: 380 },
  { id: 93, name: "Placa 'Proibido Opinar na Decoração'", price: 70 },
  { id: 94, name: "Máquina de Lavar", price: 900 },
  { id: 95, name: "Taças de Vinho Cristal", price: 240 },
  { id: 96, name: "Jantar romântico em Paris", price: 350 },
  { id: 97, name: "Escudo Anti-Palpites sobre a Casa", price: 130 },
  { id: 98, name: "Terapia de Casal Preventiva", price: 250 },
  { id: 99, name: "Contribuição para o Adestrador da Esposa", price: 150 },
  { id: 100, name: "Sanduicheira Grill", price: 110 },
];

// Calcula parcelas sem juros baseado no valor
// Até R$100: 2x | R$100-300: 3x | R$300-500: 4x | +200 = +1 parcela
function calculateFreeInstallments(price: number): number {
  if (price <= 100) return 2;
  const extraInstallments = Math.ceil((price - 100) / 200);
  const installments = 2 + extraInstallments;
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
          // Limita o número máximo de parcelas baseado no valor
          // Isso garante que só apareçam as parcelas que você absorve
          installments: calculateFreeInstallments(gift.price)
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
