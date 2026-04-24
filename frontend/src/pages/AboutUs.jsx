import React from "react";
import "../styles/StaticPage.css";

const AboutUs = () => {
  return (
    <div className="static-page">
      <div className="static-container">
        <header className="static-header">
          <h1>Sobre Nosotros</h1>
          <p>Conoce más sobre nuestra pasión por la moda y la calidad</p>
        </header>
        <div className="static-content">
          <h2>Nuestra Historia</h2>
          <p>
            Tienda Virtual Premium nació con la visión de llevar productos de
            alta calidad y las últimas tendencias directamente a la puerta de tu
            casa. Desde el primer día, nos hemos esforzado por seleccionar solo
            lo mejor en moda y tecnología.
          </p>

          <h2>Misión</h2>
          <p>
            Brindar una experiencia de compra en línea segura, rápida y placentera,
            ofreciendo productos exclusivos que reflejen el estilo y la
            personalidad de nuestros clientes.
          </p>

          <h2>Visión</h2>
          <p>
            Convertirnos en la tienda virtual líder del país, reconocida por
            nuestra excelencia en servicio al cliente y por nuestracuraduría
            impecable de productos premium.
          </p>

          <h2>Nuestros Valores</h2>
          <ul>
            <li>Calidad sin compromisos</li>
            <li>Transparencia en cada transacción</li>
            <li>Pasión por la innovación</li>
            <li>Compromiso con la satisfacción del cliente</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
