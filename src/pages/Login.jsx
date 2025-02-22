import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../LoginForm.css"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";


const LoginForm = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  
useEffect(() => {
  if (user) {
    redirectUser(user);
  }
}, [user]);

const redirectUser = (user) => {
  if (user.nivel_usuario === 3) {
    //navigate("/admin");
    navigate(from, { replace: true });
  } else {
    navigate("/");
  }
}

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    // Llamamos a la función login del contexto, que se encarga de la solicitud
    const data = await login(email, password);
    console.log("desde logins:", data);
    redirectUser(data);
  } catch (error) {
    setErrorMessage(error.message || "Hubo un problema al iniciar sesión");

    // Recargar la página después de 3 segundos
    setTimeout(() => {
      window.location.reload();
    }, 4000); 
  }     
     
};

  return (
    <div>
      <Header />

      <div className="login-container">
        <div className="login-card">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Introduce tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Introduce tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p className="signup-link">
            ¿No tienes una cuenta? <a href="/signup">Regístrate aquí</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginForm;

