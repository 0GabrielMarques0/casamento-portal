export const redirectToCheckout = (paymentLink: string): void => {
  if (!paymentLink) {
    throw new Error('Link de pagamento inválido');
  }

  try {
    // Validação simples de URL
    new URL(paymentLink);
    window.location.href = paymentLink;
  } catch (error) {
    console.error('Erro ao redirecionar:', error);
    throw new Error('URL de pagamento inválida');
  }
};
