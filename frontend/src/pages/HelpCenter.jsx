import React from "react";
import "../styles/StaticPage.css";

const HelpCenter = () => {
  return (
    <div className="static-page">
      <div className="static-container">
        <header className="static-header">
          <h1>Centro de Ayuda</h1>
          <p>Encuentra respuestas a tus dudas más comunes</p>
        </header>
        <div className="static-content">
          <h2>Preguntas Frecuentes</h2>
          <p>
            Bienvenido a nuestro centro de soporte. Aquí puedes encontrar
            información detallada sobre cómo comprar, rastrear tus pedidos y
            más.
          </p>

          <h2>¿Cómo realizo un pedido?</h2>
          <p>
            Realizar un pedido es muy sencillo: navega por nuestras categorías,
            selecciona tus productos favoritos, elige la talla/color y haz clic
            en "Agregar al carrito". Luego, ve a tu carrito y sigue los pasos
            para completar la compra.
          </p>

          <h2>¿Cuáles son los métodos de pago?</h2>
          <p>
            Aceptamos tarjetas de crédito Visa y Mastercard, transferencias
            bancarias vía PSE y pagos directos con PayPal. Todos nuestros pagos
            están encriptados y son 100% seguros.
          </p>

          <h2>¿Cómo rastreó mi pedido?</h2>
          <p>
            Una vez que tu pedido sea despachado, recibirás un correo electrónico
            con un número de guía. Puedes usar este número en nuestra sección de
            rastreo o directamente en el sitio web de la transportadora.
          </p>

          <h2>Contacto de Soporte</h2>
          <p>
            Si no encuentras la respuesta que buscas, no dudes en contactar a
            nuestro equipo de soporte a través de:
          </p>
          <ul>
            <li>Email: soporte@tiendavirtual.com</li>
            <li>Teléfono: +57 300 123 4567</li>
            <li>WhatsApp: Disponible en el icono inferior</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
