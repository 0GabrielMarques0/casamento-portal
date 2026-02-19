import React from 'react';
import { Link } from 'react-router-dom';

const PaymentError: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h2 style={{ color: '#F44336', marginBottom: '16px' }}>Ops! Algo deu errado.</h2>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px' }}>
        Não conseguimos confirmar o pagamento. Por favor, tente novamente ou entre em contato conosco.
      </p>
      <Link to="/presentes" style={{
        padding: '10px 20px',
        backgroundColor: '#8AB6D6',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold'
      }}>
        Tentar Novamente
      </Link>
    </div>
  );
};

export default PaymentError;
