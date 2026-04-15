

import bannerImg from '../assets/joaraGabrielBanner.jpg';

const HeroCouple = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${bannerImg}) center/cover no-repeat fixed`,
      textAlign: 'center',
      color: 'white',
      position: 'relative'
    }} className="fade-in">
      
      <p style={{ 
        marginBottom: '1rem', 
        letterSpacing: '3px', 
        fontSize: '1rem',
        textTransform: 'uppercase',
        position: 'relative',
        zIndex: 2
      }}>
        21 . 11 . 2026
      </p>

      <h1 style={{ 
        fontSize: 'clamp(3rem, 8vw, 6rem)', 
        marginBottom: '0.5rem', 
        color: 'white', 
        fontFamily: 'var(--font-serif)',
        fontWeight: 'normal',
        lineHeight: 1,
        position: 'relative',
        zIndex: 2
      }}>
        JOARA & GABRIEL
      </h1>
      
      <p style={{ 
        fontFamily: 'Great Vibes, cursive', 
        fontSize: 'clamp(1.8rem, 6vw, 3rem)',
        marginTop: '-10px',
        position: 'relative',
        zIndex: 2
      }}>
        Sítio Izabel de Bola
      </p>

    </div>
  );
};

export default HeroCouple;
