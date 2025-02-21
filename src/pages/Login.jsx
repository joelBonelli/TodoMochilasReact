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
    // if (data.nivel_usuario === 3) {
    //   navigate("/admin");
    // } else {
    //   navigate("/");
    // }
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

























// const usuariosGuardados = localStorage.getItem("usuarios");

  // if (!usuariosGuardados) {
  //   // Convertir a JSON y guardar en localStorage
  //   localStorage.setItem("usuarios", JSON.stringify(usuarios));
  // }

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   if (!login(email, password)) {
  //     console.log("Credenciales incorrectas");
  //   } else {
  //     console.log("Credenciales correctas");
  //     console.log(user);
  //     if (user && user.rol === 1) {
  //       navigate("/admin");
  //     } else {
  //       navigate("/");
  //     }
  //   }
  // };

//   const handleLogin = async (e) => {
//     e.preventDefault();
 
//   try {
//     const response = await fetch("http://localhost:8888/usuarios/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify( { email, password}),
//     });

//     if (!response.ok) {
//       console.log("Credenciales incorrectas");
//       return;      
//     }

//     const data = await response.json();
//     login(data);
//     console.log("credenciales correctas");
//     console.log(user);
    
//     if (data.rol === 3) {
//       navigate("/admin");
//     } else {
//       navigate("/");
//     }    
//   } catch (error) {
//     console.error("error al iniciar sesion:", error); 
//   }
// }