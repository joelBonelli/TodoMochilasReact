import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import fabrica from '../assets/images/fabrica.jpg';

const About = () => {
  return (
    <div>
      <Header />

      <main className="contenedor">
        <h1>CONOCE NUESTRA HISTORIA</h1>

        <div className="empresa-contenido">
          <div className="imagen">
            <img src={fabrica} alt="imagen-empresa" />
          </div>

          <div className="texto-empresa">
            <h2 className="subtitulo">Llevamos 75 años en el rubro</h2>

            <p>
              Desde la decada del 40, especificamente en el año 1948, nos
              sentimos una de las empresas mas iconicas y de mayor movimiento en
              el mercado nacional. Timoteo Amarillo, nuestro fundador y
              presidente hasta el dia de su muerte, hizo ganar la fama a la
              empresa en el rubro de las mochilas al incluir dentro de mercado
              las primeras mochilas con diseño de carrito para los niños de
              nivel inicial en el colegio primario. Asi fue como se ganaria la
              popularidad y el nombre dentro del rubro, posteriormente seriamos
              los primeros en incluir mochilas personalizadas y diseños de
              morrales en tela.
            </p>
          </div>
        </div>
      </main>

      <section>

        <h2 className="subtitulo">Reconocimiento</h2>
        <div className="contenedor">
            <div className="comentarios">

                <div className="tarjeta">
                    <h3>Sergio Aguero</h3>
                    <div className="comentario">
                        <p> La marca me ayudo muchisimo durante mis ultimos años en Argentina con mi hijo, ademas de
                            proposionarme las mochilas a medida y con estanpados personalizados me ofrecieron asesores
                            para los articulos de libreria.</p>

                        <p className="nombre"><svg xmlns="http://www.w3.org/2000/svg"
                                className="nombre-j icon icon-tabler icon-tabler-brand-twitter-filled" width="30"
                                height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M14.058 3.41c-1.807 .767 -2.995 2.453 -3.056 4.38l-.002 .182l-.243 -.023c-2.392 -.269 -4.498 -1.512 -5.944 -3.531a1 1 0 0 0 -1.685 .092l-.097 .186l-.049 .099c-.719 1.485 -1.19 3.29 -1.017 5.203l.03 .273c.283 2.263 1.5 4.215 3.779 5.679l.173 .107l-.081 .043c-1.315 .663 -2.518 .952 -3.827 .9c-1.056 -.04 -1.446 1.372 -.518 1.878c3.598 1.961 7.461 2.566 10.792 1.6c4.06 -1.18 7.152 -4.223 8.335 -8.433l.127 -.495c.238 -.993 .372 -2.006 .401 -3.024l.003 -.332l.393 -.779l.44 -.862l.214 -.434l.118 -.247c.265 -.565 .456 -1.033 .574 -1.43l.014 -.056l.008 -.018c.22 -.593 -.166 -1.358 -.941 -1.358l-.122 .007a.997 .997 0 0 0 -.231 .057l-.086 .038a7.46 7.46 0 0 1 -.88 .36l-.356 .115l-.271 .08l-.772 .214c-1.336 -1.118 -3.144 -1.254 -5.012 -.554l-.211 .084z"
                                    stroke-width="0" fill="currentColor" />
                            </svg>aguerosergiokun
                        </p>
                    </div>
                </div>

                <div className="tarjeta">
                    <h3>Nicolas Cabre</h3>
                    <div className="comentario">
                        <p>Sin duda los mejores, desde el principio hasta el final de la entrega del producto siempre con el mejor trato. Este es el tipo de empresas que a uno le gusta seguir, siempre con la mejor predisposicion y con ganas de hacer el trabajo.</p>

                            <p className="nombre"><svg xmlns="http://www.w3.org/2000/svg"
                                className="nombre-j icon icon-tabler icon-tabler-brand-twitter-filled" width="30"
                                height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M14.058 3.41c-1.807 .767 -2.995 2.453 -3.056 4.38l-.002 .182l-.243 -.023c-2.392 -.269 -4.498 -1.512 -5.944 -3.531a1 1 0 0 0 -1.685 .092l-.097 .186l-.049 .099c-.719 1.485 -1.19 3.29 -1.017 5.203l.03 .273c.283 2.263 1.5 4.215 3.779 5.679l.173 .107l-.081 .043c-1.315 .663 -2.518 .952 -3.827 .9c-1.056 -.04 -1.446 1.372 -.518 1.878c3.598 1.961 7.461 2.566 10.792 1.6c4.06 -1.18 7.152 -4.223 8.335 -8.433l.127 -.495c.238 -.993 .372 -2.006 .401 -3.024l.003 -.332l.393 -.779l.44 -.862l.214 -.434l.118 -.247c.265 -.565 .456 -1.033 .574 -1.43l.014 -.056l.008 -.018c.22 -.593 -.166 -1.358 -.941 -1.358l-.122 .007a.997 .997 0 0 0 -.231 .057l-.086 .038a7.46 7.46 0 0 1 -.88 .36l-.356 .115l-.271 .08l-.772 .214c-1.336 -1.118 -3.144 -1.254 -5.012 -.554l-.211 .084z"
                                    stroke-width="0" fill="currentColor" />
                            </svg>nicocabree
                        </p>
                    </div>
                </div>

                <div className="tarjeta">
                    <h3>Mirtha Legrand</h3>
                    <div className="comentario">
                        <p>Mis nietas y bisnietas quedaron super contentas con los pedidos, quedamos en pedirles mas para la segunda etapa del año. Los materiales que usan y la calidad del estampado no los vi en otro lado. 10/10 !</p>

                            <p className="nombre"><svg xmlns="http://www.w3.org/2000/svg"
                                className="nombre-j icon icon-tabler icon-tabler-brand-twitter-filled" width="30"
                                height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path
                                    d="M14.058 3.41c-1.807 .767 -2.995 2.453 -3.056 4.38l-.002 .182l-.243 -.023c-2.392 -.269 -4.498 -1.512 -5.944 -3.531a1 1 0 0 0 -1.685 .092l-.097 .186l-.049 .099c-.719 1.485 -1.19 3.29 -1.017 5.203l.03 .273c.283 2.263 1.5 4.215 3.779 5.679l.173 .107l-.081 .043c-1.315 .663 -2.518 .952 -3.827 .9c-1.056 -.04 -1.446 1.372 -.518 1.878c3.598 1.961 7.461 2.566 10.792 1.6c4.06 -1.18 7.152 -4.223 8.335 -8.433l.127 -.495c.238 -.993 .372 -2.006 .401 -3.024l.003 -.332l.393 -.779l.44 -.862l.214 -.434l.118 -.247c.265 -.565 .456 -1.033 .574 -1.43l.014 -.056l.008 -.018c.22 -.593 -.166 -1.358 -.941 -1.358l-.122 .007a.997 .997 0 0 0 -.231 .057l-.086 .038a7.46 7.46 0 0 1 -.88 .36l-.356 .115l-.271 .08l-.772 .214c-1.336 -1.118 -3.144 -1.254 -5.012 -.554l-.211 .084z"
                                    stroke-width="0" fill="currentColor" />
                            </svg>mirthalegrand
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </section>

      <Footer />
    </div>
  );
};

export default About;
