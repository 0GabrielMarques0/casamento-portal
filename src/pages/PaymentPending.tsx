import React from 'react';
import { Link } from 'react-router-dom';

const PaymentPending: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h2 style={{ color: '#FF9800', marginBottom: '16px' }}>Pagamento em Processamento</h2>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px' }}>
        Seu pagamento está sendo processado. Assim que for confirmado, receberemos a notificação.
        Obrigado!
      </p>
      <Link to="/" style={{
        padding: '10px 20px',
        backgroundColor: '#8AB6D6',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold'
      }}>
        Voltar ao Início
      </Link>
    </div>
  );
};

export default PaymentPending;
