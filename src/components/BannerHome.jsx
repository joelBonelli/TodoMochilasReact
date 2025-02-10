import React from 'react';

const BannerHome = () => {
  return (
    <section className="seccion-imagen">
      <div className="overlay">
        <h2 className="titulo-banner">¿Estás buscando la mochila ideal?</h2>
        <p className="subtitulo-banner">Consúltanos por nuestros modelos personalizados y a medida</p>
        <a href="/Contact" className="boton-amarillo">Contáctanos</a>
      </div>
    </section>
  );
};

export default BannerHome;