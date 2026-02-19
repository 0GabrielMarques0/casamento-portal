import { useState, useMemo } from 'react';
import SectionContainer from '../components/SectionContainer';
import GiftCard from '../components/GiftCard';
import { gifts } from '../data/gifts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const Gifts = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(gifts.length / ITEMS_PER_PAGE);

  const currentGifts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return gifts.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="gifts-page">
       {/* Small Hero / Header Section designed to match Home */}
       <div style={{ 
         padding: '120px 20px 60px', 
         textAlign: 'center',
         backgroundColor: 'rgba(255,255,255,0.5)'
       }} className="fade-in">
          <h3 className="script-font" style={{ 
            fontSize: "3.5rem", 
            color: "var(--color-wood-dark)", 
            marginBottom: "10px" 
          }}>
            Celebre Conosco
          </h3>
          <h2 style={{ 
            fontSize: "2.5rem", 
            marginTop: 0,
            marginBottom: '24px',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Lista de Presentes
          </h2>
          <div style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--color-wood)',
            margin: '0 auto 30px'
          }}></div>
          <p style={{ 
            maxWidth: '700px', 
            margin: '0 auto', 
            color: '#555', 
            lineHeight: '1.8',
            fontSize: '1.1rem'
          }}>
            Sua presença é o nosso maior presente! Mas se quiser nos presentear com algo a mais, 
            criamos esta lista com opções divertidas e experiências para a nossa lua de mel e vida a dois.
          </p>
       </div>

      <SectionContainer>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '30px',
          marginBottom: '60px'
        }}>
          {currentGifts.map(gift => (
            <GiftCard 
              key={gift.id} 
              gift={gift} 
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '60px',
            marginTop: '20px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn-outline"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '8px 16px',
                opacity: currentPage === 1 ? 0.3 : 1,
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                borderColor: 'var(--color-wood-dark)',
                color: 'var(--color-wood-dark)',
                fontSize: '0.9rem'
              }}
            >
              <ChevronLeft size={18} /> <span className="hide-on-mobile">Anterior</span>
            </button>

            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              color: 'var(--color-wood-dark)',
              margin: '0 5px',
              whiteSpace: 'nowrap'
            }}>
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn-outline"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '8px 16px',
                opacity: currentPage === totalPages ? 0.3 : 1,
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                borderColor: 'var(--color-wood-dark)',
                color: 'var(--color-wood-dark)',
                fontSize: '0.9rem'
              }}
            >
              <span className="hide-on-mobile">Próxima</span> <ChevronRight size={18} />
            </button>
          </div>
        )}
      </SectionContainer>
    </div>
  );
};

export default Gifts;
