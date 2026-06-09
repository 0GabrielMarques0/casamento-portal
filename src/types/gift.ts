export type GiftCategory = 
  | 'Viagens & Experiências'
  | 'Eletrodomésticos'
  | 'Casa & Decoração'
  | 'Cozinha'
  | 'Diversão & Humor';

export interface Gift {
  id: number;
  name: string;
  description: string;
  price: number;
  category: GiftCategory;
  image?: string; // URL da imagem do presente
  paymentLink?: string; // Mercado Pago payment link
}
