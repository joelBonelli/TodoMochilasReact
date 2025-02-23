import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado inicial del usuario autenticado
  const [cart, setCart] = useState([]);
  
  let location;
  try {
    location = useLocation();  // Esto fallará si no hay un Router
  } catch (error) {
    location = null;
  }
  
  useEffect(() => {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      console.log("token desde el useEffect", token);
      if (token) {
        const isTokenExpired = checkTokenExpiration(token);
        if (isTokenExpired) {
          alert("Su sesión ha expirado");
          logout();
        } else {
          if (storedUser) {
            setUser(storedUser);
          }
          if (storedCart){
            setCart(storedCart);
        }
      }
    }}, [location]);

    const checkTokenExpiration = (token) => {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
      } catch (error) {
        console.error("Error al decodificar el token", error);
        return true;        
      }
    }



    const login = async (email, password) => {      
          try {
            console.log(email, password)
            const response = await fetch("http://localhost:8888/usuarios/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify( { email, password }),
              //credentials: "include",
            });
    
            if (response.ok) {
              console.log("entre acá")
              const data = await response.json();
              localStorage.setItem("user", JSON.stringify(data.user));
              localStorage.setItem("token", data.token);
              setUser(data.user);
              console.log("data Token: ", data.token);
              console.log("data User: ", data.user);
              return data;
            } else {
              const errorData = await response.json();
              throw new Error(errorData.message || "Error Desconocido");
            }
          } catch (error) {
            console.error("Error al iniciar sesión desde funcion login", error);
            throw error;
          }
        };

     //Función para cerrar sesión
     const logout = async () => {
      localStorage.removeItem("user"); 
      localStorage.removeItem("cart");
      localStorage.removeItem("token");
      setUser(null); // Limpia el estado del usuario
      setCart([]);
   };

   // Funcion para agregar un item al carrito
  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Funcion para eliminar un item del carrito
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id_mochila !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
