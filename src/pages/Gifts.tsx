import { useState, useMemo } from 'react';
import SectionContainer from '../components/SectionContainer';
import GiftCard from '../components/GiftCard';
import { gifts } from '../data/gifts';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import bannerPresentes from '../assets/joaraGabrielPresentes.jpg';
import { GiftCategory } from '../types/gift';

const ITEMS_PER_PAGE = 12;

const CATEGORIES: GiftCategory[] = [
  'Viagens & Experiências',
  'Eletrodomésticos',
  'Casa & Decoração',
  'Cozinha',
  'Diversão & Humor'
];

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Gifts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GiftCategory | null>(null);
  
  // Shuffle gifts once when component mounts (empty dependency array)
  const shuffledGifts = useMemo(() => shuffleArray(gifts), []);

  // Filter gifts based on search and category
  const filteredGifts = useMemo(() => {
    return shuffledGifts.filter(gift => {
      const matchesSearch = searchTerm === '' || 
        gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === null || gift.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [shuffledGifts, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredGifts.length / ITEMS_PER_PAGE);

  const currentGifts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredGifts.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredGifts]);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: GiftCategory | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== null;

  return (
    <div className="gifts-page">
       {/* Hero Banner similar to HeroCouple */}
       <div style={{
         height: '100vh',
         width: '100%',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bannerPresentes}) center 30%/cover no-repeat`,
         textAlign: 'center',
         color: 'white',
         position: 'relative'
       }} className="fade-in">
          <h1 style={{ 
            fontFamily: 'Great Vibes, cursive',
            fontSize: "clamp(2.5rem, 6vw, 4rem)", 
            color: "white", 
            marginBottom: "5px",
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            Lista de Presentes
          </h1>
       </div>

       {/* Description Section */}
       <div data-aos="fade-up" style={{ 
         padding: '50px 20px', 
         textAlign: 'center',
         backgroundColor: '#fff'
       }}>
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

       {/* Filters Section */}
       <div data-aos="fade-up" style={{
         padding: '0 20px 40px',
         maxWidth: '1200px',
         margin: '0 auto'
       }}>
         {/* Search Input */}
         <div style={{
           position: 'relative',
           maxWidth: '400px',
           margin: '0 auto 25px'
         }}>
           <Search 
             size={20} 
             style={{
               position: 'absolute',
               left: '15px',
               top: '50%',
               transform: 'translateY(-50%)',
               color: '#888'
             }}
           />
           <input
             type="text"
             placeholder="Buscar presente..."
             value={searchTerm}
             onChange={(e) => handleSearchChange(e.target.value)}
             style={{
               width: '100%',
               padding: '14px 45px',
               border: '2px solid #e0e0e0',
               borderRadius: '30px',
               fontSize: '1rem',
               outline: 'none',
               transition: 'border-color 0.3s, box-shadow 0.3s',
               backgroundColor: '#fff'
             }}
             onFocus={(e) => {
               e.target.style.borderColor = 'var(--color-wood)';
               e.target.style.boxShadow = '0 0 0 3px rgba(139, 90, 43, 0.1)';
             }}
             onBlur={(e) => {
               e.target.style.borderColor = '#e0e0e0';
               e.target.style.boxShadow = 'none';
             }}
           />
           {searchTerm && (
             <button
               onClick={() => handleSearchChange('')}
               style={{
                 position: 'absolute',
                 right: '15px',
                 top: '50%',
                 transform: 'translateY(-50%)',
                 background: 'none',
                 border: 'none',
                 cursor: 'pointer',
                 color: '#888',
                 padding: '5px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center'
               }}
             >
               <X size={18} />
             </button>
           )}
         </div>

         {/* Category Filters */}
         <div style={{
           display: 'flex',
           flexWrap: 'wrap',
           justifyContent: 'center',
           gap: '10px',
           marginBottom: '20px'
         }}>
           <button
             onClick={() => handleCategoryChange(null)}
             style={{
               padding: '10px 20px',
               border: selectedCategory === null ? 'none' : '2px solid var(--color-wood)',
               borderRadius: '25px',
               backgroundColor: selectedCategory === null ? 'var(--color-wood)' : 'transparent',
               color: selectedCategory === null ? 'white' : 'var(--color-wood)',
               cursor: 'pointer',
               fontSize: '0.9rem',
               fontWeight: '500',
               transition: 'all 0.3s ease'
             }}
           >
             Todos
           </button>
           {CATEGORIES.map(category => (
             <button
               key={category}
               onClick={() => handleCategoryChange(category)}
               style={{
                 padding: '10px 20px',
                 border: selectedCategory === category ? 'none' : '2px solid var(--color-wood)',
                 borderRadius: '25px',
                 backgroundColor: selectedCategory === category ? 'var(--color-wood)' : 'transparent',
                 color: selectedCategory === category ? 'white' : 'var(--color-wood)',
                 cursor: 'pointer',
                 fontSize: '0.9rem',
                 fontWeight: '500',
                 transition: 'all 0.3s ease',
                 whiteSpace: 'nowrap'
               }}
             >
               {category}
             </button>
           ))}
         </div>

         {/* Filter Results Info */}
         <div style={{
           textAlign: 'center',
           color: '#666',
           fontSize: '0.95rem'
         }}>
           {hasActiveFilters ? (
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
               <span>
                 {filteredGifts.length === 0 
                   ? 'Nenhum presente encontrado' 
                   : `${filteredGifts.length} presente${filteredGifts.length !== 1 ? 's' : ''} encontrado${filteredGifts.length !== 1 ? 's' : ''}`
                 }
               </span>
               <button
                 onClick={clearFilters}
                 style={{
                   background: 'none',
                   border: 'none',
                   color: 'var(--color-wood)',
                   cursor: 'pointer',
                   textDecoration: 'underline',
                   fontSize: '0.9rem'
                 }}
               >
                 Limpar filtros
               </button>
             </div>
           ) : (
             <span>{gifts.length} presentes disponíveis</span>
           )}
         </div>
       </div>

      <SectionContainer>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', 
          gap: '30px',
          marginBottom: '60px',
          alignItems: 'stretch'
        }}>
          {currentGifts.map((gift, index) => (
            <div key={gift.id} data-aos="fade-up" data-aos-delay={index * 50} style={{ height: '100%' }}>
              <GiftCard 
                gift={gift} 
              />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div data-aos="fade-up" style={{
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
