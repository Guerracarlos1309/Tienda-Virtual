import React from "react";
import "../styles/StaticPage.css";

const ShippingPolicy = () => {
  return (
    <div className="static-page">
      <div className="static-container">
        <header className="static-header">
          <h1>Política de Envío</h1>
          <p>Información sobre entregas, costos y devoluciones</p>
        </header>
        <div className="static-content">
          <h2>Tiempos de Entrega</h2>
          <p>
            Procesamos los pedidos en un plazo de 24 horas hábiles. Los tiempos
            de entrega estándar son:
          </p>
          <ul>
            <li>Ciudades principales: 2 a 4 días hábiles.</li>
            <li>Ciudades secundarias: 4 a 7 días hábiles.</li>
            <li>Zonas rurales: 7 a 12 días hábiles.</li>
          </ul>

          <h2>Costos de Envío</h2>
          <p>
            El costo del envío se calcula al finalizar la compra según el peso y
            destino. Ofrecemos **Envío Gratis** en compras superiores a $150.000
            COP.
          </p>

          <h2>Política de Devoluciones</h2>
          <p>
            Si no estás satisfecho con tu compra, tienes hasta 30 días calendario
            para solicitar un cambio o devolución. El producto debe estar en su
            empaque original y sin señales de uso.
          </p>

          <h2>Reembolsos</h2>
          <p>
            Los reembolsos se procesan una vez que hayamos recibido y verificado
            el estado del producto devuelto. El dinero se verá reflejado en su
            cuenta en un plazo de 5 a 10 días hábiles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
