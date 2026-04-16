import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface BackgroundMusicProps {
  // URL da música (pode ser link direto para MP3, etc.)
  musicUrl: string;
}

const BackgroundMusic = ({ musicUrl }: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.08;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.log('Erro ao reproduzir áudio:', err);
      });
    }
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={togglePlay}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '55px',
          height: '55px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-wood)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          transition: 'transform 0.3s, background-color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = 'var(--color-wood-dark)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = 'var(--color-wood)';
        }}
        title={isPlaying ? 'Pausar música' : 'Tocar música'}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Tooltip inicial */}
      {!hasInteracted && (
        <div
          style={{
            position: 'fixed',
            bottom: '85px',
            right: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            zIndex: 1000,
            maxWidth: '180px',
            textAlign: 'center',
            animation: 'fadeInUp 0.5s ease-out',
          }}
        >
          🎵 Clique para tocar a música de fundo
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              right: '25px',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid rgba(0, 0, 0, 0.8)',
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default BackgroundMusic;
