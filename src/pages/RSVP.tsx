import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import SectionContainer from '../components/SectionContainer';
import { CheckCircle, Send, Heart, Users, Baby, MessageCircle, User } from 'lucide-react';
import capelaAquarela from '../assets/capelaAquarela.png';

interface RSVPFormData {
  nomeCompleto: string;
  iraAoEvento: 'sim' | 'nao' | '';
  quantidadeAdultos: '1' | '2' | '';
  nomeAcompanhante: string;
  quantidadeCriancas: '0' | '1' | '2' | '3' | '';
  mensagem: string;
}

const RSVP = () => {
  const [formData, setFormData] = useState<RSVPFormData>({
    nomeCompleto: '',
    iraAoEvento: '',
    quantidadeAdultos: '',
    nomeAcompanhante: '',
    quantidadeCriancas: '',
    mensagem: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validação
    if (!formData.nomeCompleto.trim()) {
      setError('Por favor, informe seu nome completo.');
      return;
    }
    if (!formData.iraAoEvento) {
      setError('Por favor, informe se você irá ao evento.');
      return;
    }
    if (formData.iraAoEvento === 'sim' && !formData.quantidadeAdultos) {
      setError('Por favor, informe a quantidade de adultos.');
      return;
    }
    if (formData.iraAoEvento === 'sim' && !formData.quantidadeCriancas) {
      setError('Por favor, informe a quantidade de crianças.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          dataEnvio: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar confirmação');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError('Ocorreu um erro ao enviar sua confirmação. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    fontFamily: 'var(--font-sans)',
    backgroundColor: '#fff',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 600,
    color: 'var(--color-text)',
    fontSize: '0.95rem'
  };

  const radioGroupStyle = {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap' as const,
    marginTop: '8px'
  };

  const radioLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '10px 20px',
    border: '1px solid #e0e0e0',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff'
  };

  const radioLabelSelectedStyle = {
    ...radioLabelStyle,
    borderColor: 'var(--color-primary)',
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-text)'
  };

  const fieldGroupStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    borderLeft: '4px solid var(--color-primary)'
  };

  if (isSubmitted) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '80vh',
        padding: '20px'
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
            <CheckCircle size={80} color="#48C774" style={{ marginBottom: '20px' }} />
            <h2 style={{ color: '#48C774', marginBottom: '16px' }}>
              Presença Confirmada!
            </h2>
            <p style={{ color: '#666', lineHeight: 1.7 }}>
              {formData.iraAoEvento === 'sim' 
                ? 'Muito obrigado por confirmar sua presença! Estamos ansiosos para celebrar este momento especial com você.'
                : 'Obrigado por nos informar. Sentiremos sua falta, mas esperamos vê-lo em breve!'}
            </p>
            
            <div style={{ marginTop: '40px' }}>
              <Link to="/" style={{ 
                padding: '14px 32px', 
                backgroundColor: 'var(--color-primary)', 
                color: 'white', 
                borderRadius: '30px',
                fontWeight: 'bold',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease'
              }}>
                Voltar ao Início
              </Link>
            </div>
          </div>
        </SectionContainer>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      paddingTop: '100px',
      paddingBottom: '60px',
      backgroundColor: '#f5f7fa'
    }}>
      <SectionContainer>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          maxWidth: '700px',
          margin: '0 auto 40px'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
            marginBottom: '8px',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-serif)'
          }}>
            Confirmação de Presença
          </h1>
          <h2 style={{ 
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', 
            fontWeight: 400,
            color: 'var(--color-wood-dark)',
            marginBottom: '16px',
            fontFamily: 'var(--font-serif)'
          }}>
            Casamento de Joara e Gabriel - 21/11/2026
          </h2>
          <p style={{ 
            color: '#666',
            fontSize: '1rem',
            lineHeight: 1.6
          }}>
            Estamos muito felizes por compartilhar este dia com vocês! Por favor, confirme a sua presença até o dia <strong style={{ color: 'var(--color-wood-dark)' }}>02 de Novembro de 2026</strong>.
          </p>
          <p style={{ 
            color: '#c94c4c',
            fontSize: '0.9rem',
            marginTop: '12px'
          }}>
            * Indica uma pergunta obrigatória
          </p>
        </div>

        {/* Image */}
        <div style={{
          maxWidth: '500px',
          margin: '0 auto 40px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <img 
            src={capelaAquarela} 
            alt="Capela Santa Izabel" 
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ 
          maxWidth: '600px', 
          margin: '0 auto' 
        }}>
          {/* Nome Completo */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>
              <User size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
              Nome Completo <span style={{ color: '#c94c4c' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.nomeCompleto}
              onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
              placeholder="Sua resposta"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(138, 182, 214, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Irá ao Evento */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>
              <Heart size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
              Você irá ao evento? <span style={{ color: '#c94c4c' }}>*</span>
            </label>
            <div style={radioGroupStyle}>
              <label style={formData.iraAoEvento === 'sim' ? radioLabelSelectedStyle : radioLabelStyle}>
                <input
                  type="radio"
                  name="iraAoEvento"
                  value="sim"
                  checked={formData.iraAoEvento === 'sim'}
                  onChange={(e) => setFormData({ ...formData, iraAoEvento: e.target.value as 'sim' | 'nao' })}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                Sim
              </label>
              <label style={formData.iraAoEvento === 'nao' ? radioLabelSelectedStyle : radioLabelStyle}>
                <input
                  type="radio"
                  name="iraAoEvento"
                  value="nao"
                  checked={formData.iraAoEvento === 'nao'}
                  onChange={(e) => setFormData({ ...formData, iraAoEvento: e.target.value as 'sim' | 'nao' })}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                Não
              </label>
            </div>
          </div>

          {/* Campos que aparecem apenas se "Sim" for selecionado */}
          {formData.iraAoEvento === 'sim' && (
            <>
              {/* Quantidade de Adultos */}
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>
                  <Users size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                  Quantidade de adultos (incluindo você) <span style={{ color: '#c94c4c' }}>*</span>
                </label>
                <div style={radioGroupStyle}>
                  {['1', '2'].map((num) => (
                    <label 
                      key={num}
                      style={formData.quantidadeAdultos === num ? radioLabelSelectedStyle : radioLabelStyle}
                    >
                      <input
                        type="radio"
                        name="quantidadeAdultos"
                        value={num}
                        checked={formData.quantidadeAdultos === num}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          quantidadeAdultos: e.target.value as '1' | '2',
                          nomeAcompanhante: e.target.value === '1' ? '' : formData.nomeAcompanhante
                        })}
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      {num}
                    </label>
                  ))}
                </div>
              </div>

              {/* Nome do Acompanhante - aparece apenas se quantidade = 2 */}
              {formData.quantidadeAdultos === '2' && (
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>
                    <User size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                    Nome completo do acompanhante
                  </label>
                  <input
                    type="text"
                    value={formData.nomeAcompanhante}
                    onChange={(e) => setFormData({ ...formData, nomeAcompanhante: e.target.value })}
                    placeholder="Sua resposta"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--color-primary)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(138, 182, 214, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e0e0e0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              )}

              {/* Quantidade de Crianças */}
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>
                  <Baby size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                  Quantidade de crianças <span style={{ color: '#c94c4c' }}>*</span>
                </label>
                <div style={radioGroupStyle}>
                  {['0', '1', '2', '3'].map((num) => (
                    <label 
                      key={num}
                      style={formData.quantidadeCriancas === num ? radioLabelSelectedStyle : radioLabelStyle}
                    >
                      <input
                        type="radio"
                        name="quantidadeCriancas"
                        value={num}
                        checked={formData.quantidadeCriancas === num}
                        onChange={(e) => setFormData({ ...formData, quantidadeCriancas: e.target.value as '0' | '1' | '2' | '3' })}
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      {num}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Mensagem para os Noivos */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>
              <MessageCircle size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
              Deixe uma mensagem para os noivos:
            </label>
            <textarea
              value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
              placeholder="Sua resposta"
              rows={4}
              style={{
                ...inputStyle,
                resize: 'vertical',
                minHeight: '100px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(138, 182, 214, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              color: '#c94c4c',
              padding: '14px 20px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div style={{ 
            display: 'flex', 
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '14px 40px',
                backgroundColor: isSubmitting ? '#ccc' : 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(138, 182, 214, 0.3)'
              }}
            >
              <Send size={18} />
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>

            <button
              type="button"
              onClick={() => setFormData({
                nomeCompleto: '',
                iraAoEvento: '',
                quantidadeAdultos: '',
                nomeAcompanhante: '',
                quantidadeCriancas: '',
                mensagem: ''
              })}
              style={{
                padding: '14px 24px',
                backgroundColor: 'transparent',
                color: 'var(--color-primary)',
                border: 'none',
                fontSize: '0.95rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Limpar formulário
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          color: '#999',
          fontSize: '0.85rem'
        }}>
          <p>Este formulário é seguro e suas informações serão tratadas com carinho 💕</p>
        </div>
      </SectionContainer>
    </div>
  );
};

export default RSVP;
