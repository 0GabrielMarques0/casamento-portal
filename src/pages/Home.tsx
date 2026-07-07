import { Link } from "react-router-dom";
import HeroCouple from "../components/HeroCouple";
import { Calendar, Wine, Star, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

import img2 from "../assets/carrousel/carousel-2.jpeg";
import img3 from "../assets/carrousel/carousel-3.jpeg";
import img4 from "../assets/carrousel/carousel-4.jpeg";
import img5 from "../assets/carrousel/carousel-5.jpeg";
import img7 from "../assets/carrousel/carousel-7.jpeg";
import img9 from "../assets/carrousel/carousel-9.jpeg";
import img10 from "../assets/carrousel/carousel-10.jpeg";
import img11 from "../assets/carrousel/carousel-11.jpg";
import img12 from "../assets/carrousel/carousel-12.jpg";
import img13 from "../assets/carrousel/carousel-13.jpg";


import belemImg from "../assets/belem-de-maria.png";
import joaraGabrielImg from "../assets/joaraGabriel.jpg";

const carouselImages = [img5, img11, img3, img9, img7, img13, img2, img10, img4, img12];

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
        <div data-aos="fade-right">
          <img
            src={joaraGabrielImg}
            alt="Joara e Gabriel"
            className="img-elegant"
          />
        </div>
        <div data-aos="fade-left" data-aos-delay="200" style={{ paddingLeft: "20px" }}>
          <h2 style={{ fontSize: "2.5rem", lineHeight: 1.2 }}>
            Junte-se a nós nesta jornada de amor, alegria e felicidade eterna.
          </h2>
          <p style={{ marginTop: "20px", color: "#666" }}>
            De um encontro casual a uma vida inteira juntos, queremos convidar
            você a fazer parte de um novo capítulo que começa no dia 21/11/2026.
            Nossa história teve início no final de 2021. A partir dali, o que
            antes eram caminhos separados se transformou em um só. Sonhos foram
            compartilhados, metas para o futuro foram traçadas e decisões
            importantes — inclusive transições de carreira — foram vividas lado
            a lado, sempre com apoio, parceria e muito amor. Rimos das
            conquistas, nos fortalecemos nos desafios e aprendemos que até nos
            momentos difíceis, quando as lágrimas apareceram, estar juntos fez
            toda a diferença. Construímos novas amizades, fortalecemos laços
            antigos e, pouco a pouco, o eu se transformou em nós. Agora, com o
            coração cheio de gratidão e alegria, queremos celebrar o nosso SIM e
            dar início a uma nova etapa da nossa história. E nada fará mais
            sentido do que viver esse momento ao lado de pessoas tão especiais
            como você.
          </p>
        </div>
      </div>

      {/* Location Section */}
      <div id="local" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="container section-split">
          <div data-aos="fade-left" style={{ order: 2 }}>
            {" "}
            {/* Image on right for desktop */}
            <img
              src={belemImg}
              alt="Sítio Izabel de Bola"
              className="img-elegant"
            />
          </div>
          <div data-aos="fade-right" data-aos-delay="200" style={{ order: 1 }}>
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
              Entre na beleza atemporal do Sítio Izabel de Bola. Tendo como plano
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
            data-aos="fade-down"
            style={{
              fontSize: "3rem",
              marginBottom: "60px",
              marginTop: "20px",
              fontFamily: "var(--font-serif)",
            }}
          >
            Nossa Programação
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
              gap: "40px",
            }}
          >
            <div data-aos="fade-up">
              <MapPin
                size={48}
                color="var(--color-primary)"
                style={{ marginBottom: "20px" }}
              />
              <h3 style={{ color: "white" }}>15:30</h3>
              <p style={{ color: "#ccc" }}>Chegada</p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#aaa",
                  maxWidth: "200px",
                  margin: "0 auto",
                }}
              >
                Recepção dos convidados no Sítio Izabel de Bola.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="100">
              <Calendar
                size={48}
                color="var(--color-primary)"
                style={{ marginBottom: "20px" }}
              />
              <h3 style={{ color: "white" }}>16:00</h3>
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

            <div data-aos="fade-up" data-aos-delay="200">
              <Wine
                size={48}
                color="var(--color-primary)"
                style={{ marginBottom: "20px" }}
              />
              <h3 style={{ color: "white" }}>17:00</h3>
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

            <div data-aos="fade-up" data-aos-delay="300">
              <Star
                size={48}
                color="var(--color-primary)"
                style={{ marginBottom: "20px" }}
              />
              <h3 style={{ color: "white" }}>19:00</h3>
              <p style={{ color: "#ccc" }}>Jantar</p>
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

          <div style={{ marginTop: "60px" }}>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd7AhhM8afdeHGJbtx-a1VUebi6erSN-kFXuqdwYq1f8VxiEA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                borderColor: "#fff",
                color: "#fff",
                padding: "15px 40px",
                fontSize: "1rem",
                textDecoration: "none",
                fontWeight: "bold",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                display: "inline-block",
                borderRadius: "50px",
                borderWidth: "1px",
                borderStyle: "solid",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-primary)";
                e.currentTarget.style.borderColor = "var(--color-primary)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "#fff";
              }}
            >
              Confirmar Presença
            </a>
          </div>
        </div>
      </div>

      {/* Useful Info Section */}
      <div id="dicas" className="container section-split">
        <div data-aos="zoom-in" className="carousel-wrapper">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            cardsEffect={{
              perSlideOffset: 8,
              perSlideRotate: 2,
              rotate: true,
              slideShadows: true,
            }}
            className="mySwiper"
            style={{ width: "100%", aspectRatio: "3/4", overflow: "visible" }}
          >
            {carouselImages.map((img, index) => (
              <SwiperSlide key={index} style={{ borderRadius: "10px" }}>
                <img
                  src={img}
                  alt={`Foto do Casal ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div data-aos="fade-left" data-aos-delay="200" style={{ paddingLeft: "20px" }}>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948!2d-35.5974!3d-8.6275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7aa01266cc9915f%3A0xf1d0c549a6b68e1b!2sS%C3%ADtio%20Izabel%20de%20Bola!5e0!3m2!1spt-BR!2sbr"
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
          data-aos="fade-up"
          style={{
            fontSize: "2.5rem",
            color: "white",
            fontFamily: "var(--font-serif)",
          }}
        >
          Comece a Contagem Regressiva
        </h2>

        <div className="countdown-container" data-aos="zoom-in" data-aos-delay="200">
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
