import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h2 style={{ color: '#4CAF50', marginBottom: '16px' }}>Pagamento Realizado com Sucesso!</h2>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px' }}>
        Muito obrigado pelo seu carinho e contribuição. Estamos muito felizes!
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

export default PaymentSuccess;
