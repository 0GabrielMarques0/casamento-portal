import { Link } from 'react-router-dom';
import SectionContainer from '../components/SectionContainer';
import capelaAquarela from '../assets/capelaAquarela.png';

const buttonStyle = {
  padding: '14px 32px',
  color: 'white',
  borderRadius: '30px',
  fontWeight: 'bold',
  textDecoration: 'none',
  display: 'inline-block',
  transition: 'all 0.3s ease'
};

const RSVPClosed = () => {
  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '100px',
      paddingBottom: '60px',
      // Fundo escuro: no topo a Navbar é transparente com texto branco.
      backgroundColor: 'var(--color-text)'
    }}>
      <SectionContainer>
        <div style={{
          textAlign: 'center',
          backgroundColor: 'white',
          padding: 'clamp(30px, 5vw, 60px) clamp(20px, 5vw, 40px)',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <img
            src={capelaAquarela}
            alt="Capela Santa Izabel"
            style={{ display: 'block', width: '100%', maxWidth: '320px', height: 'auto', borderRadius: '12px', margin: '0 auto 24px' }}
          />
          <h2 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>
            Confirmações encerradas
          </h2>
          <p style={{ color: '#666', lineHeight: 1.7 }}>
            O prazo para confirmar presença terminou em <strong style={{ color: 'var(--color-wood-dark)' }}>02 de Novembro de 2026</strong>.
            Muito obrigado a todos que responderam!
          </p>

          <div style={{ marginTop: '40px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{ ...buttonStyle, backgroundColor: 'var(--color-wood-dark)' }}>
              Voltar ao Início
            </Link>
            <Link to="/presentes" style={{ ...buttonStyle, backgroundColor: 'var(--color-primary)' }}>
              Lista de Presentes
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default RSVPClosed;
