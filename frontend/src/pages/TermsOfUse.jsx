import React from "react";
import "../styles/StaticPage.css";

const TermsOfUse = () => {
  return (
    <div className="static-page">
      <div className="static-container">
        <header className="static-header">
          <h1>Términos de Uso</h1>
          <p>Condiciones legales y reglas de nuestra tienda</p>
        </header>
        <div className="static-content">
          <h2>1. Introducción</h2>
          <p>
            Al acceder y utilizar este sitio web, usted acepta cumplir con los
            siguientes términos y condiciones. Lea esta información
            detalladamente antes de realizar cualquier compra.
          </p>

          <h2>2. Propiedad Intelectual</h2>
          <p>
            Todo el contenido presente en este sitio, incluyendo textos,
            gráficos, logotipos e imágenes, es propiedad exclusiva de Tienda
            Virtual Premium y está protegido por las leyes de derechos de autor.
          </p>

          <h2>3. Condiciones de Venta</h2>
          <p>
            Nos reservamos el derecho de rechazar o cancelar cualquier pedido por
            razones de inventario, errores en el precio o sospecha de fraude. En
            caso de cancelación, se notificará al cliente de inmediato.
          </p>

          <h2>4. Privacidad de Datos</h2>
          <p>
            Su privacidad es importante para nosotros. Los datos personales
            recolectados se utilizarán únicamente para procesar sus pedidos y
            mejorar su experiencia de compra según nuestra política de
            privacidad.
          </p>

          <h2>5. Modificaciones</h2>
          <p>
            Podemos actualizar estos términos en cualquier momento. El uso
            continuado del sitio tras dichos cambios constituirá su aceptación
            de los nuevos términos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
