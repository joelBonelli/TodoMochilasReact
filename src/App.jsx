import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate  } from 'react-router-dom';

// Importa las páginas
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Product from './pages/Product';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Signup from './pages/signup';

import { AuthProvider } from './context/AuthContext';
import RutasProtegidas from './components/RutasProtegidas';
import AdminPanel from './components/AdminPanel';
import AgregarProducto from './components/AgregarProducto';
import AgregarUsuarioAdmin from './components/agregarUsuarioAdmin';
import ProductosTable from './components/ProductosTabla';
import ModificarProducto from './components/ModificarProducto';
import UsuariosTabla from './components/UsuariosTabla';
import ModificarUsuario from './components/ModificarUsuario';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/signup" element={<Signup />} />

{/*rutas protegidas*/}
          <Route path="/admin" element={<RutasProtegidas element={<AdminPanel />} />} />
          <Route path="/productostabla" element={<RutasProtegidas element={<ProductosTable />} />} />
          <Route path="/agregar-producto" element={<RutasProtegidas element={<AgregarProducto />} />} />
          <Route path="/modificar-producto/:id" element={<RutasProtegidas element={<ModificarProducto />} />} />
          <Route path="/agregar-usuario" element={<RutasProtegidas element={<AgregarUsuarioAdmin />} />} />
          <Route path="/usuariostabla" element={<RutasProtegidas element={<UsuariosTabla />} />} />
          <Route path="/modificar-usuario/:id" element={<RutasProtegidas element={<ModificarUsuario />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;