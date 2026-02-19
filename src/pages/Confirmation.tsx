import { useSearchParams, Link } from 'react-router-dom';
import SectionContainer from '../components/SectionContainer';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status'); // approved, pending, failure
  
  const isApproved = status === 'approved';
  const isPending = status === 'pending';

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '60vh' 
    }}>
      <SectionContainer>
        <div style={{ 
          textAlign: 'center', 
          backgroundColor: 'white', 
          padding: '60px 40px', 
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          {isApproved ? (
            <>
              <CheckCircle size={80} color="#48C774" style={{ marginBottom: '20px' }} />
              <h2 style={{ color: '#48C774' }}>Pagamento Aprovado!</h2>
              <p>Muito obrigado pelo presente! Ficamos muito felizes com seu carinho.</p>
            </>
          ) : isPending ? (
            <>
              <AlertCircle size={80} color="#FFDD57" style={{ marginBottom: '20px' }} />
              <h2>Pagamento em Processamento</h2>
              <p>Seu pagamento está sendo processado. Assim que confirmado, você receberá um e-mail.</p>
            </>
          ) : (
             <>
              <AlertCircle size={80} color="#F14668" style={{ marginBottom: '20px' }} />
              <h2 style={{ color: '#F14668' }}>Algo deu errado</h2>
              <p>Não foi possível confirmar o pagamento. Por favor, verifique se houve cobrança ou tente novamente.</p>
            </>
          )}
          
          <div style={{ marginTop: '40px' }}>
            <Link to="/" style={{ 
              padding: '12px 24px', 
              backgroundColor: 'var(--color-primary)', 
              color: 'white', 
              borderRadius: '30px',
              fontWeight: 'bold'
            }}>
              Voltar ao Início
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Confirmation;
