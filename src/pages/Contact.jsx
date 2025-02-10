import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div>
      <Header />
      <main className="contenedor">
        <h2 className="subtitulo">Contacto</h2>

        <form method="POST" action="#" className="formulario">
          <fieldset>
            <legend>Información de contacto</legend>

            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" placeholder="Ingrese su nombre" />

            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              placeholder="Ingrese su apellido"
            />

            <label htmlFor="telefono">Teléfono</label>
            <input
              type="number"
              id="telefono"
              placeholder="Número de contacto"
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Correo electrónico de contacto"
            />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje"></textarea>
          </fieldset>

          <fieldset className="sublimado">
            <legend>Sublimados</legend>

            <label htmlFor="mochila">Talle de mochila</label>
            <select name="mochila" id="mochila">
              <option value="S">Talle S</option>
              <option value="M">Talle M</option>
              <option value="L">Talle L</option>
              <option value="XL">Talle XL</option>
            </select>

            <label htmlFor="foto">Foto</label>
            <p>Cargue el archivo para sublimado</p>
            <input type="file" name="foto" id="foto" />

            <p>En caso de que la imagen enviada no se pueda cargar</p>

            <div className="similitud">
              <label htmlFor="igual">Adaptarla</label>
              <input type="radio" name="similitud" value="adaptar" id="igual" />

              <label htmlFor="buscar">Buscar otra</label>
              <input type="radio" name="similitud" value="buscar" id="buscar" />
            </div>
          </fieldset>

          <input type="submit" className="boton-amarillo" value="ENVIAR" />
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;