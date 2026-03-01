import React, { useState } from "react";
import { Gift } from "../types/gift";

interface GiftCardProps {
  gift: Gift;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift }) => {
  const [loading, setLoading] = useState(false);

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
        border: "1px solid rgba(138, 182, 214, 0.3)",
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(138, 182, 214, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s, box-shadow 0.2s",
        height: "100%",
        minHeight: "280px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(138, 182, 214, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(138, 182, 214, 0.1)";
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h3
          style={{
            fontSize: "1.4rem",
            marginTop: 0,
            marginBottom: "10px",
            color: "#5D8AA8",
          }}
        >
          {gift.name}
        </h3>
        <p
          style={{
            fontSize: "0.95rem",
            color: "#666",
            lineHeight: "1.5",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          {gift.description}
        </p>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#8AB6D6",
            marginBottom: "20px",
          }}
        >
          {formatCurrency(gift.price)}
        </div>
      </div>

      <div>
        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#B8D4E8" : "#8AB6D6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: loading ? "wait" : "pointer",
            transition: "background-color 0.3s",
            height: "48px",
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
