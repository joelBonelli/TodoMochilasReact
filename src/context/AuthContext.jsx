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
            const response = await fetch("http://localhost:8888/usuarios/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify( { email, password }),
              //credentials: "include",
            });
    
            if (response.ok) {
              const data = await response.json();
              localStorage.setItem("user", JSON.stringify(data.user));
              localStorage.setItem("token", data.token);
              setUser(data.user);
              console.log("data Token: ", data.token);
              console.log("data User: ", data.user);
              return data;


              // const { token, user} = await response.json();
              // console.log("Response Data:", { token, user });
              // localStorage.setItem("user", JSON.stringify(user));
              // localStorage.setItem("token", token);
              // setUser(user);
              // console.log("Token desde login",token);
              // console.log("user desde login", user);
              
    
              // const storedCart = JSON.parse(localStorage.getItem("cart"));
              // if (storedCart) {
              //   setCart(storedCart);
              // }
    
              // return user;
            } else {
              const errorData = await response.json();
              throw new Error(errorData.message || "Error Desconocido");
            }
          } catch (error) {
            console.error("Error al iniciar sesión desde funcion login", error);
            throw error;
          }
        };











  // Cargar estado inicial desde LocalStorage
  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   const storedCart = JSON.parse(localStorage.getItem("cart"));
  //   if (storedUser) {
  //     setUser(storedUser);
  //   }
  //   if (storedCart){
  //     setCart(storedCart);
  // }}, []);


  //   // Funcion para iniciar sesion
  //   const login = async (email, password) => {      
  //     try {
  //       const response = await fetch("http://localhost:8888/usuarios/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify( { email, password }),
  //         //credentials: "include",
  //       });

  //       if (response.ok) {
  //         const userData = await response.json();
  //         localStorage.setItem("user", JSON.stringify(userData));
  //         setUser(userData);

  //         const storedCart = JSON.parse(localStorage.getItem("cart"));
  //         if (storedCart) {
  //           setCart(storedCart);
  //         }

  //         return userData;
  //       } else {
  //         const errorData = await response.json();
  //         throw new Error(errorData.message || "Error Desconocido");
  //       }
  //     } catch (error) {
  //       console.error("Error al iniciar sesión desde funcion login", error);
  //       throw error;
  //     }
  //   };

     //Función para cerrar sesión
     const logout = async () => {
      localStorage.removeItem("user"); 
      localStorage.removeItem("cart");
      localStorage.removeItem("token");
      setUser(null); // Limpia el estado del usuario
      setCart([]);
      //console.log("Logout ejecutado. Usuario:", user);
      //window.location.href = "/login";
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











// // Función para iniciar sesión
  // const login = (email, password) => {
  //   const users = JSON.parse(localStorage.getItem("usuarios")) || [];
  //   const foundUser = users.find(
  //     (user) => user.correo === email && user.password === password
  //   );

  //   if (foundUser) {
  //     // Guarda los datos del usuario autenticado
  //     setUser(foundUser);

  //     // También guarda los datos en localStorage para persistencia
  //     localStorage.setItem("user", JSON.stringify(foundUser));

  //     return true; // Login exitoso
  //   }
  //   return false; // Credenciales incorrectas
  // };

  


  //Cargar estado inicial desde la Api
    // useEffect(() => {
    //   const fetchUser = async () => {
    //     try {
    //       const response =await fetch("http://localhost:8888", {
    //         credentials: "include",
    //       });
    //       if (response.ok) {
    //         const userData = await response.json();
    //         setUser(userData);
    //       }
    //       console.log(user);
          
    //     } catch (error) {
    //       console.error("Error al obtener el usuario:", error);
    //     }
    //   };
    //   fetchUser();
    // }, []);

    // useEffect(() => {
    //   console.log(user);  // Se ejecutará cuando `user` cambie
    // }, [user]);