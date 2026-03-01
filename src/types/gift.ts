export interface Gift {
  id: number;
  name: string;
  description: string;
  price: number;
  paymentLink?: string; // Mercado Pago payment link
}
