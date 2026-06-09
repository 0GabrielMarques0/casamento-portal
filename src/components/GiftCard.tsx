import React, { useState } from "react";
import { Gift } from "../types/gift";

interface GiftCardProps {
  gift: Gift;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift }) => {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ giftId: gift.id }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.open(data.checkoutUrl, '_blank');
      } else {
        console.error('Error:', data.error);
        alert('Erro ao processar pagamento. Tente novamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="gift-card"
      style={{
        border: "1px solid rgba(138, 182, 214, 0.2)",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: isHovered 
          ? "0 20px 40px rgba(0, 0, 0, 0.12)" 
          : "0 4px 16px rgba(138, 182, 214, 0.15)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        height: "100%",
        minHeight: "460px",
        overflow: "hidden",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem no topo com design aprimorado */}
      {gift.image && (
        <div
          style={{
            width: "100%",
            height: "220px",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#f0f7fb",
              overflow: "hidden",
            }}
          >
            <img
              src={gift.image}
              alt={gift.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                transition: "transform 0.4s ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                display: "block",
              }}
              loading="lazy"
            />
          </div>
          {/* Gradiente sutil para transição suave */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60px",
              background: "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>
      )}

      {/* Conteúdo do card */}
      <div style={{ 
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}>
        <h3
          style={{
            fontSize: "1.2rem",
            marginTop: 0,
            marginBottom: "8px",
            color: "#5D8AA8",
            lineHeight: "1.3",
          }}
        >
          {gift.name}
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#666",
            lineHeight: "1.5",
            marginTop: "0",
            marginBottom: "16px",
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {gift.description}
        </p>
        <div
          style={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#8AB6D6",
            marginBottom: "16px",
          }}
        >
          {formatCurrency(gift.price)}
        </div>
      </div>

      <div style={{ padding: "0 20px 20px 20px" }}>
        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: loading ? "#B8D4E8" : "#8AB6D6",
            color: "white",
            border: "none",
            borderRadius: "25px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: loading ? "wait" : "pointer",
            transition: "all 0.3s ease",
            height: "50px",
            boxShadow: isHovered ? "0 4px 12px rgba(138, 182, 214, 0.4)" : "none",
          }}
          onMouseEnter={(e) => {
            if (!loading)
              e.currentTarget.style.backgroundColor = "#7AA8C8";
          }}
          onMouseLeave={(e) => {
            if (!loading)
              e.currentTarget.style.backgroundColor = "#8AB6D6";
          }}
        >
          {loading ? "Processando..." : "Contribuir"}
        </button>
      </div>
    </div>
  );
};

export default GiftCard;
