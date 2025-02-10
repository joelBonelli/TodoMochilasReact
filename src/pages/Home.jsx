import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IconosConocenos from "../components/IconosConocenos";
import BannerHome from "../components/BannerHome";
import MasVendidos from "../components/MasVendidos";

const Home = () => {  

  return (
    <div>
      <Header />

      <main>
        <h1 className="titulo">Somos TodoMochilas</h1>
        <IconosConocenos />
      </main>

      <BannerHome />
      <MasVendidos />


      <Footer />
    </div>
  );
};

export default Home;
