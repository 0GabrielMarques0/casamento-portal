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
  paymentLink?: string; // Mercado Pago payment link
}
