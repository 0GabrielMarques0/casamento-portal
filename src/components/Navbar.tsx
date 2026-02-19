import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeMenu();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav style={{
      padding: '20px 0',
      textAlign: 'center',
      borderBottom: scrolled ? '1px solid rgba(138, 182, 214, 0.2)' : 'none',
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      transition: 'all 0.3s ease',
      color: scrolled ? 'var(--color-text)' : 'white'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '100%' }}>
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ 
            fontSize: '1.5rem', 
            fontFamily: 'var(--font-serif)', 
            color: 'inherit',
            textDecoration: 'none',
            letterSpacing: '2px'
          }}>
          JG
        </Link>
        
        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ color: 'inherit', alignItems: 'center' }}>
          <button onClick={() => scrollToSection('historia')} style={{ background: 'none', border: 'none', color: 'inherit', fontSize: '1rem', padding: '0 15px' }}>História</button>
          <button onClick={() => scrollToSection('local')} style={{ background: 'none', border: 'none', color: 'inherit', fontSize: '1rem', padding: '0 15px' }}>Local</button>
          <button onClick={() => scrollToSection('programacao')} style={{ background: 'none', border: 'none', color: 'inherit', fontSize: '1rem', padding: '0 15px' }}>Programação</button>
          <button onClick={() => scrollToSection('dicas')} style={{ background: 'none', border: 'none', color: 'inherit', fontSize: '1rem', padding: '0 15px' }}>Dicas</button>
          
          <Link to="/presentes" style={{ 
            marginLeft: '20px',
            border: `1px solid ${scrolled ? 'var(--color-primary)' : 'white'}`, 
            backgroundColor: scrolled ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '8px 25px', 
            borderRadius: '25px',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 'bold'
          }}>Lista de Presentes</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-label="Menu"
          style={{ color: 'inherit' }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className={`mobile-menu-dropdown ${isMenuOpen ? 'open' : ''}`} style={{ color: 'var(--color-text)' }}>
        <button onClick={() => scrollToSection('historia')} style={{ background: 'none', border: 'none', padding: '15px', borderBottom: '1px solid #eee', width: '100%', fontSize: '1.1rem' }}>História</button>
        <button onClick={() => scrollToSection('local')} style={{ background: 'none', border: 'none', padding: '15px', borderBottom: '1px solid #eee', width: '100%', fontSize: '1.1rem' }}>Local</button>
        <button onClick={() => scrollToSection('programacao')} style={{ background: 'none', border: 'none', padding: '15px', borderBottom: '1px solid #eee', width: '100%', fontSize: '1.1rem' }}>Programação</button>
        <button onClick={() => scrollToSection('dicas')} style={{ background: 'none', border: 'none', padding: '15px', borderBottom: '1px solid #eee', width: '100%', fontSize: '1.1rem' }}>Dicas Úteis</button>
        <Link to="/presentes" onClick={closeMenu} style={{ padding: '15px', fontWeight: 'bold', color: 'var(--color-primary)' }}>Lista de Presentes</Link>
      </div>
    </nav>
  );
};

export default Navbar;
