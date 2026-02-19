export interface Gift {
  id: number;
  name: string;
  description: string;
  price: number;
  paymentLink?: string; // Optional because some gifts might not have a link yet
}
