import React, { useState } from "react";
import { Gift } from "../types/gift";
import { redirectToCheckout } from "../services/payment";

interface GiftCardProps {
  gift: Gift;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift }) => {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleContribute = () => {
    if (!gift.paymentLink) return;

    setLoading(true);
    setErrorStatus(null);

    // UX: Loading visual de 1 segundo
    setTimeout(() => {
      try {
        redirectToCheckout(gift.paymentLink!);
        // Se o redirect ocorrer, não precisamos parar o loading, pois a página vai mudar.
        // Mas caso falhe síncrono (validação de URL), o catch pega.
      } catch (err) {
        setLoading(false);
        setErrorStatus("Link inválido");
      }
    }, 1000);
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
        {errorStatus && (
          <div
            style={{
              color: "#E57373",
              fontSize: "0.85rem",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            {errorStatus}
          </div>
        )}

        <button
          onClick={handleContribute}
          disabled={!gift.paymentLink || loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: !gift.paymentLink ? "#E0E0E0" : "#8AB6D6",
            color: !gift.paymentLink ? "#9E9E9E" : "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: !gift.paymentLink || loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s",
            opacity: loading ? 0.8 : 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "48px",
          }}
          onMouseEnter={(e) => {
            if (gift.paymentLink && !loading)
              e.currentTarget.style.backgroundColor = "#7AA8C8";
          }}
          onMouseLeave={(e) => {
            if (gift.paymentLink && !loading)
              e.currentTarget.style.backgroundColor = "#8AB6D6";
          }}
        >
          {loading ? "Redirecionando..." : "Contribuir"}
        </button>
      </div>
    </div>
  );
};

export default GiftCard;
