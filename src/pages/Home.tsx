import { Link } from "react-router-dom";
import HeroCouple from "../components/HeroCouple";
import { Calendar, Wine, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

import img1 from '../assets/carrousel/carousel-1.jpeg';
import img2 from '../assets/carrousel/carousel-2.jpeg';
import img3 from '../assets/carrousel/carousel-3.jpeg';
import img4 from '../assets/carrousel/carousel-4.jpeg';
import img5 from '../assets/carrousel/carousel-5.jpeg';
import img7 from '../assets/carrousel/carousel-7.jpeg';
import img8 from '../assets/carrousel/carousel-8.jpeg';
import img9 from '../assets/carrousel/carousel-9.jpeg';
import img10 from '../assets/carrousel/carousel-10.jpeg';

import belemImg from '../assets/belem-de-maria.png';

const carouselImages = [img1, img2, img3, img4, img5, img7, img8, img9, img10];

const Home = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-11-21T16:30:00");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <HeroCouple />

      {/* Introduction Section */}
      <div id="historia" className="container section-split">
        <div className="fade-in">
          <img
            src="https://images.unsplash.com/photo-1623162432854-3407954932fa?q=80&w=1974&auto=format&fit=crop"
            alt="Joara e Gabriel"
            className="img-elegant"
          />
        </div>
        <div className="fade-in" style={{ paddingLeft: "20px" }}>
          <h2 style={{ fontSize: "2.5rem", lineHeight: 1.2 }}>
            Junte-se a nós nesta jornada de amor, alegria e felicidade eterna.
          </h2>
          <p style={{ marginTop: "20px", color: "#666" }}>
            De um encontro casual a uma vida inteira juntos, descubra os
            capítulos que nos trouxeram até aqui. Nossa jornada é uma tapeçaria
            tecida com sorrisos, lágrimas e inúmeros momentos que nos levaram a
            esta linda celebração de amor.
          </p>
        </div>
      </div>

      {/* Location Section */}
      <div id="local" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="container section-split">
          <div className="fade-in" style={{ order: 2 }}>
            {" "}
            {/* Image on right for desktop */}
            <img
              src={belemImg}
              alt="Sítio Izabel de Bola"
              className="img-elegant"
            />
          </div>
          <div className="fade-in" style={{ order: 1 }}>
            <h3
              className="script-font"
              style={{
                fontSize: "3rem",
                color: "var(--color-wood-dark)",
                marginBottom: "10px",
              }}
            >
              No Coração de
            </h3>
            <h2 style={{ fontSize: "2.5rem", marginTop: 0 }}>Belém de Maria</h2>
            <p style={{ color: "#666" }}>
              Entre na beleza atemporal do Sítio Izabel de Bola. Tendo como pano
              de fundo colinas ondulantes e uma natureza exuberante, nossa
              celebração se desenrola em um cenário de encanto rústico.
            </p>
            <p style={{ color: "#666", marginTop: "10px" }}>
              Cercado por árvores perfumadas e banhado pelo brilho quente do sol
              pernambucano, este cenário pitoresco exala romance e charme a cada
              curva.
            </p>
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div id="programacao" className="section-dark">
        <div className="container">
          <h2
            style={{
              fontSize: "3rem",
              marginBottom: "60px",
              fontFamily: "var(--font-serif)",
            }}
          >
            Nossa Programação
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "40px",
            }}
          >
            <div className="fade-in">
              <Calendar
                size={48}
                color="var(--color-primary)"
                style={{ marginBottom: "20px" }}
              />
              <h3 style={{ color: "white" }}>16:30</h3>
              <p style={{ color: "#ccc" }}>Cerimônia</p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#aaa",
                  maxWidth: "200px",
                  margin: "0 auto",
                }}
              >
                Troca de votos no jardim cercado pela beleza da natureza.
              </p>
            </div>

            <div className="fade-in">
              <Wine
                size={48}
                color="var(--color-primary)"
                style={{ marginBottom: "20px" }}
              />
              <h3 style={{ color: "white" }}>17:30</h3>
              <p style={{ color: "#ccc" }}>Cocktail</p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#aaa",
                  maxWidth: "200px",
                  margin: "0 auto",
                }}
              >
                Aproveite e saboreie em meio a risadas e alegria enquanto
                celebramos o início de um novo capítulo.
              </p>
            </div>

            <div className="fade-in">
              <Star
                size={48}
                color="var(--color-primary)"
                style={{ marginBottom: "20px" }}
              />
              <h3 style={{ color: "white" }}>19:00</h3>
              <p style={{ color: "#ccc" }}>Festa</p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#aaa",
                  maxWidth: "200px",
                  margin: "0 auto",
                }}
              >
                Deleite-se num banquete suntuoso sob as estrelas, seguido de uma
                noite de dança e alegria.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Useful Info Section */}
      <div id="dicas" className="container section-split">
        <div className="fade-in carousel-wrapper">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="mySwiper"
            style={{ width: '100%', aspectRatio: '3/4' }}
          >
            {carouselImages.map((img, index) => (
              <SwiperSlide key={index} style={{ borderRadius: '10px' }}>
                <img
                  src={img}
                  alt={`Foto do Casal ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="fade-in" style={{ paddingLeft: "20px" }}>
          <h2 style={{ fontSize: "2.5rem" }}>
            Informações{" "}
            <span
              className="script-font"
              style={{ color: "var(--color-wood-dark)" }}
            >
              Úteis
            </span>
          </h2>

          <div style={{ marginTop: "40px" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Lista de Presentes
            </h3>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Sua presença é o maior presente de todos. No entanto, para aqueles
              que desejam nos honrar com um sinal de amor, você pode encontrar
              nossa lista{" "}
              <Link to="/presentes" style={{ textDecoration: "underline" }}>
                aqui
              </Link>
              .
            </p>

            <h3
              style={{
                fontSize: "1.2rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Hospedagem
            </h3>
            <p style={{ color: "#666", marginBottom: "10px" }}>
              Para sua comodidade, sugerimos a{" "}
              <strong>Pousada Beira Rio</strong> em Belém de Maria. Entre em
              contato antecipadamente para fazer sua reserva:
            </p>
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <a
                href="https://wa.me/5581994926342"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-primary)", fontWeight: "bold" }}
              >
                📱 (81) 99492-6342
              </a>
              <a
                href="https://wa.me/5581991427305"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-primary)", fontWeight: "bold" }}
              >
                📱 (81) 99142-7305
              </a>
            </div>

            <h3
              style={{
                fontSize: "1.2rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Localização
            </h3>
            <div
              style={{
                height: "200px",
                marginTop: "10px",
                marginBottom: "10px",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3948.336647982245!2d-35.84814492419403!3d-8.594569091450655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMzUnNDAuNSJTIDM1wrA1MCc0NC4xIlc!5e0!3m2!1spt-BR!2sbr!4v1708284000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Footer */}
      <div
        style={{
          backgroundColor: "var(--color-text)",
          color: "white",
          padding: "30px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            color: "white",
            fontFamily: "var(--font-serif)",
          }}
        >
          Comece a Contagem Regressiva
        </h2>

        <div className="countdown-container">
          <div className="countdown-item">
            <span className="countdown-number">{timeLeft.days}</span>
            <span className="countdown-label">Dias</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{timeLeft.hours}</span>
            <span className="countdown-label">Horas</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{timeLeft.minutes}</span>
            <span className="countdown-label">Minutos</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{timeLeft.seconds}</span>
            <span className="countdown-label">Segundos</span>
          </div>
        </div>

        <div style={{ marginTop: "60px", opacity: 0.5, fontSize: "0.8rem" }}>
          <p>© {new Date().getFullYear()} Joara & Gabriel. Feito com amor.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
